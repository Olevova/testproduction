const LoginPage = require('../src/classes/auth/login');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');

describe('Check user Name in the User Menu', async () => {
  // add varibalses for testing
  const URL = 'https://app.colorjob.com/login';
  const urlForCheck =
    'https://app.colorjob.com/system/dashboard';
 

  const userSA = "Ben";
  const userCA = 'Vova CA';
  const userPM = 'Vova PM';
  const userSU = 'Vova SU';
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check user name SA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.userLogIn(
        config.email,
        config.password,
        config.urlHomePageForCheck
      );
     
      await loginPageTest.checkUserNameinUserForm(userSA)
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_SU');
      throw error;
    }
  });

  it('Check user name of the CA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.userLogIn(
        config.emailCA,
        config.passwordCA,  
      );
      await loginPageTest.checkUserNameinUserForm(userCA)
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_CA');
      throw error;
    }
  });

  it('Check user name of the PM', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.userLogIn(
        config.emailPM,
        config.passwordPM,  
      );
      await loginPageTest.checkUserNameinUserForm(userPM)
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_PM');
      throw error;
    }
  });

  it('Check user name of the SU', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      await loginPageTest.userLogIn(
        config.emailSU,
        config.passwordSU,
        
      );
      await loginPageTest.checkUserNameinUserForm(userSU)
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test_SU');
      throw error;
    }
  });
});