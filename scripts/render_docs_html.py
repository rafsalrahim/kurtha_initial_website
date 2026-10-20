#!/usr/bin/env python3
"""Render docs/*.md to docs/html/*.html with a single house stylesheet."""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path("/root/valoir-shop/kurtha_initial_website")
MD_DIR = ROOT / "docs"
OUT = ROOT / "docs" / "html"

CSS = """
:root { --ink:#0c0b09; --paper:#f4efe6; --muted:#8a8174; --gold:#c9a227; --line:#2a261f; }
* { box-sizing: border-box; }
body { margin:0; font-family: Georgia, "Times New Roman", serif; background:var(--ink); color:var(--paper); line-height:1.55; }
a { color:var(--gold); }
.wrap { max-width: 820px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
nav { font-family: system-ui, sans-serif; font-size: 0.8rem; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); margin-bottom: 2rem; }
nav a { color: var(--gold); text-decoration: none; margin-right: 1rem; }
h1,h2,h3 { font-weight: 500; letter-spacing: -0.02em; }
h1 { font-size: 2rem; margin: 0 0 1rem; }
h2 { font-size: 1.25rem; margin: 2rem 0 0.75rem; border-top: 1px solid var(--line); padding-top: 1.25rem; }
h3 { font-size: 1.05rem; margin: 1.4rem 0 0.5rem; }
p, li { font-size: 1.02rem; }
ul, ol { padding-left: 1.2rem; }
code { font-family: ui-monospace, monospace; font-size: 0.85em; background: #1a1814; padding: 0.1em 0.35em; }
pre { background: #1a1814; padding: 1rem; overflow: auto; font-size: 0.85rem; border: 1px solid var(--line); }
pre code { background: none; padding: 0; }
table { border-collapse: collapse; width: 100%; font-size: 0.92rem; margin: 1rem 0; font-family: system-ui, sans-serif; }
th, td { border: 1px solid var(--line); padding: 0.45rem 0.55rem; text-align: left; vertical-align: top; }
th { color: var(--gold); font-weight: 600; }
.note { color: var(--muted); font-size: 0.85rem; margin-top: 3rem; }
"""

NAV = """
<nav>
  <a href="index.html">Hub</a>
  <a href="overview.html">Overview</a>
  <a href="architecture.html">Diagram</a>
  <a href="architecture-notes.html">Architecture</a>
  <a href="features.html">Features</a>
  <a href="epics.html">Epics</a>
  <a href="cost-and-risks.html">Cost</a>
  <a href="kanban.html">Kanban</a>
</nav>
"""


def inline(s: str) -> str:
    s = html.escape(s)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', s)
    return s


def convert(md: str) -> str:
    lines = md.splitlines()
    out: list[str] = []
    i = 0
    in_code = False
    code: list[str] = []
    while i < len(lines):
        line = lines[i]
        if line.startswith("```"):
            if in_code:
                out.append("<pre><code>" + html.escape("\n".join(code)) + "</code></pre>")
                code = []
                in_code = False
            else:
                in_code = True
            i += 1
            continue
        if in_code:
            code.append(line)
            i += 1
            continue
        if line.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s:-]+\|", lines[i + 1]):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip("|").split("|")])
                i += 1
            header, body = rows[0], rows[2:]
            html_t = ["<table><thead><tr>"]
            html_t += [f"<th>{inline(c)}</th>" for c in header]
            html_t.append("</tr></thead><tbody>")
            for r in body:
                html_t.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
            html_t.append("</tbody></table>")
            out.append("".join(html_t))
            continue
        if not line.strip():
            i += 1
            continue
        if line.startswith("# "):
            out.append(f"<h1>{inline(line[2:])}</h1>")
        elif line.startswith("## "):
            out.append(f"<h2>{inline(line[3:])}</h2>")
        elif line.startswith("### "):
            out.append(f"<h3>{inline(line[4:])}</h3>")
        elif re.match(r"^\d+\. ", line):
            items = []
            while i < len(lines) and re.match(r"^\d+\. ", lines[i]):
                items.append("<li>" + inline(re.sub(r"^\d+\. ", "", lines[i])) + "</li>")
                i += 1
            out.append("<ol>" + "".join(items) + "</ol>")
            continue
        elif line.startswith("- "):
            items = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append("<li>" + inline(lines[i][2:]) + "</li>")
                i += 1
            out.append("<ul>" + "".join(items) + "</ul>")
            continue
        else:
            out.append("<p>" + inline(line) + "</p>")
        i += 1
    return "\n".join(out)


def page(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{html.escape(title)}</title>
<style>{CSS}</style>
</head>
<body>
<div class="wrap">
{NAV}
{body}
<p class="note">Valoir planning docs · 2026-10-20 · pending KUR-002. Not a production site.</p>
</div>
</body>
</html>
"""


MAP = {
    "overview.md": "overview.html",
    "architecture.md": "architecture-notes.html",
    "features.md": "features.html",
    "epics.md": "epics.html",
    "cost-and-risks.md": "cost-and-risks.html",
    "kanban.md": "kanban.html",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for src_name, dest_name in MAP.items():
        src = MD_DIR / src_name
        body = convert(src.read_text())
        title = src.read_text().splitlines()[0].lstrip("# ").strip()
        (OUT / dest_name).write_text(page(title, body), encoding="utf-8")
        print("wrote", dest_name)

    index_body = convert(
        (MD_DIR.parent / "README.md").read_text()
        if (MD_DIR.parent / "README.md").exists()
        else "# Docs\n"
    )
    # Fix md links in hub toward html counterparts
    index_html = page("Valoir shop — planning hub", index_body)
    index_html = index_html.replace("docs/overview.md", "overview.html")
    index_html = index_html.replace("docs/architecture.md", "architecture-notes.html")
    index_html = index_html.replace("docs/html/architecture.html", "architecture.html")
    index_html = index_html.replace("docs/features.md", "features.html")
    index_html = index_html.replace("docs/epics.md", "epics.html")
    index_html = index_html.replace("docs/html/epics.html", "epics.html")
    index_html = index_html.replace("docs/html/features.html", "features.html")
    index_html = index_html.replace("docs/html/index.html", "index.html")
    index_html = index_html.replace("docs/cost-and-risks.md", "cost-and-risks.html")
    index_html = index_html.replace("docs/kanban.md", "kanban.html")
    (OUT / "index.html").write_text(index_html, encoding="utf-8")
    print("wrote index.html")


if __name__ == "__main__":
    main()
