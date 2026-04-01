const {test,expect,request} = require('@playwright/test');
const {Baseapi} = require('./utils/Baseapi');
const loginPayload = {"userEmail":"karanb@yopmail.com","userPassword":"Test@123"};
const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]}
const fakepayloadorder= {data:[],message:"No Orders"};
let response;
test.beforeAll( async()=>
{
    const apiContext = await request.newContext();
   const apiUtils = new Baseapi(apiContext, loginPayload);

    response= await apiUtils.getOrderid(orderPayload);

     

   });



test('api intercepting response order page', async ({ page }) => {
   //js file- Login js, DashboardPage

     await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
     async route =>
        {
            const response= await page.request.fetch(route.request());
            let body = JSON.stringify(fakepayloadorder);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
            //intercepting response - APi response->{Playwright fake response}->browser->render data on frontend

        }   
    )
   await page.locator("//button[@routerlink='/dashboard/myorders']").click();  
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
   const noordertext=page.locator("//div[@class='mt-4 ng-star-inserted']");
   console.log(await noordertext.textContent());
   await expect(noordertext).toHaveText(" You have No Orders to show at this time. Please Visit Back Us ");
   
      
    
    });