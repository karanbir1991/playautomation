const {test,expect} = require('@playwright/test');
test.describe.configure({mode:'parallel'});
test('Browser client app Playwright test', async ({page})=>
{
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const cards= page.locator("//div[@class='card-body']//b");
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    console.log(await page.title());
    await userEmail.fill("karanb@yopmail.com");
    await password.fill("Test@123");
    await page.click("#login");
    //await login.click();
    //Handle and get all elements instead of empty data array 
    await cards.last().waitFor();
    console.log(await cards.allTextContents());
    
    

});
 
test('@Web Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("[value='Login']")
    const productName = "ZARA COAT 3";
    const emailtxt="karanb@yopmail.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await email.fill(emailtxt);
    await password.fill("Test@123");
    await login.click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
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
    //auto suggestive dropdown
    await page.locator("//input[@placeholder='Select Country']").pressSequentially("ind");
    const dropdown = page.locator("//button[contains(@class,'ta-item')]");
    await dropdown.first().waitFor();
    //with loop select dropdown value
    const drpcount= await dropdown.count();
    for(let i=0; i<drpcount;i++){
        const text= await dropdown.nth(i).textContent();
        if(text===" India"){
           await dropdown.nth(i).click();
            break;
        }
    }

    // without loop select dropdown value
   /* const option = page.locator(
     "//button[contains(@class,'ta-item') and normalize-space()='India']"
    );

    await option.waitFor({ state: 'visible' });
    await option.click();*/
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

test('Web Clients App login', async ({ page }) => {
   //js file- Login js, DashboardPage
    const email = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    const login = page.getByRole("button",{name:'login'});
    const productName = "ZARA COAT 3";
    const emailtxt="karanb@yopmail.com";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await email.fill(emailtxt);
    await password.fill("Test@123");
    await login.click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText:productName})
    .getByRole("button",{name:"Add To Cart"}).click();
    await expect(page.locator("[routerlink='/dashboard/cart'] label"))
  .toHaveText("1");
    await page.getByRole("listitem").getByRole("button",{name:"cart"}).click();

    
    await page.locator("//div[@class='infoWrap']").first().waitFor();
    const bool = await page.locator("//h3[text()='ZARA COAT 3']").isVisible();
    expect(bool).toBeTruthy();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click(); 
    //auto suggestive dropdown
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await expect(page.locator("//div[@class='user__name mt-5']//label")).toHaveText(emailtxt);
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    
    });