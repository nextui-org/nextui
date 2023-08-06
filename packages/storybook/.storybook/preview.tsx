import React from "react";
import {themes} from "@storybook/theming";
import {NextUIProvider} from "@nextui-org/system/src/provider";
import type { Preview } from '@storybook/react';
import './style.css'

const decorators: Preview['decorators'] = [
    (Story, {globals: {locale}}) => {
      const direction =
        // @ts-ignore
        locale && new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "rtl" : undefined;

      return (
        <NextUIProvider locale={locale}>
          <div className="bg-dark" lang={locale} dir={direction}>
            <Story />
          </div>
        </NextUIProvider>
      );
    },
  ]

const parameters: Preview['parameters'] = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
    dark: {
      ...themes.dark,
      appBg: "#161616",
      barBg: "black",
      background: "black",
      appContentBg: "black",
      appBorderRadius: 14,
    },
    light: {
      ...themes.light,
      appBorderRadius: 14,
    },
  },
};

const locales = [
  "ar-AE",
  "bg-BG",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-US",
  "es-ES",
  "et-EE",
  "fi-FI",
  "fr-FR",
  "he-IL",
  "hr-HR",
  "hu-HU",
  "it-IT",
  "ja-JP",
  "ko-KR",
  "lt-LT",
  "lv-LV",
  "nb-NO",
  "nl-NL",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "sk-SK",
  "sl-SI",
  "sr-SP",
  "sv-SE",
  "tr-TR",
  "uk-UA",
  "zh-CN",
  "zh-TW",
];

const globalTypes: Preview['globalTypes'] = {
  locale: {
    toolbar: {
      icon: "globe",
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, {type: "language"}).of(locale),
        // @ts-ignore
        right: new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "Right to Left" : undefined,
      })),
    },
  },
};

export default {
  decorators,
  parameters,
  globalTypes
} satisfies Preview;
