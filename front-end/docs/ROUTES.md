# Application Routes

This document outlines the frontend routing structure of the NETRA application. All routing is managed via React Router in `src/App.tsx`.

### Main Application
- `/` → **Home** (`src/pages/Home`)

### Public Tenders
- `/tenders` → **Active Tenders Listing** (`src/pages/ActiveTenders`)
- `/tenders/:id` → **Tender Details** (`src/pages/TenderDetails`)
- `/tenders/create` → **Create Tender Form** (`src/pages/CreateTender`)

### Bidder Portal (My Tenders)
- `/my-tenders` → **My Tenders Dashboard** (`src/pages/MyTenders/MyTenders.tsx`)
- `/my-tenders/:bidId` → **Bid Details** (`src/pages/MyTenders/pages/BidDetails.tsx`)
- `/my-tenders/:bidId/edit` → **Edit Bid Form** (`src/pages/MyTenders/pages/EditBid.tsx`)

### Government / Evaluation Portal
- `/evaluations` → **Evaluations Dashboard** (`src/pages/Evaluations`)
- `/compliance` → **AI Compliance Check Tool** (`src/pages/Compliance`)
- `/analytics` → **Procurement Analytics** (`src/pages/Analytics`)
- `/bidders` → **Registered Bidders Directory** (`src/pages/Bidders`)

### User Information
- `/profile` → **User/Company Profile** (`src/pages/Profile`)

### Notes for Developers
- Future extensions such as `/notifications` or `/calendar` should follow this same flat, explicit routing structure.
- Route parameters (like `:id` and `:bidId`) must eventually be populated by real database UUIDs/IDs from the backend.
- Breadcrumbs in subpages rely on these route structures to construct readable navigation paths.
