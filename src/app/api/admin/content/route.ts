import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { initDatabase } from "@/lib/db";
import fs from "fs";
import path from "path";

function syncToSiteConfigFile(items: { key: string; value: string }[]) {
  try {
    const configPath = path.join(process.cwd(), "src", "data", "siteConfig.ts");
    if (!fs.existsSync(configPath)) return;
    const fileContent = fs.readFileSync(configPath, "utf8");
    const jsonMatch = fileContent.match(/export const siteConfig =\s*(\{[\s\S]*\});/);
    if (!jsonMatch) return;
    const config = JSON.parse(jsonMatch[1]);

    for (const { key, value } of items) {
      if (key === "company.name") {
        config.name = value;
        config.legalName = value;
      } else if (key === "company.tagline") {
        config.tagline = value;
      } else if (key === "company.description") {
        config.description = value;
      } else if (key === "contact.phone.primary") {
        config.contact.phonePrimary = value;
      } else if (key === "contact.phone.secondary") {
        config.contact.phoneSecondary = value;
      } else if (key === "contact.whatsapp") {
        config.contact.whatsapp = value;
        const digits = value.replace(/\D/g, "");
        config.contact.whatsappLink = `https://wa.me/${digits}`;
      } else if (key === "contact.email.sales") {
        config.contact.emailSales = value;
      } else if (key === "contact.email.direct") {
        config.contact.emailDirect = value;
      } else if (key === "contact.address") {
        config.contact.address = value;
      } else if (key === "contact.workingHours") {
        config.contact.workingHours = value;
      }
    }

    const updatedFile = `export const siteConfig = ${JSON.stringify(config, null, 2)};\n`;
    fs.writeFileSync(configPath, updatedFile, "utf8");
  } catch (err) {
    console.error("[Sync siteConfig Error]", err);
  }
}

// GET /api/admin/content - List all editable content blocks
export async function GET() {
  try {
    await initDatabase();
    const content = await prisma.siteContent.findMany({
      orderBy: [{ section: "asc" }, { key: "asc" }],
    });
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch content" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/content - Update single or multiple content items
export async function PUT(request: Request) {
  try {
    await initDatabase();
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Supports single item { key, value } or array of items [{ key, value }]
    if (Array.isArray(body)) {
      const itemsToSync: { key: string; value: string }[] = [];
      for (const item of body) {
        if (item.key && item.value !== undefined) {
          itemsToSync.push({ key: item.key, value: item.value });
          await prisma.siteContent.upsert({
            where: { key: item.key },
            update: { value: item.value },
            create: {
              key: item.key,
              value: item.value,
              section: item.section || "general",
              label: item.label || item.key,
            },
          });
        }
      }
      syncToSiteConfigFile(itemsToSync);
      return NextResponse.json({ success: true, message: "Site content updated successfully" });
    } else {
      const { key, value, label, section } = body;
      if (!key || value === undefined) {
        return NextResponse.json({ success: false, error: "Key and value are required" }, { status: 400 });
      }

      const updated = await prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: {
          key,
          value,
          label: label || key,
          section: section || "general",
        },
      });

      syncToSiteConfigFile([{ key, value }]);
      return NextResponse.json({ success: true, item: updated });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update content" },
      { status: 500 }
    );
  }
}
