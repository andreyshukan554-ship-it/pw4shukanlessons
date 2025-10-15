import { test, expect } from '@playwright/test';
//import { faker } from '@faker-js/faker';
import { App } from '../src/pagesFacade/app.page';
import { UserBuilder } from '../src/helpers/builders/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Регистрация', () => {
    test.skip(async ({ page }) => {
        await page.goto(URL);
    });

    test.skip('Пользователь не может зарегистрироваться повторно', async ({
                                                                              page,
                                                                          }) => {

        const user = new UserBuilder()
            .addEmail()
            .addPassword()
            .addName()
            .generate();

        console.log(user);

        let app = new App(page);

        await app.main.gotoRegister();
        await app.register.register(user);

        // todo переделать ассерт
        await expect(app.register.emailErrorText).toContainText(
            'Email already exists.. try logging in',
        );
    });
});
