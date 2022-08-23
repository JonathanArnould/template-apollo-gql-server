import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export type ServerConfig = {
  uri: string;
  apolloPort: number;
  autoListen: boolean;
  verbose: boolean;
};

interface AllServerConfig {
  [key: string]: ServerConfig
}

const serverConfig: AllServerConfig = {
  dev: {
    uri: 'mongodb://localhost:27017/tmdb_graphql-dev',
    apolloPort: 5000,
    autoListen: false,
    verbose: true,
  },
  prod: {
    uri: 'mongodb://localhost:27017/tmdb_graphql-prod',
    apolloPort: 5000,
    autoListen: false,
    verbose: true,
  },
  test: {
    uri: 'mongodb://127.0.0.1:27017/tmdb_graphql-test',
    apolloPort: 8000,
    autoListen: true,
    verbose: false,
  },
};

export default serverConfig;