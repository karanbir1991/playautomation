class Cartpage{

constructor(page){
    this.page = page;
    this.cartitemname = page.locator("//div[@class='cartSection']/h3");
    this.checkoutbutton = page.locator("//button[text()='Checkout']")
}

async isItemVisible(){
    return await this.cartitemname.isVisible();
    
}

async cartcheckout(){
  
    await this.checkoutbutton.click();
    
}
}
module.exports={Cartpage};