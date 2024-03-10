import type { Metadata } from "next";
import "@/globals.css";
import LayoutWrapper from "@/components/layoutWrapper";
import { AppThemeProvider } from "@/appThemeProvider";
import siteMetadata from "@/data/siteMetadata";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
        <AppThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AppThemeProvider>
      </body>
    </html>
  );
}
