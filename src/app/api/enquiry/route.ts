import { NextResponse } from "next/server";
import { saveEnquiryRecord, getEnquiriesList } from "@/lib/db";
import { sendEnquiryNotifications } from "@/lib/email";
import fs from "fs";
import path from "path";

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

    // Spam trap check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
    }

    // Required fields validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Phone validation
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    if (cleanPhone.length < 8) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // 1. Save in Database via Prisma
    const enquiry = await saveEnquiryRecord({
      name,
      companyName,
      email,
      phone,
      productOrService,
      requirement,
      quantity,
      city,
      message,
    });

    // 2. Backup to data/enquiries.json for redundancy
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
      `[ENQUIRY RECEIVED] ID: ${enquiry.id} from ${enquiry.name} (${enquiry.companyName}) for ${enquiry.productOrService}`
    );

    // 3. Dispatch 3-Way Email Notifications (Customer, Sales Team, Admin Backup)
    try {
      await sendEnquiryNotifications({
        id: enquiry.id,
        name,
        companyName,
        email,
        phone,
        productOrService,
        requirement,
        quantity,
        city,
        message,
        createdAt: enquiry.createdAt,
      });
    } catch (emailErr) {
      console.error("[Enquiry Email Dispatch Error]", emailErr);
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
