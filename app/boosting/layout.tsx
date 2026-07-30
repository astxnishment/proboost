import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegacyBoostingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
