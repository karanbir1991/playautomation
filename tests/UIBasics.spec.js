const {test,expect} = require('@playwright/test')
test('Browser context First Playwright test', async ({browser})=>
{
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signinButton = page.locator("#signInBtn");
    const cardTitles= page.locator("//div[@class='card-body']//a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signinButton.click();
    console.log(await page.locator("[style='display: block;']").textContent());
    await expect(page.locator("[style='display: block;']")).toContainText("Incorrect")
    await expect(page.locator("[style='display: block;']")).toHaveText("Incorrect username/password.");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signinButton.click();
    //console.log(await page.locator("//a[text()='ProtoCommerce Home']").textContent());
    //handle multiple elements and access 1 element
    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());
    const allTitles= await cardTitles.allTextContents();
    console.log(allTitles);
    
    

});


test('Page First Playwright test', async ({page})=>
{
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test('UI Controls', async ({page})=>
{
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signinButton = page.locator("#signInBtn");
    const dropdown= page.locator("//select[@class='form-control']");
    const radiobutton= page.locator("//span[@class='radiotextsty']");
    const checkbox = page.locator("#terms");
    const blinktext = page.locator("//a[@href='https://rahulshettyacademy.com/documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await password.fill("learning");
    //static dropdown
    await dropdown.selectOption("consult");
    // radio button
    await radiobutton.last().click();
    await page.locator("#okayBtn").click();
    // without assertion verification
    await radiobutton.last().isChecked();
    //assertion
    await expect(radiobutton.last()).toBeChecked();
    // verify and assert if the checkbox is not checked
    expect(await checkbox.isChecked()).toBeFalsy();
    await expect(blinktext).toHaveAttribute("class","blinkingText");
    
});

test('child window handle', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const blinktext = page.locator("//a[@href='https://rahulshettyacademy.com/documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // switch to new page
    const [newpage]= await Promise.all(
      [context.waitForEvent("page"),//listen any new page opens
        blinktext.click(),// new page opens
      ]  
    )
    const text= await newpage.locator("//p[@class='im-para red']").textContent();
    const arraytext = text.split("@");
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    // close child tab
  //await newpage.close();
  
  // "Switch back" = just use parent page object
  await page.bringToFront();

  // continue on parent tab
  await userName.fill(domain);

  // print content in the input box
  console.log(await userName.inputValue());

  // optional assertion
  await expect(userName).toHaveValue(domain);
  
});