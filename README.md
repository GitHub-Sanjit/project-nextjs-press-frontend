# Module 30: Building Blog App Frontend with Next.js (Part-4)

> **Goal:** Implement a complete authentication and authorization system in Next.js using **Proxy (Middleware)**, **Role-Based Access Control (RBAC)**, **Protected Routes**, **Refresh Token Authentication**, and **Automatic Access Token Refresh**.

---

# Table of Contents

- Introduction
- Authentication vs Authorization
- Role-Based Authentication Flow
- Redirecting Users Based on Roles
- What is Proxy (Middleware) in Next.js?
- Why Use a Proxy?
- Creating a Proxy File
- Implementing Proxy in the Project
- Understanding the Matcher Configuration
- Catch-All Routes
- Handling Authentication Routes
- Protecting Private Routes
- Role-Based Route Authorization
- Refresh Token Authentication
- Automatically Generating New Access Tokens
- Complete Authentication Flow
- Project Folder Structure
- Best Practices
- Common Mistakes
- Module Summary

---

# Introduction

In **Module 29**, we implemented:

- Login Form
- Server Actions
- HTTP-Only Cookies
- Authentication
- Dynamic Navbar
- Logout

However, simply logging in is **not enough**.

A real-world application must ensure that:

- Guests cannot access protected pages.
- Logged-in users cannot access login/register pages.
- Admin users can access admin pages.
- Regular users cannot access admin routes.
- Expired access tokens are refreshed automatically.

This module focuses on implementing these security features using **Next.js Proxy (Middleware)**.

---

# Authentication vs Authorization

These two concepts are often confused but serve different purposes.

## Authentication

Authentication answers the question:

> **Who are you?**

Example:

```
Email

↓

Password

↓

Verify Identity

↓

Login Successful
```

Examples:

- Login
- Register
- JWT Validation
- Cookie Validation

---

## Authorization

Authorization answers the question:

> **What are you allowed to do?**

Example:

```
User

↓

Role

↓

Permission

↓

Allowed / Denied
```

Examples:

- Admin Dashboard
- Moderator Panel
- User Dashboard
- Manage Posts
- Delete Users

---

## Authentication vs Authorization

| Authentication      | Authorization                |
| ------------------- | ---------------------------- |
| Identifies the user | Determines permissions       |
| Happens first       | Happens after authentication |
| Login process       | Access control               |
| Uses credentials    | Uses roles & permissions     |

---

# Role-Based Authentication Flow

Example roles:

```
Guest

↓

User

↓

Moderator

↓

Admin
```

Example permissions:

| Role      | Dashboard | Create Post | Delete Users | Manage Settings |
| --------- | --------- | ----------- | ------------ | --------------- |
| Guest     | ❌        | ❌          | ❌           | ❌              |
| User      | ✅        | ✅          | ❌           | ❌              |
| Moderator | ✅        | ✅          | Limited      | ❌              |
| Admin     | ✅        | ✅          | ✅           | ✅              |

---

# Redirecting Users Based on Roles

After a successful login, users should be redirected based on their assigned role.

Example:

```
Login

↓

Backend Returns Role

↓

Admin

↓

/admin
```

or

```
Login

↓

Backend Returns Role

↓

User

↓

/dashboard
```

Example logic:

```ts
if (user.role === "admin") {
  redirect("/admin");
}

if (user.role === "user") {
  redirect("/dashboard");
}
```

Benefits:

- Personalized experience
- Better security
- Cleaner navigation

---

# What is Proxy (Middleware) in Next.js?

A **Proxy** (previously called **Middleware**) is code that executes **before a request reaches a page or API route**.

It acts as a gatekeeper.

Flow:

```
Browser

↓

Request

↓

Proxy

↓

Allow

↓

Page
```

or

```
Browser

↓

Request

↓

Proxy

↓

Redirect

↓

Login
```

---

# Why Use a Proxy?

Without a proxy:

```
User

↓

Dashboard

↓

Page Opens
```

Anyone can access the page if no protection exists.

With a proxy:

```
User

↓

Dashboard

↓

Proxy Checks Login

↓

Allow / Redirect
```

Benefits:

- Protect routes
- Redirect users
- Read cookies
- Verify JWT tokens
- Refresh expired tokens
- Restrict pages by role

---

# Creating a Proxy File

In modern Next.js versions, create a proxy file at the project root.

Example:

```
proxy.ts
```

or

```
src/

proxy.ts
```

The proxy intercepts incoming requests before pages are rendered.

---

# Proxy Request Lifecycle

```
Incoming Request

↓

Read Cookies

↓

Check Access Token

↓

Token Valid?

↓

Yes → Continue

↓

No

↓

Refresh Token Exists?

↓

Yes → Generate New Token

↓

Continue

↓

No

↓

Redirect Login
```

---

# Implementing Proxy in the Project

Typical responsibilities include:

- Reading cookies
- Checking authentication
- Verifying user role
- Redirecting unauthorized users
- Refreshing expired tokens
- Protecting private pages

Flow:

```
Request

↓

Read Cookie

↓

Validate

↓

Allow

or

↓

Redirect
```

---

# Understanding the Matcher Configuration

The `matcher` determines which routes the proxy should execute for.

Example:

```ts
export const config = {
  matcher: ["/dashboard/:path*"],
};
```

This means the proxy only runs for dashboard routes.

---

# Multiple Matchers

Example:

```ts
matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"];
```

Now the proxy protects all of these routes.

---

# Catch-All Routes

A catch-all matcher protects an entire route tree.

Example:

```
/dashboard

/dashboard/profile

/dashboard/settings

/dashboard/posts

/dashboard/posts/edit
```

Matcher:

```ts
"/dashboard/:path*";
```

The `:path*` segment matches every nested route.

Benefits:

- Less code
- Easier maintenance
- Automatic protection for new pages

---

# Handling Authentication Routes

Authentication pages include:

```
/login

/register

/forgot-password
```

If a user is already authenticated:

```
User

↓

Open Login

↓

Already Logged In?

↓

Yes

↓

Redirect Dashboard
```

Example logic:

```ts
if (loggedIn && pathname === "/login") {
  redirect("/dashboard");
}
```

This prevents logged-in users from accessing authentication pages unnecessarily.

---

# Protecting Private Routes

Examples:

```
/dashboard

/profile

/settings

/orders

/my-posts
```

Flow:

```
Open Dashboard

↓

Proxy

↓

Logged In?

↓

Yes

↓

Continue

↓

No

↓

Redirect Login
```

---

# Role-Based Route Authorization

Authentication alone is not sufficient.

Example:

```
Admin Route

↓

Current Role

↓

User

↓

Access Denied
```

Flow:

```
Admin Page

↓

Read Role

↓

Admin?

↓

Yes

↓

Continue

↓

No

↓

Redirect Unauthorized
```

Example:

```ts
if (role !== "admin") {
  redirect("/unauthorized");
}
```

---

# Authorization Matrix

| Route          | Guest | User | Admin |
| -------------- | ----- | ---- | ----- |
| `/`            | ✅    | ✅   | ✅    |
| `/login`       | ✅    | ❌   | ❌    |
| `/register`    | ✅    | ❌   | ❌    |
| `/dashboard`   | ❌    | ✅   | ✅    |
| `/profile`     | ❌    | ✅   | ✅    |
| `/admin`       | ❌    | ❌   | ✅    |
| `/admin/users` | ❌    | ❌   | ✅    |

---

# Refresh Token Authentication

Access tokens usually have a short lifetime.

Example:

```
Access Token

↓

Expires

↓

Need New Token
```

Instead of forcing users to log in again, we use a **Refresh Token**.

Flow:

```
Access Token

Expired

↓

Refresh Token

↓

Backend

↓

New Access Token
```

---

# Why Use Refresh Tokens?

Benefits:

- Better user experience
- Longer login sessions
- Improved security
- Short-lived access tokens

Typical flow:

```
Login

↓

Access Token

↓

Expires

↓

Refresh Token

↓

New Access Token

↓

Continue Browsing
```

---

# Automatically Generating New Access Tokens

Inside the proxy:

```
Request

↓

Access Token

↓

Expired

↓

Refresh Token

↓

Backend

↓

Generate New Token

↓

Update Cookie

↓

Continue Request
```

If refresh also fails:

```
Delete Cookies

↓

Redirect Login
```

This provides seamless authentication without interrupting the user.

---

# Complete Authentication Flow

```
Open Website

↓

Proxy

↓

Access Token Exists?

↓

Yes

↓

Valid?

↓

Yes

↓

Continue

↓

No

↓

Refresh Token Exists?

↓

Yes

↓

Backend Issues New Access Token

↓

Update Cookie

↓

Continue

↓

No

↓

Redirect Login

↓

Login

↓

Receive Tokens

↓

Store HTTP-Only Cookies

↓

Redirect Based On Role

↓

Access Protected Pages
```

---

# Suggested Project Structure

```
src/

├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── dashboard/
│   ├── admin/
│   ├── profile/
│   ├── layout.tsx
│   └── page.tsx
│
├── actions/
│   ├── auth.ts
│   └── user.ts
│
├── services/
│   ├── AuthService.ts
│   └── UserService.ts
│
├── components/
│
├── utils/
│
├── lib/
│
├── types/
│
└── proxy.ts
```

---

# Security Best Practices

## Use HTTP-Only Cookies

Store authentication tokens in **HTTP-Only Cookies** instead of Local Storage.

---

## Validate Every Protected Request

Do not rely solely on client-side authentication.

Always verify authentication in the proxy or on the server.

---

## Keep Access Tokens Short-Lived

Use:

- Short-lived Access Tokens
- Long-lived Refresh Tokens

This improves overall security.

---

## Apply Role-Based Authorization

Always verify the user's role before allowing access to privileged routes.

---

## Redirect Unauthorized Users

Instead of exposing protected pages, redirect users to:

- `/login`
- `/unauthorized`
- `/403`

depending on the situation.

---

# Common Mistakes

❌ Protecting routes only on the client.

❌ Storing JWT tokens in Local Storage for sensitive authentication.

❌ Forgetting to verify user roles.

❌ Not refreshing expired access tokens.

❌ Allowing authenticated users to access login or registration pages.

❌ Forgetting to clear authentication cookies after logout.

---

# Best Practices

- Use a Proxy to centralize authentication logic.
- Protect all private routes using `matcher`.
- Use catch-all matchers for nested routes.
- Redirect users based on their roles after login.
- Prevent authenticated users from accessing authentication pages.
- Validate user roles before serving protected pages.
- Use HTTP-Only Cookies for storing tokens.
- Automatically refresh expired access tokens using refresh tokens.
- Clear authentication cookies when refresh fails.
- Keep authentication and authorization logic separate.

---

# Module Summary

In this module, we implemented a complete authentication and authorization system using **Next.js Proxy (Middleware)**. We learned the difference between authentication and authorization, redirected users based on their roles after login, and used the proxy as a centralized layer to protect application routes.

We explored how the `matcher` configuration and catch-all routes allow us to secure entire sections of an application with minimal code. We also handled authentication pages intelligently by preventing logged-in users from accessing login and registration pages, protected private routes from unauthenticated access, and implemented role-based authorization to restrict access to sensitive pages such as admin dashboards.

Finally, we learned how to automatically refresh expired access tokens using refresh tokens inside the proxy, providing a seamless and secure authentication experience without requiring users to log in repeatedly.

By the end of this module, you should be able to:

- Explain the difference between authentication and authorization.
- Redirect users to different pages based on their roles.
- Configure and implement a Proxy in a Next.js application.
- Use `matcher` to protect specific routes.
- Secure nested routes with catch-all matchers.
- Prevent authenticated users from visiting authentication pages.
- Protect private routes from unauthorized access.
- Implement role-based route authorization.
- Refresh expired access tokens automatically using refresh tokens.
- Build a secure, scalable authentication flow following production best practices.

This module completes the authentication layer of the Blog Application and provides the foundation for implementing enterprise-level security and access control in modern Next.js applications.
