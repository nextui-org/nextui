"use client";

import type {ReactNode} from "react";

import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import posthog from "posthog-js";
import {PostHogProvider} from "posthog-js/react";

import {__PROD__} from "@/utils";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
  const router = useRouter();

  const ProviderWrapper = ({children}: {children: ReactNode}) => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: "/ingest",
          person_profiles: "identified_only",
          ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        });
      }
    }, []);

    if (__PROD__) {
      return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
    }

    return children;
  };

  return (
    <ProviderWrapper>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </ProviderWrapper>
  );
}
