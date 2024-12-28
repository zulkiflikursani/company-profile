"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes"; // Import dari root

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const modifiedThemeProps: ThemeProviderProps = {
    ...themeProps,
    themes: ["light", "dark"],
  };
  return (
    <NextThemesProvider {...modifiedThemeProps}>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </NextThemesProvider>
  );
}
