const logger = require("../logger");
require("dotenv").config();
/**
 * Myinfo Demo App supports the following environments:
 * 
 * TEST:
 * With Encryption and Signing 
 * Note: The test environment is used for testing your application with the full security measures required in production
 */
const environment = process.env.APP_ENV || "test";
const urlEnvironmentPrefix = environment == "prod" ? "" : `${environment}.`; // test, staging, prod
/**
 * Set the following demo app configurations for the demo app to run
 * APP_CLIENT_ID: Client id provided during onboarding
 * APP_SUBENTITY_ID: optional parameter for platform applications only
 * APP_CLIENT_PRIVATE_SIGNING_KEY : private signing key for client_assertion
 * APP_CLIENT_PRIVATE_ENCRYPTION_KEYS : folder to private encryption keys, allow multiple keys to match multiple encryption keys in JWKS
 * APP_PURPOSE_ID: purpose_id with reference to purpose that will be shown to user on consent page provided during onboarding
 * APP_SCOPES: Space separated list of attributes to be retrieved from Myinfo
 * MYINFO_API_AUTHORIZE: The URL for Authorize API
 */

let APP_CONFIG = {
  APP_CLIENT_ID: process.env.APP_CLIENT_ID, 
  APP_SUBENTITY_ID: process.env.APP_SUBENTITY_ID, //only for platform apps
  APP_CLIENT_PRIVATE_SIGNING_KEY: process.env.APP_CLIENT_PRIVATE_SIGNING_KEY,
  APP_CLIENT_PRIVATE_ENCRYPTION_KEYS: process.env.APP_CLIENT_PRIVATE_ENCRYPTION_KEYS,
  APP_CALLBACK_URL: process.env.APP_CALLBACK_URL,
  APP_PURPOSE_ID: process.env.APP_PURPOSE_ID,
  // "uinfin name sex dob mobileno email vehicles.vehicleno vehicles.chassisno vehicles.engineno regadd",
  APP_SCOPES: process.env.APP_SCOPES,
  MYINFO_API_AUTHORIZE: `https://${urlEnvironmentPrefix}api.myinfo.gov.sg/com/v4/authorize`
};

/**
 * Set following configuration for MyInfo library to call token and person API
 * Based on the environment, the corresponding config will be used.
 * IMPORTANT: DO NOT rename the JSON Keys
 *
 * Myinfo Connector config has the following mandatory parameters:
 *
 * CLIENT_ID: Client id provided during onboarding
 * REDIRECT_URL: Redirect URL for web application
 * SCOPE: Space separated list of attributes to be retrieved from Myinfo
 * AUTHORIZE_JWKS_URL: The URL to retrieve authorize JWKS public key
 * MYINFO_JWKS_URL: The URL to retrieve Myinfo JWKS public key
 * TOKEN_URL: The URL for Token API
 * PERSON_URL: The URL for Person API
 *
 * Optional parameters
 * CLIENT_ASSERTION_SIGNING_KID : kid that will be appended to client_assertion header to match JWKS kid
 * SUBENTITY_ID: optional parameter for platform applications only
 * 
 * Proxy parameters are optional:
 * USE_PROXY: Indicate whether proxy url is used. Values accepted: Y or N
 * PROXY_TOKEN_URL: Configure your proxy url here, if any.
 * PROXY_PERSON_URL: Configure your proxy url here, if any.
 *
 * Miscellaneous parameters:
 * DEBUG_LEVEL
 *
 * Debug level for library logging. i.e 'error, info, debug' leave empty to turn off logs (OPTIONAL)
 * error - Log out all the errors returned from the library
 * info - log urls called, authorization headers and errors from the library
 * debug - Full logs from the library, i.e (errors, urls, authorization headers, API response)
 * NOTE: debug mode should never be turned on in production
 */

let MYINFO_CONNECTOR_CONFIG = {
  CLIENT_ID: process.env.APP_CLIENT_ID,
  SUBENTITY_ID: process.env.APP_SUBENTITY_ID,
  REDIRECT_URL: process.env.APP_CALLBACK_URL,
  SCOPE : process.env.APP_SCOPES,
  AUTHORIZE_JWKS_URL: `https://${urlEnvironmentPrefix}authorise.singpass.gov.sg/.well-known/keys.json`,
  MYINFO_JWKS_URL: `https://${urlEnvironmentPrefix}authorise.singpass.gov.sg/.well-known/keys.json`,
  TOKEN_URL: `https://${urlEnvironmentPrefix}api.myinfo.gov.sg/com/v4/token`,
  PERSON_URL: `https://${urlEnvironmentPrefix}api.myinfo.gov.sg/com/v4/person`,
  CLIENT_ASSERTION_SIGNING_KID : process.env.CLIENT_ASSERTION_SIGNING_KID, // optional parameter to specify specific kid for signing. Default will be thumbprint of JWK
  USE_PROXY: process.env.USE_PROXY,
  PROXY_TOKEN_URL: process.env.PROXY_TOKEN_URL,
  PROXY_PERSON_URL: process.env.PROXY_PERSON_URL,
  DEBUG_LEVEL: process.env.DEBUG_LEVEL
};

logger.info("MYINFO_CONNECTOR_CONFIG", MYINFO_CONNECTOR_CONFIG);


module.exports.APP_CONFIG = APP_CONFIG;
module.exports.MYINFO_CONNECTOR_CONFIG = MYINFO_CONNECTOR_CONFIG;