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
 * Creates and returns the Nodemailer transporter using environment variables.
 */
export function getEmailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert issues on custom SMTP
    },
  });
}

/**
 * Formats submission date and time nicely in Indian Standard Time (IST).
 */
function formatSubmissionDate(dateInput?: Date | string): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date) + " IST";
  } catch {
    return date.toLocaleString();
  }
}

/**
 * 1. Customer Confirmation Email HTML Template
 */
function generateCustomerConfirmationHtml(data: EnquiryEmailData, formattedDate: string): string {
  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Confirmation - Peter Air Systems</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #063B5C 0%, #0A6CA8 100%); padding: 32px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">PETER AIR SYSTEMS</h1>
              <p style="color: #e0f2fe; margin: 0; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Air Handling Units & Cleanroom Engineering Solutions</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 35px 30px 25px 30px;">
              <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">Dear ${data.name || "Valued Client"},</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for reaching out to <strong>Peter Air Systems</strong>. We have successfully received your enquiry regarding <strong>${data.productOrService || "HVAC / Cleanroom Equipment"}</strong>.
              </p>

              <!-- Success Alert Box -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; margin-bottom: 25px;">
                <p style="color: #166534; font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">✓ Enquiry Received Successfully</p>
                <p style="color: #15803d; font-size: 13px; margin: 0;">Reference ID: <strong>#${reference}</strong> | Date: <strong>${formattedDate}</strong></p>
              </div>

              <!-- Summary Table -->
              <h3 style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Your Submitted Enquiry</h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 25px;">
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b; width: 35%;">Subject / Product:</td>
                  <td style="padding: 10px 16px; font-size: 14px; font-weight: 600; color: #063B5C;">${data.productOrService || "Air Handling Unit (AHU)"}</td>
                </tr>
                ${data.companyName ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Company / Facility:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.companyName}</td>
                </tr>` : ""}
                ${data.phone ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Contact Number:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.phone}</td>
                </tr>` : ""}
                ${data.quantity ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Estimated Quantity:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.quantity}</td>
                </tr>` : ""}
                ${data.city ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Installation Location:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.city}</td>
                </tr>` : ""}
                ${data.requirement ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Requirement Scope:</td>
                  <td style="padding: 10px 16px; font-size: 14px; color: #334155;">${data.requirement}</td>
                </tr>` : ""}
                ${data.message ? `
                <tr>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b; vertical-align: top;">Your Message:</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #475569; line-height: 1.5;">${data.message.replace(/\n/g, "<br>")}</td>
                </tr>` : ""}
              </table>

              <!-- What happens next -->
              <div style="background-color: #f8fafc; border-left: 4px solid #063B5C; padding: 16px 18px; border-radius: 0 10px 10px 0; margin-bottom: 25px;">
                <h4 style="color: #0f172a; margin: 0 0 6px 0; font-size: 14px; font-weight: 700;">What happens next?</h4>
                <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0;">
                  Our engineering and cleanroom specialists are currently reviewing your project details. A dedicated technical consultant from the <strong>Peter Air Systems</strong> team will get in touch with you shortly (typically within <strong>2 to 4 business hours</strong>) to discuss technical datasheets, sizing, and pricing.
                </p>
              </div>

              <!-- Immediate Assistance -->
              <div style="background-color: #f1f5f9; border-radius: 10px; padding: 18px 20px;">
                <p style="color: #0f172a; font-size: 13px; font-weight: 700; margin: 0 0 10px 0;">Need immediate assistance or direct consultation?</p>
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-right: 12px;">
                      <a href="tel:+918484836337" style="display: inline-block; background-color: #063B5C; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 8px;">
                        📞 Call +91 8484 836 337
                      </a>
                    </td>
                    <td>
                      <a href="https://wa.me/918484836337?text=Hi%20Peter%20Air%20Systems%2C%20I%20have%20submitted%20an%20enquiry%20Ref%20%23${reference}" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 8px;">
                        💬 Chat on WhatsApp
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 30px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="color: #f8fafc; font-size: 14px; font-weight: 700; margin: 0 0 6px 0;">PETER AIR SYSTEMS</p>
              <p style="color: #94a3b8; font-size: 11px; line-height: 1.6; margin: 0 0 10px 0;">
                Unit No. 01, 02, 03, and 06, Dattani Prism IT Park-1, Golani, Vasai West, Palghar - 401202, Mumbai, Maharashtra, India<br>
                Factory: Shyamal Industrial Park, Bakrol-Bujrang, Ahmedabad - 382433, Gujarat, India
              </p>
              <p style="color: #64748b; font-size: 11px; margin: 0;">
                Email: <a href="mailto:sales@peterairs.com" style="color: #38bdf8; text-decoration: none;">sales@peterairs.com</a> | 
                Direct: <a href="mailto:sanjay@peterairs.com" style="color: #38bdf8; text-decoration: none;">sanjay@peterairs.com</a> | 
                Website: <a href="https://peterairs.com" style="color: #38bdf8; text-decoration: none;">www.peterairs.com</a>
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
 * 2. Owner & Admin Notification Email HTML Template
 * Sent to sanjay@peterairs.com and princekumarjha80@gmail.com
 */
function generateAdminNotificationHtml(
  data: EnquiryEmailData,
  recipientLabel: "Owner" | "Admin Copy",
  formattedDate: string
): string {
  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);
  const cleanPhone = (data.phone || "").replace(/\D/g, "");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Customer Enquiry - Peter Air Systems</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 25px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.07);">
          
          <!-- Alert Header -->
          <tr>
            <td style="background-color: #063B5C; padding: 24px 28px; border-bottom: 4px solid #f59e0b;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="background-color: #f59e0b; color: #000000; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                      ⚡ NEW CUSTOMER ENQUIRY [${recipientLabel.toUpperCase()}]
                    </span>
                    <h2 style="color: #ffffff; margin: 8px 0 0 0; font-size: 20px; font-weight: 700;">
                      ${data.productOrService || "General Cleanroom / HVAC Inquiry"}
                    </h2>
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
                  <td style="font-size: 12px; font-weight: 700; color: #475569;">DIRECT ACTIONS:</td>
                  <td align="right">
                    <a href="tel:${data.phone}" style="display: inline-block; background-color: #0284c7; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; margin-left: 6px;">
                      📞 Call ${data.phone}
                    </a>
                    <a href="mailto:${data.email}?subject=Re:%20Peter%20Air%20Systems%20Enquiry%20-%20Ref%20%23${reference}" style="display: inline-block; background-color: #0f766e; color: #ffffff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-decoration: none; margin-left: 6px;">
                      ✉ Reply to Client
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
              <h3 style="color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0;">Customer Enquiry Details</h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 22px;">
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b; width: 32%;">Customer Name:</td>
                  <td style="padding: 10px 14px; font-size: 14px; font-weight: 700; color: #0f172a;">${data.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Email Address:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #0284c7;">
                    <a href="mailto:${data.email}" style="color: #0284c7; text-decoration: none;">${data.email}</a>
                    <span style="font-size: 11px; color: #64748b; font-weight: normal; margin-left: 6px;">(Set as Reply-To)</span>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Phone Number:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #0f172a;">
                    <a href="tel:${data.phone}" style="color: #0f172a; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Company / Facility:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #0369a1;">${data.companyName || "Not Provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Subject / Interested In:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 700; color: #063B5C;">${data.productOrService || "General Equipment Inquiry"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Requirement Scope:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #334155;">${data.requirement || "Technical Specs & Quote"}</td>
                </tr>
                ${data.quantity ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Estimated Quantity:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #334155;">${data.quantity}</td>
                </tr>` : ""}
                ${data.city ? `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Installation City:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #334155;">${data.city}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; font-weight: 600; color: #64748b;">Submission Timestamp:</td>
                  <td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #334155;">${formattedDate}</td>
                </tr>
              </table>

              ${data.message ? `
              <h3 style="color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Customer Message / Notes:</h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.5; color: #334155; margin-bottom: 22px;">
                ${data.message.replace(/\n/g, "<br>")}
              </div>` : ""}

              <!-- Admin Link -->
              <div style="text-align: center; padding-top: 10px;">
                <a href="https://peterairs.com/admin" style="display: inline-block; background-color: #063B5C; color: #ffffff; font-size: 13px; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                  Open Admin Panel to Manage Enquiry →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
              This notification was automatically sent by the Peter Air Systems Enquiry Engine.
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
 * Dispatches 3-way email notifications:
 * 1. Customer Confirmation Email -> data.email
 * 2. Owner Notification Email    -> sanjay@peterairs.com (or process.env.OWNER_EMAIL)
 * 3. Admin Notification Email    -> princekumarjha80@gmail.com (or process.env.ADMIN_EMAIL)
 * 
 * Each recipient receives an independent email without relying on CC/BCC.
 */
export async function sendEnquiryNotifications(data: EnquiryEmailData) {
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";
  const user = process.env.SMTP_USER || "";
  const fromName = process.env.SMTP_FROM_NAME || "Peter Air Systems";

  // Target recipients
  const ownerEmail = process.env.OWNER_EMAIL || "sanjay@peterairs.com";
  const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL || "princekumarjha80@gmail.com";

  const reference = data.id ? data.id.slice(-8).toUpperCase() : "PAS-" + Math.floor(100000 + Math.random() * 900000);
  const formattedDate = formatSubmissionDate(data.createdAt);

  if (!pass || !user) {
    console.warn(
      `[Nodemailer] Warning: SMTP_USER or SMTP_PASS is missing in environment variables. Skipped sending 3-way emails for Enquiry #${reference}.`
    );
    return {
      success: false,
      skipped: true,
      message: "SMTP credentials not configured in environment variables.",
    };
  }

  const transporter = getEmailTransporter();
  const fromAddress = `"${fromName}" <${user}>`;

  const emailTasks: Promise<{ recipient: string; success: boolean; error?: string }>[] = [];

  // 1. Customer Confirmation Email
  if (data.email) {
    emailTasks.push(
      transporter
        .sendMail({
          from: fromAddress,
          to: data.email,
          replyTo: ownerEmail,
          subject: `Enquiry Confirmation: Thank You for Contacting Peter Air Systems [#${reference}]`,
          html: generateCustomerConfirmationHtml(data, formattedDate),
        })
        .then(() => {
          console.log(`[Nodemailer] ✓ Customer confirmation sent to: ${data.email} [#${reference}]`);
          return { recipient: "customer", success: true };
        })
        .catch((err) => {
          console.error(`[Nodemailer] ✗ Failed sending customer confirmation to ${data.email}:`, err.message);
          return { recipient: "customer", success: false, error: err.message };
        })
    );
  }

  // 2. Owner Notification Email (sanjay@peterairs.com)
  emailTasks.push(
    transporter
      .sendMail({
        from: fromAddress,
        to: ownerEmail,
        replyTo: data.email, // Allows owner to reply directly to customer
        subject: `⚡ New Customer Enquiry: ${data.name} (${data.companyName || "Direct Client"}) - ${data.productOrService || "General"}`,
        html: generateAdminNotificationHtml(data, "Owner", formattedDate),
      })
      .then(() => {
        console.log(`[Nodemailer] ✓ Owner notification sent to: ${ownerEmail} [#${reference}]`);
        return { recipient: "owner", success: true };
      })
      .catch((err) => {
        console.error(`[Nodemailer] ✗ Failed sending owner notification to ${ownerEmail}:`, err.message);
        return { recipient: "owner", success: false, error: err.message };
      })
  );

  // 3. Additional Admin Notification Email (princekumarjha80@gmail.com)
  emailTasks.push(
    transporter
      .sendMail({
        from: fromAddress,
        to: adminEmail,
        replyTo: data.email, // Allows admin to reply directly to customer
        subject: `⚡ [Admin Copy] New Customer Enquiry: ${data.name} (${data.companyName || "Direct Client"}) - ${data.productOrService || "General"}`,
        html: generateAdminNotificationHtml(data, "Admin Copy", formattedDate),
      })
      .then(() => {
        console.log(`[Nodemailer] ✓ Admin copy sent to: ${adminEmail} [#${reference}]`);
        return { recipient: "admin", success: true };
      })
      .catch((err) => {
        console.error(`[Nodemailer] ✗ Failed sending admin copy to ${adminEmail}:`, err.message);
        return { recipient: "admin", success: false, error: err.message };
      })
  );

  // Wait for all 3 independent emails to complete
  const results = await Promise.allSettled(emailTasks);
  console.log(`[Nodemailer] Completed 3-way notification execution for Enquiry #${reference}`);

  return {
    success: true,
    results,
  };
}
