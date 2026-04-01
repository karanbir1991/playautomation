const {test,expect} = require('@playwright/test')
const {POManager} = require('../pageObjects/POManager');
const dataset = require('./TestData/Data.json');
const {base} = require('./TestData/test-base');

// First test - simple card verification
for(const testdata of dataset){
  test(`@Smoke Browser client app Playwright test ${testdata.productName}`, async ({page})=>{
    const pomanager = new POManager(page);
    const cards = page.locator("//div[@class='card-body']//b");
    const loginpage = pomanager.getLoginPage();
    
    await loginpage.goto();
    await loginpage.validlogin(testdata.userEmail, testdata.password);
    await cards.last().waitFor();
    
    const cardTexts = await cards.allTextContents();
    expect(cardTexts.length).toBeGreaterThan(0);
  });
}

// Second test - full checkout flow (refactored)
for(const testdata of dataset){
  test(`@Smoke Client App login ${testdata.productName}`, async ({ page }) => {
    const pomanager = new POManager(page);
    await runCheckoutFlow(pomanager, testdata);
  });
}

// Third test - using fixture
base(`@Smoke Client App login using fixture`, async ({ page, TestDataSet }) => {
  const pomanager = new POManager(page);
  await runCheckoutFlow(pomanager, TestDataSet);
});

// Helper function to avoid duplication
async function runCheckoutFlow(pomanager, testdata) {
  const loginpage = pomanager.getLoginPage();
  const dashboard = pomanager.getDashboard();
  const cartpage = pomanager.getCartpage();
  const orderpage = pomanager.getOrderPage();
  const thankspage = pomanager.getThanksPage();
  const orderslistpage = pomanager.getOrdersListPage();
  const orderdetailspage = pomanager.getOrderDetailsPage();

  const THANKS_MESSAGE = " Thankyou for the order. ";

  // Login
  await loginpage.goto();
  await loginpage.validlogin(testdata.userEmail, testdata.password);

  // Dashboard
  await dashboard.SearchProduct(testdata.productName);
  await dashboard.navigateToCart();

  // Cart
  expect(await cartpage.isItemVisible()).toBeTruthy();
  await cartpage.cartcheckout();

  // Order
  await orderpage.Selectcountry(testdata.countrytext, testdata.countryname);
  expect(await orderpage.getEmailText()).toBe(testdata.userEmail);
  await orderpage.navigatetothankspage();

  // Thanks
  expect(await thankspage.getThanksText()).toBe(THANKS_MESSAGE);
  const orderid = await thankspage.getorderid();
  expect(orderid).toBeTruthy(); // Validate orderid exists
  await thankspage.NavigateToOrderlistPage();

  // Orders List
  await orderslistpage.VerifyOrderIDAndRedirectToOrderDetailsPage(orderid);

  // Order Details
  const orderidtext = await orderdetailspage.getOrderIdText();
  expect(orderid.includes(orderidtext)).toBeTruthy();
}