import {useClasser} from "@code-hike/classer";
import * as React from "react";
import {useSandpackNavigation} from "@codesandbox/sandpack-react";

export const RefreshIcon = (): React.ReactElement => (
  <svg
    fill="currentColor"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M16.48 12.8571C16.0883 15.1705 14.1389 16.9286 11.7931 16.9286C9.16499 16.9286 7.03448 14.722 7.03448 12C7.03448 9.27803 9.16499 7.07143 11.7931 7.07143C13.6797 7.07143 15.3099 8.20855 16.0796 9.85714L14.2759 9.85714V11.1429H16.48H16.7586H17.5275H18V6.85714L16.7586 6.85714V8.90778C15.7449 7.16536 13.9004 6 11.7931 6C8.59366 6 6 8.68629 6 12C6 15.3137 8.59366 18 11.7931 18C14.7116 18 17.126 15.7648 17.5275 12.8571H16.48Z"
      fillRule="evenodd"
    />
  </svg>
);

interface RefreshButtonProps {
  clientId?: string;
}

/**
 * @category Components
 */
export const RefreshButton = ({clientId}: RefreshButtonProps): JSX.Element => {
  const {refresh} = useSandpackNavigation(clientId);
  const c = useClasser("sp");

  return (
    <button
      className={c("button", "icon-standalone")}
      title="Refresh Sandpack"
      type="button"
      onClick={refresh}
    >
      <RefreshIcon />
    </button>
  );
};
