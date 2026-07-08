import {test, expect} from '@playwright/test';
import { newLogin } from '../Pages/LoginPage.js';  

test.describe('Rabelani Express - Authentication Tests', () => {

  test('User should be able to log in successfully with valid credentials', async ({ page }) => {

    await newLogin(page); // Forces the script to validate all 8 steps!
  });
})
