const LoginPage = require('../src/classes/auth/login');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');

describe('Check user Name in the User Menu', async () => {
  // add varibalses for testing
  const URL = 'https://app.colorjob.com/login';
  const urlForCheck =
    'https://app.colorjob.com/system/dashboard';
  // const URL = 'http://localhost:4300/login';
  // const urlForCheck = "http://localhost:4300/system/dashboard"
  const email = 'superadmin@gmail.com';
  const password = 'colorjob';
  const user = "Ben";
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check user name', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', URL);
    try {
      const loginPageTest = new LoginPage(driverChrome, URL);
      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(email);
      await loginPageTest.fillPasswordInput(password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(urlForCheck);
      await loginPageTest.checkUserNameinUserForm(user)
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });
});