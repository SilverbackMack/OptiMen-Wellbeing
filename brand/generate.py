"""Builds the INsight Digital logo files (SVG with outlined text + PNG).

Run by .github/workflows/brand.yml. Fonts are downloaded at build time.
"""
import os
import urllib.request

import cairosvg
import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
FONTS = os.path.join(HERE, ".fonts")
os.makedirs(OUT, exist_ok=True)
os.makedirs(FONTS, exist_ok=True)

FONT_URLS = {
    "fraunces": "https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf",
    "manrope": "https://github.com/google/fonts/raw/main/ofl/manrope/Manrope%5Bwght%5D.ttf",
}

INK = "#111111"
CREAM = "#FBF8F1"
AMBER = "#F2A900"


def font_path(name):
    p = os.path.join(FONTS, name + ".ttf")
    if not os.path.exists(p):
        urllib.request.urlretrieve(FONT_URLS[name], p)
    return p


class Face:
    def __init__(self, name, **variations):
        blob = hb.Blob.from_file_path(font_path(name))
        self.face = hb.Face(blob)
        self.font = hb.Font(self.face)
        self.font.set_variations(variations)
        self.upem = self.face.upem
        ext = self.font.get_font_extents("ltr")
        self.ascender, self.descender, self.line_gap = ext.ascender, ext.descender, ext.line_gap

    def gid(self, ch):
        return self.font.get_nominal_glyph(ord(ch))

    def outline(self, gid):
        pen = SVGPathPen(None)
        self.font.draw_glyph_with_pen(gid, pen)
        return pen.getCommands()

    def bounds(self, gid):
        pen = BoundsPen(None)
        self.font.draw_glyph_with_pen(gid, pen)
        return pen.bounds  # (xMin, yMin, xMax, yMax) in font units, y up

    def shape(self, text):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.font, buf, {"kern": True, "liga": True})
        return list(zip(buf.glyph_infos, buf.glyph_positions))


def place_run(face, text, size, x, baseline, tracking_em, fill, parts, boxes):
    """Append outlined glyphs; return new pen x. tracking is CSS letter-spacing."""
    s = size / face.upem
    for info, pos in face.shape(text):
        d = face.outline(info.codepoint)
        gx = x + pos.x_offset * s
        gy = baseline - pos.y_offset * s
        if d:
            parts.append(
                f'<path fill="{fill}" transform="translate({gx:.3f} {gy:.3f}) scale({s:.6f} {-s:.6f})" d="{d}"/>'
            )
            b = face.bounds(info.codepoint)
            if b:
                boxes.append((gx + b[0] * s, gy - b[3] * s, gx + b[2] * s, gy - b[1] * s, info.codepoint, face))
        x += pos.x_advance * s + tracking_em * size
    return x


def bbox_union(rects):
    return (min(r[0] for r in rects), min(r[1] for r in rects), max(r[2] for r in rects), max(r[3] for r in rects))


def wordmark(ink, accent):
    S = 112.0  # matches the approved design at 112 px
    heavy = Face("fraunces", opsz=112, wght=800, SOFT=0, WONK=0)
    semi = Face("fraunces", opsz=112, wght=600, SOFT=0, WONK=0)
    manrope = Face("manrope", wght=600)

    parts, boxes = [], []
    # Line box (line-height: 1) like the browser: baseline after half-leading.
    content = (semi.ascender - semi.descender) * S / semi.upem
    baseline = (S - content) / 2 + semi.ascender * S / semi.upem
    track = -0.035

    x = place_run(heavy, "IN", S, 0.0, baseline, track, ink, parts, boxes)
    x = place_run(semi, "s", S, x, baseline, track, ink, parts, boxes)
    dotless_start = len(boxes)
    x = place_run(semi, "ı", S, x, baseline, track, ink, parts, boxes)
    dotless = boxes[dotless_start]
    x = place_run(semi, "ght", S, x, baseline, track, ink, parts, boxes)

    # Amber tittle: diameter 0.19em, its top level with the font's own i-dot top.
    i_top = semi.bounds(semi.gid("i"))[3] * S / semi.upem
    d = 0.19 * S
    cx = (dotless[0] + dotless[2]) / 2
    cy = baseline - i_top + d / 2
    parts.append(f'<circle fill="{accent}" cx="{cx:.3f}" cy="{cy:.3f}" r="{d / 2:.3f}"/>')
    word = bbox_union([b[:4] for b in boxes] + [(cx - d / 2, cy - d / 2, cx + d / 2, cy + d / 2)])
    word_mid = (word[0] + word[2]) / 2

    # "DIGITAL" row: 16px Manrope 600, letter-spacing .5em, 56x2 rules, 16px gaps, 14px below line box.
    T = 16.0
    line_bottom = (S - content) / 2 + content
    row_top = line_bottom + 14
    m_content = (manrope.ascender - manrope.descender + manrope.line_gap) * T / manrope.upem
    m_base = row_top + (manrope.line_gap * T / manrope.upem) / 2 + manrope.ascender * T / manrope.upem
    tparts, tboxes = [], []
    tx = place_run(manrope, "DIGITAL", T, 0.0, m_base, 0.5, ink, tparts, tboxes)
    text_w = tx - 0.5 * T  # drop the trailing tracking
    tdx = word_mid - text_w / 2
    parts.append(f'<g transform="translate({tdx:.3f} 0)">' + "".join(tparts) + "</g>")
    rule_y = row_top + m_content / 2 - 1
    gap = 16 + 0.5 * T
    left_rule = (word_mid - text_w / 2 - gap - 56, rule_y, word_mid - text_w / 2 - gap, rule_y + 2)
    right_rule = (word_mid + text_w / 2 + gap, rule_y, word_mid + text_w / 2 + gap + 56, rule_y + 2)
    for r in (left_rule, right_rule):
        parts.append(f'<rect fill="{ink}" x="{r[0]:.3f}" y="{r[1]:.3f}" width="56" height="2"/>')
    text_boxes = [(b[0] + tdx, b[1], b[2] + tdx, b[3]) for b in tboxes]
    return parts, bbox_union([word, left_rule, right_rule] + text_boxes)


def icon(size=112.0):
    S = 58.0
    heavy = Face("fraunces", opsz=58, wght=800, SOFT=0, WONK=0)
    parts, boxes = [], []
    content = (heavy.ascender - heavy.descender) * S / heavy.upem
    top = (size - S) / 2
    baseline = top + (S - content) / 2 + heavy.ascender * S / heavy.upem
    width = place_run(heavy, "IN", S, 0.0, baseline, -0.04, CREAM, [], [])
    group_w = width + 3 + 12
    x0 = (size - group_w) / 2
    place_run(heavy, "IN", S, x0, baseline, -0.04, CREAM, parts, boxes)
    dot_x = x0 + width + 3 + 6
    dot_y = size - 32 - 6
    body = "".join(parts) + f'<circle fill="{AMBER}" cx="{dot_x:.3f}" cy="{dot_y:.3f}" r="6"/>'
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size:g} {size:g}" width="{size:g}" height="{size:g}">'
        f'<rect width="{size:g}" height="{size:g}" rx="26" fill="{INK}"/>{body}</svg>'
    )


def svg_doc(parts, box, pad=12.0, background=None):
    x0, y0, x1, y1 = box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad
    w, h = x1 - x0, y1 - y0
    bg = f'<rect x="{x0:.3f}" y="{y0:.3f}" width="{w:.3f}" height="{h:.3f}" fill="{background}"/>' if background else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.3f} {y0:.3f} {w:.3f} {h:.3f}" '
        f'width="{w:.1f}" height="{h:.1f}">{bg}{"".join(parts)}</svg>'
    )


def save(name, svg, png_width):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(svg)
    cairosvg.svg2png(bytestring=svg.encode(), write_to=os.path.join(OUT, name + ".png"), output_width=png_width)


if __name__ == "__main__":
    p, box = wordmark(INK, AMBER)
    save("insight-digital-logo", svg_doc(p, box), 2400)
    p, box = wordmark(CREAM, AMBER)
    save("insight-digital-logo-white", svg_doc(p, box), 2400)
    save("insight-digital-logo-white-preview", svg_doc(p, box, pad=40, background=INK), 1600)
    save("insight-digital-icon", icon(), 1024)
    print("done:", sorted(os.listdir(OUT)))
