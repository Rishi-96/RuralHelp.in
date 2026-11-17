# DESIGN_HANDOFF.md — RuralHelp Digital Transformation Platform

> Design Handoff Document  
> Source: Google Stitch Project `15631348039358130972`  
> Date: 2026-11-16  
> Status: **Awaiting Homepage Direction Selection**

---

## 1. Available Screens

The Stitch project contains **4 homepage design directions** — all desktop-only at 2560px width.

| # | Screen ID | Title | Dimensions | Description |
|---|-----------|-------|------------|-------------|
| 1 | `c1b71d79` | Homepage - Direction 1: The Modern Editorial Gazette | 2560 × 13524 | Editorial newspaper-style layout with structured columns, ledger-like sections, and strong typographic hierarchy. Feels like a premium business publication. |
| 2 | `c08053b9` | Homepage - Direction 2: The Pragmatic Tech Engine | 2560 × 12328 | Clean, structured, tech-forward layout. Bento-grid style organization with clear service categories and metrics. Most compact of the four. |
| 3 | `ec9e3835` | Homepage - Direction 3: The Bharat Growth Story | 2560 × 14484 | Culturally rooted narrative-driven layout. Emphasizes the India growth story, regional identity, and community impact. |
| 4 | `66127c9f` | Homepage - Hybrid (Photo Hero + Pragmatic Bento) | 2560 × 14988 | Combines a large photographic hero section with pragmatic bento-grid content blocks. Tallest layout with rich visual storytelling. |

### ⚠️ Decision Required
**You must choose ONE homepage direction** before development begins. All four share the same design system but differ in layout approach and content emphasis.

---

## 2. Design Tokens Summary

Extracted from [DESIGN.md](file:///d:/RuralHelp/DESIGN.md). These will be translated into Tailwind CSS configuration.

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1B4D3E` (Deep Evergreen) | Navigation, branding, headings, primary CTAs |
| Primary Dark | `#0E382B` (Forest Night) | Hover states, micro-offset shadows |
| Primary Container | `#1b4d3e` | Container backgrounds |
| Secondary | `#84CC16` (Vital Lime) | Positive states, conversion signals, action accents |
| Secondary Bright | `#A3E635` (Sprout Accent) | Hover/active secondary states |
| Tertiary | `#D97706` (Warm Ochre) | Pending states, warnings, merchant seals |
| Neutral | `#1E293B` (Slate) | Body text, borders, structural framing |
| Neutral Dark | `#0F172A` (Deep Ink) | Heavy text emphasis |
| Canvas | `#FAF8F5` (Heritage Warm Ivory) | Page background |
| Card Surface | `#FFFFFF` | Card backgrounds |
| Subtle Surface | `#F4EFEA` (Pressed Paper Tint) | Inset rows, tinted headers |
| Border Hairline | `rgba(30, 41, 59, 0.12)` | Card borders, dividers |
| Error | `#BA1A1A` | Error states |

### Typography
| Token | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| headline-display | Newsreader | 52px / 36px mobile | 600 | Hero headlines |
| headline-lg | Newsreader | 38px / 28px mobile | 500 | Section titles |
| headline-md | Newsreader | 28px | 500 | Sub-section titles |
| headline-sm | Newsreader | 22px | 600 | Card titles |
| title-lg | Plus Jakarta Sans | 20px | 700 | Component titles |
| title-md | Plus Jakarta Sans | 16px | 600 | Subsection labels |
| title-sm | Plus Jakarta Sans | 14px | 600 | Small labels |
| body-lg | Plus Jakarta Sans | 18px | 400 | Lead paragraphs |
| body-md | Plus Jakarta Sans | 15px | 400 | Body text |
| body-sm | Plus Jakarta Sans | 13px | 400 | Supporting text |
| label-lg | Plus Jakarta Sans | 13px | 600 | Button labels, form labels |
| label-md | Plus Jakarta Sans | 11px | 700 | Badges, chips |
| label-sm | Plus Jakarta Sans | 10px | 700 | Micro-labels |

### Spacing
| Token | Value |
|-------|-------|
| space-xs | 0.25rem (4px) |
| space-sm | 0.5rem (8px) |
| space-md | 1rem (16px) |
| space-lg | 1.5rem (24px) |
| space-xl | 2.5rem (40px) |
| gutter | 1.5rem / 1rem mobile |
| margin-desktop | 3rem |
| margin-tablet | 2rem |
| margin-mobile | 1rem |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| sm | 2px | Base components |
| DEFAULT | 4px | Inputs, buttons, badges |
| md | 6px | Small cards |
| lg | 8px | Cards, containers |
| xl | 12px | Modals, drawers |
| full | 9999px | Avatars, icons ONLY — **never for buttons** |

---

## 3. Component Inventory

Based on the design system specifications in DESIGN.md:

### Core UI Components
| Component | Variants | Notes |
|-----------|----------|-------|
| **Button** | Primary, Secondary/Action, Outline/Ghost | No pill shapes. Micro-offset shadow on primary. |
| **Input Field** | Text, Email, Phone, Textarea, Select | 44px height. Labels above field. 2px focus border. |
| **Chip/Badge** | Active/Success, Pending, Archived/Neutral | Flat with 1px border. `label-md` uppercase. |
| **Card** | Standard, Ledger Block | White bg, hairline border. Internal sections use rules, not sub-cards. |
| **Checkbox** | Unchecked, Checked | Square geometry, 2px radius. |
| **Radio** | Unselected, Selected | Circular. 1.5px border. |
| **Image Frame** | Standard | 1px border + 2px white matting inset. |

### Layout Components (to build)
| Component | Description |
|-----------|-------------|
| **Navbar** | Top navigation with logo, links, CTA button |
| **Footer** | Company info, navigation links, social links, legal |
| **Hero Section** | Large banner area (varies by homepage direction) |
| **Service Card** | Service offering display card |
| **Testimonial Card** | Client testimonial with photo and quote |
| **Stats Counter** | Animated statistics display |
| **Blog Card** | Blog post preview card |
| **Contact Form** | Multi-field enquiry form |
| **Section Header** | Reusable section title + subtitle |
| **CTA Banner** | Call-to-action promotional section |
| **Sidebar** | Admin dashboard navigation |
| **Data Table** | Admin CRUD table with sorting/filtering |
| **Modal/Dialog** | Confirmation dialogs, forms |
| **Toast/Alert** | Success/error/info notifications |
| **Breadcrumb** | Navigation breadcrumb trail |
| **Pagination** | Page navigation for lists |
| **Search Bar** | Search input with icon |
| **Dropdown Menu** | Navigation dropdowns |
| **Loading Skeleton** | Content loading placeholder |
| **Empty State** | No-data placeholder with illustration |

---

## 4. Page-to-Component Mapping

### Public Website Pages

| Page | Key Components | Route |
|------|---------------|-------|
| **Home** | Navbar, Hero, Stats Counter, Service Cards, Testimonial Cards, CTA Banner, Blog Cards, Footer | `/` |
| **About** | Navbar, Hero (small), Team Cards, Stats Counter, Timeline/History, CTA Banner, Footer | `/about` |
| **Services** | Navbar, Section Header, Service Category Cards, Service Cards, CTA Banner, Footer | `/services` |
| **Service Details** | Navbar, Breadcrumb, Service Hero, Feature List, Process Steps, Pricing (optional), CTA Banner, Footer | `/services/:slug` |
| **Industries** | Navbar, Section Header, Industry Cards, Case Highlights, Footer | `/industries` |
| **Products & Solutions** | Navbar, Section Header, Product Cards, Comparison Table, Footer | `/products` |
| **Portfolio** | Navbar, Section Header, Filter Chips, Project Cards (grid), Footer | `/portfolio` |
| **Blog** | Navbar, Section Header, Featured Blog Card, Blog Cards (grid), Pagination, Footer | `/blog` |
| **Blog Details** | Navbar, Breadcrumb, Blog Header, Article Body, Author Card, Related Posts, Footer | `/blog/:slug` |
| **Contact** | Navbar, Contact Form, Map/Location, Contact Info Cards, Footer | `/contact` |
| **Privacy Policy** | Navbar, Legal Content (prose), Footer | `/privacy` |
| **Terms & Conditions** | Navbar, Legal Content (prose), Footer | `/terms` |

### Admin Dashboard Pages

| Page | Key Components | Route |
|------|---------------|-------|
| **Login** | Login Form, Logo | `/admin/login` |
| **Dashboard** | Sidebar, Stats Cards, Charts, Recent Leads Table, Activity Feed | `/admin` |
| **Leads** | Sidebar, Data Table, Search Bar, Filter Chips, Status Badges, Pagination | `/admin/leads` |
| **Lead Details** | Sidebar, Lead Info Card, Notes List, Activity Timeline, Status Dropdown | `/admin/leads/:id` |
| **Services Mgmt** | Sidebar, Data Table, CRUD Modal | `/admin/services` |
| **Categories Mgmt** | Sidebar, Data Table, CRUD Modal | `/admin/categories` |
| **Portfolio Mgmt** | Sidebar, Data Table, Image Upload, CRUD Modal | `/admin/portfolio` |
| **Testimonials Mgmt** | Sidebar, Data Table, CRUD Modal | `/admin/testimonials` |
| **Blog Mgmt** | Sidebar, Data Table, Rich Text Editor, CRUD Modal | `/admin/blog` |
| **Users Mgmt** | Sidebar, Data Table, Role Badges, CRUD Modal | `/admin/users` |

---

## 5. Missing Design Elements

### Critical Missing Screens
The Stitch project provides **homepage variants only**. The following need to be designed/derived:

| Priority | Missing Screen | Mitigation Strategy |
|----------|---------------|---------------------|
| 🔴 High | About page | Derive from homepage sections + design system |
| 🔴 High | Services listing page | Extract service card patterns from homepage |
| 🔴 High | Service detail page | Design using DESIGN.md component specs |
| 🔴 High | Contact page (with lead form) | Design form using input field specs from DESIGN.md |
| 🔴 High | Admin Login | Design using input/button specs |
| 🔴 High | Admin Dashboard | Design using card/table specs + design system |
| 🟡 Medium | Blog listing + detail | Derive from card patterns and typography |
| 🟡 Medium | Portfolio page | Grid layout using card components |
| 🟡 Medium | Industries page | Derive from service card patterns |
| 🟡 Medium | Products & Solutions | Card-based layout using design system |
| 🟢 Low | Privacy Policy / Terms | Simple prose layout, minimal design needed |

### Missing Responsive Designs
| Breakpoint | Status | Strategy |
|------------|--------|----------|
| Desktop (1024px+) | ✅ Available (2560px) | Scale down from 2560 to standard 1280-1440 |
| Tablet (768-1023px) | ❌ Missing | Derive using 8-col grid from DESIGN.md specs |
| Mobile (<768px) | ❌ Missing | Derive using 4-col grid from DESIGN.md specs |

### Missing Assets
- Company logo (text/SVG needed)
- Team member photos (placeholder strategy needed)
- Portfolio project screenshots
- Blog post featured images
- Industry/service icons (will use Lucide React)
- Social media icons

---

## 6. Implementation Plan

### Phase 1: Foundation (Week 1)
- [ ] Select homepage direction
- [ ] Initialize React + Vite project
- [ ] Configure Tailwind CSS with design tokens
- [ ] Import Google Fonts (Newsreader, Plus Jakarta Sans)
- [ ] Build design system component library
- [ ] Create layout components (Navbar, Footer)

### Phase 2: Public Website (Week 2-3)
- [ ] Implement homepage (chosen direction)
- [ ] Build About, Services, Service Details pages
- [ ] Build Contact page with enquiry form
- [ ] Build Blog, Blog Details, Portfolio pages
- [ ] Build Industries, Products pages
- [ ] Build Privacy Policy, Terms pages
- [ ] Implement responsive layouts

### Phase 3: Backend + Database (Week 3-4)
- [ ] Set up FastAPI project structure
- [ ] Design and create MySQL database schema
- [ ] Run Alembic migrations
- [ ] Build REST API endpoints
- [ ] Implement authentication system

### Phase 4: Admin Dashboard (Week 4-5)
- [ ] Build admin login page
- [ ] Build dashboard layout with sidebar
- [ ] Implement lead management CRUD
- [ ] Implement content management (services, blog, portfolio)
- [ ] Implement user management

### Phase 5: Integration & Testing (Week 5-6)
- [ ] Connect frontend to backend APIs
- [ ] Implement loading/error/empty states
- [ ] Write automated tests
- [ ] Performance optimization
- [ ] Security hardening

### Phase 6: Deployment (Week 6)
- [ ] Production builds
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Set up database hosting
- [ ] DNS and SSL configuration
