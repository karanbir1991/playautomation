const {test,expect} = require('@playwright/test');
test('take screenshot visual comparizon', async ({ page }) => {
  
    const timestamp = Date.now();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const distxt= page.locator("#displayed-text");
    await expect(distxt).toBeVisible();
    await distxt.screenshot({path: `screenshots/element-${timestamp}.png`});
    await page.locator("#hide-textbox").click();   
    await page.screenshot({path: `screenshots/screen-${timestamp}.png`});
    await expect(page.locator("#displayed-text")).toBeHidden();
 
});

test('visual', async ({ page }) => {
  
    await page.goto("https://www.google.com/");
    await page.screenshot({path:'tests/Screenshot.spec.js-snapshots/landing-chrome-win32.png'});
    expect(await page.screenshot()).toMatchSnapshot('landing.png', { maxDiffPixelRatio: 0.02,});
   
 
});