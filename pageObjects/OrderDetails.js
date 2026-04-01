class OrderDetails{

    constructor(page){
        this.page = page;
        this.orderidtext=page.locator("//div[@class='col-text -main']");
}
async getOrderIdText(){
   return await this.orderidtext.textContent();
}

}
module.exports = { OrderDetails };