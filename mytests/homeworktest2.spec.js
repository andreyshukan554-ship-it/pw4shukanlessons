import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const URL = 'https://dev2-erp-new.webcom-dev.by/auth/signin/';
//креды авторизации
const login = 'a.shukan';
const password = '1Axz2zKem';

//Выносим селекторы в константы

const LOGIN_INPUT_TEXT = 'Логин';
const PASSWORD_INPUT_TEXT = 'Пароль';
const SIDE_BAR_TOGLLE_BUTTON = '#toggleSidebarBtn';
const MENU_ITEM_PARTNERS = 'Партнеры';
const PARTNER_SEARCH_FIELD_INPUT_TEXT = 'Поиск';
//TO DO ПЕРЕПИСАТЬ СЕЛЕКТОР ДЛЯ CONTACT_EDIT_BUTTON
const CONTACT_EDIT_BUTTON = 'div:nth-child(4) > .MuiBox-root > .MuiStack-root > .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall.css-1n68rp3'
const CONTACT_NAME_INPUT_TEXT = 'Имя';
const CONTACT_SAVE_BUTTON = 'Сохранить';

//выносим шаги в переменную
const authorization = async (page, login, password) => {
    await page.goto(URL);
    await page.getByPlaceholder(LOGIN_INPUT_TEXT).click();
    await page.getByPlaceholder(LOGIN_INPUT_TEXT).fill(login);
    await page.getByPlaceholder(PASSWORD_INPUT_TEXT).click();
    await page.getByPlaceholder(PASSWORD_INPUT_TEXT).fill(password);
    await page.getByPlaceholder(PASSWORD_INPUT_TEXT).press('Enter');
};

test.describe('Редактирование партнера', () => {
    test.beforeEach(async ({page,}) => {
        await authorization(page, login, password);
    });

    test('Редактирование контакта партнера', async ({page,}) => {

        //задаем переменные для теста
        let partnerName = 'Сайтодром Центр';
        let newContactName = faker.person.firstName();

        await page.locator(SIDE_BAR_TOGLLE_BUTTON).click();
        await page.getByRole('link', { name: MENU_ITEM_PARTNERS }).click();
        await page.getByRole('textbox', { name: PARTNER_SEARCH_FIELD_INPUT_TEXT }).click();
        await page.getByRole('textbox', { name: PARTNER_SEARCH_FIELD_INPUT_TEXT }).fill(partnerName);
        await page.getByRole('link', { name: partnerName }).click();
        await page.locator(CONTACT_EDIT_BUTTON).click();
        await page.getByRole('textbox', { name: CONTACT_NAME_INPUT_TEXT }).click();
        await page.getByRole('textbox', { name: CONTACT_NAME_INPUT_TEXT }).fill(newContactName);
        await page.getByRole('button', { name: CONTACT_SAVE_BUTTON }).click();
        await expect(page.locator('#main')).toContainText(newContactName);
    });
});
