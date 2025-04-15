# Flow Blog

A modern, high-performance blog platform built with Next.js and Supabase.

![Flow Blog Logo](/public/logo.svg)

## Features

- 🚀 **Blazing Fast Performance** - Parallel API fetching, optimized components and skeleton loaders
- 📝 **Rich Content Editing** - TipTap-powered editor with custom extensions
- 👤 **User Authentication** - Secure login, registration and profile management
- 📱 **Responsive Design** - Mobile-first approach for all screen sizes
- 🔍 **Content Discovery** - Category filtering, trending topics, and editor's picks
- 💬 **Interactive Comments** - Real-time comment system for engaging discussions
- 🔖 **Bookmarks** - Save favorite articles for later reading
- ⚙️ **Admin Dashboard** - Complete CMS for content and user management

## Tech Stack

- **Frontend**: Next.js 15 (App Router) with React 19
- **Database & Auth**: Supabase
- **Styling**: TailwindCSS with custom animations
- **Forms**: React Hook Form with Zod validation
- **Content**: TipTap rich text editor
- **UI Components**: Radix UI primitives with custom styling
- **Performance**: Turbopack for fast development builds

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/flow-blog.git
cd flow-blog
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables
```
# Create a .env.local file with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
flow-blog/
├── actions/           # Server actions for data mutations
├── app/               # Next.js App Router structure
│   ├── (auth)/        # Authentication routes
│   ├── (cms)/         # Admin dashboard & CMS
│   ├── (root)/        # Main public-facing pages
│   └── api/           # API routes
├── components/        # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature-specific components
├── lib/               # Utility functions and API helpers
└── utils/             # Supabase client setup
```

## Deployment

Deploy on Vercel for the best performance and integration with Next.js:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/flow-blog)

## License

This project is licensed under the MIT License - see the LICENSE file for details.