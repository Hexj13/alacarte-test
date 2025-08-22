import * as allure from 'allure-js-commons';
import type { TestInfo } from '@playwright/test';

export async function allureSetup(testInfo: TestInfo) {
  if (!process.env.CI) return;

  const [, ...rawPath] = testInfo.titlePath;

  const path = rawPath.slice(0, -1);
  const [p, i, s] = path;

  if (p) await allure.label('psuite', p);
  if (i) await allure.label('isuite', i);
  if (s) await allure.label('suite', s);
}
