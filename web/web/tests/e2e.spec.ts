import { test, expect } from '@playwright/test';

test('home carga y tiene título', async ({ page, baseURL }) => {
  await page.goto(baseURL!);
  await expect(page).toHaveTitle(/Terapia|Silvia|Flores/i);
});
