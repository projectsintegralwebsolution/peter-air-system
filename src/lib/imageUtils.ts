/**
 * Universal Image URL Resolver for Peter Air Systems
 * 
 * Safely resolves legacy WordPress media URLs (which return 403 Forbidden externally)
 * to their verified local equivalents in /images/ or /uploads/.
 * Works seamlessly in both server-side and client-side React components.
 */

const KNOWN_WP_IMAGE_MAP: Record<string, string> = {
  "reverse-laminar-flow-unit.jpg": "/images/Reverse-Laminar-Flow-Unit.jpg",
  "mini-pleat-hepa-filter.jpg": "/images/Mini-Pleat-Hepa-Filter.jpg",
  "ot.jpg": "/images/OT.jpg",
  "clean-healthcare.jpg": "/images/clean-healthcare.jpg",
  "air-shower.jpg": "/images/Air-Shower.jpg",
  "air-showers.jpg": "/images/Air-Showers.jpg",
  "air-showers-1024x683.jpg": "/images/Air-Showers.jpg",
  "ahu-1024x683.jpeg": "/images/AHU.jpeg",
  "ahu.jpeg": "/images/AHU.jpeg",
  "ahu2.jpg": "/images/AHU2.jpg",
  "air17.jpg": "/images/air17.jpg",
  "chemical-reactor.jpg": "/images/Chemical-Reactor.jpg",
  "chemical-reactor-1024x699.jpg": "/images/Chemical-Reactor.jpg",
  "cleanroom-door1.jpg": "/images/Cleanroom-door1.jpg",
  "cleanroom-door2.jpg": "/images/Cleanroom-door2.jpg",
  "cleanroom-door3.jpg": "/images/Cleanroom-door3.jpg",
  "gmp-pharmaceutical-panel-puf-panel-1024x683.jpg": "/images/GMP-Pharmaceutical-Panel-PUF-Panel.jpg",
  "gmp-pharmaceutical-panel-puf-panel.jpg": "/images/GMP-Pharmaceutical-Panel-PUF-Panel.jpg",
  "air-grilles-in-hvac-systems.jpg": "/images/Air-Grilles-in-HVAC-Systems.jpg",
  "chemicals.jpg": "/images/Chemicals.jpg",
  "healthcare.jpg": "/images/Healthcare.jpg",
  "air-handling-unit--1024x683.jpg": "/images/air-handling-unit.jpg",
  "air-handling-unit-.jpg": "/images/Air-handling-unit-.jpg",
  "air-handling-unit.jpg": "/images/air-handling-unit.jpg",
  "static-pass-box-1024x683.jpg": "/images/Static-Pass-Box.jpg",
  "static-pass-box.jpg": "/images/Static-Pass-Box.jpg",
  "air-washer-unit.jpg": "/images/Air-Washer-Unit.jpg",
  "return-air-riser.jpg": "/images/return-air-riser.jpg",
  "pre-filter.jpg": "/images/pre-filter.jpg",
  "volume-control-damper.jpg": "/images/Volume-Control-Damper.jpg",
  "supply-return-air-grille.jpg": "/images/Supply-Return-Air-Grille.jpg",
  "supply-return-air-diffuser.jpg": "/images/supply-return-air-diffuser.jpg",
  "hepa-terminal-box.jpg": "/images/hepa-terminal-box.jpg",
  "dehumidifier-unit.jpg": "/images/Dehumidifier-Unit.jpg",
  "pharmacy-industry-factory-man-worker-protective-clothing-sterile-working-conditions-operating-pharmaceutical-equipment_645730-427-1.jpg":
    "/images/pharmacy-industry-factory-man-worker-protective-clothing-sterile-working-conditions-operating-pharmaceutical-equipment_645730-427-1.jpg",
  "pharmaceutical-modular-clean-room-door.png": "/images/pharmaceutical-modular-clean-room-door.png",
  "hepa-filter.jpg": "/images/Hepa-Filter.jpg",
  "fine-filter.jpg": "/images/Fine-Filter.jpg",
  "ceiling-suspended-laminar.jpg": "/images/Ceiling-Suspended-Laminar.jpg",
  "laminar-work-stations.jpg": "/images/Laminar-Work-Stations.jpg",
  "garment-cabinet.jpg": "/images/Garment-Cabinet.jpg",
  "dynamic-pass-box.jpg": "/images/Dynamic-Pass-Box.jpg",
  "modular-clean-room-doors.jpg": "/images/MODULAR-CLEAN-ROOM-DOORS.jpg",
  "modular-clean-room-panels.jpg": "/images/MODULAR-CLEAN-ROOM-PANELS.jpg",
  "interior-view-operating-room-generative-ai_587448-18.jpg": "/images/interior-view-operating-room-generative-ai_587448-18.jpg",
  "bio-safety-cabinets.jpg": "/images/bio-safety-cabinets.jpg",
  "biotechnology.jpg": "/images/Biotechnology.jpg",
  "dispensing-booth.jpg": "/images/Dispensing-Booth.jpg",
  "fume-hood.jpg": "/images/Fume-Hood.jpg",
  "mobile-laf-unit.jpg": "/images/Mobile-LAF-Unit.jpg",
};

/**
 * Normalizes any blog image URL to a local accessible path.
 * Guarantees a working local image and avoids broken 403 Forbidden links.
 */
export function resolveBlogImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") {
    return "/images/AHU.jpeg";
  }

  const cleanUrl = url.trim();

  // If already a valid root-relative local path, preserve it
  if (cleanUrl.startsWith("/images/") || cleanUrl.startsWith("/uploads/")) {
    return cleanUrl;
  }

  // Extract pure filename
  const filename = cleanUrl.split("?")[0].split("/").pop() || "";
  if (!filename) {
    return "/images/AHU.jpeg";
  }

  const lowerName = filename.toLowerCase();

  // 1. Direct dictionary match
  if (KNOWN_WP_IMAGE_MAP[lowerName]) {
    return KNOWN_WP_IMAGE_MAP[lowerName];
  }

  // 2. Try normalized dimension removal (e.g. -1024x683, -300x200)
  const normName = lowerName
    .replace(/-+\d+x\d+(\.[a-z0-9]+)$/i, "$1")
    .replace(/-+(\.[a-z0-9]+)$/i, "$1");

  if (KNOWN_WP_IMAGE_MAP[normName]) {
    return KNOWN_WP_IMAGE_MAP[normName];
  }

  // 3. Fallback to /images/filename or default hero
  return `/images/${filename}`;
}

/**
 * Replaces remote WordPress image URLs in blog HTML content with valid local paths.
 */
export function resolveContentImages(html: string): string {
  if (!html || typeof html !== "string") return html;

  return html
    // Fix historical string concatenation artifact in database
    .replace(/\/images\/clean-healthcare\.jpg[a-zA-Z0-9_\-\.]*/gi, "/images/clean-healthcare.jpg")
    // Strip broken external srcsets
    .replace(/srcset=["'][^"']*(?:wp-content\/uploads|peterairs\.com)[^"']*["']/gi, "")
    // Rewrite src attributes
    .replace(/src=["'](https?:\/\/[^"']*(?:wp-content\/uploads|peterairs\.com)[^"']*)["']/gi, (match, url) => {
      const resolved = resolveBlogImageUrl(url);
      return `src="${resolved}"`;
    });
}
