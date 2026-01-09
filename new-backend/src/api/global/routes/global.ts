/**
 * global router.
 */

import { factories } from '@strapi/strapi';

const cfg = {
    config: {
        find: {
            middlewares: ["api::global.global-populate"]
        }
    }
}

export default factories.createCoreRouter('api::global.global', cfg);
