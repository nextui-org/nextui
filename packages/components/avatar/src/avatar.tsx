import type {
  ReactRef,
  NormalColors,
  SimpleColors,
  NormalSizes,
  NormalWeights,
} from "@nextui-org/shared-utils";

import {useState, useEffect, useMemo} from "react";
import {useFocusRing, mergeProps} from "react-aria";
import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef, IFocusRingAria} from "@nextui-org/dom-utils";
import {clsx, safeText, __DEV__} from "@nextui-org/shared-utils";

import {StyledAvatar} from "./avatar.styles";
import AvatarGroup from "./avatar-group";

export interface AvatarProps extends HTMLNextUIProps<"span"> {
  bordered?: boolean;
  rounded?: boolean;
  stacked?: boolean;
  pointer?: boolean;
  squared?: boolean;
  zoomed?: boolean;
  text?: string;
  src?: string;
  alt?: string;
  color?: NormalColors;
  textColor?: SimpleColors;
  size?: NormalSizes;
  borderWeight?: NormalWeights;
  icon?: React.ReactNode;
  imgRef?: ReactRef<HTMLImageElement>;
}

type CompundAvatar = {
  Group: typeof AvatarGroup;
};

const Avatar = forwardRef<AvatarProps, "span", CompundAvatar>((props, ref) => {
  const {
    as,
    src,
    css,
    text,
    icon,
    alt,
    bordered,
    stacked,
    pointer,
    squared,
    zoomed,
    color = "default",
    textColor = "default",
    size = "md",
    borderWeight = "normal",
    rounded = true,
    className,
    imgRef: imgRefProp,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);
  const imgRef = useDOMRef(imgRefProp);

  const showText = !src;
  const [ready, setReady] = useState(false);

  const {isFocusVisible, focusProps}: IFocusRingAria<AvatarProps> = useFocusRing();

  useEffect(() => {
    imgRef?.current?.complete && setReady(true);
  }, []);

  const getState = useMemo(() => {
    return !ready && src ? "loading" : "ready";
  }, [src, ready]);

  const getCss = useMemo(() => {
    if (as === "button") {
      return {
        // reset button styles
        appearance: "none",
        outline: "none",
        border: "none",
        cursor: "pointer",
        ...css,
      };
    }

    return css;
  }, [as, css]);

  return (
    <StyledAvatar
      ref={domRef}
      as={as}
      borderWeight={borderWeight}
      bordered={bordered}
      color={color}
      pointer={pointer}
      rounded={rounded}
      size={size}
      squared={squared}
      stacked={stacked}
      textColor={textColor}
      zoomed={zoomed}
      {...mergeProps(otherProps, focusProps)}
      className={clsx(
        "nextui-avatar",
        {
          "only-text-avatar": showText,
        },
        className,
      )}
      css={getCss}
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

Avatar.Group = AvatarGroup;

if (__DEV__) {
  Avatar.displayName = "NextUI.Avatar";
}

Avatar.toString = () => ".nextui-avatar";

export default Avatar;
