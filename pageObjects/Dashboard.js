class Dashboard{

constructor(page){
    this.page=page;
    this.products=page.locator(".card-body");
    this.productsText=page.locator(".card-body b");
    this.cart = page.locator("//button[@routerlink='/dashboard/cart']")
    this.cartitem = page.locator("//div[@class='infoWrap']");
}

async SearchProduct(productName){
   
    const title = await this.productsText.allTextContents();
    console.log(title);
    const count= await this.products.count();
     for(let i=0; i<count; i++){
        if(await this.products.nth(i).locator("//h5//b").textContent()===productName){
        await this.products.nth(i).locator("//button[contains(text(),'Add To Cart')]").click();
        break;

        }
}
}

async navigateToCart(){
    await this.cart.click();
    await this.cartitem.first().waitFor();
}

}
module.exports={Dashboard};