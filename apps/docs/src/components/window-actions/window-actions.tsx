import React from "react";
import {CSS} from "@nextui-org/react";

import {
  StyledWindowIcon,
  StyledWindowActions,
  WindowActionsVariantProps,
} from "./window-actions.styles";

export type WindowActionsProps = WindowActionsVariantProps & {
  css?: CSS;
};

const WindowActions: React.FC<WindowActionsProps> = (props) => {
  return (
    <StyledWindowActions className="nextui-window-actions" {...props}>
      <StyledWindowIcon color="red" />
      <StyledWindowIcon color="yellow" />
      <StyledWindowIcon color="green" />
    </StyledWindowActions>
  );
};

WindowActions.toString = () => ".nextui-window-actions";

export default WindowActions;
