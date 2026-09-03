# AGENTS.md — Industry Atlas

## Mission
Build a reusable industry knowledge engine where Markdown is the single source of truth and the website is a projection of that knowledge.

## Architectural rules
1. Do not hard-code the product around Memory. Memory is only the first industry lens.
2. Shared entities live once under `knowledge/entities/` and can participate in many industries.
3. `[[wikilinks]]` create explicit graph relationships.
4. Pages should remain useful as plain Markdown even without the website.
5. Prefer static generation and deterministic builds.

## Editorial rules
1. Separate **Fact**, **Evidence**, and **Thesis**.
2. Do not write promotional or adversarial titles for factual entities.
3. Prefer primary sources: company filings, official product pages, standards bodies, regulators, earnings calls.
4. Time-sensitive claims must include an `as_of` date.
5. Unverified research belongs in `research/theses/`, never silently in canonical entity metadata.
6. An industry page is a lens, not ownership. For example, Micron may appear in Memory, Semiconductors, and AI Hardware without being duplicated.

## Frontmatter baseline

```yaml
---
id: ddr3
title: DDR3
type: technology
industries: [memory, semiconductors]
tags: [dram, legacy-memory]
status: seed
as_of: 2026-09-04
---
```

Allowed core `type` values in v0: `industry`, `company`, `technology`, `product`, `application`, `regulation`, `event`, `evidence`, `thesis`.

## Development priority
1. Markdown → entity index.
2. Wikilink → graph edge.
3. Graph / entity exploration UI.
4. Search and filters.
5. Evidence provenance and timelines.
6. Optional AI-generated visualization suggestions only after deterministic rendering is stable.
