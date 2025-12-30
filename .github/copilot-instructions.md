# Copilot instructions for ECommerce-JS-NTI

Purpose
- Help an AI coding agent quickly become productive in this repository: a small static frontend that displays and filters products from an external API.

Big picture
- This is a static front-end project. The app is served by opening `INDEX.HTML` (or via a simple static server).
- Core responsibilities:
  - `INDEX.HTML`: page layout and DOM elements (selects, inputs, product container, cart UI).
  - `js/main.js`: single JavaScript module that fetches product data (from `https://fakestoreapi.com`), renders product cards, filters, search, pagination functions (`page1()`..`page4()`), and manages an in-memory `cart` array.
  - `css/`: styling (Bootstrap + `style.css`).

Important patterns and conventions (from repository)
- DOM IDs are authoritative: `categorySelect`, `products`, `searchInput`, `cartItems`, `totalQty`, `totalPrice`, `applyFilter`, `minPrice`, `maxPrice`. When modifying UI, keep these IDs or update both the HTML and `js/main.js` together.
- `js/main.js` uses global variables and inline event handlers (e.g., `onclick="addToCart(id)"`). Prefer minimal-invasive changes: if refactoring, keep backward-compatible function names.
- Data flow: `fetch()` → `products` array (global) → `displayProducts()` renders into `#products`. Cart is client-only (no persistence).

Integration points & external dependencies
- External API: `https://fakestoreapi.com/products` and `/products/categories`. Network availability affects app behavior — tests or dev work should mock or stub these endpoints.
- No build step or package manifest detected; use a static server for local development (e.g., VS Code Live Server or `python -m http.server`).

Developer workflows
- Run locally: open `INDEX.HTML` or run a static server in the repo root:
  ```bash
  # Python 3
  python -m http.server 8000
  # then open http://localhost:8000/
  ```
- Debugging: use browser DevTools. Key places to inspect:
  - Network tab for calls to `fakestoreapi.com`.
  - Console for `console.log(products)` in `js/main.js`.

Guidance for code edits (concise, actionable)
- When changing UI element IDs or adding fields, update both `INDEX.HTML` and `js/main.js` in the same commit.
- Preserve existing public function names used by inline handlers: `addToCart`, `showProductDetails`, `page1`, `page2`, `page3`, `page4`, `renderCart`, `removeItem`, `displayProducts`.
- For feature additions (example: persist cart to localStorage): add reads/writes in `addToCart()`, `removeItem()`, and on page load initialize `cart` from storage — keep changes small and test in the browser.

Examples (from `js/main.js`)
- Rendering product card (template string): change layout by editing `displayProducts()` where `productsDiv.innerHTML +=` is used.
- Filtering: `categorySelect.addEventListener('change', ...)` and `searchInput.addEventListener('input', ...)` are the two places to extend filtering logic.

When to prefer larger refactors
- If you convert to modular code (ES modules / bundler), split `js/main.js` into logical modules (api, ui, cart) and add a simple build step only if necessary. Communicate that change in a top-level README.

When you need more context
- Ask for the current intended learning goals for this project (is it a teaching exercise, proof-of-concept, or production prototype?). That determines how much refactor and tests are appropriate.

If anything above is unclear, tell me which area to expand (DOM map, network flows, or suggested refactor).
