class Baseapi
{
    constructor(apicontext,loginpayload)
    {
        this.apicontext=apicontext;
        this.loginpayload=loginpayload;

    }
    async getToken()
    {
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
     {   
        data:this.loginpayload
     } )
     const loginbody = await loginResponse.json();
     const token= loginbody.token;
     console.log("token = "+token);
     return token;

    }

    async getOrderid(orderpayload){
        let response={};
        response.token= await this.getToken();

        const orderresponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
             {
                data:orderpayload,
                headers:{
                    'Authorization': response.token,
                    'Content-Type':'application/json'
                },
        
             })
             console.log(orderresponse.status());
             const orderbody= await orderresponse.json();
             console.log(orderbody);
             const orderid=orderbody.orders[0];
             response.orderid=orderid;
             return response;
    }

}
module.exports ={Baseapi};