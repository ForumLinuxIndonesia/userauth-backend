import nodemailer from 'nodemailer';
import generateTemplate from '#utils/emailTemplate.js';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  dkim: {
    domainName: process.env.DKIM_DOMAIN,
    keySelector: process.env.DKIM_KEYSELECTOR,
    privateKey: process.env.DKIM_PRIVKEY,
  },
});

const sendVerifyCode = async ({
  from = 'Gacha Email Verification', to, subject = 'Register Account Verification', verifyCode,
}) => {
  await transporter.sendMail({
    from: `"${from}" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: generateTemplate(verifyCode),
  });
};

export default sendVerifyCode;
export { sendVerifyCode };
