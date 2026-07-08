import { test, expect } from '@playwright/test';
import { login, newLogin } from '../Pages/LoginPage.js'; // Adjust path if using lowercase 'pages'

test.describe('Rabelani Express - Sidebar Navigation Framework', () => {

  // This runs automatically before the test starts
  test.beforeEach(async ({ page }) => {
    // Leaves parentheses empty to use the default 'true' flag, skipping the tour instantly
    await newLogin(page);
  });

  test('User should be able to navigate through all primary sidebar menus', async ({ page }) => {
    // 1. Locate your sidebar links using their display names
    const globalPOLink = page.getByRole('link', { name: 'Global PO', exact: true });
    const ordersLink = page.getByRole('link', { name: 'Orders', exact: true });
    const inventoryLink = page.getByRole('link', { name: 'Inventory', exact: true });
    const driversLink = page.getByRole('link', { name: 'Drivers', exact: true });
    const customersLink = page.getByRole('link', { name: 'Customers', exact: true });
    const usersLink = page.getByRole('link', { name: 'Users', exact: true });
    const locationsLink = page.getByRole('link', { name: 'Locations', exact: true });
    const templatesLink = page.getByRole('link', { name: 'Templates', exact: true }); 
    const dashboardLink = page.getByRole('link', { name: 'Dashboard', exact: true });
    
    // 1. Click Global PO and verify the page contents change
    await globalPOLink.click();
    await expect(page).toHaveURL(/.*purchase-orders/);
    await expect(page.locator('h1')).toContainText('Global PO');  

    // 2. Click Orders and verify the page contents change
    await ordersLink.click();
    await expect(page).toHaveURL(/.*orders/);
    await expect(page.locator('h1')).toContainText('Orders');

    // 3. Click Inventory and verify the page contents change
    await inventoryLink.click();
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('h1')).toContainText('Inventory');

    // 4. Click Drivers and verify
    await driversLink.click();
    await expect(page).toHaveURL(/.*drivers/);
    await expect(page.locator('h1')).toContainText('Drivers');

    // 5. Click Customers and verify
    await customersLink.click();
    await expect(page).toHaveURL(/.*customers/);
    await expect(page.locator('h1')).toContainText('Customers');

    // 6. Click Users and verify
    await usersLink.click();
    await expect(page).toHaveURL(/.*users-management/);
    await expect(page.locator('h1')).toContainText('Users');

    // 7. Click Locations and verify
    await locationsLink.click();
    await expect(page).toHaveURL(/.*delivery-locations/);
    await expect(page.locator('h1')).toContainText('Delivery Locations');

    // 8. Click Templates and verify
    await templatesLink.click();
    await expect(page).toHaveURL(/.*email-templates/);
    await expect(page.locator('h1')).toContainText('Email Templates');

    // 8. Navigate back home to Dashboard and verify
    await dashboardLink.click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

});
