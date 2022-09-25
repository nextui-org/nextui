import {useState, useEffect, useMemo} from "react";
import {useFocusRing} from "react-aria";
import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef, IFocusRingAria} from "@nextui-org/dom-utils";
import {clsx, ReactRef, safeText, __DEV__} from "@nextui-org/shared-utils";

import {StyledAvatar, AvatarVariantsProps} from "./avatar.styles";

export interface AvatarProps extends HTMLNextUIProps<"span", AvatarVariantsProps> {
  text?: string;
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  imgRef?: ReactRef<HTMLImageElement>;
}

const Avatar = forwardRef<AvatarProps, "span">((props, ref) => {
  const {as, src, css, text, icon, alt, className, imgRef: imgRefProp, ...otherProps} = props;

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
      css={
        as === "button"
          ? {
              // reset button styles
              appearance: "none",
              outline: "none",
              border: "none",
              cursor: "pointer",
              ...css,
            }
          : css
      }
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
  // Group: typeof AvatarGroup;
};

if (__DEV__) {
  Avatar.displayName = "NextUI.Avatar";
}

Avatar.toString = () => ".nextui-avatar";

export default Avatar as AvatarComponent<AvatarProps>;
