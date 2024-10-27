import {forwardRef, useMemo} from "react";
import {AvatarIcon, useAvatar} from "@nextui-org/react";

const MyAvatar = forwardRef((props, ref) => {
  const {
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
          className={slots.fallback({class: classNames?.fallback})}
          role="img"
        >
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={ariaLabel} className={slots.name({class: classNames?.name})} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={ariaLabel} className={slots.icon({class: classNames?.icon})} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, name, classNames]);

  return (
    <div {...getAvatarProps()}>
      {src && <img {...getImageProps()} alt={alt} />}
      {fallback}
    </div>
  );
});

MyAvatar.displayName = "MyAvatar";

export default MyAvatar;
