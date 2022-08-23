import 'reflect-metadata';
import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import type { ServerConfig } from './_config/server-config';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

dotenv.config();

const typeDefs = gql`
  type Item {
    name: String
  }

  type Query {
    items: [Item]
  } 
`;

const items = [
  {
    name: 'a'
  }
];

const resolvers = {
  Query: {
    items: () => items,
  },
};

export default async function startServer(
  config: ServerConfig,
): Promise<ApolloServer> {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.SERVER_STAGE === 'prod'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
  });

  try {
    await server.listen(config.apolloPort);
    console.log(
      `Apollo server started at: http://localhost:${config.apolloPort}/`,
    );
  } catch (error: any) {
    throw new Error(`Unable to start Apollo server: ${error.message}`);
  }
  try {
    await mongoose
      .connect(config.uri)
      .then(() => console.log('Connected to database'));
  } catch (error) {
    console.log(error);
  }

  if (config.verbose) console.log('mongodb started at uri: ', config.uri);
  return server;
}