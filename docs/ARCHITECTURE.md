# Architecture

## System Overview

UI Anatomy follows a modern JAMstack architecture with Next.js App Router and Supabase as the backend.

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Public Site │  │ Admin Panel │  │ Shared Components   │  │
│  │  (public)   │  │   /admin    │  │ Navbar, Footer, etc │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                     │             │
│         └────────────────┴─────────────────────┘             │
│                          │                                   │
│                    React Context                             │
│         ┌────────────────┴────────────────┐                 │
│         │                                 │                 │
│   AuthContext                    CaseStudyContext           │
│   (Supabase Auth)                (CRUD Operations)          │
│         │                                 │                 │
└─────────┴─────────────────────────────────┴─────────────────┘
                          │
                   Supabase Client
                          │
┌─────────────────────────┴─────────────────────────────────┐
│                       Supabase                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │
│  │  PostgreSQL │  │    Auth     │  │  Row Level      │    │
│  │  Database   │  │   Service   │  │  Security (RLS) │    │
│  └─────────────┘  └─────────────┘  └─────────────────┘    │
└────────────────────────────────────────────────────────────┘
```

## Data Flow

### Public Pages
1. Server component fetches data directly from Supabase
2. Data is rendered on the server (SSR/ISR with 60s revalidation)
3. Hydrated on client for interactivity

### Admin Panel
1. `AuthGuard` checks user authentication
2. `CaseStudyContext` provides CRUD operations
3. All mutations go through Supabase with RLS policies

## Database Schema

### case_studies
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Case study title |
| slug | text | URL-friendly identifier |
| company | text | Company name |
| summary | text | Short description |
| content | text | Markdown content |
| tags | text[] | Array of tags |
| cover_image | text | Image URL |
| is_published | boolean | Visibility flag |
| published_at | timestamp | Publication date |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last update |

### subscribers
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | Subscriber email |
| created_at | timestamp | Subscription date |

## Security

### Row Level Security (RLS)
- **Public Read**: Anyone can read published case studies
- **Authenticated Write**: Only logged-in users can modify data

### Authentication
- Email/password authentication via Supabase Auth
- Session managed via cookies
- Protected routes redirect to `/login`

## Route Groups

```
app/
├── (public)/          # Public-facing pages
│   ├── page.tsx       # Homepage (/)
│   ├── case-studies/  # Listing & detail pages
│   ├── tags/          # Tag filtering
│   ├── about/         # About page
│   └── subscribe/     # Newsletter signup
├── admin/             # Admin panel (protected)
│   ├── layout.tsx     # Sidebar + AuthGuard
│   ├── page.tsx       # Dashboard
│   └── case-studies/  # CRUD pages
├── login/             # Authentication
└── api/               # API routes (optional)
```
