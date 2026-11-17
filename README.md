# RuralHelp — Digital Transformation Platform

> Built for Baruasagar, Jhansi, Bundelkhand & Bharat MSMEs  
> Visual Design System: Google Stitch Project `15631348039358130972`

---

## 1. Project Overview & Architectural Vision

RuralHelp is a full-stack digital transformation platform engineered to help regional small businesses, kirana stores, clinics, coaching institutes, and manufacturing workshops adopt modern digital software, barcode point-of-sale systems, and WhatsApp AI automation.

### Aesthetic Foundation: "Authentic Editorial Commerce"
- **Canvas:** Heritage Warm Ivory (`#FAF8F5`) — avoiding sterile cold whites.
- **Primary:** Deep Evergreen (`#1B4D3E` / `#0E382B`) — symbolizing institutional security and endurance.
- **Secondary:** Vital Lime (`#84CC16`) — high-energy conversion signals.
- **Typography:** **Newsreader** (literary, authoritative serif headlines) + **Plus Jakarta Sans** (high-density, legible utilitarian body/data).
- **Tactile Elevation:** Strict prohibition of soft blurred shadows and glassmorphism. Uses crisp micro-offset ink borders (`2px 2px 0px #0E382B`) that mimic the physical click of storekeeper tools.
- **No Pill Buttons:** Strictly rectangular softly rounded corners (`rounded: 4px`).

---

## 2. Technology Stack

### Frontend
- **Framework:** React 18 + Vite (JavaScript ES6+)
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **State Management:** Zustand
- **Icons:** Lucide React
- **HTTP Client:** Axios (with request & response interceptors)

### Backend
- **Framework:** FastAPI (Python 3.13)
- **Validation:** Pydantic v2
- **ORM:** SQLAlchemy 2.0
- **Database:** MySQL compatible (with SQLite auto-fallback for immediate zero-config local runs)
- **Authentication:** Direct bcrypt password hashing + JWT access tokens (HS256)
- **Architecture:** Layered (Routers -> Schemas -> Models -> Database)

---

## 3. Directory Structure

```
d:\RuralHelp\
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios client + domain mock data
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer, PublicLayout, AdminLayout
│   │   │   └── ui/          # Button, Input, Textarea, Select, Badge, Card, ImageFrame
│   │   ├── pages/
│   │   │   ├── public/      # Home, About, Services, ServiceDetail, Industries,
│   │   │   │                # Products, Portfolio, Blog, BlogDetail, Contact, Privacy, Terms
│   │   │   └── admin/       # LoginPage, DashboardPage, LeadsPage, ServicesManagePage
│   │   ├── store/           # Zustand auth store
│   │   ├── styles/          # Tailwind base & custom tactile utilities
│   │   ├── App.jsx          # Route tree & ProtectedRoute guards
│   │   └── main.jsx         # React root
│   ├── index.html
│   ├── tailwind.config.js   # Stitch design system tokens
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── auth/            # JWT token & direct bcrypt security
│   │   ├── models/          # SQLAlchemy ORM models (User, Role, Service, Lead, etc.)
│   │   ├── routes/          # API endpoints (auth, public, admin_leads)
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── config.py        # Settings & CORS config
│   │   ├── database.py      # SQLAlchemy sessionmaker
│   │   └── main.py          # FastAPI app & initial database seeders
│   └── tests/
│       └── verify.py        # 8-step backend & database verification test suite
│
├── DESIGN.md                # Extracted Google Stitch design tokens
├── DESIGN_HANDOFF.md        # Screen inventory & component mapping
└── README.md                # Full technical documentation & learning guide
```

---

## 4. How to Run Locally

### Frontend Development Server
```bash
cd d:\RuralHelp\frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend API Server
```bash
cd d:\RuralHelp\backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### Run Backend Integration Tests
```bash
cd d:\RuralHelp\backend
python tests/verify.py
```

### Staff Admin Login Credentials
- **Portal URL:** `/admin/login`
- **Email:** `admin@ruralhelp.in`
- **Password:** `admin123`

---

## 5. React Learning Notes (For Vue.js Developers)

As a Computer Science graduate familiar with Vue.js, here are the key conceptual bridges to React:

| Concept | Vue.js | React |
|---------|--------|-------|
| **Reactivity** | `ref(0)` / `reactive({})` with automatic dependency tracking | `useState(0)` with explicit setter function `setCount(prev => prev + 1)` |
| **Lifecycle** | `onMounted(() => {})`, `watch(val, () => {})` | `useEffect(() => {}, [dependencies])` handles mounting, updating, and cleanup |
| **State Store** | Pinia (`defineStore`) | Zustand (`create((set) => ({ ... }))`) — lightweight, no context boilerplate |
| **Templates** | Single File Components `<template>`, `v-if`, `v-for` | JSX — pure JavaScript expressions (`{condition && <Comp />}`, `{items.map()}`) |
| **Props & Events** | `props`, `defineEmits(['change'])` | Plain function props: `<Button onClick={handleClick}>` |
| **Routing** | Vue Router (`<router-view />`, `useRoute()`) | React Router DOM (`<Outlet />`, `useParams()`, `useNavigate()`) |
