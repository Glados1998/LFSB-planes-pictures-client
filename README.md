# LFSB Planes Pictures Client

Frontend for a multilingual aviation photography gallery backed by Strapi. The application uses the Next.js Pages Router
and supports French, English, and German.

## Requirements

- Node.js 22 LTS
- npm 10 or later
- A reachable Strapi instance with the aircraft, operator, aircraft-type, and visitor-counter endpoints

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment example to `.env` and set the Strapi API base URL:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

`STRAPI_API_URL` is exposed to the browser by `next.config.js`; it must contain only the public API base URL and never a
secret or access token.

## Verification

Run the complete frontend verification sequence before opening a pull request:

```bash
npm run lint
npm test
npm run build
```

The tests use Node's built-in test runner and cover query construction, date fallbacks, session storage, and
translation-key parity.
The same sequence runs automatically in GitHub Actions for pushes and pull requests.

## Project structure

- `src/pages` — Next.js routes and localized static props
- `src/components` — site components and reusable UI primitives
- `src/lib` — API client, query construction, and browser-session utilities
- `src/hooks` — visitor-counter behavior
- `messages` — French, English, and German translations
- `utils` — image metadata and date formatting
- `test` — frontend unit tests

## API boundary

The frontend expects `STRAPI_API_URL` to end at the Strapi API root, for example `https://example.com/api`.

The current Strapi aircraft-type collection uses the legacy endpoint spelling `aircarft-types`. It is intentionally
isolated in `src/components/gallerFilter.js` until the backend content type can be migrated.

Client requests use a shared Axios instance with a 15-second timeout. Gallery, filter-option, aircraft-detail, and
visitor-counter requests cancel obsolete work when their components unmount or their inputs change.

## Localization

Next.js locale routing is configured for:

- `fr` — default
- `en`
- `de`

When adding a message, add the same key to all three JSON files. `npm test` checks that the key sets remain identical.
