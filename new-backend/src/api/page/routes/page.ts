/**
 * page router
 */

import { factories } from '@strapi/strapi';

const cfg = {
    config: {
        find: {
            middlewares: ["api::page.page-populate"]
        },
        findOne: {
            middlewares: ["api::page.page-populate"]
        },
    }
}

export default factories.createCoreRouter('api::page.page', cfg);
