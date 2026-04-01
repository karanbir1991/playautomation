const {test,expect,request} = require('@playwright/test')
const Exceljs = require('exceljs');

async function writeExcel(searchText, newText, change, path) {
  const workbook = new Exceljs.Workbook();

  await workbook.xlsx.readFile(path);

  const worksheet = workbook.getWorksheet('Sheet1');

  const output = ReadExcel(worksheet, searchText);

  const cell = worksheet
    .getRow(output.row)
    .getCell(output.column + change);

  console.log('Before:', cell.value);

  cell.value = newText;

  await workbook.xlsx.writeFile(path);

  console.log('File write completed');
  console.log('After:', cell.value);
}

function ReadExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.text === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });

  return output;
}
//writeExcel("Apple", "pomegranate", 2, "./downloads/ExcelTest.xlsx");
test('upload download excel validation',async ({page})=>
{
  const textSearch="Mango";
  const value = "600";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),   // 👈 wait for download
    page.getByRole("button",{name:'Download'}).click()      // 👈 trigger download
  ]);
  const filePath = await download.path();
  console.log('Downloaded to temp path:', filePath);
  await download.saveAs('./downloads/ExcelTest.xlsx');
  await writeExcel("Apple", "pomegranate", 0, "./downloads/ExcelTest.xlsx");
  await writeExcel(textSearch, value, 2, "./downloads/ExcelTest.xlsx");
  //await page.locator("#fileinput").click();
 
  await page.locator("#fileinput").setInputFiles("./downloads/ExcelTest.xlsx")
  const testlocator= page.getByText(textSearch);
  const desiredrow = page.getByRole("row").filter({has: testlocator});
  await expect(desiredrow.locator("#cell-4-undefined")).toContainText(value);
  
}

);