import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://dev2-erp-new.webcom-dev.by/auth/signin/');
    await page.getByPlaceholder('Логин').click();
    await page.getByPlaceholder('Логин').fill('a.shukan');
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill('1Axz2zKem');
    await page.getByPlaceholder('Пароль').press('Enter');
    await page.locator('#toggleSidebarBtn').click();
    await page.getByRole('link', { name: 'Партнеры' }).click();
    await page.getByRole('link', { name: 'Сайтодром Центр' }).click();
    await page.locator('div:nth-child(4) > .MuiBox-root > .MuiStack-root > .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall.css-1n68rp3').click();
    await page.getByRole('textbox', { name: 'Имя' }).click();
    await page.getByRole('textbox', { name: 'Имя' }).fill('Юлия2');
    await page.getByRole('button', { name: 'Сохранить' }).click();
    await expect(page.locator('#main')).toContainText('Юлия2');
});