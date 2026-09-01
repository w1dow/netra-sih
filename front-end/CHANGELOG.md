# NETRA Refactoring & Restructuring Changelog

This document summarizes the changes made to align the NETRA project with a beginner-friendly, page-by-page editable architecture.

## 1. Project Directory Restructuring
The core principle `ONE MAJOR PAGE = ONE CLEAR PAGE DIRECTORY` was implemented.
All pages previously located directly under `src/pages/` were moved to their own dedicated folders.

**Moved Pages:**
- `src/pages/HomePage.tsx` ➔ `src/pages/Home/Home.tsx`
- `src/pages/TendersPage.tsx` ➔ `src/pages/ActiveTenders/ActiveTenders.tsx`
- `src/pages/TenderDetailPage.tsx` ➔ `src/pages/TenderDetails/TenderDetails.tsx`
- `src/pages/MyTendersPage.tsx` ➔ `src/pages/MyTenders/MyTenders.tsx`
- `src/pages/CompliancePage.tsx` ➔ `src/pages/Compliance/Compliance.tsx`
- `src/pages/ProfilePage.tsx` ➔ `src/pages/Profile/Profile.tsx`
- `src/pages/AnalyticsPage.tsx` ➔ `src/pages/Analytics/Analytics.tsx`
- `src/pages/BiddersPage.tsx` ➔ `src/pages/Bidders/Bidders.tsx`
- `src/pages/EvaluationsPage.tsx` ➔ `src/pages/Evaluations/Evaluations.tsx`
- `src/pages/CreateTenderPage.tsx` ➔ `src/pages/CreateTender/CreateTender.tsx`

Each folder also received an `index.ts` file to ensure clean imports (e.g., `import Home from './pages/Home';`).

## 2. Component Reorganization
Components were strictly separated based on their usage to prevent logic leaks and clarify ownership.

**Page-Specific Components (Moved from `src/components` to `src/pages/[PageName]/components`):**
- `SearchBar`, `QuickActions`, `StatCard`, `CategoryCard`, `TrustPillar` ➔ `src/pages/Home/components/`
- `ComplianceWorkflow` ➔ `src/pages/Compliance/components/`

**Shared Components (Moved to `src/components/shared/`):**
- `TenderCard` and `TenderFilters` (used by both Home and Active Tenders)

## 3. "My Tenders" Sub-Routing & Subpages
The My Tenders section was expanded beyond a single file into a feature-rich directory to support nested routes.
- **Created `BidDetails.tsx`**: A read-only view of a bid at `/my-tenders/:bidId`
- **Created `EditBid.tsx`**: An editable form view for a bid at `/my-tenders/:bidId/edit`
- **Updated `MyTenders.tsx` Actions**: Modified the table action buttons to dynamically link to these new routes based on the tender's ID and status.
- **Added Breadcrumbs**: Implemented breadcrumb navigation in `BidDetails` and `EditBid` to help users trace their location.

## 4. Routing Updates
- Updated `src/App.tsx` to handle the new directory imports.
- Registered the nested routes for `/my-tenders/:bidId` and `/my-tenders/:bidId/edit`.

## 5. UI Updates & Cleanups
- Fixed all relative import paths (`../` vs `../../`) across all `.tsx` and `.css` files resulting from the restructuring.
- Removed the deprecated `ComplianceCheckItem.tsx` component and cleaned up its unused imports in `Compliance.tsx`.
- Ran a production build (`vite build`) verifying the entire refactored application compiles with zero errors.

## 6. Developer Documentation
Created a new `docs/` directory populated with essential developer onboarding materials:
- **`docs/PROJECT_STRUCTURE.md`**: A cheat sheet for finding where to edit specific features.
- **`docs/ROUTES.md`**: A map of all frontend React routes.
- **`docs/DEVELOPMENT.md`**: Guiding principles on UI editing vs Data editing, and form state handling.
- **`docs/API_CONTRACT.md`**: Explains how the backend should dictate editability (e.g., `isEditable: true`) to drive frontend forms.
- **`.gitignore`**: Added a standard gitignore file to the project root.
