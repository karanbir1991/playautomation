const { LoginPage } = require('./LoginPage');
const { Dashboard } = require('./Dashboard');
const { Cartpage } = require('./Cartpage');
const { OrderPage } = require('./OrderPage');
const { ThanksPage } = require('./ThanksPage');
const { OrdersList } = require('./OrdersList');
const { OrderDetails } = require('./OrderDetails')

class POManager {
  constructor(page) {
    this.page = page;
    this.loginpage = new LoginPage(page);
    this.dashboard = new Dashboard(page);
    this.cartpage = new Cartpage(page);
    this.orderpage = new OrderPage(page);
    this.thankspage = new ThanksPage(page);
    this.orderslistpage = new OrdersList(page);
    this.orderdetailspage = new OrderDetails(page)
  }

  getLoginPage() {
    return this.loginpage;
  }

  getDashboard() {
    return this.dashboard;
  }

  getCartpage() {
    return this.cartpage;
  }

  getOrderPage() {
    return this.orderpage;
  }

  getThanksPage() {
    return this.thankspage;
  }

  getOrdersListPage() {
    return this.orderslistpage;
  }

  getOrderDetailsPage(){
    return this.orderdetailspage;
  }
}

module.exports = { POManager };
