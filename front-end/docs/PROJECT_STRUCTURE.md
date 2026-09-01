# Project Structure & Architecture

This document is designed to help beginners and new developers quickly find where to make changes in the NETRA application.

## Core Architectural Rule

**ONE MAJOR PAGE = ONE CLEAR PAGE DIRECTORY**

The application is structured by feature/page. Each page has its own dedicated directory under `src/pages/`. Page-specific components live inside that page's `components/` directory.

## Where do I edit...?

If you need to change something, use this cheat sheet to find exactly where to go:

- **Change the Homepage:**
  → `src/pages/Home/Home.tsx`
  → Homepage components (Hero, Statistics, etc.) are in `src/pages/Home/components/`

- **Change Active Tenders Page:**
  → `src/pages/ActiveTenders/ActiveTenders.tsx`

- **Change My Tenders Page:**
  → `src/pages/MyTenders/MyTenders.tsx`

- **Change the Edit Bid Form:**
  → `src/pages/MyTenders/pages/EditBid.tsx`

- **Change the Bid Details Page:**
  → `src/pages/MyTenders/pages/BidDetails.tsx`

- **Change Compliance Checks & Workflow:**
  → `src/pages/Compliance/Compliance.tsx`
  → The arrow workflow component is in `src/pages/Compliance/components/ComplianceWorkflow.tsx`

- **Change the User/Bidder Profile:**
  → `src/pages/Profile/Profile.tsx`

- **Change the Tender Details Page:**
  → `src/pages/TenderDetails/TenderDetails.tsx`

- **Change Shared/Global Components (e.g., Navbar, Footer, standard Tender Cards):**
  → `src/components/`

- **Change the Application Routes:**
  → `src/App.tsx` (all routing is currently handled centrally here)

- **Change the Backend API URL or Secrets:**
  → `.env`

- **Change Temporary Mock Data (like Tenders, Users):**
  → `src/data/index.ts`

- **Change Shared TypeScript Types (like BidStatus, Tender):**
  → `src/types/index.ts`

- **Change Global Styles (Colors, Fonts, Spacing):**
  → `src/styles/index.css` (Note: some legacy shared styles may also exist in `src/pages/Pages.css`)

## Component Ownership Rule

- If a component is used by **multiple pages**, it belongs in `src/components/shared/` or `src/components/`.
- If a component is used by **only one page**, it belongs inside that page's directory (e.g., `src/pages/MyTenders/components/`).

This structure guarantees that editing a specific page will not accidentally break another unrelated page in the application.
