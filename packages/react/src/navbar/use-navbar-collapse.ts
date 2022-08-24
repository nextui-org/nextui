import type {ForwardedRef} from "react";

import React, {useState, useEffect, useMemo} from "react";

import {HTMLNextUIProps} from "../utils/system";
import {useDOMRef} from "../utils/dom";
import {pickChild} from "../utils/collections";
import {arrayToObject} from "../utils/object";
import useBodyScroll from "../use-body-scroll";

import NavbarCollapseItem from "./navbar-collapse-item";
import {NavbarCollapseVariantsProps} from "./navbar.styles";
import {useNavbarContext} from "./navbar-context";

interface Props extends Omit<HTMLNextUIProps<"ul">, keyof NavbarCollapseVariantsProps> {
  ref?: ForwardedRef<any>;
  children?: React.ReactNode | React.ReactNode[];
  transitionDelay?: number; // in milliseconds
  transitionTime?: number; // in milliseconds
  transitionMatrix?: {
    in: string;
    out: string;
  };
}

export type UseNavbarCollapseProps = Props & NavbarCollapseVariantsProps;

/**
 * @internal
 */
export function useNavbarCollapse(props: UseNavbarCollapseProps = {}) {
  const {
    css,
    children,
    ref,
    transitionDelay = 0,
    transitionTime = 450,
    transitionMatrix = {in: "matrix(1, 0, 0, 1, 0, 0)", out: "matrix(0.95, 0, 0, 0.95, 5, 20)"},
    className,
    ...otherProps
  } = props;

  const [hasScrolled, setHasScrolled] = useState(false);

  const context = useNavbarContext();
  const domRef = useDOMRef(ref);

  const [, items] = pickChild(children, NavbarCollapseItem);
  const [, setBodyHidden] = useBodyScroll(null, {scrollLayer: true});

  useEffect(() => {
    if (!context.isCollapseOpen) {
      // restore scroll to the top of the collapse
      domRef.current &&
        domRef.current?.scrollTo?.({
          top: 0,
        });
      setHasScrolled(false);
      setBodyHidden(false);
    } else {
      setBodyHidden(true);
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

  const collpaseCss = useMemo(() => {
    const customCss = [];

    if (context.parentRef && context.parentRef.current) {
      customCss.push({
        maxHeight: context.parentRef.current?.clientHeight,
      });
    }

    const customCssObject = arrayToObject(customCss);

    return {
      ...customCssObject,
      ...css,
    };
  }, [context.parentRef?.current, css]);

  return {
    css,
    domRef,
    children,
    items,
    collpaseCss,
    isOpen: context.isCollapseOpen,
    hasScrolled,
    transitionDelay,
    transitionTime,
    transitionMatrix,
    className,
    otherProps,
  };
}

export type UseNavbarCollapseReturn = ReturnType<typeof useNavbarCollapse>;
