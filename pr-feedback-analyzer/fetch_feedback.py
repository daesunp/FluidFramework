#!/usr/bin/env python3
"""
Fetch and analyze PR feedback history from GitHub.

Uses the `gh` CLI for authentication and API access.
Requires: `gh` CLI installed and authenticated (`gh auth login`).

Usage:
    python fetch_feedback.py                    # fetch for current user
    python fetch_feedback.py -u octocat         # fetch for specific user
    python fetch_feedback.py -a pr_feedback.json # analyze existing data only
    python fetch_feedback.py --org myorg        # limit to an org's repos
"""

import argparse
import json
import os
import subprocess
import sys
from collections import Counter


def gh_graphql(query):
    """Execute a GraphQL query via `gh api graphql`."""
    result = subprocess.run(
        ["gh", "api", "graphql", "-f", f"query={query}"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"gh api error: {result.stderr.strip()}", file=sys.stderr)
        sys.exit(1)
    return json.loads(result.stdout)


def fetch_pr_page(username, org_filter, cursor=None):
    """Fetch one page of PRs authored by the user."""
    after = f', after: "{cursor}"' if cursor else ""
    org_clause = f" org:{org_filter}" if org_filter else ""
    query = """
    {
      search(
        query: "is:pr author:%s%s sort:updated-desc"
        type: ISSUE
        first: 30
        %s
      ) {
        pageInfo { hasNextPage endCursor }
        nodes {
          ... on PullRequest {
            number
            title
            url
            state
            createdAt
            mergedAt
            repository { nameWithOwner }
            reviews(first: 100) {
              nodes {
                body
                state
                author { login }
                createdAt
              }
            }
            reviewThreads(first: 100) {
              nodes {
                isResolved
                comments(first: 20) {
                  nodes {
                    body
                    author { login }
                    createdAt
                    diffHunk
                    path
                  }
                }
              }
            }
          }
        }
      }
    }
    """ % (username, org_clause, after)
    return gh_graphql(query)


def fetch_all_prs(username, org_filter, max_prs):
    """Paginate through all PRs."""
    all_prs = []
    cursor = None
    while len(all_prs) < max_prs:
        data = fetch_pr_page(username, org_filter, cursor)
        search = data["data"]["search"]
        nodes = [n for n in search["nodes"] if n]  # filter nulls
        all_prs.extend(nodes)
        print(f"  Fetched {len(all_prs)} PRs ...", file=sys.stderr)
        if not search["pageInfo"]["hasNextPage"]:
            break
        cursor = search["pageInfo"]["endCursor"]
    return all_prs[:max_prs]


def extract_feedback(prs, username):
    """
    Pull every review-level and inline comment from the PRs,
    excluding the author's own comments.
    """
    feedback = []
    for pr in prs:
        base = {
            "pr_number": pr["number"],
            "pr_title": pr["title"],
            "pr_url": pr["url"],
            "repo": pr["repository"]["nameWithOwner"],
            "pr_state": pr["state"],
            "pr_created": pr["createdAt"],
        }

        # Top-level review bodies (the "Submit review" text)
        for rev in pr.get("reviews", {}).get("nodes", []) or []:
            if not rev:
                continue
            author = (rev.get("author") or {}).get("login", "")
            if author.lower() == username.lower():
                continue
            body = (rev.get("body") or "").strip()
            if not body:
                continue
            feedback.append({
                **base,
                "kind": "review_summary",
                "reviewer": author,
                "body": body,
                "review_state": rev.get("state"),
                "date": rev.get("createdAt"),
                "file": None,
                "diff_hunk": None,
            })

        # Inline thread comments
        for thread in pr.get("reviewThreads", {}).get("nodes", []) or []:
            if not thread:
                continue
            for cmt in thread.get("comments", {}).get("nodes", []) or []:
                if not cmt:
                    continue
                author = (cmt.get("author") or {}).get("login", "")
                if author.lower() == username.lower():
                    continue
                body = (cmt.get("body") or "").strip()
                if not body:
                    continue
                feedback.append({
                    **base,
                    "kind": "inline_comment",
                    "reviewer": author,
                    "body": body,
                    "review_state": None,
                    "date": cmt.get("createdAt"),
                    "file": cmt.get("path"),
                    "diff_hunk": cmt.get("diffHunk"),
                })

    return feedback


# ── Analysis helpers ─────────────────────────────────────────────


def print_section(title):
    print(f"\n--- {title} ---")


def analyze_feedback(feedback):
    """Print a statistical summary of the feedback."""
    if not feedback:
        print("\nNo feedback found.")
        return

    print(f"\n{'=' * 60}")
    print(" PR Feedback Analysis")
    print(f"{'=' * 60}")
    print(f"\nTotal feedback comments: {len(feedback)}")
    unique_prs = {f["pr_url"] for f in feedback}
    print(f"Across {len(unique_prs)} pull requests")

    # --- Top reviewers ---
    print_section("Top Reviewers")
    for reviewer, count in Counter(f["reviewer"] for f in feedback).most_common(15):
        print(f"  {reviewer:30s} {count:>5}")

    # --- By repository ---
    print_section("Feedback by Repository")
    for repo, count in Counter(f["repo"] for f in feedback).most_common(10):
        print(f"  {repo:50s} {count:>5}")

    # --- By file extension ---
    exts = Counter()
    for f in feedback:
        if f.get("file"):
            exts[os.path.splitext(f["file"])[1] or "(no ext)"] += 1
    if exts:
        print_section("Feedback by File Type")
        for ext, count in exts.most_common(10):
            print(f"  {ext:15s} {count:>5}")

    # --- Most commented files ---
    files = Counter(f["file"] for f in feedback if f.get("file"))
    if files:
        print_section("Most Commented Files (top 15)")
        for path, count in files.most_common(15):
            print(f"  {path:60s} {count:>5}")

    # --- Review states ---
    states = Counter(f["review_state"] for f in feedback if f.get("review_state"))
    if states:
        print_section("Review States")
        for state, count in states.most_common():
            print(f"  {state:20s} {count:>5}")

    # --- Comment length stats ---
    lengths = [len(f["body"]) for f in feedback]
    print_section("Comment Length Stats")
    print(f"  Average: {sum(lengths)/len(lengths):.0f} chars")
    print(f"  Median:  {sorted(lengths)[len(lengths)//2]} chars")
    print(f"  Min:     {min(lengths)} chars")
    print(f"  Max:     {max(lengths)} chars")

    # --- Kind breakdown ---
    kinds = Counter(f["kind"] for f in feedback)
    print_section("Comment Kind")
    for kind, count in kinds.most_common():
        print(f"  {kind:20s} {count:>5}")


# ── Main ─────────────────────────────────────────────────────────


def get_current_user():
    result = subprocess.run(
        ["gh", "api", "user", "-q", ".login"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(
            "Could not detect GitHub user. Pass --user explicitly.",
            file=sys.stderr,
        )
        sys.exit(1)
    return result.stdout.strip()


def main():
    parser = argparse.ArgumentParser(
        description="Pull and analyze GitHub PR feedback you've received."
    )
    parser.add_argument(
        "--user", "-u",
        help="GitHub username (default: current gh-authenticated user)",
    )
    parser.add_argument(
        "--org",
        help="Limit to repositories in this GitHub org",
    )
    parser.add_argument(
        "--max-prs", "-m",
        type=int,
        default=200,
        help="Maximum PRs to fetch (default: 200)",
    )
    parser.add_argument(
        "--output", "-o",
        default="pr_feedback.json",
        help="Output JSON file path (default: pr_feedback.json)",
    )
    parser.add_argument(
        "--analyze-only", "-a",
        metavar="FILE",
        help="Skip fetching; analyze an existing JSON file",
    )
    args = parser.parse_args()

    # ── Analyze-only mode ────────────────────────────────────────
    if args.analyze_only:
        print(f"Loading feedback from {args.analyze_only} ...")
        with open(args.analyze_only) as fh:
            feedback = json.load(fh)
        analyze_feedback(feedback)
        print_next_steps(args.analyze_only)
        return

    # ── Fetch mode ───────────────────────────────────────────────
    username = args.user or get_current_user()
    print(f"Fetching PRs for @{username} (max {args.max_prs}) ...")
    prs = fetch_all_prs(username, args.org, args.max_prs)
    print(f"Found {len(prs)} PRs.")

    print("Extracting review feedback (excluding your own comments) ...")
    feedback = extract_feedback(prs, username)
    print(f"Extracted {len(feedback)} feedback comments.")

    with open(args.output, "w") as fh:
        json.dump(feedback, fh, indent=2)
    print(f"\nRaw feedback saved to {args.output}")

    analyze_feedback(feedback)
    print_next_steps(args.output)


def print_next_steps(json_path):
    print(f"\n{'=' * 60}")
    print(" Next Steps: Deep Pattern Analysis with an LLM")
    print(f"{'=' * 60}")
    print(f"""
You now have structured feedback in {json_path}.
To discover deeper patterns, feed it to an LLM:

  Option A — Claude Code CLI:

    cat {json_path} | claude \\
      "Analyze these PR review comments I received on my pull requests.
       1. Categorize them into recurring themes (naming, error handling,
          testing, performance, style, documentation, types, etc.).
       2. Rank themes by frequency.
       3. For each theme give 2-3 representative quotes.
       4. Produce a personal PR-review checklist I can use before
          submitting future PRs."

  Option B — Claude API (Python):

    See analyze_with_llm.py for a ready-made script that calls the
    Claude API and writes the analysis to a markdown file.
""")


if __name__ == "__main__":
    main()
