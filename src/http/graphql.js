import graphqlHTTP from 'koa-graphql';
import schema from '../shema';

export default function () {
  return graphqlHTTP({schema: schema});
}

//import { printSchema } from 'graphql/utilities';