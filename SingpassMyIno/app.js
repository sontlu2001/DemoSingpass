const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");
const MyInfoConnector = require("./myinfo-connector");
const fs = require("fs");
const config = require("./config/config.js");
const notFoundHandler = require('./middlewares/notFoundHandler.js');
const errorHandler = require('./middlewares/errorHandler.js');
const readFiles = require('./util/readFiles.js');
require("dotenv").config();
const logger = require("./logger");


const app = express();
const port = process.env.APP_PORT || 3001;
const connector = new MyInfoConnector(config.MYINFO_CONNECTOR_CONFIG);
const corsOptions = {
  origin: process.env.CORS_ORIGIN_URLS.split(","), 
  credentials: true
};


let sessionIdCache = {};
// Create a map between session id and product type
let sessionIdProductTypeMap = {};

// Using middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

// get the environment variables (app info) from the config
app.get("/getEnv", function (req, res) {
  try {
    if (!config.APP_CONFIG.APP_CLIENT_ID ) {
      logger.info("Missing Client ID");
      res.status(500).send({
        error: "Missing Client ID",
      });
    } else {
      const response = {
        clientId: config.APP_CONFIG.APP_CLIENT_ID,
        redirectUrl: config.APP_CONFIG.APP_CALLBACK_URL,
        scope: config.APP_CONFIG.APP_SCOPES,
        purpose_id: config.APP_CONFIG.APP_PURPOSE_ID,
        authApiUrl: config.APP_CONFIG.MYINFO_API_AUTHORIZE,
        subentity: config.APP_CONFIG.APP_SUBENTITY_ID,
      }
      logger.info("Sending App info to Frontend: ", response);
      res.status(200).json(response);
    }
  } catch (error) {
    logger.error("Get environment error: ", error);
    res.status(500).send({
      error: error,
    });
  }
});

// callback function - directs back to home page
app.get("/callback", function (req, res) {
  logger.info("Callback before cookie sid: ", req.cookies.sid);
  let productType = sessionIdProductTypeMap[req.cookies.sid];
  const appCallbackURL = process.env.APP_CALLBACK_FE_URL;

  res.redirect(`${appCallbackURL}/${req._parsedUrl.search}`);
});

// getPersonData function - call MyInfo Token + Person API
app.post("/getPersonData", async function (req, res, next) {
  try {
    // get variables from frontend
    let authCode = req.body.authCode;
    //retrieve code verifier from session cache
    let codeVerifier = sessionIdCache[req.cookies.sid];
    logger.info("Calling MyInfo NodeJs Library...");

    // retrieve private signing key and decode to utf8 from FS
    let privateSigningKey = fs.readFileSync(
      config.APP_CONFIG.APP_CLIENT_PRIVATE_SIGNING_KEY,
      "utf8"
    );

    let privateEncryptionKeys = [];
    // retrieve private encryption keys and decode to utf8 from FS, insert all keys to array
    readFiles(
      config.APP_CONFIG.APP_CLIENT_PRIVATE_ENCRYPTION_KEYS,
      (filename, content) => {
        privateEncryptionKeys.push(content);
      },
      (err) => {
        throw err;
      }
    );
    let redirectUrl = config.APP_CONFIG.APP_CALLBACK_URL;
    const scope = process.env.APP_SCOPES;


    //call myinfo connector to retrieve data
    let personData = await connector.getMyInfoPersonData(
      authCode,
      codeVerifier,
      privateSigningKey,
      privateEncryptionKeys,
      scope,
      redirectUrl
    );

    /* 
      P/s: Your logic to handle the person data ...
    */
    logger.info("Sending Person Data: ", personData);
    res.status(200).send(personData); //return personData
  } catch (error) {
    logger.error("MyInfo NodeJs Library Error: ",error);
    res.status(500).send({
      error: error,
    });
  }
});

// Generate the code verifier and code challenge for PKCE flow
app.post("/generateCodeChallenge", async function (req, res, next) {
  try {
    // call connector to generate code_challenge and code_verifier
    let pkceCodePair = connector.generatePKCECodePair();
    // create a session and store code_challenge and code_verifier pair
    let sessionId = await crypto.randomBytes(16).toString("hex");
    sessionIdCache[sessionId] = pkceCodePair.codeVerifier;

    //establish a frontend session with browser to retrieve back code_verifier
    res.cookie("sid", sessionId);
    sessionIdProductTypeMap[sessionId] = req.body.productType;
    //send code code_challenge to frontend to make /authorize call
    const response = {
      codeChallenge: pkceCodePair.codeChallenge,
      // For setting cookies in the browser: sid: sessionId
      sessionId: sessionId
    }
    logger.info("Sending Code Challenge: ", response);
    res.status(200).json(response);
  } catch (error) {
    logger.error("Generate Code Challenge Error: ", error);
    res.status(500).send({
      error: error,
    });
  }
});

// Using the custom middleware
app.use(notFoundHandler); // catch 404 and forward to error handler
app.use(errorHandler); // print stacktrace on error

// Start the server
app.listen(port, () =>
  console.log(`Demo App Client listening on port ${port}!`)
);
