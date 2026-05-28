import sendEmail from "../utils/sendEmail.js";
import { createWelcomeEmailTemplate } from "../templates/welcomeEmail.template.js";

export const sendGoogleWelcomeEmail = async (user) => {
  if (!user?.email) {
    return {
      skipped: true,
      reason: "USER_EMAIL_MISSING",
    };
  }

  const template = createWelcomeEmailTemplate({
    name: user.name,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: user.createdAt,
    ctaUrl: process.env.CLIENT_URL,
  });

  return sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
};
