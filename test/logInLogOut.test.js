const LogOut = require('../src/classes/auth/logOut');
const LoginPage = require('../src/classes/auth/login');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');

describe('Log In and Log Out Production, test-cases #1, 2', async () => {
  // add varibalses for testing //
  // const URL = 'https://app.colorjob.com/login';
  // const urlForCheck =
  //   'https://app.colorjob.com/system/dashboard';
  const URL = 'http://localhost:4300/login';
  // const urlForCheck = "http://localhost:4300/system/dashboard"
  const email = 'superadmin@gmail.com';
  const password = 'colorjob';
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Log In and Log Out the Coloradojob production', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', URL);
    try {
      const loginPageTest = new LoginPage(driverChrome, URL);
      const logOutUserTest = new LogOut(driverChrome);
      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(email);
      await loginPageTest.fillPasswordInput(password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(urlForCheck);
      await logOutUserTest.findUserMenu();
      await logOutUserTest.userLogOut(URL);
      console.log('test passed');
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'auth_test');
      throw error;
    }
  });
});
