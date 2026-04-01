class LoginPage{

    constructor(page){
        this.page=page
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginbutton=page.locator("#login");
        this.cards= page.locator("//div[@class='card-body']//b");
    }
    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/auth/login");
        console.log(await this.page.title());
    }

    async validlogin(userEmail,password){
        
        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.loginbutton.click();
        await this.cards.last().waitFor();

    }
}
module.exports={LoginPage};