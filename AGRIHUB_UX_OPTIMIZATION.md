# AgriHub PH Farmer UX Optimization & Low-Click Workflow Report

This document records the user-experience optimizations, interaction reductions, pre-filling rules, and mobile responsiveness standards applied across AgriHub PH.

---

## Farmer Experience Core Usability Principle

> **"Less effort, fewer clicks, clearer actions."**

Farmers in rural areas (e.g. Benguet, La Trinidad, Tublay) often operate on low-end Android mobile devices with outdoor sunlight visibility challenges and intermittent internet connection. The AgriHub PH Farmer PWA minimizes navigation depth, pre-fills known context, isolates non-essential fields under progressive disclosure, and provides instant local persistence with a 15-second Undo safety net.

---

## Before & After Farmer Workflow Comparisons

| Workflow | Previous Interactions | New Optimized Interactions | Fields Prefilled | Validation Required | Offline Behavior |
|---|---|---|---|---|---|
| **Add Basic Expense** | 7-8 clicks (Nav -> Ledger -> Expenses -> New -> Form -> Select Farm -> Select Category -> Save -> View) | **3-4 clicks** (Dashboard Quick Log 'Expense' -> Type Amount & Description -> Tap Save) | Date (today), Currency (₱), Farm (last used memory/URL), Plot (last used memory) | Description != empty, Amount > 0 | Saved instantly to Dexie + `syncQueue`. 15s Undo banner shown. |
| **Record Harvest** | 8-9 clicks (Nav -> Logs -> Harvests -> New -> Select Farm -> Select Plot -> Weight -> Storage -> Save) | **4-5 clicks** (Dashboard Quick Log 'Harvest' -> Crop & Weight -> Save to Storage option -> Save) | Date (today), Farm & Plot (last used memory), Unit (kg), Storage location (default) | Crop != empty, Weight > 0 | Saved locally to `harvests` & `inventoryItems` with idempotency key. |
| **Record Sale** | 7-8 clicks (Nav -> Ledger -> Sales -> New -> Crop -> Weight -> Price -> Calculate -> Save) | **3-4 clicks** (Harvest detail or Quick Sale -> Weight & Price -> Save) | Crop (from harvest context), Date (today), Buyer (default wholesaler) | Weight > 0, Price > 0 | Deducts stock from `inventoryItems` after stock check & saves to Dexie. |
| **Log Field Activity** | 6-7 clicks (Nav -> Activities -> New -> Select Cycle -> Select Type -> Desc -> Save) | **3-4 clicks** (Dashboard Quick Log 'Activity' -> Activity Type -> Description -> Save) | Date (today), Farm & Crop Cycle (from active cycle context) | Description != empty | Saved instantly to Dexie `fieldActivities`. |
| **Adjust Inventory** | 7-8 clicks (Nav -> Warehouse -> Items -> Select Item -> Adjust -> Type -> Qty -> Save) | **3-4 clicks** (Dashboard Quick Log 'Inventory' -> Item & Qty -> Save) | Storage location (default), Date (today), Action (USE/ADD) | Qty > 0, Negative inventory blocked unless CORRECTION confirmed | Saved to Dexie `inventoryTransactions` and updates `inventoryItems`. |
| **View Pending Sync** | 3-4 clicks (Nav -> More -> Sync Status) | **1 tap** (Clicking Header Sync Badge) | Current network state, Pending count | None | Renders live queue state directly from Dexie `syncQueue`. |
| **Open Profile** | 3-4 clicks (Nav -> More -> Profile) | **1 tap** (Clicking Header User Badge) | Name, Mobile, Location, Farms count, Sync status | None | Renders offline from Dexie `localSession`. |
| **Change Language** | 4-5 clicks (Nav -> Settings -> Preferences -> Language) | **2-3 taps** (Profile -> Quick Action 'Settings' -> Select Language) | Current language setting | None | Persisted in local app preferences. |

---

## Progressive Disclosure & Form Simplification Rules

1. **Main Fields (Always Visible)**:
   - Primary identifier / Type / Category
   - Amount or Quantity
   - Description / Notes
   - Save Button
2. **More Details (Expandable `<details>` Accordion)**:
   - Associated Farm / Plot / Crop Cycle
   - Supplier / Store
   - Unit Price / Sub-totals
   - Safety Interval / Application Rates
   - Technical & Metadata fields

---

## Fast-Save & Temporary Undo Window

- When a farmer saves a record using the fast-save pattern, the record is immediately saved to IndexedDB (`db.[table]`) and queued in `db.syncQueue`.
- A 15-second floating banner confirms success and offers a 1-tap **Undo** button.
- Tapping **Undo** removes the newly created record from local Dexie storage and deletes its associated `syncQueue` item.

---

## Role Profile Architecture Summary

- **Farmer Profile (`/farmer/profile`)**: Mobile-first, Dexie-backed, completion widget, quick action cards, offline edits queued for sync.
- **Cooperative Profile (`/coop/profile`)**: Dual tabs for Personal User vs Cooperative Organization details. Enforces read-only controls for non-admin coop staff.
- **Buyer Profile (`/buyer/profile`)**: Personal details, B2B Organization info, and Delivery Address list with procurement quick actions.
- **Administrator Profile (`/admin/profile`)**: Personal details, Security & MFA summary, Audit Log shortcuts, protected against self-escalation.
