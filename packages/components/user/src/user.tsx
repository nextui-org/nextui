"use client";

import {forwardRef} from "@nextui-org/system";
import {Avatar} from "@nextui-org/avatar";

import {UseUserProps, useUser} from "./use-user";

export interface UserProps extends Omit<UseUserProps, "ref"> {}

const User = forwardRef<UserProps, "div">((props, ref) => {
  const {Component, name, slots, description, avatarProps, getUserProps} = useUser({
    ref,
    ...props,
  });

  return (
    <Component {...getUserProps()}>
      <Avatar {...avatarProps} />
      <div className={slots.wrapper()}>
        <span className={slots.name()}>{name}</span>
        <span className={slots.description()}>{description}</span>
      </div>
    </Component>
  );
});

User.displayName = "NextUI.User";

export default User;
