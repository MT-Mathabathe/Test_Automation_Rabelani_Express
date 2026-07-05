import { test, expect } from '@playwright/test';
import { login } from '../Pages/LoginPage.js'; // Adjust path if using lowercase 'pages'

test.describe('Rabelani Express - Sidebar Navigation Framework', () => {

  // This runs automatically before the test starts
  test.beforeEach(async ({ page }) => {
    // Leaves parentheses empty to use the default 'true' flag, skipping the tour instantly
    await login(page); 
  });

  test('User should be able to navigate through all primary sidebar menus', async ({ page }) => {
    // 1. Locate your sidebar links using their display names
    const ordersLink = page.getByRole('link', { name: 'Orders', exact: true });
    const driversLink = page.getByRole('link', { name: 'Drivers', exact: true });
    const inventoryLink = page.getByRole('link', { name: 'Inventory', exact: true });
    const customersLink = page.getByRole('link', { name: 'Customers', exact: true });
    const dashboardLink = page.getByRole('link', { name: 'Dashboard', exact: true });

    // 2. Click Orders and verify the page contents change
    await ordersLink.click();
    await expect(page).toHaveURL(/.*orders/);
    await expect(page.locator('h1')).toContainText('Orders');

    // 3. Click Drivers and verify
    await driversLink.click();
    await expect(page).toHaveURL(/.*drivers/);
    // Changed 'Drivers' to 'Driver Management' to match the actual page title
    await expect(page.locator('h1')).toContainText('Driver Management');

    // 4. Click Inventory and verify
    await inventoryLink.click();
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('h1')).toContainText('Inventory');

    // 5. Click Customers and verify
    await customersLink.click();
    await expect(page).toHaveURL(/.*customers/);
    await expect(page.locator('h1')).toContainText('Customers');

    // 6. Navigate back home to Dashboard and verify
    await dashboardLink.click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

});
