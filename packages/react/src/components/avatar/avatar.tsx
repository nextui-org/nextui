"use client";

import type {AvatarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {avatarVariants} from "@heroui/styles";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React, {createContext, use} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {AVATAR_GROUP_CHILD, AvatarGroupContext} from "../avatar-group/avatar-group-context";

/* ------------------------------------------------------------------------------------------------
 * Avatar Context
 * --------------------------------------------------------------------------------------------- */
type AvatarContext = {
  slots?: ReturnType<typeof avatarVariants>;
};

const AvatarContext = createContext<AvatarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Avatar Root
 * -----------------------------------------------------------------------------------------------*/
interface AvatarRootProps
  extends Omit<ComponentPropsWithRef<typeof AvatarPrimitive.Root>, "color">, AvatarVariants {
  [AVATAR_GROUP_CHILD]?: boolean;
}

const AvatarRoot = ({
  children,
  className,
  color,
  size,
  variant,
  [AVATAR_GROUP_CHILD]: isAvatarGroupChild,
  ...props
}: AvatarRootProps) => {
  const avatarGroupContext = use(AvatarGroupContext);

  // Only use group context when this avatar is a direct child of AvatarGroup
  const shouldUseContext = isAvatarGroupChild === true;

  // Merge props with precedence: direct props > context props
  const finalSize = size ?? (shouldUseContext ? avatarGroupContext?.size : undefined);
  const finalColor = color ?? (shouldUseContext ? avatarGroupContext?.color : undefined);
  const finalVariant = variant ?? (shouldUseContext ? avatarGroupContext?.variant : undefined);

  const slots = React.useMemo(
    () => avatarVariants({color: finalColor, size: finalSize, variant: finalVariant}),
    [finalColor, finalSize, finalVariant],
  );
  const contextValue = React.useMemo(() => ({slots}), [slots]);

  return (
    <AvatarContext value={contextValue}>
      <AvatarPrimitive.Root className={slots.base({className})} {...props}>
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext>
  );
};

AvatarRoot.displayName = "HeroUI.Avatar";

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/
interface AvatarImageProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Image> {}

const AvatarImage = ({
  className,
  crossOrigin,
  loading,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
  ...props
}: AvatarImageProps) => {
  const {slots} = React.use(AvatarContext);

  return (
    <AvatarPrimitive.Image
      className={composeSlotClassName(slots?.image, className)}
      crossOrigin={crossOrigin}
      loading={loading}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      onError={onError}
      onLoad={onLoad}
      {...props}
    />
  );
};

AvatarImage.displayName = "HeroUI.Avatar.Image";

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/
interface AvatarFallbackProps extends ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> {
  color?: AvatarVariants["color"];
}

const AvatarFallback = ({className, color, ...props}: AvatarFallbackProps) => {
  const {slots} = React.use(AvatarContext);

  return (
    <AvatarPrimitive.Fallback
      className={composeSlotClassName(slots?.fallback, className, {color})}
      data-slot="avatar-fallback"
      {...props}
    />
  );
};

AvatarFallback.displayName = "HeroUI.Avatar.Fallback";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {AvatarRoot, AvatarImage, AvatarFallback};

export type {AvatarRootProps, AvatarImageProps, AvatarFallbackProps};
