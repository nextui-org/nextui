import {createStitches} from "@stitches/react";
import {deepMerge} from "@nextui-org/shared-utils";

import commonTheme from "./common";
import lightTheme from "./light-theme";
import darkTheme from "./dark-theme";
import {Theme, BaseTheme, ConfigType} from "./types";

export const getStitchesTheme = (targetTheme: BaseTheme): BaseTheme => {
  return deepMerge(targetTheme, commonTheme.theme);
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  config,
  createTheme: createThemeBase,
} = createStitches({
  ...commonTheme,
  theme: {
    ...commonTheme.theme,
    shadows: {
      ...lightTheme.shadows,
    },
    dropShadows: {
      ...lightTheme.dropShadows,
    },
    colors: {
      ...commonTheme.theme.colors,
      ...lightTheme.colors,
    },
  },
});

/**
 * Mutators
 * @internal
 */
function setMedia<Media extends {} = {}>(media: ConfigType.Media<Media>): void {
  config.media = {
    ...config.media,
    ...media,
  };
}

function setUtils<Utils extends {} = {}>(utils: ConfigType.Utils<Utils>): void {
  config.utils = {
    ...config.utils,
    ...utils,
  };
}

function setThemeMap<ThemeMap extends {} = {}>(themeMap: ConfigType.ThemeMap<ThemeMap>): void {
  config.themeMap = {
    ...config.themeMap,
    ...themeMap,
  };
}

export const createTheme = ({
  type,
  className,
  theme = {},
  media = {},
  utils = {},
  themeMap = {},
}: Theme) => {
  if (!type) {
    throw new Error("Theme type is required");
  }

  if (Object.keys(media).length > 0) {
    setMedia(media);
  }

  if (Object.keys(utils).length > 0) {
    setUtils(utils);
  }

  if (Object.keys(themeMap).length > 0) {
    setThemeMap(themeMap);
  }

  return createThemeBase(
    className || `${type}-theme`,
    deepMerge(type === "dark" ? darkTheme : lightTheme, theme),
  );
};
