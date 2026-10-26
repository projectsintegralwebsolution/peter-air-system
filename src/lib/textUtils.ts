/**
 * Peter Air Systems - Text & HTML Entity Utility
 * Decodes all HTML entities and strips unwanted markup without word concatenation.
 */

export function decodeHtmlEntities(str: string): string {
  if (!str || typeof str !== "string") return str || "";

  let decoded = str;

  // Run up to 3 passes to handle double-encoded entities (e.g. &amp;amp;, &amp;#8217;)
  for (let pass = 0; pass < 3; pass++) {
    const prev = decoded;

    // Common named entities
    decoded = decoded
      .replace(/&amp;/g, "&")
      .replace(/&#038;/g, "&")
      .replace(/&#38;/g, "&")
      .replace(/&#8217;/g, "’")
      .replace(/&#8216;/g, "‘")
      .replace(/&apos;/g, "’")
      .replace(/&#039;/g, "’")
      .replace(/&#39;/g, "’")
      .replace(/&quot;/g, '"')
      .replace(/&#8220;/g, "“")
      .replace(/&#8221;/g, "”")
      .replace(/&#8211;/g, "–")
      .replace(/&#8212;/g, "—")
      .replace(/&ndash;/g, "–")
      .replace(/&mdash;/g, "—")
      .replace(/&hellip;/g, "…")
      .replace(/&#8230;/g, "…")
      .replace(/&nbsp;/g, " ")
      .replace(/&#160;/g, " ")
      .replace(/&#215;/g, "×")
      .replace(/&times;/g, "×")
      .replace(/&#8242;/g, "′")
      .replace(/&deg;/g, "°")
      .replace(/&copy;/g, "©")
      .replace(/&trade;/g, "™")
      .replace(/&reg;/g, "®")
      .replace(/&bull;/g, "•")
      .replace(/&#8226;/g, "•")
      .replace(/&ldquo;/g, "“")
      .replace(/&rdquo;/g, "”")
      .replace(/&rarr;/g, "→")
      .replace(/&larr;/g, "←")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");

    // Decimal numeric entities &#123;
    decoded = decoded.replace(/&#(\d+);/g, (_, dec) => {
      try {
        const code = parseInt(dec, 10);
        // Avoid decoding critical control characters
        if (code >= 32) return String.fromCharCode(code);
      } catch {}
      return _;
    });

    // Hexadecimal numeric entities &#x12a;
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        const code = parseInt(hex, 16);
        if (code >= 32) return String.fromCharCode(code);
      } catch {}
      return _;
    });

    if (decoded === prev) break;
  }

  return decoded;
}

/**
 * Strips HTML tags into clean readable text while ensuring words never concatenate.
 * Inserts whitespace where block elements, breaks, or list items end.
 */
export function stripHtmlToText(html: string): string {
  if (!html || typeof html !== "string") return "";

  let text = html
    // Insert space for block endings and breaks
    .replace(/<\/(p|h[1-6]|li|div|tr|section|article|header|footer|td|th)>/gi, " ")
    .replace(/<(br|hr)\s*\/?>/gi, " ")
    // Remove all remaining tags
    .replace(/<[^>]+>/g, " ");

  // Decode entities
  text = decodeHtmlEntities(text);

  // Normalize spaces
  return text.replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
}

/**
 * Normalizes text in deeply nested objects or arrays
 */
export function deepDecodeEntities<T>(input: T): T {
  if (typeof input === "string") {
    return decodeHtmlEntities(input) as unknown as T;
  }
  if (Array.isArray(input)) {
    return input.map((item) => deepDecodeEntities(item)) as unknown as T;
  }
  if (input !== null && typeof input === "object") {
    const res: Record<string, any> = {};
    for (const [key, val] of Object.entries(input)) {
      res[key] = deepDecodeEntities(val);
    }
    return res as unknown as T;
  }
  return input;
}
