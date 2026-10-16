import type {Decorator} from "@storybook/react";

import React, {useEffect} from "react";
import {I18nProvider} from "react-aria-components/I18nProvider";
import {useGlobals} from "storybook/preview-api";

import {DEFAULT_LOCALE, I18N_GLOBAL_TYPE_ID, LOCALES} from "./constants";

export const withInternationalization: Decorator = (Story) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  const [globals] = useGlobals();
  const selectedLocale = globals[I18N_GLOBAL_TYPE_ID] || DEFAULT_LOCALE;
  const localeValue =
    selectedLocale === "Auto"
      ? typeof navigator !== "undefined"
        ? navigator.language
        : "en-US"
      : selectedLocale;

  const localeConfig =
    LOCALES.find((l) => l.value === localeValue) ||
    LOCALES.find((l) => l.value.startsWith(localeValue.split("-")[0])) ||
    LOCALES.find((l) => l.value === "en-US");

  // eslint-disable-next-line react-hooks/rules-of-hooks -- Storybook decorators are valid hook consumers
  useEffect(() => {
    if (localeConfig) {
      document.documentElement.lang = localeConfig.value;
      document.documentElement.dir = localeConfig.direction;
    }
  }, [localeConfig]);

  return (
    <I18nProvider locale={localeConfig?.value}>
      <Story />
    </I18nProvider>
  );
};
