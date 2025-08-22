/* eslint-disable no-console */
import * as process from 'process';

if (!process.env.USER_EMAIL) {
  console.error('USER_EMAIL env variable is not set.');
  process.exit(1);
}

if (!process.env.USER_PASSWORD) {
  console.error('USER_PASSWORD env variable is not set.');
  process.exit(1);
}
