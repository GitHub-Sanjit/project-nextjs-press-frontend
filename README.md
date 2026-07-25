# Module 29: Building Blog App Frontend with Next.js (Part-3)

> **Goal:** Build a complete authentication system in Next.js using **Server Actions**, **HTTP-Only Cookies**, **Shadcn/UI**, **React's `useActionState`**, **dynamic navigation**, and **authentication state management**.

---

# Table of Contents

- Introduction
- Authentication Flow Overview
- Creating Login Form with Shadcn/UI
- Server Actions for Login
- Handling Form State with `useActionState`
- Setting Authentication Tokens in Cookies
- Redirecting Users After Login
- Client-Side vs Server-Side Navigation
- Creating a Common Navbar
- Fetching Logged-in User Information (`/me`)
- Caching User Data
- Dynamic Navbar Based on Authentication
- Logout Functionality
- Complete Authentication Flow
- Project Folder Structure
- Best Practices
- Module Summary

---

# Introduction

In the previous modules, we learned:

- Next.js fundamentals
- App Router
- Route Groups
- Data Fetching
- SSR, CSR, SSG, ISR
- Server Actions
- Project Structure
- Shadcn/UI

In this module, we build one of the most important features of any web application:

# User Authentication

By the end of this module, users will be able to

- Login
- Store authentication securely
- Stay logged in
- View personalized navigation
- Logout securely

---

# Authentication Flow Overview

A typical authentication process looks like this:

```
User

↓

Enter Email & Password

↓

Login Form

↓

Server Action

↓

Backend API

↓

Validate Credentials

↓

Generate JWT Token

↓

Store Token in Cookie

↓

Redirect User

↓

Fetch Current User (/me)

↓

Update Navbar

↓

User Authenticated
```

---

# Creating Login Form with Shadcn/UI

## Why Shadcn/UI?

Shadcn/UI provides

- Accessible components
- Beautiful design
- Tailwind CSS integration
- TypeScript support
- Customizable components

Instead of building every input manually, we use ready-made components.

Example:

```tsx
<Input
    placeholder="Enter your email"
/>

<Input
    type="password"
/>

<Button>
    Login
</Button>
```

---

## Benefits

- Consistent UI
- Faster development
- Better accessibility
- Responsive design

---

# Implementing Server Action for Login

Instead of creating an API route inside Next.js, we can use a **Server Action**.

Example

```tsx
"use server";

export async function loginUser(formData: FormData) {

    // Call backend API

}
```

The Server Action

- receives form data
- validates input
- calls backend API
- processes response
- stores authentication token
- redirects user

---

## Advantages

- Less boilerplate
- Secure execution
- Direct server communication
- No extra API route required

---

# Handling Form Pending State with `useActionState`

Submitting a form takes time.

Without feedback, users may think nothing is happening.

React provides

```
useActionState()
```

to manage server action state.

Example

```tsx
const [state, formAction, pending] =
    useActionState(loginUser, null);
```

During submission

```
Button

↓

Loading...

↓

Disabled

↓

Response

↓

Enabled
```

---

## Benefits

- Prevents duplicate submissions
- Better user experience
- Displays validation errors
- Tracks server response

---

# Setting Authentication Tokens in Cookies

After successful login

Backend returns

```
Access Token

Refresh Token
```

Instead of storing them inside

- Local Storage ❌
- Session Storage ❌

we store them inside

## HTTP-Only Cookies

Advantages

- More secure
- Protected from JavaScript
- Prevents XSS attacks
- Automatically included with requests

Example

```tsx
cookies().set(
    "accessToken",
    token
);
```

---

# Why Cookies?

```
Browser

↓

Stores Cookie

↓

Automatically Sends Cookie

↓

Server Reads Cookie

↓

Authenticate User
```

Users don't need to log in repeatedly.

---

# Redirecting User After Login

After successful login

```
Login

↓

Dashboard

or

↓

Home Page
```

Next.js provides multiple redirect methods.

---

## Server-side Redirect

Inside Server Action

```tsx
redirect("/");
```

Runs before the page is rendered.

---

## Client-side Redirect

Inside Client Component

```tsx
const router = useRouter();

router.push("/");
```

Runs after rendering.

---

# Client-Side vs Server-Side Navigation

## Client-side Navigation

Uses

```
router.push()

<Link>

router.replace()
```

Benefits

- Fast
- No full page reload
- Better user experience

---

## Server-side Navigation

Uses

```
redirect()
```

Benefits

- Secure
- Happens before rendering
- Better for authentication

---

# Navigation Comparison

| Feature | Client Navigation | Server Navigation |
|----------|------------------|-------------------|
| Runs On | Browser | Server |
| Refresh Required | No | No |
| Authentication | Limited | Recommended |
| Speed | Very Fast | Fast |
| Security | Lower | Higher |

---

# Creating Common Navbar

Instead of repeating Navbar

```
Home

Blogs

Dashboard

Login
```

inside every page,

we place it inside

```
Root Layout
```

Example

```
layout.tsx

↓

Navbar

↓

Page

↓

Footer
```

Now every page automatically gets the same Navbar.

---

# Designing Navbar with V0.dev

The Navbar UI can be generated using

**v0.dev**

Benefits

- AI-generated components
- Responsive layouts
- Tailwind CSS support
- Shadcn compatible

Typical Navbar

```
Logo

Blogs

About

Dashboard

Login/Profile

Logout
```

---

# Fetching Current User (`/me` API)

After login,

we need to know

```
Who is logged in?
```

Backend usually provides

```
GET /me
```

Example response

```json
{
    "id": 1,
    "name": "John",
    "email": "john@example.com"
}
```

This endpoint validates the cookie and returns the authenticated user's information.

---

# Implementing Server Action for `/me`

Example

```tsx
"use server";

export async function getCurrentUser() {

}
```

Flow

```
Read Cookie

↓

Call Backend

↓

Validate Token

↓

Return User
```

---

# Caching User Data

Fetching the same user repeatedly is inefficient.

Instead,

cache the user information.

```
Request

↓

Cache

↓

Return Cached User

↓

No Extra API Call
```

Benefits

- Faster navigation
- Reduced backend load
- Better performance

---

# Dynamic Navbar

Navbar changes depending on authentication.

## Guest User

```
Home

Blogs

Login

Register
```

---

## Logged-in User

```
Home

Blogs

Dashboard

Profile

Logout
```

Logic

```
Current User Exists

↓

Show Dashboard

↓

Else

↓

Show Login
```

This creates a personalized user experience.

---

# Logout Functionality

Logging out means

- Remove authentication cookies
- Clear cached user data
- Redirect to Home/Login

Example

```tsx
cookies().delete("accessToken");
```

Flow

```
Logout Button

↓

Server Action

↓

Delete Cookie

↓

Clear Cache

↓

Redirect

↓

Guest Navbar
```

---

# Authentication Lifecycle

```
Open Website

↓

Guest User

↓

Login Form

↓

Server Action

↓

Backend Authentication

↓

Generate Token

↓

Store Cookie

↓

Redirect

↓

Fetch /me

↓

Cache User

↓

Dynamic Navbar

↓

Logout

↓

Delete Cookie

↓

Guest State
```

---

# Suggested Project Structure

```
src/

├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
│
├── actions/
│   ├── auth.ts
│   └── user.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/
│
├── services/
│   └── AuthService.ts
│
├── lib/
│
├── hooks/
│
├── providers/
│
├── types/
│
└── utils/
```

---

# Security Best Practices

## Use HTTP-Only Cookies

✅ Secure

❌ Avoid storing JWT tokens in Local Storage for sensitive authentication.

---

## Validate User on the Server

Never trust client-side authentication state.

Always verify cookies and tokens on the server.

---

## Protect Sensitive Routes

Examples

- Dashboard
- Settings
- Admin Panel
- Profile

Redirect unauthenticated users appropriately.

---

## Cache Carefully

Cache user information only when appropriate, and clear or refresh it after login, logout, or profile updates to avoid stale authentication data.

---

# Best Practices

- Build forms with Shadcn/UI components.
- Use **Server Actions** for authentication logic.
- Handle pending form submissions using `useActionState`.
- Store authentication tokens in **HTTP-Only Cookies**.
- Use **server-side redirects** after authentication when possible.
- Keep the Navbar inside the Root Layout.
- Fetch the current user through a dedicated `/me` endpoint.
- Cache user data to improve performance.
- Make the Navbar responsive to authentication state.
- Delete cookies and clear cached authentication data during logout.
- Keep authentication logic organized inside dedicated `actions` and `services` folders.

---

# Module Summary

This module focused on implementing a complete authentication system using the latest Next.js App Router features. We created a modern login interface with Shadcn/UI, processed login requests through Server Actions, and improved the user experience by managing form submission states with React's `useActionState`.

We also learned how to securely store authentication tokens using HTTP-Only Cookies, redirect users after successful login, and understand the differences between client-side and server-side navigation. Additionally, we built a reusable Navbar inside the Root Layout, fetched authenticated user information from the `/me` endpoint, cached user data for better performance, dynamically updated the Navbar based on the user's authentication state, and implemented a secure logout process.

By the end of this module, you should be able to:

- Create authentication forms using Shadcn/UI.
- Process login requests with Server Actions.
- Handle loading and pending states using `useActionState`.
- Store JWT tokens securely in HTTP-Only Cookies.
- Redirect users using both client-side and server-side navigation.
- Build a reusable Navbar inside the Root Layout.
- Fetch and cache authenticated user information.
- Display different navigation options based on login status.
- Implement secure logout functionality.
- Apply authentication best practices in a Next.js application.

This module completes the foundation of user authentication and prepares you for building secure, scalable, and production-ready full-stack applications with Next.js.