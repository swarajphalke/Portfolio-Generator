
# Dynamic Portfolio Generator (Assignment 2)

React app with two templates, multi-section form, professionals list (with filters), edit profile, and dynamic portfolio page.
API-driven via `json-server` (can be swapped with MockAPI/Express).

## Run locally

### 1) Start API
```bash
cd api
npm i
npm run dev
# serves http://localhost:4000 with /portfolios
```

### 2) Start client
```bash
cd ../client
npm i
npm run dev
# open http://localhost:5173
```

## Environment
- Client reads API base from `VITE_API_BASE` (defaults to `http://localhost:4000`).
- For production, set `VITE_API_BASE` to your hosted API (MockAPI/Render/EC2).

## Screenshots to include in /screenshots
- Template selection
- Portfolio form
- Professionals list
- Portfolio page (each template)
- Edit page

## Notes
- Data model matches the assignment sections.
- Filtering by skill & search by name/role/bio implemented on Professionals page.
- POST/GET/PUT via `/portfolios` JSON REST API.
- Two templates: Classic and Modern.
