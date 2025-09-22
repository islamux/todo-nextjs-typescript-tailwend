import type { Metadata } from "next";
import './globals.css';
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "My Tasks",
  description: "A multi-language todo management application",
  alternates: {
    languages: {
      'ar': '/ar',
      'en': '/en',
    },
  },
};

export default function RootLayout({children}){

  return (
    <html
    lang="en"
    className={`${GeistSans.variable} ${GeistMono.variable}`}
  >
    <body>
    {children}
    </body>
    </html>
  );
}
