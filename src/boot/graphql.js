import router from 'koa-router';
import graphql from 'koa-graphql';

export default function (app) {
  app.use(router().get('/graphql', graphql({
    schema: require('../schema/index.js')
  })).routes());
}

//import { printSchema } from 'graphql/utilities';