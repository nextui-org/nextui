import type {FocusRingAria} from "@react-aria/focus";

import {useFocusRing} from "@react-aria/focus";
import React, {useMemo, useState, useEffect} from "react";
import {mergeProps} from "@react-aria/utils";

import {CSS} from "../theme/stitches.config";
import {ReactRef} from "../utils/refs";
import {useDOMRef} from "../utils/dom";
import {__DEV__} from "../utils/assertion";
import clsx from "../utils/clsx";

import StyledAvatar, {AvatarVariantsProps} from "./avatar.styles";
import AvatarGroup from "./avatar-group";

interface Props {
  text?: string;
  src?: string;
  icon?: React.ReactNode;
  alt?: string;
  className?: string;
  imgRef?: ReactRef<HTMLImageElement>;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<
  Partial<React.ImgHTMLAttributes<unknown> & React.HTMLAttributes<unknown>>,
  keyof Props | "sizes"
>;

export type AvatarProps = Props & AvatarVariantsProps & NativeAttrs & {css?: CSS};

interface IFocusRingAria extends FocusRingAria {
  focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof AvatarProps>;
}

const safeText = (text: string): string => {
  if (text?.length <= 4) return text;

  return text?.slice(0, 3);
};

export const Avatar = React.forwardRef((props: AvatarProps, ref: ReactRef<HTMLSpanElement>) => {
  const {as, src, css, text, icon, alt, className, imgRef: imgRefProp, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  const showText = !src;
  const [ready, setReady] = useState(false);

  const imgRef = useDOMRef(imgRefProp);

  const {isFocusVisible, focusProps}: IFocusRingAria = useFocusRing();

  useEffect(() => {
    imgRef?.current?.complete && setReady(true);
  }, []);

  const getState = useMemo(() => {
    return !ready && src ? "loading" : "ready";
  }, [src, ready]);

  return (
    <StyledAvatar
      ref={domRef}
      as={as}
      {...mergeProps(otherProps, focusProps)}
      className={clsx(
        {
          "only-text-avatar": showText,
        },
        className,
      )}
      css={mergeProps(
        as === "button"
          ? {
              // reset button styles
              appearance: "none",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }
          : {},
        css as any,
      )}
      data-state={getState}
      isFocusVisible={isFocusVisible}
    >
      <span className="nextui-avatar-bg" />
      {!showText && (
        <img
          ref={imgRef}
          alt={alt}
          className={clsx("nextui-avatar-img", `nextui-avatar--${getState}`, {
            "nextui-avatar-ready": ready,
          })}
          data-state={getState}
          src={src}
          onLoad={() => setReady(true)}
        />
      )}
      {showText && !icon && text && <span className="nextui-avatar-text">{safeText(text)}</span>}
      {icon && <span className="nextui-avatar-icon">{icon}</span>}
    </StyledAvatar>
  );
});

type AvatarComponent<P = {}> = React.NamedExoticComponent<P> & {
  Group: typeof AvatarGroup;
};

if (__DEV__) {
  Avatar.displayName = "NextUI.Avatar";
}

Avatar.toString = () => ".nextui-avatar";

export default Avatar as AvatarComponent<AvatarProps>;
