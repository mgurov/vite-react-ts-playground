import { test, expect } from '@playwright/test';

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

test('parameterized calls', async ({ page }) => {

  await page.route('https://swapi.dev/api/people/${id}/', route => {
    route.fulfill({json: {name: 'Luke Skywalker', id: '1'}});
  });

  await page.goto('/routing-demo/swapi/people/1');

  await expect(page.getByTestId('routed')).toHaveText('Luke Skywalker');
});