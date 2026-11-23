# Builds a standalone page for one deck folder: every slide at 1920x1080, scaled to the window, notes below.
# Usage: python build-viewer.py bulgarian   (writes bulgarian.html next to this script)
import json, re, sys, html, pathlib

here = pathlib.Path(__file__).parent
name = sys.argv[1]
deck = here / name
meta = json.loads((deck / 'deck.json').read_text(encoding='utf-8'))
fonts = ''.join(f'<link rel="stylesheet" href="{html.escape(f["href"])}">' for f in meta['faces'].values())

slides = []
for i, sid in enumerate(meta['order'], 1):
    src = (deck / 'slides' / f'{sid}.html').read_text(encoding='utf-8')
    m = re.search(r'<aside>(.*?)</aside>', src, re.S)
    notes = m[1] if m else ''
    src = re.sub(r'<aside>.*?</aside>', '', src, flags=re.S)
    slides.append(f'<div class="frame"><div class="stage">{src}</div></div>'
                  f'<details><summary>{i} / {len(meta["order"])}</summary><p>{notes}</p></details>')
assert len(slides) == len(meta['order'])

page = f'''<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(meta["title"])}</title>{fonts}
<style>
{(deck / 'deck.css').read_text(encoding='utf-8')}
html {{ background: #0E0E0E; }}
body {{ margin: 0 auto; padding: 16px; max-width: 1920px; }}
h1, h2, h3, p {{ margin: 0; }}
.frame {{ height: calc(1080px * var(--k, .5)); overflow: hidden; border-radius: 8px; }}
.stage {{ width: 1920px; height: 1080px; transform: scale(var(--k, .5)); transform-origin: 0 0; }}
.stage > section {{ width: 1920px; height: 1080px; position: relative; overflow: hidden; }}
details {{ color: #B9B4AA; font-size: 16px; line-height: 1.5; margin: 8px 0 32px; }}
details p {{ margin-top: 8px; max-width: 900px; }}
summary {{ cursor: pointer; color: #8C887F; }}
</style></head><body>
{''.join(slides)}
<script>
const fit = () => document.body.style.setProperty('--k', Math.min(1, (document.body.clientWidth - 32) / 1920));
addEventListener('resize', fit); fit();
</script>
</body></html>
'''
(here / f'{name}.html').write_text(page, encoding='utf-8')
print('wrote', name + '.html', len(slides), 'slides')
