# Project Summary for AI / Chatbot Understanding

Project Name: VOIRE Clothing Website Frontend

## What this project is
This is a modern React-based frontend for a fashion/e-commerce website. The app is designed to look like a premium clothing brand storefront with a polished UI, product browsing, shopping cart flow, authentication, and an admin panel.

## Main purpose
The project provides a complete user-facing shopping experience for a clothing brand, including:
- landing page and brand storytelling
- product browsing by category and gender
- product detail pages
- shopping cart and checkout flow
- user authentication UI
- profile and order-related views
- an admin dashboard for store management

## Tech stack
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Icons
- Redux Toolkit slices (auth, cart, wishlist) are present as starter structure

## Core app structure
- Entry point: src/main.jsx
- Routing: src/routes/AppRoutes.jsx
- Global state setup: src/app/store.js
- Main UI layout: src/components/layout/
- Admin layout: src/components/admin/Layout/

## Main routes
### Public user pages
- / -> authentication page
- /home -> home page
- /collections -> category listing page
- /collections/:gender -> filtered category page
- /collections/:gender/:subCategory -> subcategory page
- /product/:id -> product detail page
- /cart -> shopping cart page
- /checkout -> checkout page
- /payment -> payment page
- /review -> review order page
- /profile -> user profile page

### Admin pages
- /admin/overview -> admin dashboard
- /admin/catalog -> admin catalog/products view
- /admin/sales -> sales page
- /admin/content -> content management page
- /admin/settings -> settings page
- /admin/addproduct -> add product page

## Features implemented or present
- Beautiful editorial-style home page
- Category tiles and featured product sections
- Product card and product grid components
- Auth page with sign-in/sign-up forms and validation UI
- Cart page with item summary and checkout action
- Checkout, payment, and review flow pages
- Profile sidebar and user account UI
- Admin dashboard and management screens

## Important note
This project appears to be a frontend UI prototype rather than a fully completed e-commerce backend integration. Many interactions are currently visual or placeholder-based, and some functionality such as real sign-in, signup, cart state persistence, and API communication are not fully implemented yet.

## Best way to understand this project quickly
Think of it as a premium fashion store frontend with:
- a customer-facing storefront
- a shopping cart journey
- an authentication experience
- an internal admin management area

If someone asks you to explain this project, the short version is:
This is a React + Vite clothing store frontend that shows a luxury-style shopping experience, including product browsing, cart checkout, authentication UI, and an admin section for managing catalog and store operations.
