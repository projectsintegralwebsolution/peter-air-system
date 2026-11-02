"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

export const WhatsAppButton: React.FC = () => {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-[71px] right-6 z-40 group">
      <a
        href={siteConfig.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Peter Air Systems technical sales on WhatsApp"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group-hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)]"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <svg
            className="w-6 h-6 fill-current text-white"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.871.812 2.796.813h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.181-2.587-5.768-5.768-5.768zm3.364 8.163c-.144.405-.837.774-1.171.823-.312.046-.713.067-1.157-.075-.27-.087-.619-.208-1.072-.403-1.895-.818-3.125-2.729-3.22-2.856-.095-.128-.769-1.025-.769-1.954 0-.93.486-1.386.66-1.576.174-.189.38-.237.507-.237.127 0 .253.002.365.007.118.006.277-.045.433.332.162.391.554 1.353.602 1.452.048.098.08.214.016.342-.064.127-.096.206-.191.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.057 1.315.727.646 1.34.847 1.53.942.19.095.302.079.413-.048.111-.127.476-.554.603-.744.127-.19.254-.159.429-.095.174.063 1.107.522 1.297.617.19.095.317.143.365.222.048.079.048.459-.096.864z"/>
          </svg>
        </span>
        <span className="hidden sm:inline-block font-medium text-sm tracking-wide">
          Quick Technical Support
        </span>
      </a>
    </aside>
  );
};
