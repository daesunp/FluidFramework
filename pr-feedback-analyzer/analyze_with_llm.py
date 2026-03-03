#!/usr/bin/env python3
"""
Analyze PR feedback using the Claude API to discover recurring patterns.

Reads the JSON output from fetch_feedback.py and produces a markdown
report with categorized themes, a personal checklist, and example quotes.

Requires:
    pip install anthropic

Usage:
    python analyze_with_llm.py                          # defaults
    python analyze_with_llm.py -i pr_feedback.json      # custom input
    python analyze_with_llm.py -o my_report.md           # custom output
    ANTHROPIC_API_KEY=sk-... python analyze_with_llm.py  # explicit key
"""

import argparse
import json
import sys

try:
    import anthropic
except ImportError:
    print(
        "Missing dependency: pip install anthropic",
        file=sys.stderr,
    )
    sys.exit(1)


ANALYSIS_PROMPT = """\
You are a senior software engineering coach. I'm giving you every piece
of review feedback I have received on my GitHub pull requests.

Each item includes:
- The PR title, repo, and URL
- The reviewer
- The comment body (and optionally the file path and diff hunk)

Please produce a thorough analysis in **Markdown** format:

## 1. Theme Summary Table
A table with columns: Theme | Count | % of Total
Sort by frequency descending. Include at least the top 10 themes.
Example themes: naming, error-handling, testing, types/type-safety,
performance, readability/style, documentation, API design, security,
concurrency, edge-cases, simplification/refactoring, etc.
Use whatever themes actually appear — don't force-fit.

## 2. Detailed Theme Breakdown
For each theme (top 10+):
- 2-3 representative **direct quotes** from reviewers (with PR link)
- A brief explanation of what reviewers are generally asking for

## 3. Reviewer Style Notes
For each of my top 5 reviewers, a 1-2 sentence summary of what they
tend to focus on.

## 4. Personal PR Checklist
Based on the patterns, produce a checklist (markdown checkboxes) of
10-20 items I should verify before submitting any future PR. Order
them by how often the pattern appeared.

## 5. Suggested Automated Review Rules
For each checklist item, suggest whether it could be enforced by:
- A linter rule (name the rule/tool if one exists)
- A CI check
- An LLM-based review prompt (provide the prompt text)

Be specific and actionable. Ground everything in the actual data.
"""


def build_feedback_text(feedback, max_chars=180_000):
    """
    Serialize feedback into a compact text block that fits in the
    context window. Prioritise inline comments (richer signal) and
    truncate if necessary.
    """
    # Sort: inline comments first (they carry file + diff context)
    feedback = sorted(feedback, key=lambda f: f["kind"] != "inline_comment")

    lines = []
    total = 0
    for f in feedback:
        parts = [
            f"[{f['repo']} #{f['pr_number']}]({f['pr_url']})",
            f"PR: {f['pr_title']}",
            f"Reviewer: {f['reviewer']}",
        ]
        if f.get("file"):
            parts.append(f"File: {f['file']}")
        if f.get("diff_hunk"):
            # Keep only the last 4 lines of the hunk for context
            hunk_lines = f["diff_hunk"].strip().splitlines()[-4:]
            parts.append("Diff context:\n" + "\n".join(hunk_lines))
        parts.append(f"Comment:\n{f['body']}")
        block = "\n".join(parts) + "\n---\n"

        if total + len(block) > max_chars:
            lines.append(
                f"\n[Truncated — {len(feedback) - len(lines)} remaining "
                f"comments omitted to fit context window]\n"
            )
            break
        lines.append(block)
        total += len(block)

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Analyze PR feedback with the Claude API."
    )
    parser.add_argument(
        "--input", "-i",
        default="pr_feedback.json",
        help="Feedback JSON from fetch_feedback.py (default: pr_feedback.json)",
    )
    parser.add_argument(
        "--output", "-o",
        default="feedback_analysis.md",
        help="Output markdown report (default: feedback_analysis.md)",
    )
    parser.add_argument(
        "--model",
        default="claude-sonnet-4-6",
        help="Claude model to use (default: claude-sonnet-4-6)",
    )
    args = parser.parse_args()

    # Load feedback
    print(f"Loading {args.input} ...")
    with open(args.input) as fh:
        feedback = json.load(fh)

    if not feedback:
        print("No feedback to analyze.", file=sys.stderr)
        sys.exit(1)

    print(f"Loaded {len(feedback)} comments. Building prompt ...")
    feedback_text = build_feedback_text(feedback)

    # Call Claude
    client = anthropic.Anthropic()  # uses ANTHROPIC_API_KEY env var

    print(f"Calling {args.model} for analysis (this may take a minute) ...")
    message = client.messages.create(
        model=args.model,
        max_tokens=8192,
        messages=[
            {
                "role": "user",
                "content": (
                    f"{ANALYSIS_PROMPT}\n\n"
                    f"Here are all {len(feedback)} feedback comments:\n\n"
                    f"{feedback_text}"
                ),
            }
        ],
    )

    report = message.content[0].text

    with open(args.output, "w") as fh:
        fh.write(report)

    print(f"\nAnalysis written to {args.output}")
    print(f"Tokens used — input: {message.usage.input_tokens}, "
          f"output: {message.usage.output_tokens}")


if __name__ == "__main__":
    main()
