-- =============================================
-- UI Anatomy Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(is_published);
CREATE INDEX IF NOT EXISTS idx_case_studies_tags ON case_studies USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public can only read published case studies
CREATE POLICY "Public read published case studies"
  ON case_studies FOR SELECT TO anon
  USING (is_published = true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access to case studies"
  ON case_studies FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Public can subscribe
CREATE POLICY "Public can subscribe"
  ON subscribers FOR INSERT TO anon
  WITH CHECK (true);

-- Admin can view subscribers
CREATE POLICY "Admin read subscribers"
  ON subscribers FOR SELECT TO authenticated
  USING (true);

-- =============================================
-- Seed Data
-- =============================================

INSERT INTO case_studies (title, slug, company, summary, content, tags, cover_image, is_published, published_at)
VALUES 
(
  'How Duolingo Keeps You Coming Back: The Psychology of Streaks',
  'duolingo-streaks-retention',
  'Duolingo',
  'Deep dive into Duolingo''s streak system, exploring how loss aversion, variable rewards, and social proof create one of the most effective retention mechanics in mobile apps.',
  E'# How Duolingo Keeps You Coming Back: The Psychology of Streaks\n\nDuolingo has mastered the art of habit formation. With over 500 million downloads and a Daily Active User base that rivals social media giants, their secret weapon isn''t gamification—it''s **behavioral psychology**.\n\n## The Streak Mechanic\n\nAt its core, a streak is simple: complete one lesson per day to keep it alive. But the psychological machinery behind this mechanic is anything but simple.\n\n### Loss Aversion in Action\n\nDaniel Kahneman''s Nobel Prize-winning research showed that humans feel losses roughly twice as intensely as equivalent gains. Duolingo weaponizes this:\n\n- **Streak freezes** are sold as insurance, not power-ups\n- **"You''re about to lose your streak!"** notifications create urgency\n- The higher your streak, the more painful breaking it feels\n\n### Variable Reward Scheduling\n\nDuolingo doesn''t just give you XP—they give you XP in unpredictable amounts. This variable ratio schedule is the same pattern that makes slot machines addictive.\n\n## Key Takeaways\n\n| Pattern | Implementation | Psychology |\n|---------|---------------|------------|\n| Streaks | Daily check-in requirement | Loss aversion |\n| XP System | Variable rewards | Dopamine hits |\n| Leagues | Weekly competitions | Social proof |\n| Hearts | Limited mistakes allowed | Scarcity |\n\n---\n\n*This analysis is for educational purposes. All trademarks belong to their respective owners.*',
  ARRAY['Retention', 'Gamification', 'Psychology', 'Mobile'],
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Spotify Wrapped: The Annual Viral Marketing Masterclass',
  'spotify-wrapped-viral-ux',
  'Spotify',
  'How Spotify turns user data into shareable content, creating an annual cultural moment that drives organic growth and deepens emotional connection with users.',
  E'# Spotify Wrapped: The Annual Viral Marketing Masterclass\n\nEvery December, social media floods with colorful graphics proclaiming musical tastes. Spotify Wrapped isn''t just a feature—it''s a **cultural phenomenon**.\n\n## Why Wrapped Works\n\n### 1. Identity Expression\n\nMusic is deeply personal. Wrapped transforms listening habits into **social currency**:\n\n- "I''m in the top 0.5% of Taylor Swift listeners"\n- "My music personality is The Adventurer"\n- "I discovered 847 new artists this year"\n\n### 2. FOMO Architecture\n\nWrapped is:\n- **Time-limited**: Only available for a few weeks\n- **Annual**: Creates anticipation throughout the year\n- **Comparative**: Rankings against other listeners\n\n### 3. Perfect Shareability\n\nEvery screen is designed for Instagram Stories with the perfect 9:16 aspect ratio.\n\n## The Flywheel Effect\n\nWrapped creates a virtuous cycle:\n- Users share → Non-users see → New signups → More data → Better Wrapped → More sharing\n\n---\n\n*This analysis is for educational purposes. All trademarks belong to their respective owners.*',
  ARRAY['Viral', 'Marketing', 'Data', 'Identity'],
  'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200&h=800&fit=crop',
  true,
  NOW() - INTERVAL '10 days'
),
(
  'Notion''s Onboarding: From Blank Page to Power User',
  'notion-onboarding-journey',
  'Notion',
  'Analyzing how Notion guides users from an intimidating blank canvas to confident power users through progressive disclosure, templates, and community-driven learning.',
  E'# Notion''s Onboarding: From Blank Page to Power User\n\nNotion faces a unique UX challenge: it''s infinitely flexible. That flexibility is both its greatest strength and biggest onboarding obstacle.\n\n## The Blank Page Problem\n\nA new Notion user sees... nothing. Just a blank page and a blinking cursor. Notion''s solution is elegant: **progressive disclosure**.\n\n### First-Run Experience\n\nRather than overwhelming users with features, Notion asks one question:\n\n> "What do you want to use Notion for?"\n\nOptions include:\n- Personal notes\n- Team wiki\n- Project management\n- Company documentation\n\n## Templates as Training Wheels\n\nBased on the user''s answer, Notion provides **pre-built templates**. These templates serve dual purposes:\n1. **Immediate value** — users can start working right away\n2. **Implicit teaching** — users learn features by using them\n\n## Key Takeaways\n\nFor complex products with steep learning curves:\n\n1. **Ask about intent** before showing features\n2. **Templates > tutorials** for practical learning\n3. **Let users grow into power features** naturally\n4. **Build community** around user-generated content\n\n---\n\n*This analysis is for educational purposes. All trademarks belong to their respective owners.*',
  ARRAY['Onboarding', 'SaaS', 'Templates', 'Freemium'],
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=800&fit=crop',
  true,
  NOW() - INTERVAL '15 days'
),
(
  'How LinkedIn Dark Patterns Boost Engagement (At What Cost?)',
  'linkedin-dark-patterns',
  'LinkedIn',
  'A critical examination of LinkedIn''s growth tactics, from connection request defaults to notification strategies, and the ethical implications of professional network manipulation.',
  E'# How LinkedIn Dark Patterns Boost Engagement (At What Cost?)\n\nLinkedIn is the world''s largest professional network. But beneath its polished surface lies a masterclass in **dark patterns**.\n\n## The Connection Web\n\n### Default Import Abuse\n\nDuring signup, LinkedIn aggressively harvests contacts. The result? Mass connection requests sent without clear consent.\n\n### The "Do You Know..." Infinity\n\nThe "People You May Know" section is engineered for maximum taps:\n\n- Thumbnail photos trigger facial recognition instinct\n- "Connect" button is always one tap away\n- The list **never ends**\n\n## Notification Overload\n\nLinkedIn''s notification strategy prioritizes engagement over value.\n\n| Notification Type | User Value | LinkedIn Value |\n|------------------|------------|----------------|\n| "X viewed your profile" | Curiosity bait | High engagement |\n| "Congrats on 5 years!" | Minimal | Viral content |\n| "X endorsed you" | Often irrelevant | Reciprocity trigger |\n\n## Ethical Analysis\n\n| Dark Pattern | Business Benefit | User Harm |\n|--------------|-----------------|----------|\n| Contact import | Network growth | Privacy violation |\n| Notification spam | DAU metrics | Attention theft |\n| Premium gating | Revenue | Artificial friction |\n\n---\n\n*This analysis is for educational purposes. All trademarks belong to their respective owners.*',
  ARRAY['Ethics', 'Dark Patterns', 'Growth', 'Social'],
  'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=1200&h=800&fit=crop',
  true,
  NOW() - INTERVAL '20 days'
),
(
  'Calm''s Monetization: From Free Meditation to $2B Valuation',
  'calm-monetization-strategy',
  'Calm',
  'How Calm built a wellness empire through strategic content investments, celebrity partnerships, and a subscription model that converts skeptics into loyal subscribers.',
  E'# Calm''s Monetization: From Free Meditation to $2B Valuation\n\nCalm is the most valuable meditation app in the world. But meditation is free—you can do it anywhere, anytime. So how did Calm build a multi-billion dollar business?\n\n## The Content Moat\n\n### Celebrity Sleep Stories\n\nCalm''s breakthrough came from an unlikely source: **bedtime stories for adults**.\n\nNarrators include:\n- Matthew McConaughey\n- Harry Styles\n- LeBron James\n- Idris Elba\n\n### Original Music\n\nCalm commissions original compositions designed for focus, sleep, and anxiety relief. This music can''t be found on Spotify—it''s **exclusive content**.\n\n## The Freemium Ladder\n\n| Stage | User Mindset | Calm''s Move |\n|-------|-------------|------------|\n| Trial | "Is meditation for me?" | Free 7-day basics |\n| Habit forming | "I like this" | Daily Calm creates routine |\n| Dependency | "I need my Sleep Story" | Premium gate |\n| Committed | "Worth the investment" | Annual subscription |\n\n## Key Takeaways\n\nFor subscription-based wellness products:\n\n1. **Content is king** — Invest in exclusive, high-quality material\n2. **Celebrity partnerships** work when authentic\n3. **Daily rituals** create subscription stickiness\n4. **B2B revenue** can be more stable than consumer\n\n---\n\n*This analysis is for educational purposes. All trademarks belong to their respective owners.*',
  ARRAY['Monetization', 'Subscription', 'Wellness', 'Content'],
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&h=800&fit=crop',
  true,
  NOW() - INTERVAL '25 days'
)
ON CONFLICT (slug) DO NOTHING;
