require('dotenv').config();
module.exports = {
    // URLs for Auto tests
    urlLoginPage: 'https://app.colorjob.com/login',
    urlHomePageForCheck: 'https://app.colorjob.com/dashboard',
    urlForgotPassword: 'https://app.colorjob.com/forgot-password',

    // urlLoginPage: 'https://dev-frontend.colorjob.terenbro.com/login',
    // urlHomePageForCheck: 'https://dev-frontend.colorjob.terenbro.com/dashboard',
    // urlForgotPassword: 'https://dev-frontend.colorjob.terenbro.com/forgot-password',

    // SA,CA,PM,SU credentials
    // email: 'superadmin@gmail.com',
    // password: 'colorjob',
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    emailCA:'volodymyr_o@terenbro.com',
    passwordCA:'222222',
    emailPM:'olevova1983@gmail.com',
    passwordPM:'222222',
    emailSU: 'olevova@ukr.net',
    passwordSU: '222222',
    //forms title
    companyFormTitle: "Create Company",
    projectFormTitle: "Create Project",
    userFormTitle: "Invite new user",
    passwordFormTitle: 'Forgot Password',
    // users
    superAdmin: 'Super Admin',
  };