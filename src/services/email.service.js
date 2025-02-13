const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const dotenv = require('dotenv')
dotenv.config();

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */

const sendWelcomeEmail = async (employeeEmail, password, name, role) => {
  const text = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #004a8f;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
      color: #333333;
    }
    .content h2 {
      color: #004a8f;
    }
    .footer {
      background-color: #f4f4f4;
      color: #666666;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
    .footer a {
      color: #004a8f;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background-color: #004a8f;
      color: #ffffff;
      padding: 10px 20px;
      margin-top: 20px;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #003366;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to TNSTC Corporation!</h1>
    </div>
    <div class="content">
      <h2>Congratulations!</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p>We are thrilled to inform you that you have been successfully added as a <strong>${role.charAt(0).toUpperCase() + role.slice(1)}</strong> at <strong>TNSTC Corporation</strong>.</p>
      <p>We are excited to have you on board and look forward to your contributions to our team. Let’s drive success together!</p>
      <br/>
      <h3>Login credientials</h6>
      <p><strong>Email:</strong> ${employeeEmail}</p>
      <p><strong>Passowrd:</strong> ${password}</p>
      <br/>
      <br/>
      <a href="${process.env.CLIENT}/${role.toLowerCase()}/home" class="button">Access Your Dashboard</a>
    </div>  
    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@tnstc-corp.com">support@tnstc-corp.com</a></p>
      <p>&copy; 2025 TNSTC Corporation. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
    `

  await sendEmail(employeeEmail, 'Welcome to TNSTC', text);
}

const sendEmail = async (to, subject, text) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    html: text,
    text: 'Fallback plain text content for email clients that do not support HTML',
  };

  await transport.sendMail(msg);
};

const sendLoginAlertEmail = async (email, device, ip, time) => {
  const subject = 'Login Alert'
  const text = `
    Dear User,
    <br>
    You have logged in new device. Review below details and ensure its you. <br><br>
    <strong><u>Login Information</u></strong><br>
    <strong>Device:</strong> ${device}<br>
    <strong>IP:</strong> ${ip}<br>
    <strong>Date & Time:</strong> ${time}<br>

    <br>
    <br>
    Yours Sincerely
    TNSTC Corp
  `

  await sendEmail(email, subject, text);
  return
}

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendWelcomeEmail,
  sendLoginAlertEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
