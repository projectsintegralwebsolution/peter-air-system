import { products } from "@/data/products";

export const WHATSAPP_PHONE = "918484836337";

/**
 * Returns a properly formatted, URL-encoded WhatsApp Click-to-Chat URL.
 * If a productName is supplied, it pre-fills the official product enquiry message.
 * Otherwise, it pre-fills the default company enquiry message.
 */
export function getWhatsAppUrl(productName?: string | null): string {
  const cleanPhone = WHATSAPP_PHONE;

  if (productName && productName.trim().length > 0) {
    const trimmedProduct = productName.trim();
    const productMessage = `Hello Peter Air Systems Team,\n\nI am interested in your *${trimmedProduct}*.\n\nPlease share the product specifications, technical details, pricing, and other relevant information.\n\nThank you.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(productMessage)}`;
  }

  const defaultMessage = `Hello Peter Air Systems Team,\n\nI am interested in your HVAC and Cleanroom products and would like to know more about your products, specifications, pricing, and technical details.\n\nPlease share more information.\n\nThank you.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;
}

/**
 * Resolves a URL pathname (e.g. "/static-pass-box/" or "/air-handling-unit-ahu")
 * to its matching product title, or null if not a product page.
 */
export function getProductNameFromPath(pathname: string): string | null {
  if (!pathname) return null;
  const slug = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (!slug) return null;

  const found = products.find((p) => p.slug.toLowerCase() === slug);
  return found ? found.title : null;
}
