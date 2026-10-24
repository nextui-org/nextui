"use client";

import type {ComponentProps} from "react";

import {useTranslations} from "@fuma-translate/react";
import {Button, Dropdown, Header, Label} from "@heroui/react";
import {useI18n} from "fumadocs-ui/contexts/i18n";

import {Languages} from "@/components/fumadocs/ui/icons";

export type LanguageSelectProps = ComponentProps<typeof Button>;

export function LanguageToggle(props: LanguageSelectProps): React.ReactElement {
  const context = useI18n();
  const t = useTranslations({note: "language switcher"});

  if (!context.locales) throw new Error("Missing `<I18nProvider />`");

  return (
    <Dropdown>
      <Button
        isIconOnly
        aria-label={t("Choose a language", {note: "aria-label"})}
        size="sm"
        variant="tertiary"
        {...props}
      >
        {props.children}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          selectedKeys={context.locale ? new Set([context.locale]) : new Set<string>()}
          selectionMode="single"
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const next = keys.values().next().value;

            if (typeof next === "string" && next !== context.locale) {
              context.onChange?.(next);
            }
          }}
        >
          <Dropdown.Section>
            <Header>{t("Choose a language")}</Header>
            {context.locales.map((item) => (
              <Dropdown.Item key={item.locale} id={item.locale} textValue={item.name}>
                <Dropdown.ItemIndicator />
                <Label>{item.name}</Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export function LanguageToggleText(props: ComponentProps<"span">) {
  const context = useI18n();
  const text = context.locales?.find((item) => item.locale === context.locale)?.name;

  return <span {...props}>{text}</span>;
}

// Adapter for use as a fumadocs `slots.languageSelect.root` slot (e.g. in HomeLayout).
// Render the same LanguageToggle component across pages
export function LanguageToggleSlot(_props: ComponentProps<"button">) {
  return (
    <LanguageToggle>
      <Languages className="text-fd-muted-foreground size-4" />
    </LanguageToggle>
  );
}
