import {useMemo} from "react";
import {forwardRef} from "@nextui-org/system";

import {AvatarIcon} from "./avatar-icon";
import {useAvatar, UseAvatarProps} from "./use-avatar";

export interface AvatarProps extends UseAvatarProps {}

const Avatar = forwardRef<"span", AvatarProps>((props, ref) => {
  const {
    Component,
    ImgComponent,
    src,
    icon = <AvatarIcon />,
    alt,
    classNames,
    slots,
    name,
    showFallback,
    fallback: fallbackComponent,
    getInitials,
    getAvatarProps,
    getImageProps,
  } = useAvatar({
    ...props,
    ref,
  });

  const fallback = useMemo(() => {
    if (!showFallback && src) return null;

    if (fallbackComponent) {
      return (
        <div aria-label={alt} className={slots.fallback({class: classNames?.fallback})} role="img">
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={alt} className={slots.name({class: classNames?.name})} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={alt} className={slots.icon({class: classNames?.icon})} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, name, classNames]);

  return (
    <Component {...getAvatarProps()}>
      {src && <ImgComponent {...getImageProps()} alt={alt} />}
      {fallback}
    </Component>
  );
});

Avatar.displayName = "NextUI.Avatar";

export default Avatar;
