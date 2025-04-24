import logger from './logger.mjs';
import { singpassClient } from './singpassClient.mjs';

export async function handleUserInfo(ctx) {
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
    ctx.body = { ...userInfo };
  } catch (err) {
    console.error(err);
    ctx.status = 401;
  }
}