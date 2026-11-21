# Getting started with Playwright

```bash
npm install -D @playwright/test
npx playwright install
npx playwright install chromium/firefox/webkit
npm init playwright@latest
npx playwright --version
npx playwright test
npx playwright show-report
npx playwright test --headed
npx playwright test tests/intro.spec.js
npx playwright test tests/intro.spec.js --headed
npx playwright test -g "Google title test"
npx playwright test --project=chromium
npx playwright codegen --browser chromium https://www.google.com
npx playwright codegen --browser chromium https://saucedemo.com
npx playwright test --headed --project=chromium
npx playwright test --project=chromium --ui
npx playwright test tests/formElements.spec.ts --project=chromium --headed --workers=1
npx playwright test --project=api --project=chromium

```

## SauceDemo framework

The default suite uses the framework specs under `tests/ui`:

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:chromium -- --headed
npm run report
```

The framework separates responsibilities into:

- `pages/`: page objects and locators
- `fixtures/`: reusable Playwright fixtures, including authenticated setup
- `test-data/`: shared users and test data
- `tests/ui/`: scenarios, tags, and assertions
- `playwright.config.ts`: projects, retries, parallelism, and diagnostics

The original files in `tests/` remain available as Playwright learning exercises, but are excluded from the default framework suite by the `.framework.spec.ts` naming convention.

## API testing

`tests/api/` covers the express backend in `../api-backend`, running against the
`api` project. That project has its own `baseURL` and no browser, so the specs
run once instead of once per device.

```bash
npm run test:api
npx playwright test --project=api --headed   # step through with the inspector
npx playwright test tests/api/users.spec.ts --project=api
```

The API must be running first:

```bash
cd ../api-backend
npm install
npm run dev
```

`globalSetup` fails the run immediately if the API is unreachable, instead of
letting every spec fail with a connection error.

### Layout

- `tests/api/auth.spec.ts`: login, register, and every branch of `authMiddleware`
- `tests/api/users.spec.ts`: user CRUD, 409 on duplicate email, 404, 500
- `tests/api/products.spec.ts`: listing, multipart upload, `save-all`
- `fixtures/authfixture.ts`: `api` (anonymous), `authenticatedRequest` (bearer
  token) and `session` (cookie) contexts
- `test-data/api-data.ts`: unique-email and product factories
- `test-data/registry.ts`: records created rows so teardown can remove them

### Credentials

`TEST_EMAIL` and `TEST_PASSWORD` point at one pre-existing account. `POST
/api/v1/user` sits behind `authMiddleware`, so the suite cannot bootstrap its own
first user and needs that account to sign in with. Every spec it creates uses a
random email so parallel workers and repeat runs never collide.

### Data cleanup

Test users are deleted in `globalTeardown`. Products are **not**: `product.route.js`
exposes only `GET`, `POST` and `POST /save-all`, with no `DELETE`, so created
products cannot be removed over HTTP and teardown prints their ids instead. Add a
`DELETE /api/v1/products/:id` route to close that gap.

