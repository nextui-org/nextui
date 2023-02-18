import {forwardRef} from "@nextui-org/system";
import {__DEV__} from "@nextui-org/shared-utils";
import {Avatar} from "@nextui-org/avatar";

import {UseUserProps, useUser} from "./use-user";

export interface UserProps extends UseUserProps {}

const User = forwardRef<UserProps, "div">((props, ref) => {
  const {Component, domRef, name, slots, description, avatarProps, getUserProps} = useUser({
    ref,
    ...props,
  });

  return (
    <Component ref={domRef} {...getUserProps()}>
      <Avatar {...avatarProps} />
      <div className={slots.wrapper()}>
        <span className={slots.name()}>{name}</span>
        <span className={slots.description()}>{description}</span>
      </div>
    </Component>
  );
});

if (__DEV__) {
  User.displayName = "NextUI.User";
}

export default User;
