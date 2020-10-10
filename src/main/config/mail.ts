export default {
  host: String(process.env.MAIL_HOST),
  port: Number(process.env.MAIL_PORT),
  secure: Boolean(process.env.MAIL_SECURE),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
