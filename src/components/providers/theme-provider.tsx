"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}

      <Toaster
        position="top-right"
        theme="system"
        richColors
        closeButton
        duration={3500}
        visibleToasts={4}
        toastOptions={{
          classNames: {
            toast: "font-sans",
            title: "font-semibold",
            description: "text-sm",
          },
        }}
      />
    </NextThemesProvider>
  );
}
