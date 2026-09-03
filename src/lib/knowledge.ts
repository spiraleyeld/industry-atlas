import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type KnowledgeNode = {
  id: string;
  title: string;
  type: string;
  industries: string[];
  tags: string[];
  summary?: string;
  status?: string;
  asOf?: string;
  body: string;
  path: string;
  links: string[];
};

export type KnowledgeEdge = {
  source: string;
  target: string;
  relation: 'wikilink';
};

const knowledgeRoot = path.resolve(process.cwd(), 'knowledge');

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith('.md') ? [full] : [];
  });
}

function wikilinks(body: string): string[] {
  const matches = [...body.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)];
  return [...new Set(matches.map((m) => m[1].trim()))];
}

export function getKnowledgeNodes(): KnowledgeNode[] {
  return walk(knowledgeRoot).map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = matter(raw);
    const rel = path.relative(knowledgeRoot, file).replaceAll('\\', '/');
    const fallback = path.basename(file, '.md');
    const data = parsed.data ?? {};

    return {
      id: String(data.id ?? fallback).toLowerCase(),
      title: String(data.title ?? fallback),
      type: String(data.type ?? 'unknown'),
      industries: Array.isArray(data.industries) ? data.industries.map(String) : [],
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      summary: data.summary ? String(data.summary) : undefined,
      status: data.status ? String(data.status) : undefined,
      asOf: data.as_of ? String(data.as_of) : undefined,
      body: parsed.content.trim(),
      path: rel,
      links: wikilinks(parsed.content),
    };
  });
}

export function getKnowledgeGraph() {
  const nodes = getKnowledgeNodes();
  const byTitle = new Map(nodes.map((n) => [n.title.toLowerCase(), n]));
  const byId = new Map(nodes.map((n) => [n.id.toLowerCase(), n]));

  const edges: KnowledgeEdge[] = [];
  for (const node of nodes) {
    for (const link of node.links) {
      const target = byTitle.get(link.toLowerCase()) ?? byId.get(link.toLowerCase());
      if (target && target.id !== node.id) {
        edges.push({ source: node.id, target: target.id, relation: 'wikilink' });
      }
    }
  }

  const seen = new Set<string>();
  const deduped = edges.filter((edge) => {
    const key = `${edge.source}->${edge.target}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { nodes, edges: deduped };
}

export function getNode(id: string) {
  return getKnowledgeNodes().find((node) => node.id === id.toLowerCase());
}
