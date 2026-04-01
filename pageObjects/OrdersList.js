class OrdersList{

    constructor(page){
        this.page = page;
        this.rows = page.locator("tbody tr");
        
}


    async VerifyOrderIDAndRedirectToOrderDetailsPage(orderid){

        const rowcount = await this.rows.count();
            for(let i=0; i<rowcount; i++){
                const txt= await this.rows.nth(i).locator("th").textContent();
                if(orderid.includes(txt)){
                    console.log("order id found in order history");
                    console.log(txt);
                    await this.rows.nth(i).locator("button").first().click();
                    break;
                }
            }
}



}
module.exports = { OrdersList };