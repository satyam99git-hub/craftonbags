const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatDate = (date = new Date()) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);

export const createWelcomeEmailTemplate = ({
  name,
  email,
  photoURL,
  createdAt,
  ctaUrl,
}) => {
  const safeName = escapeHtml(name || "there");
  const safeEmail = escapeHtml(email || "");
  const firstLetter = escapeHtml((name || email || "C").charAt(0).toUpperCase());
  const accountCreatedAt = formatDate(createdAt);
  const startUrl = ctaUrl || process.env.CLIENT_URL || "http://localhost:5173";
  const safeStartUrl = escapeHtml(startUrl);
  const currentYear = new Date().getFullYear();

  const avatarMarkup = photoURL
    ? `<img src="${escapeHtml(photoURL)}" width="72" height="72" alt="${safeName}" style="display:block;width:72px;height:72px;border-radius:999px;border:3px solid #ffffff;object-fit:cover;box-shadow:0 12px 30px rgba(15,23,42,0.18);" />`
    : `<div role="img" aria-label="${safeName}" style="width:72px;height:72px;border-radius:999px;background:#111827;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:800;line-height:72px;text-align:center;border:3px solid #ffffff;box-shadow:0 12px 30px rgba(15,23,42,0.18);">${firstLetter}</div>`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Welcome to Crafton Bags</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f2ea;font-family:Arial,Helvetica,sans-serif;color:#18181b;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Welcome to Crafton Bags. Your account is ready and waiting.
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f6f2ea;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;border-collapse:collapse;">
            <tr>
              <td style="padding:0 0 18px 0;text-align:center;">
                <div style="font-size:24px;font-weight:900;letter-spacing:1.8px;color:#111111;">CRAFTON</div>
                <div style="margin-top:6px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#71717a;">Premium Bags & Essentials</div>
              </td>
            </tr>

            <tr>
              <td style="border-radius:28px;overflow:hidden;background:#ffffff;border:1px solid #eadfce;box-shadow:0 24px 70px rgba(33,24,12,0.14);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:34px 26px 30px;background:linear-gradient(135deg,#111827 0%,#2f241d 52%,#b68b4c 100%);text-align:center;">
                      <table role="presentation" align="center" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center">${avatarMarkup}</td>
                        </tr>
                      </table>
                      <h1 style="margin:22px 0 10px;font-size:34px;line-height:1.12;font-weight:900;color:#ffffff;letter-spacing:-0.2px;">Welcome, ${safeName}</h1>
                      <p style="margin:0 auto;max-width:470px;font-size:15px;line-height:1.7;color:#f4eadb;">
                        Your Crafton account has been created with Google Sign-In. A refined collection of premium bags is now ready for you.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:34px 34px 10px;background:#ffffff;">
                      <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:#3f3f46;">
                        We are delighted to have you here. Explore thoughtfully crafted pieces for work, travel, gifting, and everyday style.
                      </p>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:22px 0 28px;">
                        <tr>
                          <td align="center">
                            <a href="${safeStartUrl}" target="_blank" rel="noopener" style="display:inline-block;border-radius:999px;background:#111111;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;padding:15px 30px;box-shadow:0 14px 28px rgba(17,17,17,0.22);">
                              Start Exploring
                            </a>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;margin:0 0 22px;background:#faf8f3;border:1px solid #eee2d0;border-radius:18px;">
                        <tr>
                          <td style="padding:18px 18px;">
                            <div style="font-size:13px;font-weight:900;letter-spacing:1.6px;text-transform:uppercase;color:#a16207;margin-bottom:8px;">Secure Google Sign-In</div>
                            <div style="font-size:14px;line-height:1.65;color:#52525b;">
                              Account created for <strong style="color:#18181b;">${safeEmail}</strong><br />
                              Created on ${escapeHtml(accountCreatedAt)}
                            </div>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 24px;font-size:13px;line-height:1.7;color:#71717a;">
                        If this was not you, contact support immediately. We will help protect your account and review the sign-in activity.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 34px 32px;background:#fbfaf7;border-top:1px solid #f0e7d8;text-align:center;">
                      <div style="font-size:13px;font-weight:800;color:#27272a;">Follow Crafton</div>
                      <div style="margin-top:13px;">
                        <a href="#" aria-label="Instagram" style="display:inline-block;margin:0 5px;width:34px;height:34px;border-radius:999px;background:#ffffff;border:1px solid #e4ded4;color:#111111;text-decoration:none;font-size:12px;font-weight:800;line-height:34px;text-align:center;">IG</a>
                        <a href="#" aria-label="Facebook" style="display:inline-block;margin:0 5px;width:34px;height:34px;border-radius:999px;background:#ffffff;border:1px solid #e4ded4;color:#111111;text-decoration:none;font-size:12px;font-weight:800;line-height:34px;text-align:center;">FB</a>
                        <a href="#" aria-label="X" style="display:inline-block;margin:0 5px;width:34px;height:34px;border-radius:999px;background:#ffffff;border:1px solid #e4ded4;color:#111111;text-decoration:none;font-size:12px;font-weight:800;line-height:34px;text-align:center;">X</a>
                      </div>
                      <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#8a8176;">
                        Copyright ${currentYear} Crafton Bags. All rights reserved.<br />
                        You received this email because a Crafton account was created with Google Sign-In.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 10px 0;text-align:center;font-size:11px;line-height:1.6;color:#9a8f82;">
                Having trouble with the button? Open this link:<br />
                <a href="${safeStartUrl}" style="color:#52525b;text-decoration:underline;">${safeStartUrl}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `Welcome to Crafton Bags, ${name || "there"}!

Your account has been created with Google Sign-In.

Start exploring premium handcrafted bags: ${startUrl}

Account: ${email}
Created: ${accountCreatedAt}

If this was not you, contact support immediately.

Copyright ${currentYear} Crafton Bags. All rights reserved.`;

  return {
    subject: "Welcome to Crafton Bags",
    html,
    text,
  };
};
