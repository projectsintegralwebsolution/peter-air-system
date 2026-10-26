import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs: BreadcrumbItem[];
  bgImage?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  badge = "PETER AIR SYSTEMS • ENGINEERING SOLUTIONS",
  breadcrumbs,
  // bgImage is maintained in interface for backward compatibility,
  // but inner-page banners are now styled with a clean, solid, minimal brand navy design.
}) => {
  return (
    <section className="w-full bg-[#094863] text-white border-b border-[#07384e] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14">
        <div className="space-y-3.5">
          {/* Badge */}
          {badge && (
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-semibold tracking-wider text-brand-200 uppercase bg-[#063549] border border-brand-500/30 px-2.5 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D93636] shrink-0" />
                <span>{badge}</span>
              </span>
            </div>
          )}

          {/* Page Title */}
          <div className="space-y-2">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-tight sm:leading-snug break-words max-w-4xl">
              {title}
            </h1>
            <div className="w-8 h-0.5 bg-[#D93636] rounded-full" />
          </div>

          {/* Subtitle if available */}
          {subtitle && (
            <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="pt-1.5">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-200">
              <li>
                <Link
                  href="/"
                  className="text-slate-200 hover:text-white transition flex items-center gap-1 font-medium"
                >
                  <Home className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                  <span>Home</span>
                </Link>
              </li>

              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={idx} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="text-slate-200 hover:text-white transition font-medium truncate"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white font-semibold truncate max-w-[240px] sm:max-w-md">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};
