import {useMemo, useState, useRef} from "react";
import {mergeProps} from "@react-aria/utils";

import {CSSGapUnit, CSSColor} from "../theme";
import {HTMLNextUIProps} from "../utils/system";

import {NavbarItemVariantsProps, NavbarContentVariantsProps} from "./navbar.styles";

interface Props extends Omit<HTMLNextUIProps<"ul">, "color"> {
  /**
   * The gap between each item
   * @default "$space$10 = 1.5rem" and "0px" (for highlight variants)
   */
  gap?: CSSGapUnit;
  /**
   * The main color of the navbar content items.
   */
  color?: CSSColor;
  /**
   * The active color of the navbar content items.
   * @default "$colors$link"
   */
  activeColor?: NavbarItemVariantsProps["activeColor"];
  /**
   * The height of the navbar content items's underline.
   * @default "normal = 4px"
   */
  underlineHeight?: NavbarItemVariantsProps["underlineHeight"];

  /**
   * Whether the navbar content highlighted cursor should be rounded.
   * @default "false"
   */
  isCursorHighlightRounded?: boolean;
  /**
   * The variant of the navbar content items.
   * @default "default"
   */
  variant?: NavbarItemVariantsProps["variant"];
}

export type UseNavbarContentProps = Props & NavbarContentVariantsProps;

/**
 * @internal
 */
export function useNavbarContent(props: UseNavbarContentProps = {}) {
  const {
    gap = "$10",
    color = "inherit",
    variant = "default",
    activeColor = "default",
    underlineHeight = "normal",
    enableCursorHighlight = false,
    isCursorHighlightRounded = false,
    css,
    style,
    className,
    ...otherProps
  } = props;

  const [itemBoundingBox, setItemBoundingBox] = useState<DOMRect | undefined | null>(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState<DOMRect | undefined | null>(null);
  const [highlightedItem, setHighlightedItem] = useState<HTMLElement | null>(null);
  const [activeItem, setActiveItem] = useState<HTMLElement | null>(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(true);

  const cursorHighlightRef = useRef<HTMLLIElement>(null);
  const wrapperRef = useRef<HTMLUListElement>(null);

  const stringVariant = variant?.toString?.();
  const isHighlightVariant = stringVariant.includes?.("highlight");
  const isHighlightSolidVariant = stringVariant.includes?.("highlight-solid");

  const isRounded = useMemo(() => {
    return isCursorHighlightRounded || stringVariant.includes?.("rounded");
  }, [isCursorHighlightRounded, stringVariant]);

  const contentGap = useMemo(() => {
    if (isHighlightVariant && gap === "$10") {
      return "0px";
    }

    return gap;
  }, [isHighlightVariant, gap]);

  const transitionDurationValue = useMemo(
    () => (isHoveredFromNull ? "0ms" : "200ms"),
    [isHoveredFromNull],
  );

  const opacityValue = useMemo(
    () => (highlightedItem || activeItem ? 1 : 0),
    [activeItem, highlightedItem],
  );

  const widthValue = useMemo(() => {
    if (!itemBoundingBox) {
      return "0px";
    }

    if (isHighlightVariant) {
      return `${itemBoundingBox.width}px`;
    }

    return `calc(${itemBoundingBox.width}px + var(--nextui--navbarContentItemHorizontalPadding))`;
  }, [stringVariant, itemBoundingBox]);

  const transformValue = useMemo(
    () =>
      itemBoundingBox &&
      wrapperBoundingBox &&
      `translate(${itemBoundingBox.left - wrapperBoundingBox.left}px)`,
    [itemBoundingBox, wrapperBoundingBox],
  );

  const leftValue = useMemo(() => {
    if (isHighlightVariant) {
      return "0px";
    }

    return "calc(var(--nextui--navbarContentItemHorizontalPadding) * 0.5 * -1)";
  }, [isHighlightVariant]);

  const contentStyle = useMemo(() => {
    return mergeProps(
      {
        "--nextui--transitionDuration": transitionDurationValue,
        "--nextui--opacity": opacityValue,
        "--nextui--width": widthValue,
        "--nextui--transform": transformValue,
        "--nextui--left": leftValue,
      },
      style || {},
    );
  }, [transitionDurationValue, leftValue, opacityValue, widthValue, transformValue, style]);

  const cursorHighlightCss = useMemo(() => {
    if (itemBoundingBox && wrapperBoundingBox && enableCursorHighlight) {
      return {
        transitionDuration: "var(--nextui--transitionDuration)",
        opacity: "var(--nextui--opacity)",
        width: "var(--nextui--width)",
        transform: "var(--nextui--transform)",
        left: "var(--nextui--left)",
      };
    }

    return {};
  }, [itemBoundingBox, wrapperBoundingBox, enableCursorHighlight]);

  const repositionHighlight = (event: React.MouseEvent<HTMLElement>, item: HTMLElement) => {
    if (!(event?.target instanceof Element)) return;
    setItemBoundingBox(event.target?.getBoundingClientRect?.());
    setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect?.());
    setIsHoveredFromNull(!highlightedItem);
    setHighlightedItem(item);
  };

  const resetHighlight = () => {
    if (!activeItem) {
      setHighlightedItem(null);

      return;
    }
    setHighlightedItem(activeItem);
    setItemBoundingBox(activeItem?.getBoundingClientRect?.());
  };

  const updateActiveItem = (item: HTMLElement) => {
    setActiveItem(item);
    setHighlightedItem(item);
    setItemBoundingBox(item?.getBoundingClientRect?.());
    setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect?.());
  };

  return {
    css,
    gap: contentGap,
    color,
    variant,
    activeColor,
    activeItem,
    updateActiveItem,
    highlightedItem,
    underlineHeight,
    cursorHighlightRef,
    isRounded,
    isHighlightVariant,
    isHighlightSolidVariant,
    isCursorHighlightRounded,
    enableCursorHighlight,
    cursorHighlightCss,
    repositionHighlight,
    resetHighlight,
    wrapperRef,
    className,
    style: contentStyle,
    otherProps,
  };
}

export type UseNavbarContentReturn = ReturnType<typeof useNavbarContent>;
