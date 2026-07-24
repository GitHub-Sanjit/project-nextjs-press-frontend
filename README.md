# Module 27: Building Blog App Frontend with Next.js (Part-1)

> **Goal:** Learn the fundamentals of Next.js, understand why it was created, explore the App Router architecture, and build the foundation of a modern Blog Application.

---

# Table of Contents

- Introduction
- What is Next.js?
- Why Traditional Web Development Was a Problem
- How React Solved Those Problems
- Limitations of React
- How Next.js Solves React's Problems
- Key Features of Next.js
- Next.js Learning Roadmap
- Project Setup
- Project Structure
- Layouts and Pages
- Linking & Navigation
- Server Components vs Client Components
- App Router vs Pages Router
- Module Summary
- Important Commands
- Best Practices

---

# Introduction

Next.js is a React Framework created by Vercel that helps developers build modern web applications.

It extends React by providing features like

- File-based Routing
- Server Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes
- Image Optimization
- SEO Optimization
- Streaming
- Server Components

Unlike React, Next.js already includes many production-ready features.

Official Website:

https://nextjs.org

---

# What is Next.js?

Next.js is a full-stack React Framework.

It allows developers to build

- Frontend
- Backend APIs
- Static Websites
- Dynamic Websites
- E-commerce
- Blogs
- Dashboards
- Enterprise Applications

using one framework.

---

# Why Traditional Web Development Was a Problem

Before React, websites were mostly built using

- HTML
- CSS
- JavaScript
- jQuery

Example:

```
Home
About
Contact
```

Changing a single UI element required manually manipulating the DOM.

Problems included

- Repetitive code
- Slow DOM manipulation
- Poor maintainability
- Difficult state management
- Hard to scale
- No reusable components

---

# How React Solved Traditional Web Development

React introduced

## Component-Based Architecture

Instead of repeating HTML,

```
Navbar
Footer
Card
Button
```

became reusable components.

Example

```
<Home />
<Navbar />
<Card />
```

---

## Virtual DOM

React compares

Old UI

↓

New UI

↓

Updates only changed elements

instead of refreshing the whole page.

Benefits

- Faster
- Efficient
- Better performance

---

## One-Way Data Flow

React keeps application predictable.

```
Parent

↓

Child

↓

Grand Child
```

Data always flows downward.

---

## State Management

React introduced

```
useState()
```

instead of manually updating HTML.

---

## Declarative UI

Instead of saying

```
Find this div

Change color

Append child
```

React allows

```
if (loggedIn)

show Dashboard

else

show Login
```

---

# Limitations of React

Although React solved many problems, it also has limitations.

## 1. Client Side Rendering (CSR)

React renders inside browser.

Initial HTML

```
<div id="root"></div>
```

Browser downloads

- HTML
- CSS
- JS Bundle

Only then UI appears.

Problem

Slow initial loading.

---

## 2. Poor SEO

Search engines initially receive

```
<div id="root"></div>
```

instead of meaningful content.

This hurts SEO.

---

## 3. Large Bundle Size

React ships most JavaScript to the browser.

More JavaScript

↓

Longer loading

↓

Lower performance

---

## 4. Manual Routing

Need to install

```
react-router-dom
```

---

## 5. No Built-in Backend

Need Express

Node

Firebase

Supabase

etc.

---

## 6. Image Optimization

Need external libraries.

---

# How Next.js Solves React Problems

Next.js adds production-ready features.

## Server Side Rendering (SSR)

Page generated on server.

```
Request

↓

Server

↓

HTML

↓

Browser
```

Benefits

- Faster first load
- Better SEO

---

## Static Site Generation (SSG)

Pages generated during build.

Perfect for

- Blogs
- Documentation
- Portfolio

---

## Incremental Static Regeneration (ISR)

Updates static pages without rebuilding the entire website.

---

## File Based Routing

Instead of

```
react-router
```

Simply create

```
app/about/page.tsx
```

URL automatically becomes

```
/about
```

---

## API Routes

Backend can exist inside same project.

Example

```
app/api/users/route.ts
```

---

## Image Optimization

```
<Image />
```

automatically

- lazy loads
- optimizes
- resizes
- converts format

---

## Font Optimization

Google Fonts are optimized automatically.

---

## Metadata API

SEO becomes much easier.

Example

```
title

description

keywords
```

---

## Server Components

Run on server.

No JavaScript sent to browser unless needed.

---

# Key Features of Next.js

- React Framework
- Full Stack Support
- File Routing
- Layout System
- Nested Routing
- API Routes
- Server Components
- Client Components
- Static Rendering
- Dynamic Rendering
- Streaming
- Image Optimization
- Font Optimization
- Middleware
- Route Handlers
- SEO Optimization
- TypeScript Support

---

# Next.js Learning Roadmap

## Phase 1

Learn

- React
- JSX
- Components
- Props
- State
- Hooks

---

## Phase 2

Learn Next.js Basics

- App Router
- Pages
- Layout
- Navigation
- Metadata
- Fonts

---

## Phase 3

Rendering

- CSR
- SSR
- SSG
- ISR

---

## Phase 4

Data Fetching

- fetch()
- Server Components
- Route Handlers
- API

---

## Phase 5

Authentication

- JWT
- NextAuth
- Clerk

---

## Phase 6

Database

- Prisma
- PostgreSQL
- MongoDB

---

## Phase 7

Deployment

- Vercel
- Render

---

# Project Setup

Create Project

```bash
npx create-next-app@latest
```

or

```bash
pnpm create next-app
```

Run Project

```bash
npm run dev
```

Project starts

```
http://localhost:3000
```

---

# Project Structure

Example

```
blog-app/

│

├── app/

│ ├── layout.tsx

│ ├── page.tsx

│ ├── about/

│ │ └── page.tsx

│

├── public/

├── components/

├── styles/

├── next.config.ts

├── package.json

└── tsconfig.json
```

---

## app/

Contains routing.

Every folder becomes route.

---

## public/

Stores

- images
- favicon
- static files

---

## components/

Reusable UI.

```
Navbar

Footer

Card

Button
```

---

# Layouts

Layout keeps common UI.

Example

```
Navbar

↓

Page

↓

Footer
```

Layout remains same while page changes.

```
layout.tsx
```

wraps every page.

---

# Pages

Every folder containing

```
page.tsx
```

becomes a route.

Example

```
app/

about/

page.tsx
```

URL

```
/about
```

---

# Linking & Navigation

Instead of

```
<a>
```

Next.js uses

```tsx
import Link from "next/link";

<Link href="/about">
    About
</Link>
```

Benefits

- Prefetching
- Faster Navigation
- Client-side Transition

---

# Server Components

Default in App Router.

Example

```tsx
export default function Home() {
  return <h1>Hello Next.js</h1>;
}
```

Advantages

- Better performance
- Smaller bundle
- Better SEO
- Secure
- Can directly fetch database data

Cannot use

- useState
- useEffect
- Browser APIs

---

# Client Components

Enable using

```tsx
"use client";
```

Example

```tsx
"use client";

import { useState } from "react";

export default function Counter() {

const [count,setCount]=useState(0);

return(

<button onClick={()=>setCount(count+1)}>

{count}

</button>

);

}
```

Client Components allow

- useState
- useEffect
- Event Handling
- Browser APIs

---

# Server vs Client Components

| Feature | Server Component | Client Component |
|----------|-----------------|-----------------|
| Runs On | Server | Browser |
| Default | ✅ | ❌ |
| useState | ❌ | ✅ |
| useEffect | ❌ | ✅ |
| Event Handler | ❌ | ✅ |
| SEO | Excellent | Average |
| Bundle Size | Small | Larger |
| Database Access | ✅ | ❌ |

---

# App Router vs Pages Router

## Pages Router

```
pages/

index.tsx

about.tsx
```

Old Routing System.

Uses

```
getServerSideProps()

getStaticProps()
```

---

## App Router

```
app/

page.tsx

layout.tsx

loading.tsx

error.tsx
```

Modern architecture.

Supports

- Nested Layouts
- Server Components
- Streaming
- Loading UI
- Error UI

Recommended for all new projects.

---

# Rendering Flow

```
User Request

↓

Next.js Server

↓

Fetch Data

↓

Generate HTML

↓

Send HTML

↓

Browser

↓

Hydration

↓

Interactive Website
```

---

# Important Commands

Create App

```bash
npx create-next-app@latest
```

Start Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Start Production

```bash
npm start
```

Lint

```bash
npm run lint
```

---

# Best Practices

✅ Use App Router for new projects

✅ Prefer Server Components by default

✅ Use Client Components only when needed

✅ Use `next/link` for navigation

✅ Keep reusable UI inside `components/`

✅ Store static assets inside `public/`

✅ Keep layouts clean and reusable

✅ Optimize images using `next/image`

✅ Follow file-based routing conventions

✅ Use TypeScript for better developer experience

---

# Module Summary

In this module, we learned the fundamentals of Next.js and why it has become one of the most popular React frameworks for modern web development. We explored the limitations of traditional web development and React, and saw how Next.js addresses those challenges with features like Server-Side Rendering (SSR), Static Site Generation (SSG), File-Based Routing, and Server Components.

We also covered how to create a Next.js project, understood its project structure, learned the purpose of layouts and pages, implemented navigation using `next/link`, compared Server Components and Client Components, and examined the differences between the modern App Router and the older Pages Router.

By the end of this module, you should be able to:
- Explain the advantages of Next.js over plain React.
- Create and run a Next.js project.
- Understand the default project structure.
- Build pages and layouts using the App Router.
- Navigate between pages using `next/link`.
- Distinguish between Server and Client Components.
- Understand when to use the App Router versus the Pages Router.

This knowledge forms the foundation for building scalable, SEO-friendly, and high-performance web applications with Next.js.