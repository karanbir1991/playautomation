const {test,expect} = require('@playwright/test')
test('@Web Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByPlaceholder("Password").fill("Test@123");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();
    await page.getByRole("button",{name:'Submit'}).click();
    const text= page.getByText("Success! The Form has been submitted successfully!.");
    console.log(await text.textContent());
    await page.getByRole("link", {name:'shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
 
});