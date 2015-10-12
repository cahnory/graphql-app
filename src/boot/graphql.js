import router from 'koa-router';
import graphql from 'koa-graphql';

export default function (app) {
  app.use(router().get('/graphql', graphql({
    schema: require('../data/schema')
  })).routes());
}

//import { printSchema } from 'graphql/utilities';