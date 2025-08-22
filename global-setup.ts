import { FullConfig } from '@playwright/test';
import { loginAndSaveStorageState } from '@utils/loginAndSaveStorageState';
import './config';

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL;
  await loginAndSaveStorageState({
    baseURL: baseURL!,
    storageFileName: 'user',
    loginPath: '/login',
  });
}

export default globalSetup;
