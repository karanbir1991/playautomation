const {test,expect,request} = require('@playwright/test');
//const {Baseapi} = require('./utils/Baseapi');
//const loginPayload = {"userEmail":"karanb@yopmail.com","userPassword":"Test@123"};
//const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]}
let webcontext;
test.beforeAll( async({browser})=>
{
    const context =  await browser.newContext();
    const page = await context.newPage();
    const email = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const login = page.getByRole("button",{name:'login'});
    await page.goto("https://rahulshettyacademy.com/client");
    await email.fill("karanb@yopmail.com");
    await password.fill("Test@123");
    await login.click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path:'State.json'});
    webcontext = await browser.newContext({storageState:'state.json'});

   });



test('@Api new Clients App login', async () => {
   //js file- Login js, DashboardPage

  
    const page = await webcontext.newPage();
    const productName = "ZARA COAT 3";
    const emailtxt="karanb@yopmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count= await products.count();
    for(let i=0; i<count; i++){
        const producttext = await products.nth(i).locator("//h5//b").textContent();
        if(producttext===productName){
        await products.nth(i).locator("//button[contains(text(),'Add To Cart')]").click();
        break;

        }
    }
    await page.locator("//button[@routerlink='/dashboard/cart']").click();
    await page.locator("//div[@class='infoWrap']").last().waitFor();
    const bool = await page.locator("//h3[text()='ZARA COAT 3']").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("//button[text()='Checkout']").click(); 
    await page.locator("//input[@placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator("//button[contains(@class,'ta-item')]");
    await dropdown.first().waitFor();
    const drpcount= await dropdown.count();
    for(let i=0; i<drpcount;i++){
        const text= await dropdown.nth(i).textContent();
        if(text===" India"){
           await dropdown.nth(i).click();
            break;
        }
    }

    await expect(page.locator("//div[@class='user__name mt-5']//label")).toHaveText(emailtxt);
    await page.locator("//a[contains(text(),'Place Order')]").click();
    const thanks=" Thankyou for the order. ";
    await expect(page.locator("//h1[@class='hero-primary']")).toHaveText(thanks);
    const orderid = await page.locator("//label[@class='ng-star-inserted']")
    .textContent();
    console.log(orderid);
    await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    const rows= page.locator("tbody tr");
    await rows.first().waitFor();
    const rowcount = await rows.count();
    for(let i=0; i<rowcount; i++){
        const txt= await rows.nth(i).locator("th").textContent();
        if(orderid.includes(txt)){
            console.log("order id found in order history");
            console.log(txt);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderidtext=await page.locator("//div[@class='col-text -main']").textContent();
    console.log(orderid.includes(orderidtext));
    expect(orderid.includes(orderidtext)).toBeTruthy();
    console.log("test completed");
    
    });

    test('@Api new Clients App login test', async () => {
   //js file- Login js, DashboardPage

  
    const page = await webcontext.newPage();
    const productName = "ZARA COAT 3";
    const emailtxt="karanb@yopmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
     });