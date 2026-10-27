"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  FileText,
  PhoneCall,
  User,
  Building2,
  Mail,
  Phone,
  Package,
  MapPin,
  BarChart3,
  ArrowRight,
  Shield,
  Award,
  Wrench,
  ChevronDown
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface EnquiryFormProps {
  initialProduct?: string;
  sourceContext?: string;
  isModal?: boolean;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialProduct = "",
  sourceContext = "General",
  isModal = false,
  onSuccess,
}) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    productOrService: initialProduct || "Air Handling Unit (AHU)",
    requirement: "Quotation & Technical Specifications",
    quantity: "1",
    city: "",
    message: "",
    honeypot: "", // Bot trap
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const productOptions = [
    "Air Handling Unit (AHU)",
    "Air Shower",
    "Static Pass Box",
    "Dynamic Pass Box",
    "Bio Safety Cabinet",
    "Laminar Work Stations",
    "Dispensing Booth / Sampling Booth",
    "Garment Cabinet",
    "Reverse Laminar Flow Unit",
    "Ceiling Suspended Laminar",
    "Modular Cleanroom Doors",
    "Modular Cleanroom Panels",
    "Modular Operation Theatre (OT)",
    "Cleanroom Turnkey Solution",
    "Pre Filters (G4)",
    "Fine Filters / Microvee (F7/F9)",
    "HEPA Filters (H13/H14)",
    "Mini Pleat HEPA Filters",
    "HEPA Terminal Box",
    "Supply & Return Air Grille",
    "Supply & Return Air Diffusers",
    "Volume Control Damper (VCD)",
    "Return Air Riser",
    "Dehumidifier Unit",
    "Air Washer Unit",
    "Laboratory & Environmental Test Chambers",
    "Other Engineering Requirement"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const fullPhone = `${countryCode} ${phoneNumber}`.trim();

    try {
      const res = await fetch("/api/enquiry/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhone,
          sourceContext,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage("Network error occurred. Please contact us directly at " + siteConfig.contact.phonePrimary);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center animate-fade-in my-auto">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Enquiry Received Successfully</h3>
        <p className="text-slate-700 max-w-md mx-auto mb-5 text-xs sm:text-sm leading-relaxed">
          Thank you for reaching out to <span className="font-semibold text-brand-800">Peter Air Systems</span>. Our technical application engineering team has received your inquiry for <strong>{formData.productOrService}</strong> and will contact you within 2 to 4 hours with technical specifications and pricing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#20ba5a] shadow-xs transition"
          >
            Immediate WhatsApp Connect
          </a>
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setPhoneNumber("");
              setFormData({
                name: "",
                companyName: "",
                email: "",
                productOrService: initialProduct || "Air Handling Unit (AHU)",
                requirement: "Quotation & Technical Specifications",
                quantity: "1",
                city: "",
                message: "",
                honeypot: "",
              });
            }}
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 underline"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={isModal ? "space-y-3" : "space-y-3.5"}>
      {/* Honeypot anti-spam field hidden from humans */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Top Banner Notice Card (shown when outside modal) */}
      {!isModal && (
        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 sm:p-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                Fill in Your Details
              </h4>
              <p className="text-[11px] text-slate-500 leading-tight">
                Our team will get back to you with the best technical solution and quotation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-[10px] text-slate-500 block leading-none">Need Assistance?</span>
              <a
                href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`}
                className="text-xs sm:text-sm font-bold text-slate-900 hover:text-brand-700 transition leading-tight"
              >
                {siteConfig.contact.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Full Name & Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Full Name</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rajesh Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Company Name</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Cipla Pharma / Sun Biotech"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs"
          />
        </div>
      </div>

      {/* Row 2: Business Email & Phone / Mobile Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Business Email</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="e.g. procurement@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Phone / Mobile Number</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer shadow-2xs"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+971">+971</option>
                <option value="+65">+65</option>
                <option value="+49">+49</option>
                <option value="+966">+966</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <input
              type="tel"
              required
              placeholder="98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 min-w-0 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Product / Solution & City / Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-slate-500" />
            <span>Product / Solution Required</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.productOrService}
              onChange={(e) => setFormData({ ...formData, productOrService: e.target.value })}
              className="w-full appearance-none px-3.5 py-2 pr-8 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs cursor-pointer"
            >
              {initialProduct && !productOptions.includes(initialProduct) && (
                <option value={initialProduct}>{initialProduct}</option>
              )}
              {productOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>City / Location</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai / Ahmedabad"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs"
          />
        </div>
      </div>

      {/* Row 4: Requirement Type & Quantity / Project Scale */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Requirement Type</span>
          </label>
          <div className="relative">
            <select
              value={formData.requirement}
              onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
              className="w-full appearance-none px-3.5 py-2 pr-8 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs cursor-pointer"
            >
              <option value="Quotation & Technical Specifications">Quotation & Technical Specifications</option>
              <option value="New Facility Cleanroom Project">New Facility Cleanroom Project</option>
              <option value="HVAC / AHU Replacement & Retrofit">HVAC / AHU Replacement & Retrofit</option>
              <option value="Bulk Filter Replacement (HEPA / Fine / Pre)">Bulk Filter Replacement</option>
              <option value="Modular OT Engineering">Modular OT Engineering</option>
              <option value="Technical Consultation & Site Audit">Technical Consultation & Site Audit</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Quantity / Project Scale</span>
          </label>
          <input
            type="text"
            placeholder="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs"
          />
        </div>
      </div>

      {/* Row 5: Technical Details / Project Scope */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Technical Details / Project Scope</span>
        </label>
        <textarea
          rows={2}
          placeholder="Please mention specific CFM capacity, class of cleanroom, dimensions (SS304/SS316), static pressure, or custom fabrication requirements..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-2xs resize-none"
        />
      </div>

      {/* Row 6: Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="group w-full flex items-center justify-center gap-2 bg-[#063B5C] hover:bg-[#084b75] active:scale-[0.99] text-white font-semibold py-2.5 sm:py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm tracking-wide disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Request to Engineering...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Technical RFP / Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>

      {/* Row 7: Bottom Trust / Feature Bar */}
      <div className="pt-3.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-slate-600">
        <div className="flex items-start gap-2 min-w-0">
          <Shield className="w-4 h-4 text-[#063B5C] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h5 className="font-bold text-[11px] !text-[#0B3550] leading-tight break-words" style={{ color: '#0B3550' }}>
              <span className="block">NDA &amp;</span>
              <span className="block">Industrial</span>
              <span className="block">Privacy</span>
            </h5>
            <p className="text-[10px] text-slate-500 leading-snug mt-1 break-words">
              We never disclose design drawings or client specifications.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 min-w-0">
          <Award className="w-4 h-4 text-[#063B5C] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h5 className="font-bold text-[11px] !text-[#0B3550] leading-tight break-words" style={{ color: '#0B3550' }}>
              <span className="block">ISO</span>
              <span className="block">9001:2015</span>
              <span className="block">&amp; CE</span>
              <span className="block">Certified</span>
            </h5>
            <p className="text-[10px] text-slate-500 leading-snug mt-1 break-words">
              Quality you can trust.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 min-w-0">
          <Wrench className="w-4 h-4 text-[#063B5C] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h5 className="font-bold text-[11px] !text-[#0B3550] leading-tight break-words" style={{ color: '#0B3550' }}>
              <span className="block">Custom</span>
              <span className="block">AHU</span>
              <span className="block">Capacities</span>
            </h5>
            <p className="text-[10px] text-slate-500 leading-snug mt-1 break-words">
              Up to 60,000 CFM. Built for your needs.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 min-w-0">
          <FileText className="w-4 h-4 text-[#063B5C] shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <Link
              href="/about-us-peter-air-systems/"
              className="font-bold text-[11px] !text-[#0B3550] hover:text-brand-700 leading-tight inline-flex items-center gap-1 transition-colors group/link break-words"
              style={{ color: '#0B3550' }}
            >
              <span>
                <span className="block">Download</span>
                <span className="block">Brochure</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-[10px] text-slate-500 leading-snug mt-1 break-words">
              Get product catalog &amp; specs.
            </p>
          </div>
        </div>
      </div>

      {/* Row 8: Direct Contact Information */}
      <div className="pt-3.5 mt-3.5 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-700 pb-1">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#063B5C] shrink-0" />
          <span className="text-slate-600 font-medium">Instant Call:</span>
          <a
            href={`tel:${siteConfig.contact.phonePrimary.replace(/\s+/g, '')}`}
            className="font-bold text-slate-900 hover:text-[#063B5C] transition-colors"
          >
            {siteConfig.contact.phonePrimary}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#063B5C] shrink-0" />
          <span className="text-slate-600 font-medium">Sales:</span>
          <a
            href={`mailto:${siteConfig.contact.emailSales}`}
            className="font-bold text-slate-900 hover:text-[#063B5C] transition-colors"
          >
            {siteConfig.contact.emailSales}
          </a>
        </div>
      </div>
    </form>
  );
};
