'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');
const dotenv = require('dotenv');

module.exports = () => {
  let envDir = process.env.ENV_FILE_DIR;

  if (!envDir) {
    envDir = path.join(__dirname, '../../');
  }

  let envFile = path.join(envDir, '.env');
  if (!fs.existsSync(envFile)) {
    throw new Error(`env(${envFile}) does not exist`);
  }

  dotenv.config({ path: envFile });

  envFile = path.join(envDir, '.env-overlay');
  if (fs.existsSync(envFile)) {
    const { parsed } = dotenv.config({ path: envFile });
    process.env = {
      ...process.env,
      ...parsed,
    };
  }

  /* Make sure env config was imported */
  const arrRequireKeys = [
    'AWS_ACCESS_KEY',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'MORALIS_API_KEY',
    'NODE_BACKEND_PORT',
    'POSTGRES_DB_PORT',
    'POSTGRES_DB_HOST',
    'POSTGRES_DB_USER',
    'POSTGRES_DB_PASSWORD',
    'POSTGRES_DB_SCHEMA',
  ];

  arrRequireKeys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`key(${key}) requires in env`);
    }
  });
};
