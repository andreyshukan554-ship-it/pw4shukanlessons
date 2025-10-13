import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { App } from '../src/pagesV3/app.page';
import { UserBuilder } from '../src/helpers/builders/index';


test.describe('Регистрация', () => {
//    test.beforeEach(async ({ page }) => {
//        await page.goto(URL);
//    });

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

        await app.main.open();

        await app.main.gotoRegister();
        await app.register.register(user);



        // todo переделать ассерт
        await expect(app.register.emailErrorText).toContainText(
            'Email already exists.. try logging in',
        );
    });
});
