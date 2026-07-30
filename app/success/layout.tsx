import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
