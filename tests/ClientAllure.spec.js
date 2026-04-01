const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const dataset = require('./TestData/Data.json');
const { base } = require('./TestData/test-base');

/* -------------------------------
   Login & Product Test
-------------------------------- */
for (const testdata of dataset) {
  test(`@Sanity Browser client app | ${testdata.productName}`, async ({ page }, testInfo) => {

    // ✅ Allure metadata (native Playwright)
    testInfo.annotations.push(
      { type: 'epic', description: 'Web Client Application' },
      { type: 'feature', description: 'Browser Client App' },
      { type: 'story', description: `Login and fetch products - ${testdata.productName}` },
      { type: 'severity', description: 'critical' },
      { type: 'tag', description: 'Smoke' }
    );

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    const cards = page.locator("//div[@class='card-body']//b");

    await test.step('Navigate and login', async () => {
      await loginpage.goto();
      await loginpage.validlogin(
        testdata.userEmail,
        testdata.password
      );
    });

    await test.step('Capture product names', async () => {
      await cards.last().waitFor();
      const productNames = await cards.allTextContents();
      expect(productNames.length).toBeGreaterThan(0);

      await testInfo.attach('Products', {
        body: productNames.join(', '),
        contentType: 'text/plain'
      });
    });
  });
}

/* -------------------------------
   Order Flow Test
-------------------------------- */
for (const testdata of dataset) {
  test(`@Sanity Client App Order Flow | ${testdata.productName}`, async ({ page }, testInfo) => {

    testInfo.annotations.push(
      { type: 'epic', description: 'Web Client App' },
      { type: 'feature', description: 'Order Placement' },
      { type: 'severity', description: 'critical' }
    );

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    const dashboard = pomanager.getDashboard();
    const cartpage = pomanager.getCartpage();
    const orderpage = pomanager.getOrderPage();
    const thankspage = pomanager.getThanksPage();
    const orderslistpage = pomanager.getOrdersListPage();
    const orderdetailspage = pomanager.getOrderDetailsPage();

    await test.step('Login', async () => {
      await loginpage.goto();
      await loginpage.validlogin(
        testdata.userEmail,
        testdata.password
      );
    });

    await test.step('Add product to cart', async () => {
      await dashboard.SearchProduct(testdata.productName);
      await dashboard.navigateToCart();
      expect(await cartpage.isItemVisible()).toBeTruthy();
      await cartpage.cartcheckout();
    });

    let orderId;

    await test.step('Place order', async () => {
      await orderpage.Selectcountry(
        testdata.countrytext,
        testdata.countryname
      );
      expect(await orderpage.getEmailText())
        .toBe(testdata.userEmail);
      await orderpage.navigatetothankspage();
    });

    await test.step('Verify order success', async () => {
      expect(await thankspage.getThanksText())
        .toBe(' Thankyou for the order. ');
      orderId = await thankspage.getorderid();

      await testInfo.attach('Order ID', {
        body: orderId,
        contentType: 'text/plain'
      });

      await thankspage.NavigateToOrderlistPage();
    });

    await test.step('Verify order history', async () => {
      await orderslistpage.VerifyOrderIDAndRedirectToOrderDetailsPage(orderId);
      const orderidtext = await orderdetailspage.getOrderIdText();
      expect(orderId.includes(orderidtext)).toBeTruthy();
    });
  });
}

/* -------------------------------
   Failure Screenshot
-------------------------------- */
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('Failure Screenshot', {
      body: await page.screenshot(),
      contentType: 'image/png'
    });
  }
});
