import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {useMemo} from "react";

import {AvatarIcon} from "./avatar-icon";
import {useAvatar, UseAvatarProps} from "./use-avatar";

export interface AvatarProps extends Omit<UseAvatarProps, "ref"> {}

const Avatar = forwardRef<AvatarProps, "span">((props, ref) => {
  const {
    Component,
    src,
    icon = <AvatarIcon />,
    alt,
    domRef,
    imgRef,
    styles,
    slots,
    name,
    isImgLoaded,
    showFallback,
    imgStyles,
    getAvatarProps,
    getInitials,
    fallback: fallbackComponent,
  } = useAvatar({
    ref,
    ...props,
  });

  const fallback = useMemo(() => {
    if (!showFallback && src) return null;

    const ariaLabel = alt || name || "avatar";

    if (fallbackComponent) {
      return (
        <div
          aria-label={ariaLabel}
          className={slots.fallback({class: styles?.fallback})}
          role="img"
        >
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={ariaLabel} className={slots.name({class: styles?.name})} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={ariaLabel} className={slots.icon({class: styles?.icon})} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, name, styles]);

  return (
    <Component ref={domRef} {...getAvatarProps()}>
      {src && (
        <img
          ref={imgRef}
          alt={alt}
          className={slots.img({class: imgStyles})}
          data-loaded={isImgLoaded}
          src={src}
        />
      )}
      {fallback}
    </Component>
  );
});

if (__DEV__) {
  Avatar.displayName = "NextUI.Avatar";
}

export default Avatar;
