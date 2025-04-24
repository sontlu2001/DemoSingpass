import { Issuer, custom } from 'openid-client';
import dotenv from 'dotenv';
dotenv.config();

const singpassIssuer = await Issuer.discover(process.env.ISSUER_URL);

export const singpassClient = new singpassIssuer.Client(
  {
    client_id: process.env.CLIENT_ID,
    response_types: ['code'],
    token_endpoint_auth_method: 'private_key_jwt',
    id_token_signed_response_alg: 'ES256',
    userinfo_encrypted_response_alg: JSON.parse(process.env.KEYS_PRIVATE_ENC_KEY).alg,
    userinfo_encrypted_response_enc: 'A256GCM',
    userinfo_signed_response_alg: JSON.parse(process.env.KEYS_PRIVATE_SIG_KEY).alg,
  },
  {
    keys: [
      JSON.parse(process.env.KEYS_PRIVATE_SIG_KEY),
      JSON.parse(process.env.KEYS_PRIVATE_ENC_KEY),
    ],
  }
);

custom.setHttpOptionsDefaults({
  timeout: 15000,
});