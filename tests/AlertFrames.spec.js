const {test,expect} = require('@playwright/test')
test('Alert box handle', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#name").fill("Karan");
    // Listen to alert BEFORE clicking
    page.once("dialog", async dialog => {
    console.log(dialog.message());   // Alert text
     await dialog.accept();           // Click OK
    });
    await page.locator("#alertbtn").click();
    await page.locator("#name").fill("Agam");
    page.once("dialog", async dialog => {
    console.log(dialog.message());   // Alert text
     await dialog.dismiss();          // Click cancel
    });
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framepage= page.frameLocator("#courses-iframe");
    await framepage.locator("(//a[text()='Practice'])[1]").click();
    const text = await framepage.locator("//h2[text()='Join now to Practice']").textContent();
    console.log(text);

    });