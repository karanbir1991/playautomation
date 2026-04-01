class OrderPage{

    constructor(page){
        this.page=page;
        this.countrydropdownfield = page.locator("//input[@placeholder='Select Country']");
        this.dropdown = page.locator("//button[contains(@class,'ta-item')]");
        this.emailinfo = page.locator("//div[@class='user__name mt-5']//label");
        this.PlaceOrderbutton = page.locator("//a[contains(text(),'Place Order')]")
    }

    async Selectcountry(countrytext, countryname){
        //auto suggestive dropdown
            await this.countrydropdownfield.pressSequentially(countrytext);
            await this.dropdown.first().waitFor();
            //with loop select dropdown value
            const drpcount= await this.dropdown.count();
            for(let i=0; i<drpcount;i++){
                if(await this.dropdown.nth(i).textContent()===countryname){
                   await this.dropdown.nth(i).click();
                    break;
                }
            }         
    }
    async getEmailText(){
        return await this.emailinfo.textContent();
    }

    async navigatetothankspage(){
        await this.PlaceOrderbutton.click();
    }

}
module.exports={OrderPage};