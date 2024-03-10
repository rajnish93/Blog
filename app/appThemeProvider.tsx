"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  // Ensure that the component renders the same content server-side as it does during the initial client-side render to prevent a hydration mismatch.
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && <ThemeProvider attribute="class">{children}</ThemeProvider>
  );
}
