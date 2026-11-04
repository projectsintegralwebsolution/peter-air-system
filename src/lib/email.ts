import nodemailer from "nodemailer";

export interface EnquiryEmailData {
  id?: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  productOrService?: string;
  requirement?: string;
  quantity?: string;
  city?: string;
  message?: string;
  createdAt?: Date | string;
}

/**
 * Creates and returns the nodemailer transporter using environment variables.
 * Defaults to integralwebsolution@gmail.com SMTP host.
 */
export function getEmailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false"; // 465 is secure (SSL), 587 is STARTTLS
  const user = process.env.SMTP_USER || "integralwebsolution@gmail.com";
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";

  if (!pass) {
    console.warn(
      "[Nodemailer] Warning: SMTP_PASS / GMAIL_APP_PASSWORD is not set in environment variables. Outgoing emails cannot authenticate until configured."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * 1. Customer Auto-Confirmation HTML Template
 */
function generateCustomerConfirmationHtml(data: EnquiryEmailData): string {
  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);
  const cleanPhone = (data.phone || "").replace(/\D/g, "");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Peter Air Systems</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #063B5C 0%, #0A6CA8 100%); padding: 32px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">PETER AIR SYSTEMS</h1>
              <p style="color: #e0f2fe; margin: 0; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Cleanroom & HVAC Engineering Solutions</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 35px 30px 25px 30px;">
              <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">Dear ${data.name || "Valued Client"},</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for contacting <strong>Peter Air Systems</strong>. We have received your technical inquiry regarding <strong>${data.productOrService || "HVAC / Cleanroom Equipment"}</strong>.
              </p>

              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; margin-bottom: 25px;">
                <p style="color: #166534; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">✓ Inquiry Received Successfully</p>
                <p style="color: #15803d; font-size: 13px; margin: 0;">Reference ID: <strong>#${reference}</strong></p>
              </div>

              <!-- Summary Table -->
              <h3 style="color: #0f172a; font-size: 15px; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Your Request</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 25px;">
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b; width: 35%;">Product / Service:</td>
                  <td style="padding: 10px 16px; font-size: 14px; font-weight: 600; color: #0f172a;">${data.productOrService || "Air Handling Unit (AHU)"}</td>
                </tr>
                ${data.companyName ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Company / Facility:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.companyName}</td>
                </tr>` : ""}
                ${data.quantity ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Quantity:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.quantity}</td>
                </tr>` : ""}
                ${data.requirement ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Requirement Type:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.requirement}</td>
                </tr>` : ""}
                ${data.city ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Installation City:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.city}</td>
                </tr>` : ""}
                ${data.message ? `
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b; vertical-align: top;">Your Message:</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #475569; line-height: 1.5;">${data.message}</td>
                </tr>` : ""}
              </table>

              <!-- What happens next -->
              <div style="background-color: #f8fafc; border-left: 4px solid #063B5C; padding: 16px 18px; border-radius: 0 10px 10px 0; margin-bottom: 25px;">
                <h4 style="color: #0f172a; margin: 0 0 6px 0; font-size: 14px; font-weight: 700;">What happens next?</h4>
                <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0;">
                  Our HVAC & cleanroom design engineers are reviewing your specifications. A technical specialist will contact you within <strong>2 to 4 business hours</strong> with technical datasheets, sizing calculations, and commercial quotation.
                </p>
              </div>

              <!-- Immediate Assistance -->
              <p style="color: #475569; font-size: 13px; margin: 0 0 8px 0;">Need immediate urgent assistance?</p>
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="tel:+919714877717" style="display: inline-block; background-color: #063B5C; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 18px; border-radius: 8px;">
                      📞 Call Direct (+91 97148 77717)
                    </a>
                  </td>
                  <td>
                    <a href="https://wa.me/919714877717?text=Hi%2C%20I%20have%20submitted%20an%20inquiry%20Ref%20%23${reference}" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 18px; border-radius: 8px;">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 30px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="color: #cbd5e1; font-size: 13px; font-weight: 600; margin: 0 0 6px 0;">PETER AIR SYSTEMS</p>
              <p style="color: #94a3b8; font-size: 11px; line-height: 1.5; margin: 0 0 10px 0;">
                Plot No. 58, 59, 60, Shyamal Industrial Park, B/h. Shivam Hotel, Bakrol-Bujrang, Ta. Daskroi, Dist. Ahmedabad - 382433, Gujarat, India
              </p>
              <p style="color: #64748b; font-size: 11px; margin: 0;">
                Sales: <a href="mailto:sales@peterairs.com" style="color: #38bdf8; text-decoration: none;">sales@peterairs.com</a> | Website: <a href="https://peterairs.com" style="color: #38bdf8; text-decoration: none;">www.peterairs.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 2. Sales Team Lead Notification HTML Template (for sales@peterairs.com)
 */
function generateSalesLeadHtml(data: EnquiryEmailData): string {
  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);
  const cleanPhone = (data.phone || "").replace(/\D/g, "");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website RFQ Lead - Peter Air Systems</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 25px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.07);">
          
          <!-- Alert Header -->
          <tr>
            <td style="background-color: #063B5C; padding: 22px 28px; border-bottom: 4px solid #f59e0b;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="background-color: #f59e0b; color: #000000; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">⚡ NEW HIGH-PRIORITY RFQ LEAD</span>
                    <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 20px; font-weight: 700;">${data.productOrService || "General Equipment Inquiry"}</h2>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <span style="color: #93c5fd; font-size: 12px; font-family: monospace;">#${reference}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Actions Bar -->
          <tr>
            <td style="background-color: #f8fafc; padding: 14px 28px; border-bottom: 1px solid #e2e8f0;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-size: 12px; font-weight: 600; color: #475569;">QUICK CONNECT:</td>
                  <td align="right">
                    <a href="tel:${data.phone}" style="display: inline-block; background-color: #0284c7; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; margin-left: 6px;">
                      📞 Call ${data.phone}
                    </a>
                    <a href="mailto:${data.email}?subject=Peter%20Air%20Systems%20Quotation%20-%20Ref%20%23${reference}" style="display: inline-block; background-color: #0f766e; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; margin-left: 6px;">
                      ✉ Email Client
                    </a>
                    ${cleanPhone ? `
                    <a href="https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(data.name || '')}%2C%20thank%20you%20for%20contacting%20Peter%20Air%20Systems%20regarding%20${encodeURIComponent(data.productOrService || '')}." style="display: inline-block; background-color: #16a34a; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; margin-left: 6px;">
                      💬 WhatsApp
                    </a>` : ""}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 24px 28px;">
              <h3 style="color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0;">Client Information</h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 22px;">
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b; width: 30%;">Full Name:</td>
                  <td style="padding: 10px 14px; font-size: 14px; font-weight: 700; color: #0f172a;">${data.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Company / Facility:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #0369a1;">${data.companyName || "Not Provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Phone Number:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #0f172a;">
                    <a href="tel:${data.phone}" style="color: #0284c7; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Email Address:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a;">
                    <a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Location / City:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #334155;">${data.city || "Not Specified"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Product Required:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #063B5C;">${data.productOrService || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Quantity:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #334155;">${data.quantity || "1"} Unit(s)</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Requirement Scope:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #334155;">${data.requirement || "Technical Specs & Quote"}</td>
                </tr>
              </table>

              ${data.message ? `
              <h3 style="color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Client Message / Technical Notes:</h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.5; color: #334155; margin-bottom: 22px;">
                ${data.message.replace(/\n/g, "<br>")}
              </div>` : ""}

              <!-- Admin Link -->
              <div style="text-align: center; padding-top: 10px;">
                <a href="https://peterairs.com/admin" style="display: inline-block; background-color: #063B5C; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                  Open Admin Panel to Manage Lead →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
              This notification was automatically sent by the Peter Air Systems lead generation engine.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 3. Agency / Web Admin Backup Notification HTML Template (for integralwebsolution@gmail.com)
 */
function generateAdminBackupHtml(data: EnquiryEmailData): string {
  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toISOString();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Admin Backup: Website Form Submission</title>
</head>
<body style="font-family: monospace; background: #0f172a; color: #f8fafc; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 10px; padding: 24px; border: 1px solid #334155;">
    <h2 style="color: #38bdf8; margin: 0 0 10px 0; font-size: 16px;">[WEB SYSTEM BACKUP] New Inquiry Log</h2>
    <p style="color: #94a3b8; font-size: 12px; margin: 0 0 16px 0;">Site: peterairs.com | Timestamp: ${timestamp}</p>
    
    <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Ref ID:</td><td style="padding: 6px; color: #38bdf8; border-bottom: 1px solid #334155;">#${reference}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Name:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.name}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Company:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.companyName || "N/A"}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Email:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.email}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Phone:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.phone}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Product:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.productOrService || "N/A"}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">Qty:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.quantity || "1"}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8; border-bottom: 1px solid #334155;">City:</td><td style="padding: 6px; color: #f8fafc; border-bottom: 1px solid #334155;">${data.city || "N/A"}</td></tr>
      <tr><td style="padding: 6px; color: #94a3b8;">Requirement:</td><td style="padding: 6px; color: #f8fafc;">${data.requirement || "N/A"}</td></tr>
    </table>

    ${data.message ? `
    <div style="background: #0f172a; padding: 12px; border-radius: 6px; font-size: 11px; color: #cbd5e1; margin-bottom: 16px;">
      <strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}
    </div>` : ""}

    <p style="color: #64748b; font-size: 11px; margin: 0;">Lead recorded in SQLite + data/enquiries.json</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Dispatches 3-way email notifications:
 * 1. Customer Auto-Confirmation -> data.email
 * 2. Sales Team Notification    -> sales@peterairs.com
 * 3. Web Admin / Agency Backup  -> integralwebsolution@gmail.com
 */
export async function sendEnquiryNotifications(data: EnquiryEmailData) {
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";
  const user = process.env.SMTP_USER || "integralwebsolution@gmail.com";
  const salesEmail = process.env.SALES_EMAIL || "sales@peterairs.com";
  const adminBackupEmail = process.env.ADMIN_BACKUP_EMAIL || "integralwebsolution@gmail.com";

  if (!pass) {
    console.warn(
      "[Nodemailer] Skipped sending 3-way emails: No SMTP_PASS or GMAIL_APP_PASSWORD configured in .env."
    );
    return {
      success: false,
      skipped: true,
      message: "SMTP password not set in environment variables.",
    };
  }

  const transporter = getEmailTransporter();
  const fromAddress = `"Peter Air Systems" <${user}>`;
  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);

  const emailTasks = [];

  // 1. Email to Customer
  if (data.email) {
    emailTasks.push(
      transporter
        .sendMail({
          from: fromAddress,
          to: data.email,
          replyTo: salesEmail,
          subject: `Inquiry Confirmation: Thank You for Contacting Peter Air Systems [#${reference}]`,
          html: generateCustomerConfirmationHtml(data),
        })
        .then(() => ({ recipient: "customer", success: true }))
        .catch((err) => ({ recipient: "customer", success: false, error: err.message }))
    );
  }

  // 2. Email to Sales Team (sales@peterairs.com)
  emailTasks.push(
    transporter
      .sendMail({
        from: fromAddress,
        to: salesEmail,
        replyTo: data.email,
        subject: `⚡ New RFQ Lead: ${data.name} (${data.companyName || "Direct Client"}) - ${data.productOrService || "General"}`,
        html: generateSalesLeadHtml(data),
      })
      .then(() => ({ recipient: "sales", success: true }))
      .catch((err) => ({ recipient: "sales", success: false, error: err.message }))
  );

  // 3. Email to Web Admin Backup (integralwebsolution@gmail.com)
  emailTasks.push(
    transporter
      .sendMail({
        from: fromAddress,
        to: adminBackupEmail,
        replyTo: data.email,
        subject: `[Admin Backup Lead #${reference}] ${data.name} - ${data.productOrService || "Inquiry"}`,
        html: generateAdminBackupHtml(data),
      })
      .then(() => ({ recipient: "admin_backup", success: true }))
      .catch((err) => ({ recipient: "admin_backup", success: false, error: err.message }))
  );

  const results = await Promise.allSettled(emailTasks);
  console.log(`[Nodemailer] 3-way email results for Lead #${reference}:`, results);

  return {
    success: true,
    results,
  };
}
