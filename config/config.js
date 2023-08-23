const dotenv = require('dotenv')
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi
  .object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    MONGO_URI: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    REFRESH_TOKEN_SECRET: Joi.string().required().description('JWT refresh secret key'),
    ACCESS_TOKEN_SECRET: Joi.string().required().description('Access token secret key'),
    TWOCHECKOUT_SECRET: Joi.string().required().description('2Checkout secret key'),
    TWOCHECKOUT_MERCHANT_CODE: Joi.string().required().description('2Checkout merchant code'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: {
    isDevelopment: envVars.NODE_ENV == 'development',
  },
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
  refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
  accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
  public: {
    buildDir: path.join(__dirname, '..', 'public', 'build'),
    buildIndex: path.join(__dirname, '..', 'public', 'build', 'index.html'),
    docIndex: path.join(__dirname, '..', 'public', 'doc', 'index.html'),
    docDir: path.join(__dirname, '..', 'public', 'doc'),
    root: path.join(__dirname, '..', 'public'),
  },
  twocheckoutSecret: envVars.TWOCHECKOUT_SECRET,
  twocheckoutMerchantCode: envVars.TWOCHECKOUT_MERCHANT_CODE,
};