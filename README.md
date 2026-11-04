# Ayushman Chakraborty — Portfolio

Personal portfolio of Ayushman Chakraborty, an AI, backend and data engineer in Bengaluru.
Live at [ayushmanchakraborty.vercel.app](https://ayushmanchakraborty.vercel.app).

## Tech stack

- **Framework:** React 19 + TypeScript, Vite 6
- **Styling:** Tailwind CSS v4 with CSS-variable light/dark themes
- **Animation:** Motion
- **Routing:** React Router 7 (route-level code splitting)
- **Icons:** React Icons
- **Contributions graph:** react-github-calendar

## Pages

- `/` — intro, GitHub activity, experience timeline, links, featured projects
- `/work` — experience, open source contributions and education
- `/projects` — all projects with category filters and search, plus more repositories on GitHub
- `/projects/:slug` — project details, highlights, stack and links
- `/skills` — technical skills by area
- `/blogs` — engineering notes

## Editing content

All content lives in plain data files so updates don't touch layout code:

- `src/data/projects.ts` — projects and the GitHub list
- `src/data/blogs.ts` — blog posts
- `src/pages/Work.tsx` — experience timeline
- `src/pages/SkillsPage.tsx` — skills

Project screenshots live in `src/assets/projects/` as WebP.

## Getting started

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Deployment

Deployed on Vercel. `vercel.json` rewrites all routes to the SPA and redirects retired project URLs.
