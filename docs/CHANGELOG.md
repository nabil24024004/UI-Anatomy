# Changelog

All notable changes to UI Anatomy are documented here.

## [1.0.0] - 2024-12-28

### Added
- **Project Foundation**
  - Next.js 16 with App Router
  - TailwindCSS 4 with custom design system
  - TypeScript configuration
  - Project structure setup

- **Public Site**
  - Landing page with hero featured case study
  - Case studies listing with grid layout
  - Case study detail pages with markdown rendering
  - Tag filtering and search functionality
  - About page
  - Newsletter subscription page
  - Responsive navbar with mobile menu
  - Footer with newsletter mini-form

- **Admin Panel**
  - Dashboard with stats (total studies, tags, published count)
  - Case studies management (list, create, edit, delete)
  - Markdown editor with preview
  - Publish/unpublish toggle
  - Protected routes with authentication guard

- **Backend**
  - Supabase integration (PostgreSQL)
  - Authentication with email/password
  - Row Level Security (RLS) policies
  - API routes for case studies, tags, and subscriptions

- **Design System**
  - Custom color palette (dark theme)
  - Typography with Manrope/Inter fonts
  - Glass morphism effects
  - Custom animations (fade, float, glow)
  - Prose styles optimized for reading

### Changed
- Migrated from mock data to Supabase backend
- Updated accent color from cyan (#21D4FD) to white (#FFFFFF)
- Removed gradients for flat design aesthetic
- Replaced text logo with flat SVG icon

### Improved
- Typography for case study pages (1.8 line-height, proper spacing)
- Table styling with headers, borders, and hover effects
- List formatting with accent-colored markers
- Blockquote styling with backgrounds
- Overall reading experience

### Removed
- Mock data files (`src/data/case-studies.ts`)
- Gradient utilities (replaced with solid colors)

## Development Notes

### Key Decisions
1. **Supabase over Firebase** — Better PostgreSQL integration, simpler auth
2. **App Router over Pages** — Modern Next.js patterns, better layouts
3. **CSS Variables over Tailwind config** — More flexible theming
4. **Flat design** — Modern, professional aesthetic

### Future Improvements
- [ ] Rich text editor for admin
- [ ] Image upload to Supabase Storage
- [ ] Comment system for case studies
- [ ] User accounts for bookmarking
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Performance monitoring
