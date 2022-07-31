import type {ForwardedRef} from "react";

import React, {useState, useEffect, useMemo} from "react";

import {HTMLNextUIProps} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import {pickChild} from "../utils/collections";

import NavbarCollapseItem from "./navbar-collapse-item";
import {NavbarCollapseVariantsProps} from "./navbar.styles";
import {useNavbarContext} from "./navbar-context";

interface Props extends Omit<HTMLNextUIProps<"ul">, keyof NavbarCollapseVariantsProps> {
  ref?: ForwardedRef<any>;
  children?: React.ReactNode | React.ReactNode[];
}

export type UseNavbarCollapseProps = Props & NavbarCollapseVariantsProps;

/**
 * @internal
 */
export function useNavbarCollapse(props: UseNavbarCollapseProps = {}) {
  const {css, children, ref, className, ...otherProps} = props;

  const [hasScrolled, setHasScrolled] = useState(false);

  const context = useNavbarContext();
  const domRef = useDOMRef(ref);

  const [, items] = pickChild(children, NavbarCollapseItem);

  useEffect(() => {
    if (!context.isCollapseOpen) {
      // restore scroll to the top of the collapse
      domRef.current &&
        domRef.current?.scrollTo({
          top: 0,
        });
      setHasScrolled(false);
    }

    const handleScroll = () => {
      if (domRef.current && domRef.current?.scrollTop > 0 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    domRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      domRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [context.isCollapseOpen]);

  return {
    css,
    domRef,
    children,
    items,
    isOpen: context.isCollapseOpen,
    hasScrolled,
    className,
    otherProps,
  };
}

export type UseNavbarCollapseReturn = ReturnType<typeof useNavbarCollapse>;
