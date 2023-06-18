/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import {Command} from "cmdk";
import {useEffect, useState, FC, useMemo, useCallback, useRef} from "react";
import {matchSorter} from "match-sorter";
import {Button, Kbd, Modal, ModalContent} from "@nextui-org/react";
import {CloseIcon} from "@nextui-org/shared-icons";
import {tv} from "tailwind-variants";
import {useRouter} from "next/navigation";
import MultiRef from "react-multi-ref";
import scrollIntoView from "scroll-into-view-if-needed";
import {create} from "zustand";

import {
  DocumentCodeBoldIcon,
  HashBoldIcon,
  ChevronRightLinearIcon,
  SearchLinearIcon,
} from "./icons";

import searchData from "@/content/docs/search-meta.json";
import {useUpdateEffect} from "@/hooks/use-update-effect";

export interface CmdkStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCmdkStore = create<CmdkStore>((set) => ({
  isOpen: false,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
}));

const cmdk = tv({
  slots: {
    base: "max-h-full overflow-y-auto",
    header: [
      "flex",
      "items-center",
      "w-full",
      "px-4",
      "border-b",
      "border-default-400/50",
      "dark:border-default-100",
    ],
    searchIcon: "text-default-400 text-lg",
    input: [
      "w-full",
      "px-2",
      "h-14",
      "font-sans",
      "text-lg",
      "outline-none",
      "rounded-none",
      "bg-transparent",
      "text-default-700",
      "placeholder-default-500",
      "dark:text-default-500",
      "dark:placeholder:text-default-300",
    ],
    list: ["px-4", "mt-2", "pb-4", "overflow-y-auto", "max-h-[50vh]"],
    itemWrapper: [
      "px-4",
      "mt-2",
      "group",
      "flex",
      "h-16",
      "justify-between",
      "items-center",
      "rounded-lg",
      "shadow",
      "bg-content2/50",
      "active:opacity-70",
      "cursor-pointer",
      "transition-opacity",
      "data-[active=true]:bg-primary",
      "data-[active=true]:text-primary-foreground",
    ],
    leftWrapper: ["flex", "gap-3", "items-center"],
    leftIcon: [
      "text-default-500 dark:text-default-300",
      "group-data-[active=true]:text-primary-foreground",
    ],
    itemContent: ["flex", "flex-col", "gap-0", "justify-center"],
    itemParentTitle: [
      "text-default-400",
      "text-xs",
      "group-data-[active=true]:text-primary-foreground",
    ],
    itemTitle: ["text-default-500", "group-data-[active=true]:text-primary-foreground"],
    emptyWrapper: ["flex", "flex-col", "text-center", "items-center", "justify-center", "h-32"],
  },
});

export const Cmdk: FC<{}> = () => {
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState(0);
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>());
  const slots = useMemo(() => cmdk(), []);

  const eventRef = useRef<"mouse" | "keyboard">();
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {isOpen, onClose, onOpen} = useCmdkStore();

  const results = useMemo(
    function getResults() {
      if (query.length < 2) return [];

      return matchSorter(searchData, query, {
        keys: ["hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3", "content"],
      }).slice(0, 20);
    },
    [query],
  );

  // Toggle the menu when ⌘K / CTRL K is pressed
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform);
      const hotkey = isAppleDevice ? "metaKey" : "ctrlKey";

      if (e?.key?.toLowerCase() === "k" && e[hotkey]) {
        e.preventDefault();
        isOpen ? onClose() : onOpen();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = "keyboard";
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (activeItem + 1 < results.length) {
            setActiveItem(activeItem + 1);
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (activeItem - 1 >= 0) {
            setActiveItem(activeItem - 1);
          }
          break;
        }
        case "Control":
        case "Alt":
        case "Shift": {
          e.preventDefault();
          break;
        }
        case "Enter": {
          if (results?.length <= 0) {
            break;
          }

          onClose();
          router.push(results[activeItem].url);
          break;
        }
      }
    },
    [activeItem, results, router],
  );

  useUpdateEffect(() => {
    setActiveItem(0);
  }, [query]);

  useUpdateEffect(() => {
    if (!listRef.current || eventRef.current === "mouse") return;
    const node = menuNodes.map.get(activeItem);

    if (!node) return;
    scrollIntoView(node, {
      scrollMode: "if-needed",
      behavior: "smooth",
      block: "end",
      inline: "end",
      boundary: listRef.current,
    });
  }, [activeItem]);

  return (
    <Modal
      hideCloseButton
      backdrop="opaque"
      classNames={{
        wrapper: "md:items-start",
        base: [
          "mt-[20vh]",
          "max-w-[calc(100vw-2rem)]",
          "supports-[backdrop-filter]:bg-background/80",
          "dark:supports-[backdrop-filter]:bg-background/30",
          "supports-[backdrop-filter]:backdrop-blur-md",
          "supports-[backdrop-filter]:backdrop-saturate-150",
        ],
        backdrop: ["bg-black/80"],
      }}
      isOpen={isOpen}
      motionProps={{
        onAnimationComplete: () => {
          if (!isOpen) {
            setQuery("");
          }
        },
      }}
      scrollBehavior="inside"
      size="xl"
      onClose={onClose}
    >
      <ModalContent>
        <Command className={slots.base()} label="Global Command Menu" shouldFilter={false}>
          <div className={slots.header()}>
            <SearchLinearIcon className={slots.searchIcon()} strokeWidth={2} />
            <Command.Input
              autoFocus
              className={slots.input()}
              placeholder="Search documentation"
              value={query}
              onKeyDown={onInputKeyDown}
              onValueChange={setQuery}
            />
            {query.length > 0 && (
              <Button
                isIconOnly
                className="border data-[hover=true]:bg-content2 border-default-400 dark:border-default-100"
                size="xs"
                variant="bordered"
                onPress={() => setQuery("")}
              >
                <CloseIcon />
              </Button>
            )}
            <Kbd className="border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">ESC</Kbd>
          </div>
          <Command.List ref={listRef} className={slots.list()} role="listbox">
            {query.length > 0 ? (
              <Command.Empty>
                <div className={slots.emptyWrapper()}>
                  <div>
                    <p>No results for &quot;{query}&quot;</p>
                    <p className="text-default-400">Try searching for something else.</p>
                  </div>
                </div>
              </Command.Empty>
            ) : (
              <div className={slots.emptyWrapper()}>
                <p className="text-default-400">No recent searches</p>
              </div>
            )}

            {results.map((item, index) => {
              const isLvl1 = item.type === "lvl1";

              return (
                <Command.Item
                  key={item.objectID}
                  ref={menuNodes.ref(index)}
                  className={slots.itemWrapper()}
                  data-active={index === activeItem}
                  value={item.content}
                  onMouseEnter={() => {
                    eventRef.current = "mouse";
                    setActiveItem(index);
                  }}
                  onSelect={() => {
                    onClose();
                    router.push(item.url);
                  }}
                >
                  <div className={slots.leftWrapper()}>
                    {isLvl1 ? (
                      <DocumentCodeBoldIcon className={slots.leftIcon()} />
                    ) : (
                      <HashBoldIcon className={slots.leftIcon()} />
                    )}
                    <div className={slots.itemContent()}>
                      {!isLvl1 && (
                        <span className={slots.itemParentTitle()}>{item.hierarchy.lvl1}</span>
                      )}
                      <p className={slots.itemTitle()}>{item.content}</p>
                    </div>
                  </div>
                  <ChevronRightLinearIcon size={14} />
                </Command.Item>
              );
            })}
          </Command.List>
        </Command>
      </ModalContent>
    </Modal>
  );
};
