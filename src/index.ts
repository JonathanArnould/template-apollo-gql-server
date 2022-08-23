import configServer from './_config/server-config';
import startServer from './server';
import dotenv from 'dotenv';

dotenv.config()

const { SERVER_STAGE } = process.env;

if (!SERVER_STAGE) {
    throw new Error('SERVER_STAGE must be defined');
}

startServer(configServer[SERVER_STAGE]);
