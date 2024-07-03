import {useContext, useEffect, useState} from "react";
import {Card, CardBody, Switch} from "@nextui-org/react";
import {useTheme} from "next-themes";
import {useLocalStorage} from "usehooks-ts";
import {Icon} from "@iconify/react/dist/offline";
import LinkSquareIcon from "@iconify/icons-solar/link-square-linear";

import {ThemeBuilderContext} from "../../provider";
import {Config, Template, ThemeType} from "../../types";
import {configKey, syncThemesKey, initialConfig} from "../../constants";
import {SelectTemplate} from "../select-template";
import {generatePluginConfig} from "../../utils/config";
import {setAllCssVars} from "../../css-vars";

import {BrandColors} from "./brand-colors";
import {BaseColors} from "./base-colors";
import {OtherColors} from "./other-colors";
import {FontSizes} from "./font-sizes";
import {LineHeights} from "./line-heights";
import {Radiuses} from "./radiuses";
import {BorderWidths} from "./border-widths";
import {Other} from "./other";
import {Actions} from "./actions";

import usePrevious from "@/hooks/use-previous";

export default function Configuration() {
  const [syncThemes, setSyncThemes] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const {config, resetConfig, setConfiguration} = useContext(ThemeBuilderContext);
  const themeProps = useTheme();
  const theme = themeProps.theme as ThemeType;
  const prevTheme = usePrevious(theme);
  const {setTheme} = themeProps;
  const [, setLsConfig] = useLocalStorage<Config>(configKey, initialConfig);
  const [lsSyncThemes, setLsSyncThemes] = useLocalStorage<boolean>(syncThemesKey, true);
  const isLight = theme === "light";
  const syncIcon = syncThemes ? <Icon icon={LinkSquareIcon} /> : null;

  /**
   * Set the sync themes value from the local storage on mount.
   */
  useEffect(() => {
    setSyncThemes(lsSyncThemes);
  }, []);

  /**
   * Update the CSS variables and the configuration when the theme changes.
   */
  useEffect(() => {
    // Set the CSS variables when the theme changes
    if (prevTheme !== theme) {
      setAllCssVars(config, theme);
    }

    // Set the configuration in the local storage when the theme changes
    if (prevTheme === theme) {
      setLsConfig(config);
    }
  }, [config, theme, prevTheme]);

  /**
   * Handle the syncing of the themes.
   */
  function handleThemeSyncing(isSyncing: boolean) {
    setSyncThemes(isSyncing);
    setLsSyncThemes(isSyncing);
  }

  /**
   * Handle the toggling of the theme.
   */
  function handleToggleTheme() {
    setTheme(isLight ? "dark" : "light");
  }

  /**
   * Reset the theme to the default one.
   */
  function handleResetTheme() {
    if (selectedTemplate) {
      setConfiguration(selectedTemplate.value, theme, syncThemes);
      setAllCssVars(selectedTemplate.value, theme);
    } else {
      const config = resetConfig(theme, syncThemes);

      setAllCssVars(config, theme);
    }
    setLsConfig(config);
  }

  return (
    <Card className="max-w-xs w-full p-2 h-min relative mx-auto md:sticky md:top-28 z-30 md:h-[calc(100vh-12rem)]">
      <CardBody className="flex flex-col">
        <div className="flex flex-col gap-6">
          <Actions
            theme={theme}
            onCopy={() => generatePluginConfig(config)}
            onResetTheme={handleResetTheme}
            onToggleTheme={handleToggleTheme}
          />

          <Switch
            color="secondary"
            isSelected={syncThemes}
            size="sm"
            startContent={<Icon icon={LinkSquareIcon} />}
            onValueChange={handleThemeSyncing}
          >
            Sync dark and light themes
          </Switch>

          <SelectTemplate
            name={selectedTemplate?.name ?? null}
            onChange={(template) => {
              setConfiguration(template.value, theme, syncThemes);
              setAllCssVars(template.value, theme);
              setSelectedTemplate(template);
            }}
          />
        </div>

        <div className="flex flex-col gap-8 mt-6">
          <BrandColors config={config} syncIcon={syncIcon} syncThemes={syncThemes} theme={theme} />
          <BaseColors config={config} theme={theme} />
          <OtherColors config={config} syncIcon={syncIcon} syncThemes={syncThemes} theme={theme} />
          <FontSizes config={config} />
          <LineHeights config={config} />
          <Radiuses config={config} />
          <BorderWidths config={config} />
          <Other config={config} />
        </div>
      </CardBody>
    </Card>
  );
}
