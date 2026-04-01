class ThanksPage{

    constructor(page){
        this.page = page;
        this.thankstext=page.locator("//h1[@class='hero-primary']")
        this.orderid = page.locator("//label[@class='ng-star-inserted']");
        this.ordersButton = page.locator("//button[@routerlink='/dashboard/myorders']");
        this.orderlistrows= page.locator("tbody tr");
}

    async getThanksText(){

        return await this.thankstext.textContent();
        
}

    async getorderid() {
    
        return await this.orderid.textContent();
    
}
    async NavigateToOrderlistPage(){

        await this.ordersButton.click();
        await this.orderlistrows.first().waitFor();
}



}
module.exports={ThanksPage};