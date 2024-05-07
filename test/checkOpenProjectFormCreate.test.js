const LoginPage = require('../src/classes/auth/login');
const CreateProject = require('../src/classes/project/createProject');
const { createWebdriverChrom } = require('../src/utils/webdriver');
const { describe } = require('mocha');
const makeScreenshot = require('../src/utils/makeScreenShot');

describe('Check open form for Project create', async () => {
  // add varibalses for testing
  const URL = 'https://app.colorjob.com/login';
  const urlForCheck =
    'https://app.colorjob.com/system/dashboard';
  // const URL = 'http://localhost:4300/login';
  // const urlForCheck = "http://localhost:4300/system/dashboard"
  const email = 'superadmin@gmail.com';
  const password = 'colorjob';
  const projectTitle = "Create Project";
  let driverChrome = null;

  beforeEach(async () => {
    driverChrome = await createWebdriverChrom();
  });

  afterEach(async () => {
    await driverChrome.quit();
  });

  it('Check open Project form', async () => {
    // time and site or lochalhost there tests are going
    console.log(Date().toLocaleLowerCase(), 'date', URL);
    try {
      const loginPageTest = new LoginPage(driverChrome, URL);
      const openProjectForm = new CreateProject(driverChrome);

      await loginPageTest.openLoginForm();
      await loginPageTest.fillEmailInput(email);
      await loginPageTest.fillPasswordInput(password);
      await loginPageTest.checkSaveForFuture();
      await loginPageTest.login(urlForCheck);
      await openProjectForm.goToCreateProjectForm();
      await openProjectForm.checkCreateProjectFormOpen(projectTitle);
    } catch (error) {
      // if something wrong make screen in utils/screenshot
      makeScreenshot(driverChrome, 'user_menu_test');
      throw error;
    }
  });
});