const {test,expect,request} = require('@playwright/test');
const {Baseapi} = require('./utils/Baseapi');
const loginPayload = {"userEmail":"karanb@yopmail.com","userPassword":"Test@123"};
const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]}
let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
   const apiUtils = new Baseapi(apiContext, loginPayload);

    response= await apiUtils.getOrderid(orderPayload);

     

   });

test('@Web security test request intercept',async({page})=>
{
      await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("//button[@routerlink='/dashboard/myorders']").click();
   // intercepting request
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69708280c941646b7aab8d65"})
    )
    await page.locator("//button[text()='View']").first().click();
    await expect(page.locator("//p[@class='blink_me']")).toHaveText("You are not authorize to view this order");
    }

);