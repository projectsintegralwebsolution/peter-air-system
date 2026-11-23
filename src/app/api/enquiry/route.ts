import { NextResponse } from "next/server";
import { saveEnquiryRecord, getEnquiriesList } from "@/lib/db";
import { sendEnquiryNotifications } from "@/lib/email";
import fs from "fs";
import path from "path";

// In-memory store to prevent duplicate form submissions within 30 seconds
const recentSubmissions = new Map<string, number>();

function cleanRecentSubmissions() {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60000) {
      recentSubmissions.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      companyName,
      email,
      phone,
      productOrService,
      requirement,
      quantity,
      city,
      message,
      honeypot, // Spam trap
    } = body;

    // 1. Spam trap check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
    }

    // 2. Required fields validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const trimmedName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).replace(/[^\d+]/g, "").trim();

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid full name." },
        { status: 400 }
      );
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 4. Phone validation
    if (cleanPhone.length < 8) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid contact phone number." },
        { status: 400 }
      );
    }

    // 5. Duplicate Submission Prevention (30-second window)
    cleanRecentSubmissions();
    const submissionKey = `${cleanEmail}_${cleanPhone}_${String(productOrService || "").toLowerCase()}_${String(message || "").trim().toLowerCase()}`;
    const now = Date.now();
    const lastSubmitted = recentSubmissions.get(submissionKey);

    if (lastSubmitted && now - lastSubmitted < 30000) {
      console.log(`[ENQUIRY API] Duplicate submission ignored for ${cleanEmail} within 30s window.`);
      return NextResponse.json({
        success: true,
        message:
          "Thank you for contacting Peter Air Systems. Your enquiry has already been received and our engineering team is reviewing it.",
        duplicate: true,
      });
    }

    recentSubmissions.set(submissionKey, now);

    // 6. Save in Persistent Database / JSON Storage
    const enquiry = await saveEnquiryRecord({
      name: trimmedName,
      companyName: companyName ? String(companyName).trim() : "",
      email: cleanEmail,
      phone: String(phone).trim(),
      productOrService: productOrService || "Air Handling Unit (AHU)",
      requirement: requirement || "Quotation & Technical Specifications",
      quantity: quantity || "1 Unit / Project",
      city: city ? String(city).trim() : "",
      message: message ? String(message).trim() : "",
    });

    // 7. Redundancy backup file in data/enquiries.json
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "enquiries.json");

      let existing: any[] = [];
      if (fs.existsSync(filePath)) {
        try {
          existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch {
          existing = [];
        }
      }
      existing.unshift(enquiry);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    } catch (e) {
      console.warn("[Enquiry Backup File Warning]", e);
    }

    console.log(
      `[ENQUIRY SAVED] ID: ${enquiry.id} from ${enquiry.name} (${enquiry.companyName || "Direct"}) for ${enquiry.productOrService}`
    );

    // 8. Trigger Three-Way Email Notification System
    // Independent emails to Customer, Owner (sanjay@peterairs.com), and Admin (princekumarjha80@gmail.com)
    try {
      const emailResult = await sendEnquiryNotifications({
        id: enquiry.id,
        name: enquiry.name,
        companyName: enquiry.companyName,
        email: cleanEmail,
        phone: enquiry.phone,
        productOrService: enquiry.productOrService,
        requirement: enquiry.requirement,
        quantity: enquiry.quantity,
        city: enquiry.city,
        message: enquiry.message,
        createdAt: enquiry.createdAt,
      });

      console.log(`[ENQUIRY EMAIL DISPATCH] Status for Enquiry #${enquiry.id}:`, emailResult);
    } catch (emailError: any) {
      console.error(`[ENQUIRY EMAIL ERROR] Failed triggering 3-way emails for #${enquiry.id}:`, emailError.message);
      // We do not fail the request to the client if email fails, because enquiry record is safely preserved
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting Peter Air Systems. Our engineering team has received your enquiry and will connect with you within 2-4 business hours.",
      enquiryId: enquiry.id,
    });
  } catch (err: any) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again or call us directly." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "all";
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const result = await getEnquiriesList({ status, search, page });
    return NextResponse.json({ success: true, ...result });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || "Failed to read records" }, { status: 500 });
  }
}
