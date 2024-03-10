import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./components/layoutWrapper";
import { AppThemeProvider } from "./appThemeProvider";

export const metadata: Metadata = {
  title: "Rajnish Singh",
  description:
    "As a fellow Front-End Engineer, I am thrilled to have you here. This blog is a hub for all things related to software development, where we explore the exciting world of web technologies, share insights, and discuss industry trends.",
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
