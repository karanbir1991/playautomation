const {devices} =require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries:2,
  workers: 2,
  fullyParallel: false,
  timeout: 60 *1000,
  expect: {
    timeout: 60 *1000,
  },

  reporter: [
  ['list'],
  [''],
  ['html', { open: 'never' }]
],

projects: [
  {
    name: 'chrome',
    use: {
      browserName: 'chromium',
      ignoreHTTPSErrors: true,
      viewport: null,
      launchOptions: { args: ['--start-maximized'] },
      headless: true,
      screenshot: 'on',
      video:'on-first-retry',
      trace: 'on-first-retry',
    },
  },
  {
    name: 'firefox',
    use: {
      browserName: 'firefox',
      viewport: null,
      launchOptions: { args: ['--start-maximized'] },
      headless: true,
      screenshot: 'on',
      trace: 'on',
    },
  },
  {
    name: 'edge',
    use: {
      browserName: 'chromium',
      channel: 'msedge',
      viewport: null,
      launchOptions: { args: ['--start-maximized'] },
      headless: true,
      screenshot: 'on',
      trace: 'retain-on-failure',
    },
  },
  // {
  //   name: 'safari',
  //   use: {
  //     browserName: 'webkit',
  //     // viewport: null,
  //     // launchOptions: { args: ['--start-maximized'] },
  //     headless: false,
  //     screenshot: 'on',
  //     trace: 'on',
  //     ...devices['Desktop Safari']
  //   },
  // },
  // {
  //   name: 'mobile-responsive',
  //   use: {
  //     browserName: 'chromium',
  //     viewport: { width: 360, height: 640 },
  //     headless: false,
  //     screenshot: 'on',
  //     trace: 'retain-on-failure',
  //   },
  // },
  // {
  //   name: 'Large-mobile-responsive',
  //   use: {
  //     browserName: 'chromium',
  //     viewport: { width: 414, height: 896 },
  //     headless: false,
  //     screenshot: 'on',
  //     trace: 'retain-on-failure',
  //   },
  // },
  // {
  //   name: 'Tablet-responsive',
  //   use: {
  //     browserName: 'chromium',
  //     viewport: { width: 768, height: 1024 },
  //     headless: false,
  //     screenshot: 'on',
  //     trace: 'retain-on-failure',
  //   },
  // },
  // {
  //   name: 'Pixel7-responsive',
  //   use: {
  //     browserName: 'chromium',
  //     ...devices['Pixel 7'],
  //     headless: false,
  //     screenshot: 'on',
  //     trace: 'retain-on-failure',
      
  //   },
  // },

],
});
  module.exports=config