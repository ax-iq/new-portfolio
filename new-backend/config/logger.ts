
'use strict';

import {
  winston,
  // formats: { prettyPrint, levelFilter },
} from '@strapi/logger';

export default {
  level: 'http',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(
      // {
      //   level: 'http',
      //   format: winston.format.combine(
      //     levelFilter('http'),
      //     prettyPrint({ timestamps: 'YYYY-MM-DD hh:mm:ss.SSS' })
      //   ),
      // }
    ),
  ],
};