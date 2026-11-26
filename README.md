# vitorpaz.dev

Personal site for Vitor Paz: mathematics, physics, and software. Written in
English and built with plain HTML, CSS, and JavaScript — no build step, no
framework, no client-side dependencies beyond the web fonts.

The work section lists only projects related to mathematics.

## Structure

```
.
├── index.html      # page markup
├── styles.css      # typography and layout
├── script.js       # loads projects.json
├── projects.json   # ← add projects here
├── favicon.svg
└── README.md
```

## Run locally

The project list is loaded with `fetch`, so the folder must be served over HTTP.
Opening `index.html` directly from disk will not load the projects.

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Adding a project

Edit `projects.json` and add an object to the `projects` array:

```json
{
  "title": "Project name",
  "description": "What the project is and what problem it solves, in one or two sentences.",
  "category": "Mathematics",
  "year": "2026",
  "status": "In development",
  "tags": ["Combinatorics", "Probability"],
  "links": {
    "site": "https://example.com",
    "repo": "https://github.com/vitorluizpaz/repository"
  }
}
```

| Field         | Required | Notes                                                    |
| ------------- | -------- | -------------------------------------------------------- |
| `title`       | yes      | Project name shown in the list.                          |
| `description` | no       | One or two sentences.                                    |
| `category`    | no       | Shown in the metadata line, e.g. `Mathematics`.          |
| `year`        | no       | Shown in the metadata line.                              |
| `status`      | no       | E.g. `In development`, `Complete`.                       |
| `tags`        | no       | Comma-separated list under the description.              |
| `links.site`  | no       | If present, the title links to the live project.         |
| `links.repo`  | no       | Adds a repository link.                                  |
| `links`       | no       | With no links, the card reads “Private repository”.      |

The `updated` field at the top of the file is shown as “Updated November 2026”
in the work section. Every entry renders on its own; no other code changes are
needed.

## Deploy

The site is static and works without configuration on:

- **Cloudflare Pages** — build directory `/`, no build command.
- **GitHub Pages** — publish the `main` branch from the repository root.
- **Netlify / Vercel** — any static site preset.

## Credits

- Typefaces: [Newsreader](https://fonts.google.com/specimen/Newsreader),
  [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) and
  [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).
