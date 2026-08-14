# Project Instructions

This project extends the shared parent policy at `~/.agents/AGENTS.md`.

Because this repository is public, project-specific rules and conventions
live in the **private knowledge base** (not committed to the repo) to avoid
exposing local machine paths and other private context. The full project
instructions are retrieved on demand.

## How to load project conventions

Run the knowledge-base skill to retrieve the canonical project conventions:

```text
/knowledge-base search <private-kb-root> <repo-search-index> "rickypc.github.io project conventions"
```

The `<private-kb-root>` is the configured KB root resolved at runtime
(platform-specific `agent-knowledge-base` location); the `<repo-search-index>`
is this project's indexed name. The canonical concept is
`preferences/project-conventions.md` under this project's index, with the
sort/length extraction lesson at
`preferences/sort-and-function-length-extraction.md`.

When the runtime cannot resolve the KB root or index automatically, ask the
user to confirm them; do not hardcode or guess absolute paths.

---

All code © Richard Huang.
