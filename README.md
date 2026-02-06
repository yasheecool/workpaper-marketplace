# Workpapers Marketplace

🔗 **Live Link:** https://workpaper-marketplace.vercel.app/

## 🧾 Introduction

This project serves as a **Proof of Concept** for a _Workpaper Marketplace_ in the accounting domain. A **workpaper** is a document or a set of procedures that accountants use to verify or reconcile how they arrived at a particular number — essentially a structured series of steps that lead to a calculation or conclusion.

I developed this application as part of my **Work Integrated Learning** subject at university. The project involved working closely with a real client operating in the accounting domain to understand business requirements, gain domain knowledge, and deliver a functional proof of concept. On a weekly basis, I clarified business logic, UI/UX design decisions, and technical trade-offs with the client to ensure the project remained aligned with expectations and on track.

---

## 🏗️ About the Application

The application is designed as a **multi-tenant system**, where all core logic operates within firm boundaries. The domain primarily revolves around three core entities:

### 📄 Listing

The core unit of content within the marketplace.

- Owned by firms
- Exposed through various filters and attributes
- Can be **requested**, **installed**, or **saved** by other firms

### 🏢 Firm

The primary boundary for enforcing multi-tenancy.

- Users act **on behalf of a firm**
- Firms own listings
- All actions (requesting, saving, installing listings) occur at the **firm level**, even though they are initiated by users

### 👤 User

End users who belong to one or more firms.

- Perform actions such as requesting, installing, or deleting listings
- Never act independently — all actions are scoped to a firm context

---

## 💻 Tech Stack

- **Next.js (App Router)** with **DaisyUI (TailwindCSS)** for UI development
- **TanStack Query** for client-side data caching and state management
- **Supabase** as a Backend-as-a-Service, providing:
  - Authentication
  - Storage
  - PostgreSQL database with **Row Level Security (RLS)** configured

---

## 🔄 Data Fetching Patterns

To effectively leverage **TanStack Query** while still benefiting from **Next.js server-side data fetching**, I followed a consistent pattern across the application:

- On the **initial page load**, data is fetched on the server
- The server-fetched data is passed into client components
- This data is then used as `initialData` to hydrate the corresponding TanStack Query

This approach is particularly useful for scenarios involving **filter-dependent data**, as it avoids unnecessary refetches while preserving fast first-load performance.

---

## 🧬 How Types Flow

To organize types effectively, and maintain a seperation between **database, application and response scoped types**, I followed the a unidirectional flow, each layer responsible for limited concerns, and prevents the lower-level layers from leaking upward:

- **`supabase.ts`**  
  Contains raw database-generated types **(tables, enums, snake_case fields)**. These types reflect the database schema directly and are never consumed outside the data layer.

- **Domain Types**  
  Database types are mapped to camelCase and renamed where necessary to align with domain language.

- **Feature Types**  
  Extend or specialize domain types for specific use cases. This layer defines response shapes and includes mappers that adapt domain types to feature-specific needs (db calls).

- **Server Actions**  
   They are responsible for data fetching, receive raw db data (snake_case) fields, and convert them to application level types (camelCase) by using the mappers from the layers above.

- **Application Layer**  
  The rest of the application (UI, hooks, pages) operates exclusively on feature and domain types and has no knowledge of database-specific schemas.
