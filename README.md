# Module 28: Building Blog App Frontend with Next.js (Part-2)

> **Goal:** Learn advanced Next.js concepts including Route Groups, Data Fetching, SSR, CSR, SSG, ISR, Caching, Server Actions, Project Architecture, Shadcn/UI integration, Folder Structure, and Environment Variables while setting up a production-ready Blog Application.

---

# Table of Contents

- Introduction
- Route Grouping in Next.js
- Data Fetching in Next.js
- SSR vs CSR
- Fetch API & Caching
- Cache Component
- Revalidation
- SSG, ISR & Dynamic SSR
- Mutation
- Server Functions & Server Actions
- Project Route Structure
- Integrating Shadcn/UI
- Project Folder Structure
- Environment Variables
- Important Commands
- Best Practices
- Module Summary

---

# Introduction

In Module 27, we learned the fundamentals of Next.js, including layouts, pages, navigation, and Server vs Client Components.

In this module, we move beyond the basics and explore how real-world Next.js applications manage data, caching, rendering strategies, project organization, UI libraries, and environment variables.

By the end of this module, you'll understand how to build scalable, maintainable, and production-ready Next.js applications.

---

# Route Grouping in Next.js

## What is Route Grouping?

A **Route Group** allows you to organize routes into folders **without affecting the URL**.

Folders wrapped with parentheses `()` are ignored in the generated route.

Example:

```
app/
│
├── (public)/
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── (dashboard)/
│   ├── profile/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
```

Generated URLs:

```
/about
/contact
/profile
/settings
```

Notice that `(public)` and `(dashboard)` do **not** appear in the URL.

---

## Why Use Route Groups?

Route Groups are useful when:

- Organizing large applications
- Applying different layouts
- Separating authentication routes
- Grouping dashboard pages
- Keeping project structure clean

Example:

```
app/

(auth)/

(blog)/

(admin)/

(marketing)/
```

Each group can have its own layout.

---

## Example

```
app/

(auth)/

layout.tsx

login/page.tsx

register/page.tsx

(blog)/

layout.tsx

posts/page.tsx
```

---

# Data Fetching in Next.js

One of the biggest advantages of Next.js is that data can be fetched directly inside Server Components.

Example:

```tsx
async function getPosts() {
    const res = await fetch("https://example.com/posts");
    return res.json();
}

export default async function Home() {
    const posts = await getPosts();

    return (
        <div>
            {posts.map(post => (
                <h2 key={post.id}>{post.title}</h2>
            ))}
        </div>
    );
}
```

Unlike React, you don't always need:

- useEffect()
- useState()

---

# Server Side Rendering (SSR)

SSR means:

The page is generated on every request.

Flow:

```
Browser

↓

Request

↓

Next.js Server

↓

Database/API

↓

HTML

↓

Browser
```

Advantages

- Fresh data
- Better SEO
- Faster first paint

Disadvantages

- More server load
- Slower than static pages

---

# Client Side Rendering (CSR)

CSR renders everything inside the browser.

Example

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then(res => res.json())
            .then(setPosts);
    }, []);

    return <div>{posts.length}</div>;
}
```

Advantages

- Interactive
- Great for dashboards

Disadvantages

- Worse SEO
- Initial loading delay

---

# SSR vs CSR

| Feature | SSR | CSR |
|----------|-----|-----|
| SEO | Excellent | Poor |
| First Load | Fast | Slower |
| Server Load | Higher | Lower |
| Browser JS | Less | More |
| Fresh Data | Always | After API Call |

---

# Fetch API in Next.js

Next.js extends the native Fetch API.

Example:

```tsx
const res = await fetch(API_URL);
```

Unlike React, fetch includes powerful caching options.

---

## Default Behavior

Server Components cache fetch requests automatically.

```tsx
await fetch(API_URL);
```

This improves performance.

---

## Disable Cache

```tsx
await fetch(API_URL, {
    cache: "no-store"
});
```

Every request fetches fresh data.

---

## Force Cache

```tsx
await fetch(API_URL, {
    cache: "force-cache"
});
```

Always use cached data.

---

# Cache Component

Caching improves performance by storing fetched data.

Benefits:

- Faster response
- Less API usage
- Better scalability
- Lower server cost

Caching strategies:

```
force-cache

↓

default

↓

revalidate

↓

no-store
```

---

# Revalidation

Sometimes cached data becomes outdated.

Revalidation tells Next.js when to refresh cached data.

Example:

```tsx
await fetch(API_URL, {
    next: {
        revalidate: 60
    }
});
```

Meaning:

Refresh data every **60 seconds**.

---

# Static Site Generation (SSG)

SSG generates pages during build time.

```
Build

↓

Generate HTML

↓

Deploy

↓

Serve Static HTML
```

Perfect for

- Blogs
- Documentation
- Portfolio

Advantages

- Extremely fast
- SEO friendly
- CDN optimized

Disadvantages

- Data isn't updated until rebuild

---

# Incremental Static Regeneration (ISR)

ISR combines SSG with automatic updates.

Flow

```
Build

↓

Static Page

↓

User Request

↓

60 Seconds

↓

Background Regeneration

↓

Updated Page
```

Example

```tsx
await fetch(API_URL, {
    next: {
        revalidate: 300
    }
});
```

---

# Dynamic SSR

Sometimes data must always be fresh.

Example

- User profile
- Notifications
- Dashboard
- Orders

Disable cache

```tsx
await fetch(API_URL, {
    cache: "no-store"
});
```

Now every request renders on the server.

---

# Comparison

| Rendering | Generated | Updates |
|------------|-----------|----------|
| CSR | Browser | Every fetch |
| SSR | Every Request | Immediate |
| SSG | Build Time | Rebuild |
| ISR | Build + Revalidate | Automatic |

---

# Mutation

## What is Mutation?

Mutation means **changing data**.

Examples

- Create Post
- Update Post
- Delete Post
- Like Post
- Comment
- Login
- Register

Reading data is called

```
Query
```

Changing data is called

```
Mutation
```

---

# Server Functions

Server Functions execute only on the server.

Benefits

- Secure
- Access database
- Hide secrets

---

# Server Actions

Server Actions allow forms and client components to call server-side functions without creating a separate API route.

Example

```tsx
"use server";

export async function createPost(formData: FormData) {
    // Save data to database
}
```

Client Component

```tsx
<form action={createPost}>
    ...
</form>
```

Advantages

- Less boilerplate
- No API route needed
- Better type safety
- Cleaner code

---

# Project Route Structure

A scalable project might look like this:

```
app/

(blog)/

posts/

[id]/

page.tsx

(auth)/

login/

register/

(dashboard)/

profile/

settings/

api/

layout.tsx

page.tsx
```

Benefits

- Easy maintenance
- Feature separation
- Independent layouts
- Cleaner navigation

---

# Integrating Shadcn/UI

## What is Shadcn/UI?

Shadcn/UI is a collection of reusable components built with:

- Radix UI
- Tailwind CSS

Unlike traditional UI libraries, components are copied into your project, giving you full control.

---

## Installation

Initialize Shadcn/UI:

```bash
npx shadcn@latest init
```

Add a component:

```bash
npx shadcn@latest add button
```

Example usage:

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
    return <Button>Click Me</Button>;
}
```

Benefits:

- Accessible
- Customizable
- Type-safe
- Tailwind-based

---

# Project Folder Structure

Example:

```
src/

app/

components/

ui/

shared/

modules/

services/

lib/

hooks/

types/

utils/

constants/

providers/

public/
```

### Folder Purpose

| Folder | Purpose |
|----------|----------|
| app | App Router pages |
| components | Reusable components |
| ui | Shadcn components |
| modules | Feature-based modules |
| hooks | Custom hooks |
| services | API calls |
| lib | Utility libraries |
| utils | Helper functions |
| providers | React providers |
| constants | Global constants |
| types | TypeScript types |

---

# Environment Variables

Sensitive information should **never** be hardcoded.

Store secrets in a `.env.local` file.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

API_SECRET=123456
```

---

## Public Variables

Variables starting with:

```
NEXT_PUBLIC_
```

can be accessed in both the client and server.

Example:

```tsx
process.env.NEXT_PUBLIC_API_URL
```

---

## Private Variables

Variables without the prefix:

```env
DATABASE_URL=...
JWT_SECRET=...
```

are only available on the server.

Attempting to access them in Client Components will fail.

---

## Best Practices

- Never commit `.env.local` to GitHub.
- Keep secrets on the server.
- Use descriptive variable names.
- Use `NEXT_PUBLIC_` only for values safe to expose.

---

# Important Commands

Create a Next.js project:

```bash
npx create-next-app@latest
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

Initialize Shadcn/UI:

```bash
npx shadcn@latest init
```

Add a component:

```bash
npx shadcn@latest add button
```

---

# Best Practices

- Organize routes using Route Groups.
- Prefer Server Components for data fetching.
- Use Client Components only for interactivity.
- Choose the appropriate rendering strategy:
  - **SSG** for static content.
  - **ISR** for occasionally updated content.
  - **SSR** for request-specific data.
  - **CSR** for highly interactive dashboards.
- Cache data whenever possible.
- Revalidate cached data instead of disabling caching unnecessarily.
- Use Server Actions for mutations when appropriate.
- Structure projects by features for scalability.
- Keep reusable UI inside `components/` or `ui/`.
- Store secrets in environment variables and never expose them to the client.

---

# Module Summary

In this module, we explored several advanced concepts of Next.js that are essential for building production-ready applications. We learned how Route Groups help organize routes without affecting URLs, how Server Components simplify data fetching, and how different rendering strategies (SSR, CSR, SSG, and ISR) impact performance and SEO.

We also studied Next.js caching mechanisms, fetch options, and revalidation techniques to improve application performance while ensuring fresh data when needed. Additionally, we learned the concept of mutations and how Server Functions and Server Actions enable secure server-side operations without creating traditional API routes.

Finally, we set up a scalable project architecture, integrated Shadcn/UI for reusable and accessible components, organized the project's folder structure, and configured environment variables securely.

By completing this module, you should now be able to:

- Organize routes using Route Groups.
- Fetch data efficiently in Server Components.
- Understand and choose between SSR, CSR, SSG, and ISR.
- Implement caching and revalidation strategies.
- Use Server Actions for handling data mutations.
- Build a scalable Next.js project structure.
- Integrate and use Shadcn/UI components.
- Manage environment variables securely.
- Apply Next.js best practices for real-world applications.

This module lays the groundwork for developing modern, high-performance, and maintainable full-stack applications with Next.js.