/**
 * Peter Air Systems - Text & HTML Entity Utility (CommonJS for scripts)
 */

function decodeHtmlEntities(str) {
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
        if (code >= 32) return String.fromCharCode(code);
      } catch (e) {}
      return _;
    });

    // Hexadecimal numeric entities &#x12a;
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        const code = parseInt(hex, 16);
        if (code >= 32) return String.fromCharCode(code);
      } catch (e) {}
      return _;
    });

    if (decoded === prev) break;
  }

  return decoded;
}

function stripHtmlToText(html) {
  if (!html || typeof html !== "string") return "";

  let text = html
    .replace(/<\/(p|h[1-6]|li|div|tr|section|article|header|footer|td|th)>/gi, " ")
    .replace(/<(br|hr)\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  text = decodeHtmlEntities(text);

  return text.replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim();
}

function deepDecodeEntities(input) {
  if (typeof input === "string") {
    return decodeHtmlEntities(input);
  }
  if (Array.isArray(input)) {
    return input.map((item) => deepDecodeEntities(item));
  }
  if (input !== null && typeof input === "object") {
    const res = {};
    for (const [key, val] of Object.entries(input)) {
      res[key] = deepDecodeEntities(val);
    }
    return res;
  }
  return input;
}

module.exports = {
  decodeHtmlEntities,
  stripHtmlToText,
  deepDecodeEntities,
};
