const LoginPage = require('../src/classes/auth/login');
const CreateProject = require('../src/classes/project/createProject');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');
const config = require('../src/utils/config');

describe('Check open form for Project create', async () => {
  // add varibalses for testing
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open Project form for the SU', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openProjectForm = new CreateProject(driverChrome);
      await loginPageTest.userLogIn(
        config.email,
        config.password,
        config.urlHomePageForCheck
      );
      await openProjectForm.goToCreateProjectForm();
      await openProjectForm.checkCreateProjectFormOpen(config.projectFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });

  it('Check open Project form for the CA', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', config.urlLoginPage);
    try {
      const loginPageTest = new LoginPage(driverChrome, config.urlLoginPage);
      const openProjectForm = new CreateProject(driverChrome);
      await loginPageTest.userLogIn(
        config.emailCA,
        config.passwordCA,
      );
      await openProjectForm.goToCreateProjectForm("ca");
      await openProjectForm.checkCreateProjectFormOpen(config.projectFormTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });

});