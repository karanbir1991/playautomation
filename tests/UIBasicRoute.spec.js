const {test,expect} = require('@playwright/test')
test('page route page on test', async ({browser})=>
{
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    //wait page.route('**/*.{css,jpeg,jpg,png}',route=> route.abort());
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signinButton = page.locator("#signInBtn");
    const cardTitles= page.locator("//div[@class='card-body']//a");
    page.on('request',request=>console.log(request.url()));
    page.on('response',reponse=>console.log(reponse.url(),reponse.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signinButton.click();
    console.log(await page.locator("[style='display: block;']").textContent());
    await expect(page.locator("[style='display: block;']")).toContainText("Incorrect")
    await expect(page.locator("[style='display: block;']")).toHaveText("Incorrect username/password.");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signinButton.click();
    console.log(await page.locator("//a[text()='ProtoCommerce Home']").textContent());
    //handle multiple elements and access 1 element
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles= await cardTitles.allTextContents();
    console.log(allTitles);
   
    

});