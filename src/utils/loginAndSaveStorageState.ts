// helpers/auth.ts
import * as fs from 'fs';
import * as path from 'path';
import { APIRequestContext, request } from '@playwright/test';
import 'dotenv/config';

type LoginOptions = {
  baseURL: string;
  storageFileName: string;
  loginPath?: string;
};

export async function loginAndSaveStorageState(opts: LoginOptions) {
  const { baseURL, storageFileName, loginPath = '/login' } = opts;

  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('USER_EMAIL/USER_PASSWORD не заданы в .env');
  }

  const requestContext: APIRequestContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  const fullLoginPath = `${baseURL}${loginPath}`;
  const getResp = await requestContext.get(fullLoginPath);
  if (!getResp.ok()) {
    throw new Error(
      `GET ${fullLoginPath} failed: ${getResp.status()} ${await getResp.text()}`
    );
  }

  const stateBefore = await requestContext.storageState();
  const xsrfCookie = stateBefore.cookies.find((c) => c.name === 'XSRF-TOKEN');
  const xsrfToken = xsrfCookie
    ? decodeURIComponent(xsrfCookie.value)
    : undefined;
  let loginOk = false;
  let lastText = '';

  const jsonResp = await requestContext.post(fullLoginPath, {
    headers: xsrfToken
      ? { 'X-XSRF-TOKEN': xsrfToken, 'Content-Type': 'application/json' }
      : { 'Content-Type': 'application/json' },
    data: { email, password },
  });
  loginOk = jsonResp.ok();
  lastText = await jsonResp.text();

  if (!loginOk) {
    const formResp = await requestContext.post(fullLoginPath, {
      headers: xsrfToken
        ? {
            'X-XSRF-TOKEN': xsrfToken,
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        : { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: { email, password },
    });
    loginOk = formResp.ok();
    lastText = await formResp.text();
  }

  if (!loginOk) {
    throw new Error(`Login failed. Response: ${lastText || 'no body'}`);
  }

  const authDir = path.resolve('./auth');
  fs.mkdirSync(authDir, { recursive: true });
  const filePath = path.join(authDir, `${storageFileName}.json`);
  await requestContext.storageState({ path: filePath });
  await requestContext.dispose();
  return filePath;
}
