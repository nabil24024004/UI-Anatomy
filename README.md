# UI Anatomy

A premium UX research showcase website analyzing real-world product interfaces. Deep-dive case studies on onboarding, retention, monetization, and ethical design patterns.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

### Public Site
- **Landing Page** — Hero section with featured case study
- **Case Studies** — Filterable grid with search and tag filtering
- **Detail Pages** — Markdown-rendered case study content with optimized typography
- **Newsletter** — Email subscription functionality

### Admin Panel
- **Dashboard** — Stats overview (total studies, tags, published count)
- **Case Study Management** — Create, edit, delete, publish/unpublish
- **Authentication** — Supabase-powered admin login

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router) |
| Styling | TailwindCSS 4 + Custom CSS Variables |
| Backend | Supabase (PostgreSQL + Auth) |
| Language | TypeScript 5 |
| Markdown | ReactMarkdown + remark-gfm |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ui-anatomy.git
cd ui-anatomy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

1. Go to your Supabase project dashboard
2. Open the SQL Editor
3. Run the SQL from `supabase/schema.sql`
4. Create an admin user in Authentication → Users

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages (home, case-studies, about, subscribe)
│   ├── admin/             # Admin panel (dashboard, case study management)
│   ├── api/               # API routes
│   └── login/             # Authentication
├── components/            # Reusable UI components
│   ├── admin/             # Admin-specific components
│   ├── CaseStudyCard.tsx
│   ├── CaseStudyGrid.tsx
│   ├── Footer.tsx
│   ├── HeroFeaturedCase.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   ├── NewsletterCTA.tsx
│   ├── SearchBar.tsx
│   └── TagFilter.tsx
├── context/               # React Context providers
│   ├── AuthContext.tsx    # Supabase authentication
│   └── CaseStudyContext.tsx # Case study data management
├── lib/                   # Utilities
│   └── supabase.ts        # Supabase client
└── globals.css            # Design system & typography
```

## Design System

### Colors
- **Background**: `#0F1113` (deep dark)
- **Accent**: `#FFFFFF` (white)
- **Secondary Accent**: `#F46D33` (orange)
- **Text Primary**: `#F5F5F5`
- **Text Secondary**: `#B8B8B8`

### Typography
- **Headings**: Manrope (700 weight)
- **Body**: Inter (400-600 weight)
- **Prose**: Optimized for reading (1.8 line-height, 70ch max-width)

## Admin Access

1. Navigate to `/login`
2. Sign in with admin credentials created in Supabase
3. Access dashboard at `/admin`

## Documentation

See the `docs/` folder for:
- `ARCHITECTURE.md` — System design and data flow
- `DEVELOPMENT.md` — Development guide and conventions
- `CHANGELOG.md` — Version history

## License

MIT © 2024 UI Anatomy
