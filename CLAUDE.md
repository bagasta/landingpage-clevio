# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with nodemon and tsx (runs on port 3123)
- `npm run build` - Build the application for production
- `npm start` - Start production server (runs on port 3123)
- `npm run lint` - Run ESLint (configured to be permissive)

### Database Operations
- `npm run db:push` - Push database schema changes to SQLite
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database and re-run migrations

## Architecture Overview

This is a **Next.js 15 landing page application** with custom server configuration and real-time capabilities.

### Key Architectural Components

1. **Custom Server Setup**: Uses a standalone Next.js server (`server.ts`) that integrates Socket.IO for real-time features
2. **Database**: SQLite with Prisma ORM for type-safe database operations
3. **Real-time Communication**: WebSocket support via Socket.IO for interactive features
4. **Modern UI**: Built with shadcn/ui components, Tailwind CSS 4, and Framer Motion animations

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes (health check, etc.)
│   ├── page.tsx        # Main landing page
│   └── layout.tsx      # Root layout
├── components/         # Reusable React components
│   └── ui/            # shadcn/ui components
├── lib/               # Core utilities
│   ├── db.ts          # Prisma client configuration
│   ├── socket.ts      # Socket.IO setup and handlers
│   └── utils.ts       # General utilities
└── hooks/             # Custom React hooks
```

### Server Configuration

The application runs on a **custom server** (`server.ts`) that:
- Combines Next.js with Socket.IO on the same port (3123)
- Uses nodemon for development with file watching
- Handles WebSocket connections at `/api/socketio`
- Runs on `0.0.0.0` for network accessibility

### Database Schema

Simple SQLite database with two models:
- **User**: Basic user information (email, name)
- **Post**: Content model with author relationship

### Development Notes

1. **TypeScript Configuration**: Relaxed settings with `noImplicitAny: false` for rapid development
2. **ESLint**: Permissive configuration with most rules disabled for faster development
3. **Build Optimizations**: TypeScript and ESLint errors ignored during builds for development speed
4. **Hot Reloading**: Disabled webpack HMR in favor of nodemon-based server restarts

### UI Framework Stack

- **Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS 4 with animations
- **Forms**: React Hook Form + Zod validation
- **State**: Zustand for global state
- **Data Fetching**: TanStack Query + Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Tables**: TanStack Table for advanced data grids

### Real-time Features

Socket.IO is configured with:
- Echo server functionality (messages are echoed back)
- Welcome messages on connection
- Connection/disconnection logging
- CORS enabled for all origins

The application is optimized for AI-assisted development with a comprehensive component library and permissive linting rules for rapid prototyping.