import {AriaLinkProps} from "@react-types/link";
import {DOMAttributes, FocusableElement} from "@react-types/shared";
import {
  filterDOMProps,
  mergeProps,
  useRouter,
  shouldClientNavigate,
  useLinkProps,
} from "@react-aria/utils";
import {RefObject} from "react";
import {useFocusable} from "@react-aria/focus";
import {usePress} from "@react-aria/interactions";

export interface AriaLinkOptions extends AriaLinkProps {
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: DOMAttributes["aria-current"];
  /** Whether the link is disabled. */
  isDisabled?: boolean;
  /**
   * The HTML element used to render the link, e.g. 'a', or 'span'.
   * @default 'a'
   */
  elementType?: string;
}

export interface LinkAria {
  /** Props for the link element. */
  linkProps: DOMAttributes;
  /** Whether the link is currently pressed. */
  isPressed: boolean;
}

/**
 * Provides the behavior and accessibility implementation for a link component.
 * A link allows a user to navigate to another page or resource within a web page
 * or application.
 */
export function useAriaLink(props: AriaLinkOptions, ref: RefObject<FocusableElement>): LinkAria {
  let {
    elementType = "a",
    onPress,
    onPressStart,
    onPressEnd,
    // @ts-ignore
    onClick: deprecatedOnClick,
    isDisabled,
    ...otherProps
  } = props;

  let linkProps: DOMAttributes = {};

  if (elementType !== "a") {
    linkProps = {
      role: "link",
      tabIndex: !isDisabled ? 0 : undefined,
    };
  }
  let {focusableProps} = useFocusable(props, ref);
  let {pressProps, isPressed} = usePress({onPress, onPressStart, onPressEnd, isDisabled, ref});
  let domProps = filterDOMProps(otherProps, {labelable: true, isLink: elementType === "a"});
  let interactionHandlers = mergeProps(focusableProps, pressProps);
  let router = useRouter();
  let routerLinkProps = useLinkProps(props);

  return {
    isPressed, // Used to indicate press state for visual
    linkProps: mergeProps(domProps, routerLinkProps, {
      ...interactionHandlers,
      ...linkProps,
      "aria-disabled": isDisabled || undefined,
      "aria-current": props["aria-current"],
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        pressProps.onClick?.(e);
        if (deprecatedOnClick) {
          deprecatedOnClick(e);
        }

        // If a custom router is provided, prevent default and forward if this link should client navigate.
        if (
          !router.isNative &&
          e.currentTarget instanceof HTMLAnchorElement &&
          e.currentTarget.href &&
          // If props are applied to a router Link component, it may have already prevented default.
          !e.isDefaultPrevented() &&
          shouldClientNavigate(e.currentTarget, e) &&
          props.href
        ) {
          e.preventDefault();
          router.open(e.currentTarget, e, props.href, props.routerOptions);
        }
      },
    }),
  };
}
