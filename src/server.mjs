import { router } from './router.mjs';
import * as crypto from 'crypto';
import Koa from 'koa';
import logger from 'koa-logger';
import serve from 'koa-static';
import session from 'koa-session';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
dotenv.config();


function createInMemorySessionStore() {
  const map = new Map();
  return {
    get: map.get.bind(map),
    set: map.set.bind(map),
    destroy: map.delete.bind(map),
  };
}

const corsOptions = {
  origin: process.env.CORS_ORIGIN_URLS.split(","), 
  credentials: true
};

const app = new Koa();

// (Optional) Log all requests to this server
app.use(logger());
app.use(cors(corsOptions));

// Manage sessions using an in-memory session store and signed, SameSite=Lax, HttpOnly cookies
app.keys = [crypto.randomBytes(8).toString('hex')];
app.use(session({ store: createInMemorySessionStore(), sameSite: 'lax', httpOnly: true }, app));
app.use(bodyParser());

// Serve the backend routes
app.use(router.routes()).listen(process.env.SERVER_PORT);

console.log(`[INFO]: Server started at http://localhost:${process.env.SERVER_PORT}\n`);
