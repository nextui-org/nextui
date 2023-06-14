"use client";

import {FC} from "react";
import {ChevronIcon} from "@nextui-org/shared-icons";
import {CollectionBase, Expandable, MultipleSelection, Node, ItemProps} from "@react-types/shared";
import {BaseItem} from "@nextui-org/aria-utils";
import React, {useRef, useMemo} from "react";
import {useFocusRing} from "@react-aria/focus";
import {TreeState, useTreeState} from "@react-stately/tree";
import {useSelectableCollection} from "@react-aria/selection";
import {usePress} from "@react-aria/interactions";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {SpacerProps, Spacer, Link as NextUILink, cn, Chip} from "@nextui-org/react";
import Link from "next/link";
import {isEmpty} from "lodash";
import {useRouter} from "next/navigation";

import {getRoutePaths} from "./utils";

import {Route} from "@/libs/docs/page";
import {TreeKeyboardDelegate} from "@/utils/tree-keyboard-delegate";
import {useScrollPosition} from "@/hooks/use-scroll-position";

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

  const paths = item.props.path
    ? getRoutePaths(item.props.path, item.props?.tag)
    : {
        pagePath: "",
        pathname: "",
      };

  const isNew = item.props?.newPost;

  const isExpanded = state.expandedKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key) || paths.pathname === item.props.slug;

  const ref = useRef<any>(null);

  const hasChildNodes = !isEmpty([...childNodes]);

  const Component = hasChildNodes ? "ul" : "li";

  const {pressProps} = usePress({
    onPress: () => {
      if (hasChildNodes) {
        state.toggleKey(item.key);
      } else {
        router.push(paths.pathname);
      }
    },
  });

  const {focusProps, isFocused, isFocusVisible} = useFocusRing();

  return (
    <Component
      {...focusProps}
      ref={ref}
      aria-expanded={dataAttr(hasChildNodes ? isExpanded : undefined)}
      aria-selected={dataAttr(isSelected)}
      className={clsx(
        "flex flex-col gap-3 outline-none w-full",
        // focus ring
        "data-[focus-visible=true]:outline-none",
        "data-[focus-visible=true]:ring-2",
        "data-[focus-visible=true]:ring-primary",
        "data-[focus-visible=true]:ring-offset-2",
        "data-[focus-visible=true]:ring-offset-background",
        "data-[focus-visible=true]:dark:ring-offset-background-dark",
      )}
      data-focus-visible={isFocusVisible}
      data-focused={isFocused}
      role="treeitem"
    >
      <div className="flex items-center gap-3 cursor-pointer" {...pressProps}>
        <Spacer x={spaceLeft} />
        {hasChildNodes ? (
          <span className="flex items-center gap-3">
            <span>{rendered}</span>
            <ChevronIcon
              className={clsx("transition-transform", {
                "-rotate-90": isExpanded,
              })}
            />
          </span>
        ) : (
          <NextUILink
            as={Link}
            className={clsx(
              "w-full",
              "font-normal",
              "before:mr-4",
              "before:content-['']",
              "before:block",
              "before:bg-default-300",
              "before:w-1",
              "before:h-1",
              "before:rounded-full",
            )}
            color="foreground"
            href={paths.pathname}
          >
            <span
              className={clsx({
                "opacity-100": isSelected,
                "opacity-60": !isSelected,
                "pointer-events-none": item.props?.comingSoon,
              })}
            >
              {rendered}
            </span>
            {isNew && (
              <Chip className="ml-2" color="primary" size="xs" variant="flat">
                New
              </Chip>
            )}
            {item.props?.comingSoon && (
              <Chip className="ml-2" color="default" size="xs" variant="flat">
                Coming soon
              </Chip>
            )}
          </NextUILink>
        )}
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

  let ref = useRef<HTMLUListElement>(null);

  const scrollPosition = useScrollPosition(ref);

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
    <ul
      {...collectionProps}
      ref={ref}
      className="flex flex-col gap-4 scrollbar-hide lg:overflow-y-scroll lg:max-h-[calc(100vh_-_64px)] pb-28"
      role="tree"
      style={{
        WebkitMaskImage: `linear-gradient(to top, transparent 0%, #000 100px, #000 ${
          scrollPosition > 30 ? "90%" : "100%"
        }, transparent 100%)`,
      }}
    >
      {[...state.collection].map((item) => {
        if (item.type === "section") {
          return <TreeHeading key={item.key} item={item} />;
        }

        return <TreeItem key={item.key} item={item} state={state} />;
      })}
    </ul>
  );
}

export interface DocsSidebarProps {
  routes?: Route[];
  tag?: string;
  slug?: string;
  className?: string;
}

export const DocsSidebar: FC<DocsSidebarProps> = ({routes, slug, tag, className}) => {
  const expandedKeys = routes?.reduce((keys, route) => {
    if (route.defaultOpen) {
      keys.push(route.key);
    }

    return keys;
  }, [] as string[]);

  return (
    <div className={cn("lg:sticky lg:top-20 mt-2 z-0 lg:h-[calc(100vh-121px)]", className)}>
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
    </div>
  );
};
