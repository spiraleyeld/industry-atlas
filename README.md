# Industry Atlas

**Industry Atlas** is a Markdown-first industry knowledge graph and visual research interface.

The core idea is simple: industries are **views over shared entities**, not isolated folders. A company, technology, product, application, regulation, event, evidence item, or thesis exists once and can appear in many industry views.

The first vertical is **Memory**, starting with **DDR3 / Specialty DRAM**.

## Stack

- Astro + TypeScript
- Markdown as the SSOT
- YAML frontmatter for structured metadata
- `[[wikilinks]]` for explicit relationships
- D3 for the interactive knowledge graph
- Static-first architecture; no database required for the first version

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Knowledge model

```text
knowledge/
├─ industries/
├─ entities/
│  ├─ companies/
│  ├─ technologies/
│  ├─ products/
│  ├─ applications/
│  ├─ regulations/
│  └─ events/
└─ research/
   ├─ evidence/
   └─ theses/
```

A node can belong to multiple industries. `[[DDR3]]`, `[[Winbond]]`, etc. become graph edges automatically.

## Editorial rule

Facts and investment theses are deliberately separated. Every factual page should prefer primary sources and state uncertainty. A thesis is an interpretation, not a fact.
