import {mergeProps} from "@react-aria/utils";
import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";
import {Avatar} from "@nextui-org/avatar";

import {UserLink} from "./user-link";
import {StyledUser, StyledUserInfo, StyledUserName, StyledUserDesc} from "./user.styles";
import {UseUserProps, useUser} from "./use-user";

export interface UserProps extends UseUserProps {}

type CompundUser = {
  Link: typeof UserLink;
};

const User = forwardRef<UserProps, "div", CompundUser>((props, ref) => {
  const {
    // user props
    css,
    name,
    userCss,
    isFocusVisible,
    className,
    focusProps,
    description,
    children,
    // avatar props, TODO: this should come from a "avatarProps" prop.
    alt,
    src,
    squared,
    size,
    zoomed,
    bordered,
    color,
    pointer,
    text,
    ...otherProps
  } = useUser(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledUser
      ref={domRef}
      className={clsx("nextui-user", className)}
      css={{
        ...userCss,
        ...css,
      }}
      {...mergeProps(focusProps, otherProps)}
      isFocusVisible={isFocusVisible}
    >
      <Avatar
        alt={alt}
        bordered={bordered}
        className="nextui-user-avatar"
        color={color}
        pointer={pointer}
        size={size}
        squared={squared}
        src={src}
        text={text}
        zoomed={zoomed}
      />
      <StyledUserInfo className="nextui-user-info">
        <StyledUserName className="nextui-user-name">{name}</StyledUserName>
        <StyledUserDesc className="nextui-user-desc">{description || children}</StyledUserDesc>
      </StyledUserInfo>
    </StyledUser>
  );
});

User.Link = UserLink;

if (__DEV__) {
  User.displayName = "NextUI.User";
}

User.toString = () => ".nextui-user";

export default User;
