import {clsx} from "@nextui-org/shared-utils";
import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {useMemo} from "react";

import {useAvatar, UseAvatarProps} from "./use-avatar";
import {AvatarIcon} from "./avatar-icon";

export interface AvatarProps extends UseAvatarProps {}

const Avatar = forwardRef<AvatarProps, "span">((props, ref) => {
  const {
    Component,
    src,
    icon = <AvatarIcon />,
    alt,
    domRef,
    imgRef,
    styles,
    classes,
    name,
    isImgLoaded,
    showFallback,
    ignoreFallback,
    baseClassname,
    buttonClasses,
    imgClassname,
    getAvatarProps,
    getInitials,
  } = useAvatar({
    ref,
    ...props,
  });

  const fallback = useMemo(() => {
    if (!showFallback && src) return null;

    if (name) {
      return (
        <span aria-label={name} className={styles.name({class: classes?.name})} role="img">
          {getInitials(name)}
        </span>
      );
    } else {
      return (
        <span aria-label="avatar" className={styles.icon({class: classes?.icon})} role="img">
          {icon}
        </span>
      );
    }
  }, [
    src,
    styles,
    alt,
    name,
    icon,
    classes,
    isImgLoaded,
    showFallback,
    ignoreFallback,
    getInitials,
  ]);

  return (
    <Component
      ref={domRef}
      {...getAvatarProps()}
      className={styles.base({
        class: clsx(baseClassname, buttonClasses),
      })}
    >
      <img
        ref={imgRef}
        alt={alt}
        className={styles.img({class: imgClassname})}
        data-loaded={isImgLoaded}
        src={src}
      />
      {fallback}
    </Component>
  );
});

if (__DEV__) {
  Avatar.displayName = "NextUI.Avatar";
}

export default Avatar;
