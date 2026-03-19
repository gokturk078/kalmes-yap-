# KALMES YAPI - UI Görsel Prompt Rehberi

Bu doküman, mevcut projedeki görünür alanlar için fotoğraf üretim kalitesini yükseltmek amacıyla hazırlandı.

## 1) Kısa İnceleme Özeti

- `Hero` arka planında kullanılan `home-1.jpg` ve benzeri home görselleri **3274x700** civarında; yükseklik çok düşük olduğu için büyük ekranlarda sert crop ve kalite kaybı oluşuyor.
- Proje kapaklarında ilk görsel kapak kabul edildiği için bazı projelerde kapak olarak zayıf kareler geliyor:
  - `Hatay Erzin Dogalgaz Santrali` -> `1-rotatted.jpg` (1140x400)
  - `İstanbul 3.Havalimanı` -> `1-yatay.jpg` (1140x400, çok kısa)
- `ANTALYA HAVALİMANI TAV SERA` klasöründeki tüm görseller düşük çözünürlüklü (çoğu 768x576/1024), bu yüzden AI ile yükseltilmiş, gerçekçi yeni kapak üretilmesi kritik.

## 2) Üretim Standardı (Tüm Promptlar İçin)

- Stil: ultra gerçekçi, fotoğrafik, gerçek saha koşulları
- Renk: doğal kontrast, hafif sinematik ama abartısız
- Netlik: yüksek mikro detay, beton/çelik dokular net
- Yasaklar: yazı, logo, watermark, yapay CGI görünümü, plastik dokular
- İnsan kullanımı: iş güvenliği ekipmanlı işçiler az sayıda ve doğal
- Model kullanım notu:
  - Mümkünse image-to-image/reference modunda üret
  - Referans gücü: `%65-%75` aralığı
  - İlk üretim başarısızsa aynı promptu seed değiştirerek 4 varyant al

---

## 3) UI Alanlarına Göre Promptlar

### Prompt 01 - Ana Hero Arka Plan (4K)

- Kullanım: `components/Hero.tsx` (`/home/home-1.jpg` yerine)
- Hedef çıktı: `3840x2160` (16:9, gerçek 4K)
- Referanslar:
  - [Hero referans - terminal gece](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/home/hero-terminal-night.jpg)
  - [Kayseri terminal cephesi](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/terminal-facade.jpg)

```text
Ultra realistic aerial-oblique photo of a large modern airport terminal at blue hour, wide apron with parked aircraft, continuous terminal facade, strong leading lines, realistic runway lighting, subtle haze, natural sky gradient, cinematic but documentary look, high dynamic range, extremely sharp architectural details, no text, no logo, no watermark, photorealism, real-world materials, 8k quality look.

The composition must leave clean negative space in the center-left for headline text overlay. Keep the horizon stable, avoid overdramatic clouds, avoid fantasy elements.
```

Negatif prompt:

```text
cartoon, cgi, 3d render, illustration, fake reflections, over-saturated colors, distorted geometry, warped aircraft, duplicated objects, text, logo, watermark, blur, low detail
```

### Prompt 02 - Hero Altı Görsel (Demir Yığını Yerine Kayseri Viyadük)

- Kullanım: `app/page.tsx` içindeki ilk büyük görsel (`/home/home-3.jpg` yerine)
- Hedef çıktı: `2400x3000` (4:5, dikey)
- Referanslar:
  - [Kayseri viyadük kavis](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/viyaduk-kavis.jpg)
  - [Kayseri viyadük uzun kol](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/viyaduk-uzun-kol.jpg)
  - [Kayseri viyadük alt geçiş](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/viyaduk-alt-gecis.jpg)

```text
Create an ultra realistic construction-site photograph of Kayseri Airport viaduct works, combining curved viaduct geometry and long approach viaduct into one coherent scene. Use reinforced concrete piers, realistic deck curvature, compacted earth ground, construction vehicles in background, clear daylight, Turkish airport construction context.

This image must look like a real site photo taken with a professional full-frame camera, with deep perspective and strong structural lines. Absolutely avoid dense chaotic rebar pile in the foreground; the hero focus must be the viaduct form and engineering scale.
```

Negatif prompt:

```text
rebar chaos foreground, cluttered scaffolding wall, fantasy architecture, dramatic sci-fi sky, blurry workers, broken perspective, text, logo, watermark
```

### Prompt 03 - CTA Arka Planı (Ana Sayfa + Kurumsal)

- Kullanım:
  - `app/page.tsx` CTA arka planı
  - `app/kurumsal/page.tsx` kurucu vizyonu arka planı
- Hedef çıktı: `3840x2160` (16:9)
- Referanslar:
  - [Hero referans - terminal gece](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/home/hero-terminal-night.jpg)

```text
Generate a dark-friendly, ultra realistic wide airport-construction ambience background for website CTA overlay. Nightfall lighting, subtle practical lights on the site, low visual noise in center area, architectural depth, premium corporate mood, realistic texture response under low light.

The image must be suitable for text overlay: keep center composition readable, no high-contrast clutter behind headline area.
```

Negatif prompt:

```text
noisy foreground, overexposed lights, heavy lens flare, text, watermark, cartoon look, fake CGI
```

---

## 4) Proje Kapak Görselleri (Project Gallery / Project Detail OpenGraph)

Kapaklar için önerilen format: `3200x2000` (16:10). Bu oran mevcut kart oranına (`aspect-[16/10]`) birebir uygundur.

### Prompt 04 - ANTALYA HAVALİMANI TAV SERA (Kapak)

- Referanslar:
  - [Terminal geniş cephe](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/antalya/terminal-genis-facade.jpg)
  - [Terminal cephe yakın](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/antalya/terminal-cephe-yakin.jpg)
  - [Kolon detay](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/antalya/kolon-detay.jpg)

```text
Ultra realistic cover photo for Antalya Airport TAV SERA construction project. Wide-angle perspective showing terminal facade progression, active but organized construction site, clean structural lines, cranes and crews in realistic scale, natural daylight, high detail facade materials, true-to-life construction context in Turkey.

Composition: strong horizontal architectural line, foreground road/ground texture, background sky calm and realistic.
```

### Prompt 05 - Hatay Erzin Doğalgaz Santrali (Kapak)

- Referanslar:
  - [Santral genel görünüm](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/hatay/santral-genel.jpg)
  - [Temel donatı alanı](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/hatay/temel-donati.jpg)
  - [Temel çukur imalatı](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/hatay/temel-cukur.jpg)

```text
Photorealistic cover image of Hatay Erzin natural gas power plant construction. Show integrated industrial scale: turbine stack area, process structures, reinforced concrete foundation zones, controlled site activity, realistic heavy-industry atmosphere. Keep image clean and readable, with clear focal point on power plant identity.

Avoid messy close-up rebar dominance; keep rebar as supporting detail, not main subject.
```

### Prompt 06 - Kayseri Havalimanı Şantiyesi (Kapak)

- Referanslar:
  - [Viyadük kavis](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/viyaduk-kavis.jpg)
  - [Viyadük uzun kol](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/viyaduk-uzun-kol.jpg)
  - [Viyadük alt geçiş](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/viyaduk-alt-gecis.jpg)
  - [Terminal cephe](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kayseri/terminal-facade.jpg)

```text
Ultra realistic cover photo of Kayseri Airport construction with dominant viaduct geometry. Merge curved viaduct ramp and terminal-adjacent approach structures into one coherent, believable real-world scene. Emphasize concrete engineering quality, scale, and depth. Daylight, dry site ground, realistic machinery and limited workers with PPE.

Make the viaduct the hero element; scene should feel premium, structured, and technically impressive.
```

### Prompt 07 - İstanbul 3. Havalimanı (Kapak)

- Referanslar:
  - [İskele genel](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/istanbul-3/iskele-genel.jpg)
  - [Kolon kalıp](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/istanbul-3/kolon-kalip.jpg)
  - [Kolon detay yakın](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/istanbul-3/kolon-detay-yakin.jpg)
  - [Terminal gece referansı](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/home/hero-terminal-night.jpg)

```text
Create a photorealistic cover for Istanbul New Airport construction phase, balancing structural scaffolding activity with recognizable airport mega-project scale. Scene should feel like a real milestone photo: clear structural progress, cranes and formwork, open site depth, weather-consistent lighting, engineering precision.

Do not create chaotic scaffold-only close-up; preserve airport project identity and macro scale.
```

### Prompt 08 - İstanbul Kurtköy Teknopark (Kapak)

- Referanslar:
  - [Teknopark kütle](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/kurtkoy/teknopark-kutle.jpg)

```text
Ultra realistic cover image of Istanbul Kurtkoy Technopark construction. Mid-rise modern office/innovation block under construction, tower crane, clean sky, realistic earthwork foreground, strong geometric composition, contemporary architectural language, documentary realism, true construction scale.

Keep the building as the dominant focal point with balanced negative space for UI overlays.
```

### Prompt 09 - İstanbul Yeşilköy Havacılık Müzesi (Kapak)

- Referanslar:
  - [Müze donatı genel](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/yesilkoy/muze-donati-genel.jpg)
  - [Kalıp işçilik](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/yesilkoy/kalip-iscilik.jpg)
  - [Kavisli donatı](/Users/gokturkkahriman/kalmes-yapı/kalmes-yap-/docs/ai-references/yesilkoy/kavisli-donati.jpg)

```text
Photorealistic cover for Istanbul Yesilkoy Aviation Museum construction. Show distinctive aviation-inspired curved structural form, reinforced concrete and rebar craftsmanship, controlled site activity, museum-scale architectural character, clear blue-sky daylight and realistic material textures.

The cover must communicate "aviation museum project" rather than generic foundation work.
```

---

## 5) Hızlı Uygulama Notu

- Üretilen her kapak için önce `16:10` sürüm al (`3200x2000`).
- Hero için ayrı olarak gerçek `4K` (`3840x2160`) üret.
- Seçtiğin final kapakları admin panelden ilgili projeye `Kapak Yap` olarak atayabilirsin.

