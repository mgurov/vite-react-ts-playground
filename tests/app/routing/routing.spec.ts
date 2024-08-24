import { test, expect } from '@playwright/test';

test('root route', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('routed')).toHaveText('home');
});

test('sub index', async ({ page }) => {
  await page.goto('/sub');

  await expect(page.getByTestId('routed')).toHaveText('sub');
});

test('sub index', async ({ page }) => {
  await page.goto('/sub/nice');

  await expect(page.getByTestId('routed')).toHaveText('nice');
});