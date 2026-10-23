"use client";

import type {ButtonProps} from "@heroui/react";
import type {ComponentProps} from "react";

import {useTranslations} from "@fuma-translate/react";
import {Button, Kbd, Tooltip} from "@heroui/react";
import {useSearchContext} from "fumadocs-ui/contexts/search";

import {Search} from "@/components/fumadocs/ui/icons";
import {cn} from "@/utils/cn";

interface SearchToggleProps extends Omit<ButtonProps, "className" | "onPress"> {
  className?: string;
  hideIfDisabled?: boolean;
}

export function SearchToggle({
  className,
  hideIfDisabled,
  size = "sm",
  variant = "tertiary",
  ...props
}: SearchToggleProps) {
  const {enabled, hotKey, setOpenSearch} = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <Tooltip delay={300}>
      <Tooltip.Trigger role="presentation" tabIndex={-1}>
        <Button
          {...props}
          isIconOnly
          aria-label="Open Search"
          className={cn("size-[34px] border-none", className)}
          data-search=""
          size={size}
          type="button"
          variant={variant}
          onPress={() => {
            setOpenSearch(true);
          }}
        >
          <Search />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content placement="bottom">
        <span className="flex items-center gap-2">
          Search
          <Kbd className="h-5 rounded-md px-1.5 text-[11px]">
            {hotKey.map((shortcut) => (
              <Kbd.Content key={typeof shortcut.key === "string" ? shortcut.key : "modifier"}>
                {shortcut.display}
              </Kbd.Content>
            ))}
          </Kbd>
        </span>
      </Tooltip.Content>
    </Tooltip>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const {enabled, hotKey, setOpenSearch} = useSearchContext();
  const t = useTranslations({note: "search trigger"});

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      data-search-full=""
      type="button"
      {...props}
      className={cn(
        "bg-fd-secondary/50 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex items-center gap-2 rounded-lg border p-1.5 ps-2 text-sm transition-colors",
        props.className,
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4" />
      {t("Search")}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd key={i} className="bg-fd-background rounded-md border px-1.5">
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
