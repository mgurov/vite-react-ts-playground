import { test, expect } from './fixtures/ourTest';

test('root route', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('routed')).toHaveText('home');
});

test('sub index', async ({ page }) => {
  await page.goto('/routing-demo');

  await expect(page.getByTestId('routed')).toHaveText('sub');
});

test('sub nice', async ({ page }) => {
  await page.goto('/routing-demo/nice');

  await expect(page.getByTestId('routed')).toHaveText('sub/nice');
});

test('parameterized calls with loading', async ({ page }) => {

  //consoleLogging.ignoreErrorMessagesContaining("No `HydrateFallback` element provided to render during initial hydration")

  let unpause: () => void;
  const responsePromise = new Promise<void>(resolve => {
    unpause = resolve;
  });

  await page.route(`https://swapi.dev/api/people/${1}/`, async route => {
    await responsePromise;
    return route.fulfill({json: {name: 'Proxied Luke Skywalker', id: '1'}});
  });

  await page.goto('/routing-demo/swapi/people/1');

  await expect(page.getByTestId('routed')).not.toBeAttached();

  await expect(page.getByTestId('hydrate-fallback-loading')).toContainText('Loading...');

  unpause!();

  await expect(page.getByTestId('routed')).toHaveText('Proxied Luke Skywalker');
});

test('entity path', async ({ page }) => {

  await page.goto('/routing-demo/entity/4');

  await expect(page.getByTestId('routed')).toHaveText('Entity 4');
});

test('sub entity path', async ({ page }) => {

  await page.goto('/routing-demo/entity/4/sub-entity/42');

  await expect(page.getByTestId('routed')).toHaveText('Entity 4 Subentity 42');
});

test('flat path support', async ({ page }) => {

  await page.goto('/routing-demo/entity/4/flat/42/path');

  await expect(page.getByTestId('routed')).toHaveText('Entity 4 Subentity 42');
});

