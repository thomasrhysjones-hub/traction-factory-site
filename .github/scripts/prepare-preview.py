#!/usr/bin/env python3
"""Make the built Jekyll site navigable through a branch-based HTML preview mirror.

This script changes only generated files in _site, never source or production.
"""
from pathlib import Path
import os
import re

root = Path("_site")
base = os.environ["PREVIEW_BASE"].rstrip("/")
pr_number = os.environ["PREVIEW_PR"]
if not root.is_dir() or not (root / "index.html").exists():
    raise SystemExit("Jekyll output is missing _site/index.html")

link_pattern = re.compile(r"""(\b(?:href|src|action|poster)=["'])/(?!/)""")
preview_note = (
    '<div role="status" aria-label="Staging preview" '
    'style="position:fixed;bottom:12px;left:12px;right:12px;z-index:9999;'
    'width:max-content;max-width:calc(100vw - 24px);padding:9px 13px;'
    'background:#202623;color:white;border:2px solid #fc5901;'
    'box-shadow:0 2px 14px #0004;font:600 12px/1.4 Arial,sans-serif">'
    f'Traction Factory · PR #{pr_number} preview · Not live'
    '</div>'
)

count = 0
for path in root.rglob("*.html"):
    markup = path.read_text(encoding="utf-8")
    markup = link_pattern.sub(lambda match: match.group(1) + base + "/", markup)
    # Prevent indexing even if preview robots.txt is not honoured by a crawler.
    markup = re.sub(
        r'(<meta\s+name="robots"\s+content=")[^"]*(")',
        r'\g<1>noindex, nofollow\2',
        markup,
        flags=re.IGNORECASE,
    )
    if "<head>" in markup:
        markup = markup.replace("<head>", '<head>\n  <meta name="robots" content="noindex, nofollow">', 1)
    if "<body>" in markup:
        markup = markup.replace("<body>", "<body>\n" + preview_note, 1)
    path.write_text(markup, encoding="utf-8")
    count += 1

(root / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")
print(f"Prepared {count} static HTML pages at {base}/")
