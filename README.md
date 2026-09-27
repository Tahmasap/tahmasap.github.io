# Muhammad Tahmasap — Portfolio

A personal portfolio site for Muhammad Tahmasap — student developer, graphic
designer, and document designer. Plain HTML/CSS/JS, no build step, no
backend, deploys straight to GitHub Pages.

## File structure

```
portfolio/
├── index.html              All page content and structure
├── css/
│   └── style.css           All styling (design tokens at the top)
├── js/
│   ├── projects-data.js    ⭐ EDIT THIS to add work or update contact links
│   └── script.js           Site behavior (nav, filtering, modal, etc.)
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       ├── og-image.jpg            Social share preview image
│       ├── projects/               Development project previews
│       │   └── astra-placeholder.svg
│       ├── designs/                Graphic design previews
│       │   └── honey-hearth-poster.webp
│       └── documents/              Document design previews (empty for now)
└── README.md                This file
```

## Running it locally

No build step, no dependencies. Pick one:

- Just double-click `index.html` to open it in a browser, or
- From this folder, run a tiny local server (recommended, avoids any
  browser file:// quirks):
  ```
  python3 -m http.server 8000
  ```
  then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push the contents of this folder to the `main` branch, with
   `index.html` at the repository root.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)`. Save.
6. GitHub will give you a URL like `https://your-username.github.io/repo-name/`
   within a minute or two.

That's it — no build process, no environment variables, no database.

## Placeholders you need to replace

All of these live in **one place**: the `SITE_CONFIG` object at the top of
`js/projects-data.js`.

| Placeholder | Where it's used |
|---|---|
| `YOUR_GITHUB_URL` | Hero button, Contact card, Footer link |
| `YOUR_EMAIL` | Contact card (`mailto:` link) |
| `YOUR_LINKEDIN_URL` | Contact card |

Open `js/projects-data.js`, edit the three values at the top, save. Every
place on the site that shows these links updates automatically.

There are also a few placeholders inside individual project entries further
down in the same file:

- Astra's `github` and `demo` fields are empty strings — add your repo link
  and (optionally) a bot invite link when you have them. Until then, the
  site correctly hides those buttons instead of showing broken links.

## Where to add new work

Everything in the **Work** section is driven by one file:
**`js/projects-data.js`**. You don't need to touch `index.html`, `style.css`,
or `script.js` to add a project.

### Adding a development project
1. Add a real screenshot or preview image to `assets/images/projects/`.
2. Copy one of the existing objects in the `PROJECTS` array in
   `js/projects-data.js`.
3. Set `category: "development"`, fill in the title/description/tools, and
   point `image` at your new file.
4. Leave `featured: false` unless this should replace Astra as the flagship
   project (only one project should have `featured: true` at a time).

### Adding a graphic design
1. Export your design from Canva (or wherever) and drop it into
   `assets/images/designs/`. Keep it reasonably sized for the web — the
   existing poster was resized to 900px wide and saved as `.webp`, which is
   a good target (under ~150KB).
2. Copy a project object, set `category: "design"`, and point `image` at
   your new file.

### Adding a document design
1. Since Word documents aren't directly viewable in a browser, export a
   preview image of the document (e.g. "Export as PDF" then convert the
   first page to an image, or take a clean screenshot) and save it to
   `assets/images/documents/`.
2. Copy a project object, set `category: "document"`.

As soon as you save the file, the site picks it up — the empty-state
message for that category will automatically disappear once it has at
least one real entry.

## Design notes

- **Colors, fonts, and spacing** are all defined as CSS custom properties
  at the top of `css/style.css` (`:root { ... }`). Changing a value there
  updates it everywhere.
- The three colored dots (blue / clay / sage) consistently represent
  Development / Graphic Design / Document Design throughout the site —
  in the hero, the skills section, and the work category tags.
- Fonts are loaded from Google Fonts (Fraunces for headings, IBM Plex Sans
  for body text, IBM Plex Mono for small technical labels/chips). If you'd
  rather not depend on an external font host, the fonts can be
  self-hosted — ask if you want help with that later.

## Suggestions for a future version

These aren't required, just ideas if you want to keep improving it:

- Once Astra has a real screenshot, swap it in and consider adding 2–3
  more images so the project modal shows a small gallery.
- A dedicated "case study" page per project (problem → approach → what you
  learned) would deepen the portfolio once you have 4–5 solid projects.
- If you start writing about what you build, a simple `/blog` or `/notes`
  section using the same design system could be a nice addition.
- Real Open Graph/social preview image is already in place
  (`assets/images/og-image.jpg`) — regenerate it if your identity line or
  branding changes.
- Consider self-hosting the Google Fonts if you want to fully remove the
  external font request for maximum performance/privacy.
