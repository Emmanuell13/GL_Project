import { test, expect } from '@playwright/test';

test('rejects wrong credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('demo@example.com');
  await page.getByLabel('Password').fill('wrongpass1');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('logs in with the demo account', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('demo@example.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByTestId('login-button').click();
  await expect(page.getByText('You are logged in.')).toBeVisible();
});
