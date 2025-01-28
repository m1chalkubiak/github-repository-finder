# GitHub Repository Finder

A modern web application for searching and exploring GitHub repositories. Built with Next.js 15 and TypeScript, featuring server-side rendering, client-side interactivity, and a responsive design.

## Tech Stack

### Core

- **Next.js 15** - React framework with App Router for server-side rendering and routing
- **TypeScript** - For type safety and better developer experience
- **React 19** - UI library with latest features and improvements
- **Tailwind CSS** - For utility-first styling and responsive design

### Testing

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing with user-centric approach
- **Playwright** - End-to-end testing across multiple browsers

### Development Tools

- **ESLint** - Code linting with Next.js and TypeScript configurations
- **Prettier** - Code formatting
- **pnpm** - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 20.x or later
- pnpm 9.x or later

### Running the project

```bash
pnpm dev
```

## Implementation Decisions

### Search Form Implementation

#### URL-based State Management

I chose to manage the search state through URL parameters instead of using state management libraries like Redux or Zustand. This decision was driven by several factors:

- **Shareable URLs** - Users can share exact search results by copying the URL
- **Browser History** - Natural browser navigation (back/forward) works out of the box
- **SEO Benefits** - Search engines can index specific search results
- **Reduced Complexity** - No need for additional state management libraries
- **Server-Side Rendering** - Easy access to search parameters during SSR

#### Deliberate Search Trigger

I implemented a search-on-submit pattern rather than real-time search with debouncing for several reasons:

**Why not onChange + debounce?**
While real-time search can provide better UX for small datasets (e.g., documentation search, product catalogs), it has drawbacks:

- **API Rate Limits** - Reduces unnecessary API calls
- **User Intent** - Users can compose their search query without triggering intermediate results
- **Server Load** - Reduces load on both client and server
- **Clear User Action** - Users explicitly control when to perform the search

**When to consider onChange + debounce:**

- Small, local datasets
- Fast APIs without rate limits
- Instant search features (e.g., documentation search)
- When intermediate results are valuable to users

**Current Implementation Benefits:**

- Clear user interaction model
- Efficient API usage
- Better handling of rate limits
- Reduced server load
- More predictable behavior

This implementation strikes a balance between user experience and system efficiency, particularly important when dealing with rate-limited APIs.
