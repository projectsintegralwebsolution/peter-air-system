import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Search Products & Cleanroom Solutions",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
