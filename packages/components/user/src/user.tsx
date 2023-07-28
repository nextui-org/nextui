import {forwardRef} from "@nextui-org/system";
import {Avatar} from "@nextui-org/avatar";

import {UseUserProps, useUser} from "./use-user";

export interface UserProps extends UseUserProps {}

const User = forwardRef<"div", UserProps>((props, ref) => {
  const {Component, name, slots, classNames, description, avatarProps, getUserProps} = useUser({
    ...props,
    ref,
  });

  return (
    <Component {...getUserProps()}>
      <Avatar {...avatarProps} />
      <div className={slots.wrapper({class: classNames?.wrapper})}>
        <span className={slots.name({class: classNames?.name})}>{name}</span>
        <span className={slots.description({class: classNames?.description})}>{description}</span>
      </div>
    </Component>
  );
});

User.displayName = "NextUI.User";

export default User;
