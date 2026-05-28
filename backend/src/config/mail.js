import nodemailer from "nodemailer";

let transporter;

export const getMailTransporter = () => {
  if (transporter) {
    return transporter;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
  });

  return transporter;
};

export const getMailFrom = () => {
  const name = process.env.MAIL_FROM_NAME || "Crafton Bags";
  const email = process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER;

  return `"${name}" <${email}>`;
};
