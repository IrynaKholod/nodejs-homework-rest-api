const sgMail = require("@sendgrid/mail");
require("dotenv").config();


const { SENDGRID_API_KEY } = process.env;
console.log('SENDGRID_API_KEY:', SENDGRID_API_KEY);

const sender = 'ira.arkhipenko@gmail.com';

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: sender};
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;


