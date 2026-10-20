# توليد أيقونات تطبيق "متفوّق 3 متوسط"
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), 'icons')
os.makedirs(OUT, exist_ok=True)

SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

FONT_PATHS = [
    'C:/Windows/Fonts/arialbd.ttf',
    'C:/Windows/Fonts/arial.ttf',
    'C:/Windows/Fonts/segoeuib.ttf',
]


def load_font(size):
    for p in FONT_PATHS:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_icon(size):
    img = Image.new('RGB', (size, size))
    d = ImageDraw.Draw(img)

    # تدرّج رأسي بنفسجي
    top = (99, 102, 241)      # #6366f1
    bottom = (55, 48, 163)    # #3730a3
    for y in range(size):
        d.line([(0, y), (size, y)], fill=lerp(top, bottom, y / size))

    # خلوية زوايا دائرية اختيارية (نرسم مربعاً كاملاً للـ maskable)
    cx = size / 2

    # قبعة التخرج (شكل معين + جسم)
    cap_w = size * 0.62
    cap_h = size * 0.30
    cy = size * 0.42
    # الماسة (القمة)
    diamond = [
        (cx, cy - cap_h * 0.75),
        (cx + cap_w / 2, cy),
        (cx, cy + cap_h * 0.75),
        (cx - cap_w / 2, cy),
    ]
    d.polygon(diamond, fill=(255, 255, 255))
    # جسم القبعة (شبه منحرف أسفل الماسة)
    body_top_w = cap_w * 0.62
    body_h = size * 0.13
    body = [
        (cx - body_top_w / 2, cy),
        (cx + body_top_w / 2, cy),
        (cx + body_top_w / 2 + size * 0.02, cy + body_h),
        (cx - body_top_w / 2 - size * 0.02, cy + body_h),
    ]
    d.polygon(body, fill=(224, 231, 255))
    # الشريط (السوشي)
    tassel_y = cy + body_h
    tassel_x = cx + cap_w / 2
    d.line([(tassel_x, cy), (tassel_x, tassel_y + size * 0.12)], fill=(255, 255, 255), width=max(2, size // 64))
    r = max(3, size // 36)
    d.ellipse([tassel_x - r, tassel_y + size * 0.12 - r, tassel_x + r, tassel_y + size * 0.12 + r], fill=(255, 255, 255))

    # النص "3م"
    text = '3م'
    font = load_font(int(size * 0.26))
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = cx - tw / 2 - bbox[0]
    ty = size * 0.72 - th / 2 - bbox[1]
    d.text((tx, ty), text, font=font, fill=(255, 255, 255))

    return img


for s in SIZES:
    icon = make_icon(s)
    icon.save(os.path.join(OUT, f'icon-{s}.png'))
    print(f'icon-{s}.png OK')

print('تم توليد جميع الأيقونات.')
