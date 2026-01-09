/**
 * `global-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  favicon: {
    populate: {},
    fields: ['alternativeText', 'name', 'url'],
  },
  defaultSeo: {
    populate: {
      shareImage: {
        populate: {},
        fields: ['alternativeText', 'name', 'url'],
      },
    },
  },
  navBar: {
    populate: {
      navItems: {
        populate: {},
      },
      logo: {
        populate: {},
        fields: ['alternativeText', 'name', 'url'],
      },
    },
  },
  footer: {
    populate: {
      links: {
        populate: {},
      },
    },
  }
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In global-populate middleware.');
    ctx.query.populate = populate;
    await next();
  };
};
