import { expect } from '@playwright/test';

import {test} from '../src/helpers/fixtures/index';

import {Api} from '../src/services/api.service';

let token;


test.describe('Challenge', () => {

    test.beforeAll(('authorization get token', async ({api}, testInfo) => {




        let r = await api.challenger.post(testInfo)

        const headers = r.headers();
        token = headers["x-challenger"];
        console.log(token);

    }))

    test.only('Get challenges', async ({api}, testInfo) => {


        let body = await api.challenges.get(testInfo, token);

        expect(body.challenges.length).toBe(59);

    });

});