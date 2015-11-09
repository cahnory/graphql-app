import router from 'koa-router';
import koaGraphql from 'koa-graphql';

import fs from 'fs';
import path from 'path';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
let exportSchema = (schema, dest) => {
  async () => {
    var result = await (graphql(schema, introspectionQuery));
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      let json = JSON.stringify(result, null, 2);
      if (!fs.existsSync(dest + '.json') || json !== fs.readFileSync(dest + '.json', 'utf-8')) {
        fs.writeFileSync(dest + '.json', JSON.stringify(result, null, 2));
      }
    }
  }();

  // Save user readable type system shorthand of schema
  let print = printSchema(schema);
  if (!fs.existsSync(dest + '.graphql') || print !== fs.readFileSync(dest + '.graphql', 'utf-8')) {
    fs.writeFileSync(dest + '.graphql', print);
  }
};

export default function (app) {
  let schema = require('../schema');
  let params = [
    koaGraphql(function (req, ctx) {
      return {
        schema: schema,
        rootValue: {
          app: app,
          ctx: ctx,
          session: ctx.session
        }
      };
    })
  ];

  exportSchema(schema, path.join(__dirname, '../schema/schema'));

  app.use(router().post('/graphql', ...params).routes());
  // conveniance
  //app.use(router().get('/_graphql', ...params).routes());
}