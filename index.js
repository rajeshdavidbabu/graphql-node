import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// schemas and resolvers are building blocks of graphql application
// the graphQL Implementation demands them both
import typeDefs from './schema';
import resolvers from './resolver';
import { makeExecutableSchema } from 'graphql-tools';

// GraphQl needs an executable schema which combines the typeDefs and resolvers from
// our local schema and resolver file
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


const PORT = 3000;

const app = express();

const graphqlEndpoint = '/graphql';

// bodyParser is needed just for POST.
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));
// this is where were are going to access our graphql endpoint ,more like a playground for graphql
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

app.listen(PORT);