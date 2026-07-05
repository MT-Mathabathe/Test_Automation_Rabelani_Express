import {test, expect} from '@playwright/test';
import { login } from '../Pages/LoginPage.js';  

test.describe('Rabelani Express - Authentication Tests', () => {

  test('User should be able to log in successfully with valid credentials', async ({ page }) => {

    await login(page, false); // Forces the script to validate all 8 steps!
  });
})
