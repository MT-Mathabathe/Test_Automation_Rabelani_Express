import { expect } from '@playwright/test';

// ADDED 'shouldSkipTour = true' as a setting here. It defaults to skipping!
export async function login(page, shouldSkipTour = true) {
  // 1. Navigate to the login page using the URL from your .env file
  //Wait until the HTML is loaded, don't wait for heavy external resources
  await page.goto('/', { waitUntil: 'commit' });

  // 2. Locate the input fields and enter the secret credentials
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(process.env.TEST_USER_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.TEST_USER_PASSWORD);

  // 3. Click the login/submit button
  // Adjust 'Sign In' text to match the exact text on the Rabelani Express button
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();

  // 4. Assert that the login was successful by checking the resulting URL
  // (e.g., verifying that the browser redirected to the dashboard)
  await expect(page).toHaveURL(/.*dashboard/);

  // Tour Locators
  const tourTitle = page.locator('#tour-title');
  const tourBody = page.locator('.tour-tooltip__body');
  const nextButton = page.getByRole('button', { name: 'Next', exact: true });

  // Wait for the popup container to actually appear and settle on screen
  await expect(tourTitle).toBeVisible({ timeout: 5000 });

  if (shouldSkipTour) {
    // Click the skip button immediately
    await page.getByRole('button', { name: 'Skip tour' }).click();
  } else {

    // --- TOUR STEP 1 ---
    // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('👋 Welcome to Rabelani Express');
     await expect(tourBody).toContainText('Take a quick 60-second tour to learn the essentials. You can skip at any time and restart it later from Settings.');
    
     // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 2 ---
     // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('Navigation');
    await expect(tourBody).toContainText('Use the sidebar to jump between Dashboard, Orders, Drivers, Inventory, Customers and more.');
    
    // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 3 ---
    // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('Your dashboard');
     await expect(tourBody).toContainText('This is your at-a-glance view of packages, drivers and inventory health for the selected date range.');
    
    // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 4 ---
    // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('Global search (⌘K)');
     await expect(tourBody).toContainText('Find any package, driver or customer instantly. You can also press ⌘K (Ctrl+K on Windows) from anywhere.');
    
    // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 5 ---
    // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('Create a package');
     await expect(tourBody).toContainText('Click the + button to add a new package. You can print a QR label and assign a driver right after.');
    
    // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 6 ---
    // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('Notifications');
    await expect(tourBody).toContainText('Stay informed about new orders, driver pickups and delivery confirmations.');
    
    // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 7 ---
    // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('Your account');
    await expect(tourBody).toContainText('Open your profile menu to access Settings, switch theme or sign out.');
    
    // Advance to the next step
    await nextButton.click();

    // --- TOUR STEP 8 ---
     // Verify the text content matches your exact example
    await expect(tourTitle).toHaveText('🎉 You are all set!');
    await expect(tourBody).toContainText('You can restart this tour anytime from Settings → Help & Onboarding. Happy shipping!');
  
    // Close the tour and go to the dashboard 
    await page.getByRole('button', { name: 'Get started' }).click();
  }
    
    await expect(page).toHaveURL(/.*dashboard/);
}