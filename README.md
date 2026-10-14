# Shadab Ansari · Portfolio

Personal portfolio of **Shadab Ansari**, M.Tech (Computer Science & IT) at MANUU, Hyderabad.
Machine Learning · Explainable AI · MLOps.

Live site: https://shadabdln.github.io/ *(update after deploying)*

## Tech

Plain **HTML, CSS and JavaScript**: no framework, no build step, no dependencies.

- Responsive (desktop, tablet, phone)
- Light / dark theme (follows the system, with a toggle that remembers the choice)
- Loading screen, scroll progress bar, typing effect, tech marquee, scroll reveal, mouse-follow card glow (all switched off for visitors who prefer reduced motion)
- Figure gallery with a lightbox
- Contact form via Formspree (paste the endpoint in index.html, search YOUR_FORM_ID)
- Project cards generated from `assets/js/projects.js`, with automatic category filters
- SEO: meta tags, Open Graph preview image, JSON-LD, sitemap, robots.txt, custom 404 page

## Folder structure

```
.
├── index.html                  ← the whole page (edit text here)
├── 404.html                    ← "page not found" page
├── assets/
│   ├── css/style.css           ← all styling (colours at the top)
│   ├── js/main.js              ← interactions
│   ├── js/projects.js          ← project cards: add new projects here
│   ├── img/
│   │   ├── profile.jpg         ← profile photo
│   │   ├── logo.svg            ← SA logo
│   │   ├── favicon.svg         ← browser tab icon
│   │   ├── og-image.png        ← preview image for LinkedIn/WhatsApp shares
│   │   └── projects/           ← project figures
│   └── resume/Shadab_Ansari_Resume.pdf
├── robots.txt, sitemap.xml, site.webmanifest, .nojekyll
└── DEPLOY_STEPS.md             ← how to run and deploy (Hinglish)
```

## Run locally

Open the folder in VS Code, install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.

## Deploy

See [DEPLOY_STEPS.md](DEPLOY_STEPS.md).
