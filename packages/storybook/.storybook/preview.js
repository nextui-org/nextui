import React from "react";
import {themes} from "@storybook/theming";
import {NextUIProvider} from "@nextui-org/react";
import Style from "./style";

export const decorators = [
  (Story, {globals: {locale}}) => {
    const direction =
      locale && new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "rtl" : undefined;

    return (
      <NextUIProvider locale={locale}>
        <div className="bg-dark" lang={locale} dir={direction}>
          <Style />
          <Story />
        </div>
      </NextUIProvider>
    );
  },
];

export const parameters = {
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

export const globalTypes = {
  locale: {
    toolbar: {
      icon: "globe",
      items: locales.map((locale) => ({
        value: locale,
        title: new Intl.DisplayNames(undefined, {type: "language"}).of(locale),
        right: new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "Right to Left" : undefined,
      })),
    },
  },
};
