# İpek's portfolio site: build brief

A small personal website styled as a Windows 98 desktop in candy-pink. Three pages:
a homepage where a photo of Lubetkin's Penguin Pool is the menu (its two ramps are
"work" and "play"), a work window (a clean scrolling CV) and a play window (a little
file explorer linking to Instagram, Letterboxd and Goodreads).

The approved designs are in `design-reference/`. They were made in a design canvas,
so they use a templating runtime (`{{holes}}`, `<sc-if>`, `<x-dc>`, a `DCLogic` class)
that will NOT run as-is. Treat them as the visual spec: copy markup, CSS, colours,
SVG icons and polygon coordinates from them, but rebuild as plain HTML/CSS/JS.
Where this brief and the reference files disagree, this brief wins (the site has
moved on since: chili icons, no name tiles, live clock, retuned tags and glow).

## Stack

- Plain static HTML + one shared CSS file + small vanilla JS files. No framework,
  no build step.
- Pages: `index.html` (home), `work.html`, `play.html`.
- `style.css` shared; `menus.js` for the File/Edit/View/Help menus and About dialog
  (work and play); `clock.js` for the taskbar clock (all three pages).
- Images in `assets/`, including `assets/favicon.svg` (the chili).
- Must work on phones: everything scales; nothing overflows horizontally.

## Deploy

- Live on **Neocities**, deployed by GitHub Actions on every push to `main`
  (`.github/workflows/deploy.yml`, using `bcomnes/deploy-to-neocities@v3`).
  Repo: https://github.com/ipeksahbazoglu/ipek-site (public).
- The API key is the repo secret `NEOCITIES_API_TOKEN`. Never put it in code.
- The workflow copies an explicit list of files into `_site/` and uploads only that:
  **a new top-level file (e.g. another .js) must be added to the `cp` line** or it
  won't be deployed. `CLAUDE.md` and `design-reference/` stay off Neocities.
- `cleanup` is `false`: files deleted from the repo are not deleted on Neocities.
  3 starter files from the new Neocities account are still there.
- To ship: commit, `git push`, then check `gh run list --limit 1`.

## Palette and type

| Role | Value |
|---|---|
| Desktop background | `assets/bg-dither.png`, `center / cover`, `image-rendering: pixelated`, fallback `#ff8fb8` |
| Accent (letters, icons, headings, menu highlight) | `#d1286a` |
| Deep berry (links, small icon shading) | `#a01d52` |
| Text on the pink desktop | `#6b1036` |
| Credit line text | `#8a2a52` |
| Light pink (folder icon body) | `#ffa3c4` |
| Window title bar | `linear-gradient(90deg, #e0457b, #f2b9cc)`; text only on the homepage window (see below) |
| Window shadow | `0 16px 34px rgba(160,20,80,.35)` |
| Windows greys | face `#c0c0c0`, light `#dfdfdf`, shadow `#808080`, dark `#0a0a0a`, white `#ffffff` |
| Chili icon | body `#e8202a`, shade `#9b111e`, shine `#ff9a9a`, stem `#2f9e44`, stem shade `#1e6b2e` |

Bevels (use exactly these):
- raised: `inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf`
- sunken: `inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a`
- window frame: `inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff`

Fonts (Google Fonts):
- **Pixelify Sans** 500/700: ramp tags, taskbar buttons, section headings in the CV.
- **Tahoma / Verdana** (system): window chrome and titles, menus, status bars, CV body
  text, the taskbar clock.
- **Fraunces** 700: the name at the top of the CV only.

## Shared pieces (all three pages)

- **Chili icon**: a 16×16 pixel red chili pepper, used everywhere the reference had
  the pixel smiley face: the tab icon (`assets/favicon.svg`), the taskbar's first
  button, the homepage window title, and the About dialog (32px). The inline SVGs use
  the same paths as `favicon.svg`. There are no smiley faces any more.
- **Tab titles**: lowercase drive-style: `ipek:\` (home), `ipek:\work`, `ipek:\play`.
- **Taskbar**, full width at the bottom of the page: grey bar; first button has the
  16px chili + **İpek Şahbazoğlu** (bold) and links home; a groove divider;
  **work** and **play** buttons (min-width 150px, folder icons); a sunken box on the
  right with a **live clock** (HH:MM, 24-hour, Tahoma 13px, `#000`, ticks over on the
  minute, from `clock.js`). The current page's button looks pressed in (sunken bevel).
- **Windows** use the frame bevel and the pink title bar with the _ □ × buttons on
  the right (pixel SVGs in the reference files). × on work/play links back home.
- Use the Turkish letters for the name: **İpek Şahbazoğlu**, with the dotted İ. The
  exceptions are the lowercase `ipek:\` tab and window titles.

## index.html (home)

- No name tiles above the window (the reference's İPEK key tiles were removed).
- One window, centred, max-width 1180px. Its **title bar** shows, left-aligned, the
  16px chili, a 4px gap, then **ipek:\** in white bold Tahoma 12px. It's the page's
  `<h1>`, with `aria-label="İpek Şahbazoğlu"`. _ □ × stay on the right.
- The window holds the Penguin Pool photo
  (`assets/penguin-pool.png`, 1180×678, black & white: `filter: grayscale(1) contrast(1.1)`).
  - The top 100px of the photo is cropped off: the visible area is image y 100–678,
    so the photo box has `aspect-ratio: 1180 / 578` and the image is positioned
    `top: -17.30%; height: 117.30%`.
  - An inline SVG overlays the photo with `viewBox="0 100 1180 578"`,
    `preserveAspectRatio="none"`. Ramp polygon points are copied exactly from
    `home.reference.html` (original image pixels).
  - **Ramp hover glow** (silver, subtle): each ramp group has 3 layers of the same
    polygon: reflect (translate y 36, blur 14, stroke 12, max opacity .24), halo
    (translate y 10, blur 14, fill+stroke, opacity .50), and a transparent hit area.
    No outline lines: the reference's edge and core layers were removed.
    All layers `mix-blend-mode: screen`, fade in over .5s. Nothing is visible until
    hover.
  - Left ramp = **work**, right ramp = **play**. Both ramps link to their page.
  - **Tags** on the photo: raised grey buttons, Pixelify Sans, accent text, labels
    just "work" and "play" (no arrows). Percentages of the photo box, mirrored around
    the centre (50%): work `left: 26.4%` rotated 8°, play `left: 73.6%` rotated −8°,
    both `top: 34.26%`, `transform: translate(-50%, -100%) rotate(…)`. Hovering or
    focusing a tag lights its ramp too (`.scene:has(.tag-work:hover) .rampg-work …`).
  - Status bar under the photo: "hover a ramp · work ↘ · ↙ play" | "Lubetkin & Tecton, 1934".
- Under the window, small: "© 2026 İpek Şahbazoğlu · Penguin Pool, London Zoo
  (Berthold Lubetkin & Tecton, 1934) · photo © RIBA Library Photographs Collection".

## work.html

One window (max-width 820px) with a menu bar and a white, document-style page that
scrolls inside the window (grey Windows-style scrollbar). Content, in order, is in
`work.reference.html` and below:

- Name (Fraunces 700, ~38px), summary line, then buttons: GitHub ↗, LinkedIn ↗,
  Medium ↗, email me (mailto).
- **experience** (5 roles), **education**, **portfolio** sections, each heading
  Pixelify Sans in accent with a light pink rule underneath; rows = dates column
  (150px) + title · company + two bullets. On phones the dates sit above each role.
- Status bar: "scroll for experience, education and portfolio" | "work".

Links: GitHub https://github.com/ipeksahbazoglu · LinkedIn
https://www.linkedin.com/in/ipeksahbazoglu/ · Medium https://medium.com/@ipeksahbazoglu ·
email ipeksahbazoglu@gmail.com · project repo
https://github.com/ipeksahbazoglu/cryptic-crossword-agent

## play.html

A smaller Explorer-style window (max-width 720px): menu bar, an address bar reading
`C:\İpek\play`, a white pane with three big 64px pixel icons (SVGs in
`play.reference.html`), status bar "3 object(s)" | "play".

- **observatory** (palette icon) → https://www.instagram.com/balfasulye/
- **films** (film strip) → https://letterboxd.com/ipeksahbazoglu/
- **books** (open book) → https://www.goodreads.com/user/show/17812474-ipek

All open in a new tab (`target="_blank" rel="noopener"`).

## Menus (menus.js, both windows)

Clicking File / Edit / View / Help opens a grey Windows dropdown under it; the open
menu name looks pressed; items highlight `#d1286a` with white text; clicking outside
or pressing Escape closes it. Arrow keys move between menus and items; once a menu is
open, hovering another switches to it. Item behaviour comes from data- attributes
(`data-copy`/`data-label`, `data-scroll`, `data-view`, `data-about`).

- Work: File → Open GitHub ↗ · Email me… · ─ · Close (home). Edit → Copy email
  address · Copy LinkedIn link (status bar confirms "… copied to clipboard"). View →
  Experience · Education · Portfolio (scroll the document to that section) · ─ ·
  Play window. Help → About this site.
- Play: File → Observatory (Instagram) ↗ · Films (Letterboxd) ↗ · Books (Goodreads) ↗ ·
  ─ · Close. Edit → Copy email address. View → Large Icons / List (switches the icon
  pane to rows with 32px icons; current option marked "•") · ─ · Work window.
  Help → About this site.
- **About dialog**: small centred Windows dialog built by `menus.js`, title "About",
  32px chili icon, "İpek's corner of the internet · Made by hand, 2026 · Background
  ideas from teppy's layouts · Penguin Pool photo © RIBA Library Photographs
  Collection", OK button.

## Notes

- `assets/bg-faces-teppy.png` is an alternative background tile from teppy's layouts
  (transparent 64px tile; use on `#ffc2d8`). Not used by default; keep for later.
- Credits stay visible: RIBA photo credit on home; teppy credit in the About dialog.
- Accessibility: real `<a>`/`<button>` elements, alt text on the photo, visible focus,
  text contrast ≥ 4.5:1, touch targets ≥ 44px where practical.
- On phones: the window goes full width, tags scale with the photo (they're
  percentage-positioned), taskbar buttons may wrap.
