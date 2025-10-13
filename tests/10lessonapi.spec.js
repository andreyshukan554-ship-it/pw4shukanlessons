import { test, expect } from '@playwright/test';
import {ChallengerService} from '../src/services/index';
//const URL = "https://apichallenges.eviltester.com"
import {Api} from '../src/services/api.service';

let token;

/*
test.describe('Challenge', () => {

    test.beforeAll(('authorization', async ({request}, testInfo) => {

        console.log(testInfo.project.use.apiURL);
        const r = await request.post(`${testInfo.project.use.apiURL}/challenger`);

        const headers = r.headers();
        console.log(headers);
        token = headers["x-challenger"]

    }))

    test('Get challenges', async ({request}, testInfo) => {


        const resp = await request.get(`${testInfo.project.use.apiURL}/challenges`, {headers:
                {"x-challenger": token}
        });

        const body = await resp.json();
        expect(body.challenges.length).toBe(59);

    });

});
*/

test.describe('Challenge with service pattern', () => {

    test.skip('authorization get token', async ({request}, testInfo) => {

        const challengerService = new ChallengerService(request);

        let r = await challengerService.post(testInfo)

        const headers = r.headers();
        token = headers["x-challenger"];
        console.log(token);
    });
    test.skip('authorization get token with facade', async ({request}, testInfo) => {

        const api = new Api(request);


        let r = await api.challenger.post(testInfo)

        const headers = r.headers();
        token = headers["x-challenger"];
        console.log(token);
    });

});