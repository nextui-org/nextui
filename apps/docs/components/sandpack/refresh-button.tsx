import * as React from "react";
import {useSandpackNavigation} from "@codesandbox/sandpack-react";
import {clsx} from "@nextui-org/shared-utils";

import {RotateRightLinearIcon} from "@/components/icons";

interface RefreshButtonProps {
  clientId?: string;
}

/**
 * @category Components
 */
export const RefreshButton = ({clientId}: RefreshButtonProps): JSX.Element => {
  const {refresh} = useSandpackNavigation(clientId);

  return (
    <button
      className={clsx("sp-button", "sp-icon-standalone")}
      title="Refresh Sandpack"
      type="button"
      onClick={refresh}
    >
      <RotateRightLinearIcon />
    </button>
  );
};
