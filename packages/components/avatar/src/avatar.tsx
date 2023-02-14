import {clsx} from "@nextui-org/shared-utils";
import {forwardRef} from "@nextui-org/system";
import {safeText, __DEV__} from "@nextui-org/shared-utils";

import AvatarGroup from "./avatar-group";
import {useAvatar, UseAvatarReturn} from "./use-avatar";

export interface AvatarProps extends UseAvatarReturn {}

type CompundAvatar = {
  Group: typeof AvatarGroup;
};

const Avatar = forwardRef<AvatarProps, "span", CompundAvatar>((props, ref) => {
  const {
    Component,
    src,
    icon,
    alt,
    domRef,
    imgRef,
    styles,
    classes,
    initials,
    baseClassname,
    shouldShowInitials,
    buttonClasses,
    onImgLoad,
    getState,
    getAvatarProps,
  } = useAvatar({
    ref,
    ...props,
  });

  return (
    <Component
      ref={domRef}
      {...getAvatarProps()}
      className={styles.base({
        class: clsx(baseClassname, buttonClasses),
      })}
      data-state={getState}
    >
      {!shouldShowInitials && (
        <img
          ref={imgRef}
          alt={alt}
          className={styles.img({class: classes?.img})}
          data-state={getState}
          src={src}
          onLoad={onImgLoad}
        />
      )}
      {shouldShowInitials && !icon && initials && (
        <span className={styles.initials({class: classes?.initials})}>{safeText(initials)}</span>
      )}
      {icon && <span className={styles.icon({class: classes?.icon})}>{icon}</span>}
    </Component>
  );
});

Avatar.Group = AvatarGroup;

if (__DEV__) {
  Avatar.displayName = "NextUI.Avatar";
}

Avatar.toString = () => ".nextui-avatar";

export default Avatar;
