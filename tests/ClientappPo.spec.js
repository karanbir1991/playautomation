const {test,expect} = require('@playwright/test')
const {POManager} = require('../pageObjects/POManager');
const dataset = require('./TestData/Data.json');
const {base} =require('./TestData/test-base');

for(const testdata of dataset){
test(`@Smoke Browser client app Playwright test ${testdata.productName}`, async ({page})=>
{
    const pomanager = new POManager(page);
    const cards= page.locator("//div[@class='card-body']//b");
    const loginpage = pomanager.getLoginPage();
    await loginpage.goto();
    await loginpage.validlogin(testdata.userEmail,testdata.password);
    //Handle and get all elements instead of empty data array 
    await cards.last().waitFor();
    console.log(await cards.allTextContents());
});
}
for(const testdata of dataset){
test(`@Smoke Client App login ${testdata.productName}`, async ({ page }) => {

    const pomanager = new POManager(page);
    const loginpage = pomanager.getLoginPage();
    const dashboard = pomanager.getDashboard();
    const cartpage = pomanager.getCartpage();
    const orderpage= pomanager.getOrderPage();
    const thankspage= pomanager.getThanksPage();
    const orderslistpage = pomanager.getOrdersListPage();
    const orderdetailspage= pomanager.getOrderDetailsPage();

    //login
    await loginpage.goto();
    await loginpage.validlogin(testdata.userEmail,testdata.password);
   //dashboard
    await dashboard.SearchProduct(testdata.productName);
    await dashboard.navigateToCart();
    //cartpage
    const visible= await cartpage.isItemVisible();
    expect(visible).toBeTruthy();
    await cartpage.cartcheckout();
    //orderpage
    await orderpage.Selectcountry(testdata.countrytext, testdata.countryname);
    const emailtext=await orderpage.getEmailText();
    expect(emailtext).toBe(testdata.userEmail);
    await orderpage.navigatetothankspage();
    //thankspage
    const thanks=" Thankyou for the order. "
    const actualText = await thankspage.getThanksText();
    expect(actualText).toBe(thanks);
    const orderid = await thankspage.getorderid();
    console.log(orderid);
    await thankspage.NavigateToOrderlistPage();
   

    //orderslistpage
    await orderslistpage.VerifyOrderIDAndRedirectToOrderDetailsPage(orderid);
    //orderdetails page
    const orderidtext=await orderdetailspage.getOrderIdText();
    console.log(orderid.includes(orderidtext));
    expect(orderid.includes(orderidtext)).toBeTruthy();
    console.log("test completed");
});
}
base(`@Smoke Client App login using fixture`, async ({ page, TestDataSet }) => {

  const pomanager = new POManager(page);
  const loginpage = pomanager.getLoginPage();
  const dashboard = pomanager.getDashboard();
  const cartpage = pomanager.getCartpage();
  const orderpage = pomanager.getOrderPage();
  const thankspage = pomanager.getThanksPage();
  const orderslistpage = pomanager.getOrdersListPage();
  const orderdetailspage = pomanager.getOrderDetailsPage();

  // login
  await loginpage.goto();
  await loginpage.validlogin(
    TestDataSet.userEmail,
    TestDataSet.password
  );

  // dashboard
  await dashboard.SearchProduct(TestDataSet.productName);
  await dashboard.navigateToCart();

  // cart
  expect(await cartpage.isItemVisible()).toBeTruthy();
  await cartpage.cartcheckout();

  // order page
  await orderpage.Selectcountry(
    TestDataSet.countrytext,
    TestDataSet.countryname
  );
  expect(await orderpage.getEmailText()).toBe(TestDataSet.userEmail);
  await orderpage.navigatetothankspage();

  // thanks page
  expect(await thankspage.getThanksText()).toBe(" Thankyou for the order. ");
  const orderid = await thankspage.getorderid();
  await thankspage.NavigateToOrderlistPage();

  // orders list
  await orderslistpage.VerifyOrderIDAndRedirectToOrderDetailsPage(orderid);

  // order details
  const orderidtext = await orderdetailspage.getOrderIdText();
  expect(orderid.includes(orderidtext)).toBeTruthy();
});
