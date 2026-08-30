# -*- coding: utf-8 -*-
"""Bundle the site into one self-contained HTML file.

Combines index.html and menu.html into a single page and inlines the CSS,
the JavaScript and all ten SVG illustrations, so the result runs anywhere
with no server and no asset folder - handy for a preview link, an email
attachment, or handing the site to someone as one file.

    python3 tools/build-preview.py

Writes jenni-pho-preview.html in the repository root. Source files are
never modified. Re-run it after editing data.js to refresh the preview.

The only thing it still fetches at runtime is the Google Fonts stylesheet;
without a network it falls back to the stacks declared in site.css.
"""
import io, os, re, base64, glob

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "jenni-pho-preview.html")
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

read = lambda p: io.open(p, encoding="utf-8").read()

def inline_fonts():
    """Fold assets/fonts/fonts.css into the bundle with every woff2
    embedded as a data URI. The artifact is served from its own origin
    with no asset folder, so a relative font URL would 404 and the page
    would silently fall back to Georgia."""
    css = read("assets/fonts/fonts.css")
    out, n = [], 0
    for line in css.splitlines():
        m = re.search(r"url\('([^']+\.woff2)'\)", line)
        if m:
            path = os.path.join("assets/fonts", m.group(1))
            b64 = base64.b64encode(io.open(path, "rb").read()).decode("ascii")
            line = line.replace(m.group(1),
                                "data:font/woff2;base64," + b64)
            n += 1
        out.append(line)
    print("inlined %d font files" % n)
    return "\n".join(out)


index_html = read("index.html")
menu_html  = read("menu.html")
css        = read("assets/css/site.css")
data_js    = read("assets/js/data.js")
site_js    = read("assets/js/site.js")

# ---- 1. SVG illustrations -> data URIs -------------------------------
art = {}
for f in sorted(glob.glob("assets/img/*.svg")):
    key = os.path.splitext(os.path.basename(f))[0]
    b64 = base64.b64encode(io.open(f, "rb").read()).decode("ascii")
    art[key] = "data:image/svg+xml;base64," + b64
print("inlined %d illustrations" % len(art))

art_js = "window.ART_DATA = {\n" + "".join(
    '  %s: "%s",\n' % (repr(str(k)).replace("'", '"'), v) for k, v in art.items()
) + "};"

# site.js builds its <img> src from a relative path; point it at the map.
old_src = 'const art_src = `assets/img/${art}.svg`;'
assert old_src in site_js, "media() art_src line not found"
site_js = site_js.replace(
    old_src,
    'const art_src = (window.ART_DATA && window.ART_DATA[art]) || "";'
)

# ---- 2. body content -------------------------------------------------
def body_of(html):
    return html[html.index("<body>") + len("<body>"): html.rindex("</body>")]

body = body_of(index_html)
mbody = body_of(menu_html)

# Menu page's own section, minus its duplicate ordering block.
mstart = mbody.index("<!-- ============ MENU HEADER ============ -->")
mend   = mbody.index("<!-- ============ ORDER ============ -->")
menu_section = mbody[mstart:mend]

# The hero already carries an open/closed pill; renderStatus() targets a
# single element, so drop the menu page's duplicate rather than ship one
# that sits on "Checking hours..." forever.
pill = re.search(
    r'\s*<p class="hero__status" data-status.*?</p>',
    menu_section, re.S
)
assert pill, "duplicate status pill not found"
menu_section = menu_section.replace(pill.group(0), "")

menu_block = (
    '\n  <!-- ============ FULL MENU (from menu.html) ============ -->\n'
    '  <div id="full-menu">\n' + menu_section + '\n  </div>\n'
)

anchor = "  <!-- ============ REVIEWS ============ -->"
assert anchor in body, "reviews anchor not found"
body = body.replace(anchor, menu_block + anchor, 1)

# ---- 3. rewrite cross-page links to in-page anchors -------------------
body = body.replace('href="menu.html#cat-', 'href="#cat-')
body = body.replace('href="menu.html"', 'href="#full-menu"')
stray = [m.group(0) for m in re.finditer(r'href="[^"]*menu\.html[^"]*"', body)]
assert not stray, "unrewritten cross-page links: %r" % stray

# ---- 4. inline the hand-written <img> sources ------------------------
for key in ("pho-bowl", "dining-room"):
    body = body.replace('src="assets/img/%s.svg"' % key, 'src="%s"' % art[key])
assert "assets/img" not in body, "stray asset path in markup"

# ---- 5. strip external <script src> tags (inlined below) -------------
body = re.sub(r'\s*<script src="assets/js/[^"]+"></script>', "", body)
body = body.replace('<link rel="stylesheet" href="assets/fonts/fonts.css">', "")

# ---- 6. assemble -----------------------------------------------------
page = u"""<title>Jenni Pho</title>
<style>
%s
</style>
<style>
%s
</style>
%s
<script>
%s
</script>
<script>
%s
</script>
<script>
%s
</script>
""" % (inline_fonts(), css, body, art_js, data_js, site_js)

io.open(OUT, "w", encoding="utf-8").write(page)
print("wrote %s  (%.0f KB)" % (OUT, os.path.getsize(OUT) / 1024.0))
