const { test } = require('@playwright/test');

const base = test.extend(
    {
  TestDataSet: async ({}, use) => {
    await use({
      userEmail: "karanb@yopmail.com",
      password: "Test@123",
      productName: "ZARA COAT 3",
      countrytext: "ind",
      countryname: " India"
    });
  }
});

module.exports = { base };