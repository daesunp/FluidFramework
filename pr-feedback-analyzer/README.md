# PR Feedback Analyzer

Pull all review feedback you've received on your GitHub PRs, then
analyze it for recurring patterns — both with basic stats and an
LLM-powered deep analysis.

## Prerequisites

- **`gh` CLI** — [install](https://cli.github.com/) and authenticate:
  ```bash
  gh auth login
  ```
- **Python 3.8+**
- (Optional) **`anthropic` Python SDK** for LLM analysis:
  ```bash
  pip install anthropic
  ```

## Quick Start

```bash
# 1. Fetch feedback (uses your gh-authenticated identity)
python fetch_feedback.py

# 2. Analyze patterns with Claude API
export ANTHROPIC_API_KEY=sk-ant-...
python analyze_with_llm.py
```

This produces:
- `pr_feedback.json` — raw structured feedback
- `feedback_analysis.md` — themed analysis with checklist

## Options

```
fetch_feedback.py
  -u, --user USER        GitHub username (default: current gh user)
  --org ORG              Limit to repos in this org
  -m, --max-prs N        Max PRs to fetch (default: 200)
  -o, --output FILE      Output JSON path (default: pr_feedback.json)
  -a, --analyze-only F   Skip fetching; just analyze existing JSON

analyze_with_llm.py
  -i, --input FILE       Input JSON (default: pr_feedback.json)
  -o, --output FILE      Output markdown (default: feedback_analysis.md)
  --model MODEL          Claude model (default: claude-sonnet-4-6)
```

## Examples

```bash
# Fetch only PRs in a specific org
python fetch_feedback.py --org microsoft --max-prs 500

# Re-run analysis on existing data
python fetch_feedback.py --analyze-only pr_feedback.json

# Use a different model for analysis
python analyze_with_llm.py --model claude-opus-4-6
```

## What You Get

### From `fetch_feedback.py` (no API key needed)
- Top reviewers by comment count
- Feedback breakdown by repository, file type, file path
- Review state distribution (approved, changes requested, etc.)
- Comment length statistics

### From `analyze_with_llm.py` (needs ANTHROPIC_API_KEY)
- **Theme summary table** — ranked by frequency
- **Detailed breakdown** — representative quotes per theme
- **Reviewer style notes** — what each reviewer focuses on
- **Personal PR checklist** — items to verify before submitting
- **Automation suggestions** — linter rules, CI checks, LLM prompts
