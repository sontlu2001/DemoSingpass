import { Issuer, generators, custom } from 'openid-client';
import * as crypto from 'crypto';
import Router from '@koa/router';
import dotenv from 'dotenv';
import { log } from 'console';
import logger from './logger.mjs';
dotenv.config();

const singpassIssuer = await Issuer.discover(process.env.ISSUER_URL);

const singpassClient = new singpassIssuer.Client(
  {
    // All the hardcoded values used below are taken from Singpass' OpenID Provider Metadata,
    // which can be found at config.ISSUER_URL + '/.well-known/openid-configuration'
    client_id: process.env.CLIENT_ID,
    response_types: ['code'],
    token_endpoint_auth_method: 'private_key_jwt',
    id_token_signed_response_alg: 'ES256',
    userinfo_encrypted_response_alg: JSON.parse(process.env.KEYS_PRIVATE_ENC_KEY).alg,
    userinfo_encrypted_response_enc: 'A256GCM',
    userinfo_signed_response_alg: JSON.parse(process.env.KEYS_PRIVATE_SIG_KEY).alg,
  },
  { keys: [
    JSON.parse(process.env.KEYS_PRIVATE_SIG_KEY), 
    JSON.parse(process.env.KEYS_PRIVATE_ENC_KEY)
  ] }
);

custom.setHttpOptionsDefaults({
  timeout: 15000,
});

// This demo uses Koa for routing.

const router = new Router();

router.get('/login', async function handleLogin(ctx) {
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);
  const nonce = crypto.randomUUID();
  const state = crypto.randomBytes(16).toString('hex');
  ctx.session.auth = { code_verifier, nonce, state };
  logger.info(`Login request: ${JSON.stringify(ctx.session.auth)}`);

  // Authorization request
  const authorizationUrl = singpassClient.authorizationUrl({
    redirect_uri: process.env.REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge,
    nonce,
    state,
    scope: process.env.SCOPES,
  });

  logger.info(`Authorization URL: ${authorizationUrl}`);
  ctx.redirect(authorizationUrl);
});

router.get('/callback', async function handleSingpassCallback(ctx) {
  try {
    const receivedQueryParams = ctx.request.query;
   
    logger.info(`Received query params: ${JSON.stringify(receivedQueryParams)}`);
    logger.info(`Session auth: ${JSON.stringify(ctx.session.auth)}`);

    ctx.redirect(`${process.env.REDIRECT_FROND_END}?${ctx.request.querystring}`);
  } catch (err) {
    console.error(err);
    ctx.status = 401;
  }
});

router.get('/user-info', async function handleUserInfo(ctx) {
  try {
    const receivedQueryParams = ctx.request.query;
    const { code_verifier, nonce, state } = ctx.session.auth;

     // Token request
     const tokenSet = await singpassClient.callback(process.env.REDIRECT_URI, receivedQueryParams, {
      code_verifier,
      nonce,
      state,
    });
    logger.info(`Token set: ${JSON.stringify(tokenSet)}`);
    
    
    const userInfo = await singpassClient.userinfo(tokenSet);
    logger.info(`User info: ${JSON.stringify(userInfo)}`);
    ctx.status = 200;
    ctx.body = {...userInfo };
  }
  catch (err) {
    console.error(err);
    ctx.status = 401;
  }
})

export { router };
