import fs from 'fs';
import { BrowserContext, Page } from '@playwright/test';

export async function loginWithCookies(
  page: Page,
  context: BrowserContext,
  user: string,
  pageToNavigate?: any
) {
  await context.clearCookies();
  await page.reload();
  const storageState = JSON.parse(
    fs.readFileSync(`./auth/${user}.json`, 'utf-8')
  );
  await context.addCookies(storageState.cookies);
  if (pageToNavigate) {
    await pageToNavigate.navigate();
  } else {
    await page.reload();
  }
}
