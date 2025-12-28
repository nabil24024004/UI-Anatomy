# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account with project created

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add your Supabase credentials
3. Run `npm install`
4. Run `npm run dev`

## Code Conventions

### File Naming
- Components: `PascalCase.tsx` (e.g., `CaseStudyCard.tsx`)
- Pages: `page.tsx` (Next.js convention)
- Utilities: `camelCase.ts` (e.g., `supabase.ts`)
- CSS: `kebab-case.css`

### Component Structure
```tsx
"use client"; // Only if needed

import { useState } from "react";
import { ExternalDep } from "external-lib";
import { InternalDep } from "@/components/InternalDep";

interface ComponentProps {
    prop1: string;
    prop2?: number;
}

export default function Component({ prop1, prop2 = 0 }: ComponentProps) {
    const [state, setState] = useState("");

    return (
        <div className="...">
            {/* JSX */}
        </div>
    );
}
```

### Styling

We use TailwindCSS with custom CSS variables defined in `globals.css`.

**Custom Classes:**
- `.glass` — Glassmorphism effect
- `.gradient-accent` — Accent color background
- `.prose-dark` — Markdown typography
- `.card-hover` — Card hover effects
- `.animate-*` — Custom animations

**Color Variables:**
```css
--background: #0F1113;
--accent-cyan: #FFFFFF;
--accent-orange: #F46D33;
--text-primary: #F5F5F5;
--text-secondary: #B8B8B8;
```

### Context Usage

**AuthContext:**
```tsx
import { useAuth } from "@/context/AuthContext";

function Component() {
    const { user, signIn, signOut, isLoading } = useAuth();
}
```

**CaseStudyContext:**
```tsx
import { useCaseStudies } from "@/context/CaseStudyContext";

function Component() {
    const { 
        caseStudies, 
        addCaseStudy, 
        updateCaseStudy, 
        deleteCaseStudy,
        togglePublished,
        isLoading 
    } = useCaseStudies();
}
```

## Adding New Features

### New Page
1. Create folder in `src/app/(public)/` or `src/app/admin/`
2. Add `page.tsx`
3. Use existing components and context

### New Component
1. Create file in `src/components/`
2. Export as default
3. Add TypeScript interface for props

### New API Route
1. Create folder in `src/app/api/`
2. Add `route.ts`
3. Export async functions: `GET`, `POST`, `PUT`, `DELETE`

## Testing

### Manual Testing Checklist
- [ ] Homepage loads with featured case study
- [ ] Case studies list shows all published items
- [ ] Search filters results correctly
- [ ] Tag filtering works
- [ ] Case study detail page renders markdown
- [ ] Admin login works
- [ ] Admin dashboard shows stats
- [ ] Create/edit/delete case studies works
- [ ] Publish/unpublish toggle works

### Build Verification
```bash
npm run build
npm run lint
npx tsc --noEmit
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
docker build -t ui-anatomy .
docker run -p 3000:3000 ui-anatomy
```

## Troubleshooting

### Common Issues

**"Failed to fetch case studies"**
- Check Supabase credentials in `.env.local`
- Verify RLS policies are set up
- Check browser console for errors

**Admin dashboard blank**
- Ensure user is authenticated
- Check if `CaseStudyContext` is fetching data
- Verify Supabase permissions

**Styles not applying**
- Run `npm run dev` to regenerate CSS
- Check if class names are correct
- Clear browser cache
