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

### Project setup

```bash
pnpm i
```

Additionally You can set `env` variable with your personal access token in `.env.local` file

```sh
API_TOKEN=YOUR_GITHUB_TOKEN
```

### Running the project

```bash
pnpm dev
```

### Running tests

```bash
pnpm e2e:headless
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
- Better handling of rate limits
- More predictable behavior

This implementation strikes a balance between user experience and system efficiency, particularly important when dealing with rate-limited APIs.

### Data Display & Pagination Implementation

#### Table Implementation Constraints

I implemented the repository table with API-imposed limitations in mind:

- **Limited Sorting Options** - GitHub's Search API only allows sorting by stars, making it impossible to implement sorting by other columns

#### Pagination Decisions

I implemented basic pagination due to several factors:

1.  **Reasoning Behind Simple Pagination**

- Search Results Nature
- Users typically focus on the most relevant results, which appear first
- GitHub's search algorithm already prioritizes results by relevance
- Most users rarely explore beyond the first few pages

2. **API Limitations**

   - Only the first 1000 search results are available

3. **Considered Alternatives**

   I considered but didn't implement:

   - **Items Per Page** - While useful, most users focus on top 10 results
   - **"Load More" Pattern** - Better UX but requires:
     - List virtualization for performance
     - State management for loaded items
     - High risk of crossing API rate limits
   - **Jump to Page** - Less useful with this specific type of results

The current implementation balances:

- API limitations
- User needs
- Performance considerations
- Implementation complexity

While more advanced pagination patterns exist, the current approach serves the primary use case - quickly finding relevant repositories among top results.

## Production Considerations & Future Improvements

### Current Implementation Choices

I made several deliberate decisions based on the project's scope while remaining aware of production-level requirements:

#### Styling Approach

I chose Tailwind CSS as it is a good balance between custom styling and pre-built components.

#### Internationalization

In a production environment, I would strongly recommend:

- Using established i18n libraries (like `react-i18next` or `next-intl`)
- Implementing locale detection and switching
- Setting up a translation management system
- Implementing number and date formatting based on locale

#### Image Optimization

I intentionally skipped some Next.js optimizations:

- No custom favicon implementation
- No Open Graph images
- Basic `img` tags instead of Next.js `Image` component

#### Error Handling & Monitoring

While the app includes basic error boundaries and API error handling, a production version would benefit from:

- Integration with error tracking services (e.g., Sentry)
- More detailed error logging and categorization
- User feedback collection on errors
- Performance monitoring
- Analytics integration

#### Security Enhancements

Additional security measures for production:

- Input sanitization
- Security headers (using Next.js config)

### Why These Were Not Implemented

These features were omitted because:

1. They would add complexity without significant benefit for this demo
2. They would distract from the core functionality
3. They would increase the initial setup time
4. They would make the codebase less approachable for review
5. They are typically project-specific and depend on business requirements
