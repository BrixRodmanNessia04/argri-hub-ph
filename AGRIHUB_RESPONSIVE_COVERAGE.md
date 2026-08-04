# AgriHub PH — Mobile Responsiveness & Viewport Audit Matrix

This document provides a comprehensive responsive coverage audit for all implemented routes and UI components across AgriHub PH.

Every route and UI element has been audited and verified across 7 standard breakpoint viewports:
- **320px** (Ultra-compact mobile / iPhone SE 1st gen)
- **390px** (Standard mobile / iPhone 12/13/14/15)
- **430px** (Large mobile / iPhone Pro Max)
- **768px** (Tablet portrait / iPad)
- **1024px** (Tablet landscape / Small laptop)
- **Desktop (1280px–1440px+)** (Standard desktop monitors)
- **PWA Mode** (Installed Progressive Web App with safe area insets)

---

## 1. UI Element Responsiveness & Text Wrapping Checklist

All UI components adhere to safe wrapping, flex containment, and touch target rules:

1. **Text & Typography**:
   - Long names, emails, phone numbers, farm titles, species names, reference numbers, and URLs use `overflow-wrap: anywhere; word-break: break-word;` and `min-width: 0`.
2. **Buttons & Badges**:
   - Badges and button labels wrap or flex gracefully without pushing content past the screen boundaries.
   - Minimum touch height of 44px on coarse pointers.
3. **Form Controls**:
   - `font-size: 16px` on mobile screens (<768px) to prevent automatic iOS Safari viewport zooming.
4. **Data Tables & Cards**:
   - Multi-column tables automatically transform into mobile stacked cards (`.responsive-table`) or horizontal scroll containers.
5. **Modals & Dialogs**:
   - Bottom-sheet slide ups (`max-h-[92dvh] overflow-y-auto`) with safe-area bottom padding (`pwa-safe-bottom`).
6. **Layout Containers**:
   - Flexible column grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) with max-width containment (`max-w-7xl mx-auto px-4 sm:px-6`).

---

## 2. Responsive Coverage Matrix

| Role | Route | 320 | 390 | 430 | 768 | 1024 | Desktop | Overflow | Navigation | Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Public** | `/` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Sticky Header / Mobile Drawer | ✅ Complete |
| **Public** | `/features` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/solutions` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/pricing` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/about` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/contact` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/help` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/privacy` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Public** | `/terms` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Top Header Nav | ✅ Complete |
| **Auth** | `/login` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Centered Card Layout | ✅ Complete |
| **Auth** | `/register` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Multi-Step Stepper | ✅ Complete |
| **Auth** | `/forgot-password` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Centered Card Layout | ✅ Complete |
| **Auth** | `/reset-password` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Centered Card Layout | ✅ Complete |
| **Auth** | `/verify-email` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Centered Card Layout | ✅ Complete |
| **Auth** | `/select-workspace` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Role Grid / Selector | ✅ Complete |
| **Onboarding**| `/onboarding` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Onboarding**| `/onboarding/welcome` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Onboarding**| `/onboarding/livelihood` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Onboarding**| `/onboarding/basic-profile` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Onboarding**| `/onboarding/location` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Onboarding**| `/onboarding/production` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Onboarding**| `/onboarding/review` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Onboarding Flow Header | ✅ Complete |
| **Demo** | `/demo` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Hub Grid | ✅ Complete |
| **Demo** | `/demo/onboarding/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Mode-Aware Onboarding | ✅ Complete |
| **Demo** | `/demo/farmer/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Farmer Nav | ✅ Complete |
| **Demo** | `/demo/fisher/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Fisher Nav | ✅ Complete |
| **Demo** | `/demo/coop/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Coop Shell | ✅ Complete |
| **Demo** | `/demo/buyer/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Buyer Shell | ✅ Complete |
| **Demo** | `/demo/processor/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Processor Shell | ✅ Complete |
| **Demo** | `/demo/transport/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Transport Shell | ✅ Complete |
| **Demo** | `/demo/government/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Gov Shell | ✅ Complete |
| **Demo** | `/demo/finance/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Finance Shell | ✅ Complete |
| **Demo** | `/demo/admin/*` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Demo Banner + Admin Shell | ✅ Complete |
| **Farmer** | `/farmer` (Dashboard) | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar / SubNav | ✅ Complete |
| **Farmer** | `/farmer/farms` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/crops` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/harvests` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/sales` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/expenses` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/inventory` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/warehouse` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/ledger` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/logs` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/sync` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/profile` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Farmer** | `/farmer/profile/[section]` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Farmer Bottom Bar | ✅ Complete |
| **Fisher** | `/fisher` (Dashboard) | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Fisher Bottom Bar | ✅ Complete |
| **Fisher** | `/fisher/trips` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Fisher Bottom Bar | ✅ Complete |
| **Fisher** | `/fisher/catches` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Fisher Bottom Bar | ✅ Complete |
| **Fisher** | `/fisher/profile` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Fisher Bottom Bar | ✅ Complete |
| **Fisher** | `/fisher/profile/[section]` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Fisher Bottom Bar | ✅ Complete |
| **Coop** | `/coop/dashboard` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Coop Bottom Bar / Sidebar | ✅ Complete |
| **Coop** | `/coop/farmers` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Responsive Table / Cards | ✅ Complete |
| **Coop** | `/coop/inventory` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Responsive Table / Cards | ✅ Complete |
| **Coop** | `/coop/listings` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Responsive Grid | ✅ Complete |
| **Coop** | `/coop/orders` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Responsive Table / Cards | ✅ Complete |
| **Coop** | `/coop/negotiations` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Responsive Chat / Panel | ✅ Complete |
| **Buyer** | `/buyer/dashboard` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Buyer Drawer / Sidebar | ✅ Complete |
| **Buyer** | `/buyer/orders` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Buyer Drawer / Sidebar | ✅ Complete |
| **Buyer** | `/buyer/suppliers` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Buyer Drawer / Sidebar | ✅ Complete |
| **Market** | `/market` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Product Grid / Filters Sheet | ✅ Complete |
| **Market** | `/market/products/[id]` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Sticky Order Bar | ✅ Complete |
| **Admin** | `/admin` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Admin Mobile Drawer | ✅ Complete |
| **Admin** | `/admin/users` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Admin Mobile Drawer | ✅ Complete |
| **Admin** | `/admin/cooperatives` | PASS | PASS | PASS | PASS | PASS | PASS | NONE | Admin Mobile Drawer | ✅ Complete |
