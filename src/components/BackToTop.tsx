"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll back to top of page"
      className="fixed bottom-[127px] right-6 z-40 p-3 rounded-full bg-brand-800 text-white shadow-lg hover:bg-brand-900 border border-brand-700/50 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-400"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
