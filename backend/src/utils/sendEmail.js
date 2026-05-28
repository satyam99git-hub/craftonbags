import { getMailFrom, getMailTransporter } from "../config/mail.js";

const sendEmail = async ({ to, subject, html, text, replyTo }) => {
  const transporter = getMailTransporter();

  if (!transporter) {
    console.warn("Email skipped: SMTP credentials are not configured");
    return {
      skipped: true,
      reason: "SMTP_NOT_CONFIGURED",
    };
  }

  const info = await transporter.sendMail({
    from: getMailFrom(),
    to,
    subject,
    html,
    text,
    replyTo: replyTo || process.env.MAIL_REPLY_TO || process.env.SMTP_USER,
  });

  return {
    skipped: false,
    messageId: info.messageId,
  };
};

export default sendEmail;
