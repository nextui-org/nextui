import React from "react";
import {usePathname} from "next/navigation";
import {Tooltip, Button} from "@nextui-org/react";
import {capitalize, last} from "lodash";

import {BugIcon} from "@/components/icons";
import {ISSUE_REPORT_URL} from "@/libs/github/constants";
import {trackEvent} from "@/utils/va";

export const BugReportButton = () => {
  const pathname = usePathname();

  const componentTitle = capitalize(last(pathname?.split("/")));

  const handlePress = () => {
    trackEvent("BugReportButton - Sandpack", {
      name: "sandpack - bug report",
      action: "press",
      category: "docs",
      data: `${ISSUE_REPORT_URL}${componentTitle}`,
    });

    window.open(`${ISSUE_REPORT_URL}${componentTitle}`, "_blank");
  };

  return (
    <Tooltip
      className="text-xs px-2"
      closeDelay={0}
      content="Report a bug"
      placement="top"
      radius="md"
    >
      <Button isIconOnly size="sm" title="Report a bug" variant="light" onPress={handlePress}>
        <BugIcon className="text-white dark:text-zinc-500" height={16} width={16} />
      </Button>
    </Tooltip>
  );
};
