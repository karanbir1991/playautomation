const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');
test('popup validations', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();*/
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    
 
});