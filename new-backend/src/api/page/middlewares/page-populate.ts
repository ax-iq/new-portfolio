/**
 * `page-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  blocks: {
    on: {
      'block.experience-grid': { 
        populate: { 
          experiences: { 
            populate: {
              tags: {
                populate: {}
              },
              companyLogo: {
                populate: {},
                fields: ['alternativeText', 'name', 'url'],
              },
              image: {
                populate: {},
                fields: ['alternativeText', 'name', 'url'],
              },
              links: {
                populate: {},
              },
            }
          }
        } 
      },
      'block.profile': {
        populate: {
          image: {
            populate: {},
            fields: ['alternativeText', 'name', 'url'],
          },
        }
      }
    }
  }
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In page-populate middleware.');
    ctx.query.populate = populate;
    await next();
  };
};
