# Ipek's portfolio site: build brief

A small personal website styled as a Windows 98 desktop in candy-pink. Three pages:
a homepage where a photo of Lubetkin's Penguin Pool is the menu (its two ramps are
"work" and "play"), a work window (a clean scrolling CV) and a play window (a little
file explorer linking to Instagram, Letterboxd and Goodreads).

The approved designs are in `design-reference/`. They were made in a design canvas,
so they use a templating runtime (`{{holes}}`, `<sc-if>`, `<x-dc>`, a `DCLogic` class)
that will NOT run as-is. Treat them as the visual spec: copy markup, CSS, colours,
SVG icons and polygon coordinates from them, but rebuild as plain HTML/CSS/JS.

## Stack

- Plain static HTML + one shared CSS file + a small vanilla JS file. No framework,
  no build step.
- Pages: `index.html` (home), `work.html`, `play.html`.
- `style.css` shared; `menus.js` for the File/Edit/View/Help menus and About dialog.
- Images in `assets/`. Deploy target: GitHub Pages (or Neocities).
- Must work on phones: everything scales; nothing overflows horizontally.

## Palette and type

| Role | Value |
|---|---|
| Desktop background | `assets/bg-dither.png`, `center / cover`, `image-rendering: pixelated`, fallback `#ff8fb8` |
| Accent (letters, icons, headings, menu highlight) | `#d1286a` |
| Deep berry (links, small icon shading) | `#a01d52` |
| Text on the pink desktop | `#6b1036` |
| Credit line text | `#8a2a52` |
| Light pink (folder icon body) | `#ffa3c4` |
| Window title bar | `linear-gradient(90deg, #e0457b, #f2b9cc)`, no title text |
| Window shadow | `0 16px 34px rgba(160,20,80,.35)` |
| Windows greys | face `#c0c0c0`, light `#dfdfdf`, shadow `#808080`, dark `#0a0a0a`, white `#ffffff` |

Bevels (use exactly these):
- raised: `inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf`
- sunken: `inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a`
- window frame: `inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff`

Fonts (Google Fonts):
- **Pixelify Sans** 500/700: name tiles, ramp tags, taskbar, section headings in the CV.
- **Tahoma / Verdana** (system): window chrome, menus, status bars, CV body text.
- **Fraunces** 700: the name at the top of the CV only.

## Shared pieces (all three pages)

- **Taskbar**, full width at the bottom of the page: grey bar; first button has a
  16px pixel face icon + **Ipek Şahbazoğlu** (bold) and links home; a groove divider;
  **work** and **play** buttons (min-width 150px, folder icons) ; a sunken box on the
  right reading "© 2026". The current page's button looks pressed in (sunken bevel).
- **Windows** use the frame bevel, the pink title bar with only the _ □ × buttons on
  the right (pixel SVGs in the reference files). × on work/play links back home.
- Name is spelled **Ipek Şahbazoğlu**: plain I with no dot (not İ), but keep the Turkish Ş and ğ. The design-reference files still say İ; this overrides them.

## index.html (home)

- Top-left: **IPEK** as four raised grey key tiles (clamp(28px, 3.2vw, 44px) squares,
  Pixelify Sans 700, accent colour). Only "IPEK" here; full name lives in the taskbar.
- Below: one window, centred, max-width 1180px, containing the Penguin Pool photo
  (`assets/penguin-pool.png`, 1180×678, black & white: `filter: grayscale(1) contrast(1.1)`).
  - The top 100px of the photo is cropped off: the visible area is image y 100–678,
    so the photo box has `aspect-ratio: 1180 / 578` and the image is positioned
    `top: -17.30%; height: 117.30%`.
  - An inline SVG overlays the photo with `viewBox="0 100 1180 578"`,
    `preserveAspectRatio="none"`. Copy both ramp `<g>` groups exactly from
    `home.reference.html` (polygon points are in original image pixels).
  - **Ramp hover glow** (silver, subtle): each ramp group has 5 layers of the same
    polygon: reflect (translate y 36, blur 14, stroke 12, max opacity .14), halo
    (translate y 10, blur 14, fill+stroke, opacity .32), edge (translate y 3, blur 5,
    stroke 3, opacity .45), core (stroke 1, opacity .6), and a transparent hit area.
    All layers `mix-blend-mode: screen`, fade in over .5s. Nothing is visible until
    hover. The edge and core outlines are dashed (`stroke-dasharray: 10 6`); halo and reflect stay solid.
  - Left ramp = **work**, right ramp = **play**. Both ramps link to their page.
  - **Tags** on the photo: raised grey buttons, Pixelify Sans, accent text,
    "work ↘" at `left: 26.47%` rotated 8°, "↙ play" at `left: 73.53%` rotated −8°,
    both `top: 34.26%`, `transform: translate(-50%, -100%) rotate(…)`. Hovering a tag
    lights its ramp too (`.scene:has(.tag-work:hover) .rampg-work …`).
  - Status bar under the photo: "hover a ramp · work ↘ · ↙ play" | "Lubetkin & Tecton, 1934".
- Under the window, small: "Penguin Pool, London Zoo (Berthold Lubetkin & Tecton, 1934) ·
  photo © RIBA Library Photographs Collection".

## work.html

One window (max-width 820px) with a menu bar and a white, document-style page that
scrolls inside the window (grey Windows-style scrollbar). Content, in order, is in
`work.reference.html` and below:

- Name (Fraunces 700, ~38px), summary line, then buttons: GitHub ↗, LinkedIn ↗,
  Medium ↗, email me (mailto).
- **experience** (5 roles), **education**, **portfolio** sections, each heading
  Pixelify Sans in accent with a light pink rule underneath; rows = dates column
  (150px) + title · company + two bullets.
- Status bar: "scroll for experience, education and portfolio" | "work".

Links: GitHub https://github.com/ipeksahbazoglu · LinkedIn
https://www.linkedin.com/in/ipeksahbazoglu/ · Medium https://medium.com/@ipeksahbazoglu ·
email ipeksahbazoglu@gmail.com · project repo
https://github.com/ipeksahbazoglu/cryptic-crossword-agent

## play.html

A smaller Explorer-style window (max-width 720px): menu bar, an address bar reading
`C:\Ipek\play`, a white pane with three big 64px pixel icons (SVGs in
`play.reference.html`), status bar "3 object(s)" | "play".

- **observatory** (palette icon) → https://www.instagram.com/balfasulye/
- **films** (film strip) → https://letterboxd.com/ipeksahbazoglu/
- **books** (open book) → https://www.goodreads.com/user/show/17812474-ipek

All open in a new tab (`target="_blank" rel="noopener"`).

## Menus (menus.js, both windows)

Clicking File / Edit / View / Help opens a grey Windows dropdown under it; the open
menu name looks pressed; items highlight `#d1286a` with white text; clicking outside
or pressing Escape closes it. Keyboard accessible (buttons, arrow keys nice-to-have).

- Work: File → Open GitHub ↗ · Email me… · ─ · Close (home). Edit → Copy email
  address · Copy LinkedIn link (status bar confirms "… copied to clipboard"). View →
  Experience · Education · Portfolio (scroll the document to that section) · ─ ·
  Play window. Help → About this site.
- Play: File → Observatory (Instagram) ↗ · Films (Letterboxd) ↗ · Books (Goodreads) ↗ ·
  ─ · Close. Edit → Copy email address. View → Large Icons / List (switches the icon
  pane to rows with 32px icons; current option marked "•") · ─ · Work window.
  Help → About this site.
- **About dialog**: small centred Windows dialog, title "About", pixel face icon,
  "Ipek's corner of the internet · Made by hand, 2026 · Background ideas from teppy's
  layouts · Penguin Pool photo © RIBA Library Photographs Collection", OK button.

## Notes

- `assets/bg-faces-teppy.png` is an alternative background tile from teppy's layouts
  (transparent 64px tile; use on `#ffc2d8`). Not used by default; keep for later.
- Credits stay visible: RIBA photo credit on home; teppy credit in the About dialog.
- Accessibility: real `<a>`/`<button>` elements, alt text on the photo, visible focus,
  text contrast ≥ 4.5:1, touch targets ≥ 44px where practical.
- On phones: the window goes full width, tags scale with the photo (they're
  percentage-positioned), taskbar buttons may wrap.
