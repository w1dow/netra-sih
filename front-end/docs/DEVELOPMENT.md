# NETRA Frontend — Developer Setup & Integration Guide

Welcome to the NETRA frontend repository! NETRA (National Evaluation & Tender Risk Assessment) is a government procurement and tender compliance platform built with React, TypeScript, and Vite.

---

## 1. Architecture Overview

NETRA follows a strict **5-Tier Unidirectional Data Architecture**:

```
[ Page Component ]
        │
        ▼
[ Custom React Hook (e.g. useTenders, useBid, useCompliance) ]
        │
        ▼
[ API Service Layer (e.g. api/tenders.ts, api/bids.ts) ]
        │
        ▼
[ API Client (api/client.ts with fetch & error handling) ]
        │
        ▼
[ Express.js + MySQL Backend REST API ]
```

### Architectural Principles
1. **Pages do NOT fetch data directly**: Pages call hooks (e.g. `useTenders()`).
2. **Hooks handle state**: Manage `data`, `loading`, `error`, and `refetch`.
3. **Services contain API logic**: Call `apiClient` or return mock promises during development.
4. **API Client handles HTTP**: Base URL configuration, headers, timeout, error normalization.
5. **No hard-coded mock data in UI components**: All domain data flows down as props.

---

## 2. Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set `VITE_API_BASE_URL` to your local Express server address:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Installation & Development Server
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 3. Project Directory Structure

```
src/
├── api/             # Service layer & API client (tenders, bids, compliance, etc.)
├── components/      # UI components (Navbar, Footer, TenderCard, LoadingState, etc.)
│   ├── common/      # LoadingState, ErrorState, EmptyState, NotFoundPage, etc.
│   ├── shared/      # TenderCard, TenderFilters
│   └── tenders/     # TenderStatusBadge
├── data/            # Static UI config (nav links, categories, statistics)
├── hooks/           # Custom data fetching hooks wrapping API services
├── mocks/           # Strongly-typed mock data for offline development
├── pages/           # Page routes (Home, ActiveTenders, MyTenders, Compliance, etc.)
├── styles/          # Design tokens & CSS custom properties (index.css)
├── types/           # TypeScript interfaces (Tender, Bid, Compliance, User, Company)
└── utils/           # Helper functions (formatCurrency, formatDate)
```

---

## 4. How to Connect to Live Express Backend

When the Express.js + MySQL backend is ready:

1. Open `src/api/tenders.ts`, `src/api/bids.ts`, `src/api/compliance.ts`, `src/api/auth.ts`, etc.
2. Replace mock promise returns with `apiClient.get(...)` / `apiClient.post(...)` calls.

**Example transition in `src/api/tenders.ts`:**

```ts
// BEFORE (Mock mode):
export async function getTenders(filters?: Partial<TenderFilters>): Promise<TenderListResponse> {
  return Promise.resolve({ data: mockTenders, meta: { total: mockTenders.length } });
}

// AFTER (Backend ready mode):
export async function getTenders(filters?: Partial<TenderFilters>): Promise<TenderListResponse> {
  const query = new URLSearchParams(filters as Record<string, string>).toString();
  return apiClient.get<TenderListResponse>(`/tenders?${query}`);
}
```

---

## 5. UI Design Tokens & Theme Standards

The platform follows strict **Government Enterprise UI Guidelines**:
- **Deep Navy (`#071A4A`)**: Primary headers, authority branding, active navigation.
- **Government Blue (`#123B78`)**: Links, primary buttons, interactive accents.
- **Indian Saffron (`#FF9933`)**: High-priority action buttons, highlight badges.
- **Status Green (`#059669`)**: Verified compliance, active tenders, awarded status.
- **Typography**: Clean `Inter` font stack. No oversized startup rounded buttons.

---

## 6. Build & Production Check

```bash
# Type check and build bundle
npm run build

# Preview production build locally
npm run preview
```
