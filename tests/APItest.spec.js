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



test('@Api api Clients App login', async ({ page }) => {
   //js file- Login js, DashboardPage

     await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    const rows= page.locator("tbody tr");
    await rows.first().waitFor();
    const rowcount = await rows.count();
    for(let i=0; i<rowcount; i++){
        const txt= await rows.nth(i).locator("th").textContent();
        if(response.orderid.includes(txt)){
            console.log("order id found in order history");
            console.log(txt);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderidtext=await page.locator("//div[@class='col-text -main']").textContent();
    console.log(response.orderid.includes(orderidtext));
    expect(response.orderid.includes(orderidtext)).toBeTruthy();
    console.log("test completed");
    
    });