"use client";

import {FC, useEffect, useState} from "react";
import {usePostHog} from "posthog-js/react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {CollectionBase, Expandable, MultipleSelection, Node, ItemProps} from "@react-types/shared";
import {BaseItem} from "@nextui-org/aria-utils";
import React, {useRef, useMemo} from "react";
import {useFocusRing} from "@react-aria/focus";
import {TreeState, useTreeState} from "@react-stately/tree";
import {useSelectableCollection} from "@react-aria/selection";
import {usePress} from "@react-aria/interactions";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {
  SpacerProps,
  Spacer,
  Link as NextUILink,
  Chip,
  dataFocusVisibleClasses,
} from "@nextui-org/react";
import Link from "next/link";
import {isEmpty} from "@nextui-org/shared-utils";
import {usePathname, useRouter} from "next/navigation";

import {ScrollArea} from "../scroll-area";

import {getRoutePaths} from "./utils";

import {Route} from "@/libs/docs/page";
import {TreeKeyboardDelegate} from "@/utils/tree-keyboard-delegate";
import {FbFeedbackButton} from "@/components/featurebase/fb-feedback-button";
import {FbChangelogButton} from "@/components/featurebase/fb-changelog-button";
import {FbRoadmapLink} from "@/components/featurebase/fb-roadmap-link";
import {openFeedbackWidget} from "@/utils/featurebase";
import emitter from "@/libs/emitter";

export interface Props<T> extends Omit<ItemProps<T>, "title">, Route {
  slug?: string;
  tag?: string;
}

export type BaseItemProps<T extends object> = Props<T>;

const Item = BaseItem as <T extends object>(props: BaseItemProps<T>) => JSX.Element;

/**
 * @internal
 */
interface TreeItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
  level?: number;
  spaceLeft?: SpacerProps["x"];
}

const spacesByLevel: Record<number, SpacerProps["x"]> = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
};

function TreeItem<T>(props: TreeItemProps<T>) {
  const {item, state, level = 1, spaceLeft = 0} = props;
  const {key, rendered, childNodes} = item;

  const router = useRouter();
  const pathname = usePathname();
  const posthog = usePostHog();

  const paths = item.props.path
    ? getRoutePaths(item.props.path, item.props?.tag)
    : {
        pagePath: "",
        pathname: "",
      };

  const isNew = item.props?.newPost;
  const isUpdated = item.props?.updated;

  const isExpanded = state.expandedKeys.has(key);
  const isSelected =
    state.selectionManager.isSelected(key) ||
    paths.pathname === item.props.slug ||
    paths.pathname === pathname ||
    paths.pagePath === pathname;

  const ref = useRef<any>(null);

  const hasChildNodes = !isEmpty([...childNodes]);

  const Component = hasChildNodes ? "ul" : "li";

  const cn = clsx(
    "w-full",
    "font-normal",
    "before:mr-4",
    "before:content-['']",
    "before:block",
    "before:bg-default-300",
    "before:w-1",
    "before:h-1",
    "before:rounded-full",
  );

  const {pressProps} = usePress({
    onPress: () => {
      if (hasChildNodes) {
        state.toggleKey(item.key);
      } else {
        router.push(paths.pathname);

        posthog.capture("SidebarDocs", {
          category: "docs",
          action: "click",
          data: paths.pathname || "",
        });
      }
    },
  });

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();

  const renderFeaturebaseComponent = (key: string) => {
    if (key === "roadmap")
      return <FbRoadmapLink className={cn} innerClassName="opacity-80 dark:opacity-60" />;
    if (key === "changelog")
      return (
        <NextUILink as={Link} className={cn} color="foreground" href="#">
          <FbChangelogButton />
        </NextUILink>
      );

    return (
      <NextUILink as={Link} className={cn} color="foreground" href="#" onClick={openFeedbackWidget}>
        <FbFeedbackButton />
      </NextUILink>
    );
  };

  const renderComponent = () => {
    if (hasChildNodes) {
      return (
        <span className="flex items-center gap-3">
          <span>{rendered}</span>
          <ChevronIcon
            className={clsx("transition-transform", {
              "-rotate-90": isExpanded,
            })}
          />
        </span>
      );
    }

    if (typeof key === "string" && ["changelog", "feedback", "roadmap"].includes(key)) {
      return renderFeaturebaseComponent(key);
    }

    return (
      <NextUILink as={Link} className={clsx(cn)} color="foreground" href={paths.pathname}>
        <span
          className={clsx(
            isSelected
              ? "text-primary font-medium dark:text-foreground"
              : "opacity-80 dark:opacity-60",
            {
              "pointer-events-none": item.props?.comingSoon,
            },
          )}
        >
          {rendered}
        </span>
        {isUpdated && (
          <Chip className="ml-1 py-1 text-tiny" color="success" size="sm" variant="flat">
            Updated
          </Chip>
        )}
        {isNew && (
          <Chip className="ml-1 py-1 text-tiny" color="primary" size="sm" variant="flat">
            New
          </Chip>
        )}
        {item.props?.comingSoon && (
          <Chip className="ml-1 py-1 text-tiny" color="secondary" size="sm" variant="flat">
            Coming soon
          </Chip>
        )}
      </NextUILink>
    );
  };

  return (
    <Component
      {...focusProps}
      ref={ref}
      aria-expanded={dataAttr(hasChildNodes ? isExpanded : undefined)}
      aria-selected={dataAttr(isSelected)}
      className={clsx(
        "flex flex-col gap-3outline-none w-full tap-highlight-transparent",

        hasChildNodes ? "mb-4" : "first:mt-4",
        // focus ring
        ...dataFocusVisibleClasses,
      )}
      data-focus-visible={isFocusVisible}
      data-focused={isFocused}
      role="treeitem"
    >
      <div className="flex items-center gap-3 cursor-pointer" {...pressProps}>
        <Spacer x={spaceLeft} />
        {renderComponent()}
        {/* Workaround to avoid scrollbar overlapping */}
        <Spacer x={4} />
      </div>
      {isExpanded && hasChildNodes && (
        <div className="flex flex-col gap-3 items-start" role="group">
          {[...childNodes].map((item) => {
            return (
              <TreeItem
                key={item.key}
                item={item}
                level={level + 1}
                spaceLeft={spacesByLevel[level] ?? 0}
                state={state}
                {...item.props}
              />
            );
          })}
        </div>
      )}
    </Component>
  );
}

function TreeHeading({item}: {item: any}) {
  return <div>{item.rendered}</div>;
}

function Tree<T extends object>(props: CollectionBase<T> & Expandable & MultipleSelection) {
  let state = useTreeState(props);

  let ref = useRef<HTMLDivElement>(null);

  let keyboardDelegate = useMemo(
    // @ts-expect-error
    () => new TreeKeyboardDelegate(state.collection, state.disabledKeys),
    [state.collection, state.disabledKeys],
  );

  let {collectionProps} = useSelectableCollection({
    ref,
    selectionManager: state.selectionManager,
    keyboardDelegate,
  });

  return (
    <ScrollArea
      ref={ref}
      className="h-full lg:max-h-[calc(100vh_-_64px)]"
      role="tree"
      {...collectionProps}
    >
      {[...state.collection].map((item) => {
        if (item.type === "section") {
          return <TreeHeading key={item.key} item={item} />;
        }

        return <TreeItem key={item.key} item={item} state={state} />;
      })}
    </ScrollArea>
  );
}

export interface DocsSidebarProps {
  routes?: Route[];
  tag?: string;
  slug?: string;
  className?: string;
}

export const DocsSidebar: FC<DocsSidebarProps> = ({routes, slug, tag, className}) => {
  const [isProBannerVisible, setIsProBannerVisible] = useState(true);

  const expandedKeys = routes?.reduce((keys, route) => {
    if (route.defaultOpen) {
      keys.push(route.key as string);
    }

    return keys;
  }, [] as string[]);

  useEffect(() => {
    emitter.on("proBannerVisibilityChange", (value) => {
      setIsProBannerVisible(value === "visible");
    });

    return () => {
      emitter.off("proBannerVisibilityChange");
    };
  }, []);

  const treeContent = useMemo(() => {
    return (
      <Tree defaultExpandedKeys={expandedKeys} items={routes || []}>
        {(route) => (
          <Item
            childItems={route.routes}
            slug={slug}
            tag={tag}
            {...route}
            key={route.key || route.title}
          >
            {route.title}
          </Item>
        )}
      </Tree>
    );
  }, [routes]);

  return (
    <div
      className={clsx(
        "lg:fixed mt-2 z-0 lg:h-[calc(100vh-121px)]",
        isProBannerVisible ? "lg:top-32" : "lg:top-20",
        className,
      )}
    >
      {treeContent}
    </div>
  );
};
