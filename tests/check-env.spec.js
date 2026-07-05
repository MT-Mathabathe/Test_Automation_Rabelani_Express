import { test } from '@playwright/test';

test('Sanity Check: Print Environment Variables', async () => {
  console.log('\n====================================');
  console.log(' ENVIRONMENT VARIABLE CHECK ');
  console.log('====================================');
  console.log('BASE_URL: ', process.env.BASE_URL);
  console.log('TEST_USER_EMAIL: ', process.env.TEST_USER_EMAIL);
  console.log('TEST_USER_PASSWORD: ', process.env.TEST_USER_PASSWORD ? 'HIDDEN FOR SECURITY' : 'NOT FOUND');
  console.log('====================================\n');
});