import { test as base} from '@playwright/test';
import {App} from "../../pagesFacade/app.page";
import {Api} from '../../services/api.service';

export const test = base.extend({

    webApp: async ({page}, use) => {
        let app = new App(page);
        await main.open;
        await use(app)
    },
    api: async ({request}, use) => {
        let api = new Api(request);
        await use(api);
    },
});