const App = `import { forwardRef } from "react";
import { useMemo } from "react";

import { AvatarIcon, useAvatar } from "@nextui-org/react";

const Avatar = forwardRef((props, ref) => {
  const {
    Component,
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
          className={slots.fallback({ class: classNames?.fallback })}
          role="img"
        >
          {fallbackComponent}
        </div>
      );
    }

    return name ? (
      <span aria-label={ariaLabel} className={slots.name({ class: classNames?.name })} role="img">
        {getInitials(name)}
      </span>
    ) : (
      <span aria-label={ariaLabel} className={slots.icon({ class: classNames?.icon })} role="img">
        {icon}
      </span>
    );
  }, [showFallback, src, fallbackComponent, name, classNames]);

  return (
    <Component {...getAvatarProps()}>
      {src && <img {...getImageProps()} alt={alt} />}
      {fallback}
    </Component>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;`;

const AppTs = `import { forwardRef,useMemo } from "react";

import { AvatarIcon, useAvatar, UseAvatarProps } from "@nextui-org/react";

export interface AvatarProps extends Omit<UseAvatarProps, "ref"> {}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const {
    Component,
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
    <Component {...getAvatarProps()}>
      {src && <img {...getImageProps()} alt={alt} />}
      {fallback}
    </Component>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;`;

const react = {
  "/App.jsx": App,
};

const reactTs = {
  "/App.tsx": AppTs,
};

export default {
  ...react,
  ...reactTs,
};
