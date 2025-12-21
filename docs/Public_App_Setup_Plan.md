# Public App Setup Plan (Finibus 1:1)

## Status: IMPLEMENTATION IN PROGRESS

---

## Folder Structure

```
apps/public/
├── public/
│   ├── images/           # All Finibus images (copied 1:1)
│   │   ├── author/
│   │   ├── icons/
│   │   ├── partner-icons/
│   │   ├── portfolio/
│   │   ├── post/
│   │   └── project/
│   ├── favicon.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── css/          # 12 CSS files (copied 1:1)
│   │   ├── sass/         # 27 SCSS files (copied 1:1)
│   │   └── webfonts/     # 18 webfont files (copied 1:1)
│   ├── components/
│   │   ├── common/       # Header, Footer, Breadcrumb, etc.
│   │   ├── data/         # Data.ts (portfolio data)
│   │   ├── layout/       # MainLayout, SecondLayout
│   │   └── pages/        # All page components
│   ├── App.tsx           # Main router (v6)
│   ├── main.tsx          # Entry point
│   └── index.scss        # Main style entry
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Dev Commands

### Admin (Darkone) - Existing
```bash
npm run dev
# Runs on default port (8080 or as configured)
```

### Public (Finibus) - NEW
```bash
cd apps/public
npm install
npm run dev
# Runs on port 3000
```

---

## Ports

| App | Port | Base Path |
|-----|------|-----------|
| Public (Finibus) | 3000 | `/` |
| Admin (Darkone) | 8080 | `/` (future: `/admin`) |

---

## Route List (13 Routes)

| Route | Component | Layout |
|-------|-----------|--------|
| `/` | HomePage | HomeLayout |
| `/home2` | HomePage2 | DarkLayout |
| `/about` | AboutPage | MainLayout |
| `/service` | ServicesPage | MainLayout |
| `/service-details` | ServiceDetails | MainLayout |
| `/project` | ProjectsPage | MainLayout |
| `/project-details` | ProjectDetailsPage | MainLayout |
| `/blog` | BlogPage | MainLayout |
| `/blog-standard` | BlogStandardPage | MainLayout |
| `/blog-details` | BlogDetailsPage | MainLayout |
| `/contact` | ContactPage | MainLayout |
| `/commingsoon` | CommingSoonPage | Standalone |
| `/error` | ErrorPage | MainLayout |

---

## SCSS Isolation Rules

### CRITICAL: Zero Collision Guaranteed

1. **Separate SCSS Pipelines**
   - `apps/public/src/assets/` contains ALL Finibus styles
   - `/src/assets/` contains ALL Darkone styles
   - NO cross-imports allowed

2. **No Shared node_modules**
   - Each app has its own `package.json`
   - Dependencies are installed separately

3. **No Shared Bootstrap**
   - Finibus uses its own Bootstrap copy in `apps/public/src/assets/css/`
   - Darkone uses its own Bootstrap in `/src/`

4. **No Token Mixing**
   - Finibus: `$theme-color: #D90A2C`
   - Darkone: Separate color tokens
   - Variables are scoped to their respective apps

---

## Known Limitations

1. **Lovable Preview**: Shows admin (Darkone) only; public app must be validated locally
2. **Local Development Required**: Run `cd apps/public && npm run dev` to preview Finibus
3. **Separate npm install**: Each app requires its own dependency installation

---

## Dependencies Added (Finibus-specific)

- `swiper` (v8+) - Carousel/slider
- `react-circular-progressbar` - Progress circles
- `react-countup` - Animated counters
- `react-modal-video` - Video modals
- `@ramonak/react-progress-bar` - Progress bars
- `react-animated-cursor` - Cursor effects

---

## Migration Notes

### React Router v5 → v6 Changes
- `Switch` → `Routes`
- `component={X}` → `element={<X />}`
- `process.env.PUBLIC_URL` → removed (Vite handles this)

### Import Path Changes
- `process.env.PUBLIC_URL + "/images/..."` → `"/images/..."`
- SCSS imports use relative paths from `apps/public/src/`

---

## Execution Status

| Task | Status |
|------|--------|
| Create apps/public folder structure | ✅ Done |
| Copy CSS/SCSS/Webfonts | ✅ Done |
| Copy images | ✅ Done |
| Copy static public files | ✅ Done |
| Create Vite config | ✅ Done |
| Create package.json | ✅ Done |
| Create main.tsx entry | ✅ Done |
| Create App.tsx with routes | ✅ Done |
| Create common components | ✅ Done |
| Create page components | 🔄 Partial (placeholders need content) |
| Documentation | ✅ Done |
