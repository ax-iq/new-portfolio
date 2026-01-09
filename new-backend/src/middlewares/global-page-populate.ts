/**
 * `global-page-populate` middleware
 */

import type { Core } from '@strapi/strapi';

// const populate = {
//   pageZone: {
//     on: {
//       'block.experience-grid': {
//         populate: {
//           experiences: {
//             populate: {
//               tags: {
//                 populate: true,
//               },
//               companyLogo: {
//                 populate: true,
//                 fields: ['name'],
//               },
//               image: {
//                 populate: true,
//                 fields: ['name'],
//               },
//               links: {
//                 populate: true,
//               },
//             },
//           },
//         },
//       },
//     },
//   }
// };

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In global-page-populate middleware.');
    // ctx.query.populate = populate;
    // console.log('Default populate applied to', ctx.request.path);
    // console.log(ctx.query);
    await next();
  };
};
