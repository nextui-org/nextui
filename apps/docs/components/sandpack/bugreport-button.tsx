import React from "react";
import {usePathname} from "next/navigation";
import {Tooltip, Link, Button} from "@nextui-org/react";
import {capitalize, last} from "lodash";

import {BugIcon} from "@/components/icons";
import {ISSUE_REPORT_URL} from "@/libs/github/constants";

export const BugReportButton = () => {
  const pathname = usePathname();

  const componentTitle = capitalize(last(pathname?.split("/")));

  return (
    <Tooltip
      className="text-xs px-2"
      closeDelay={0}
      content="Report a bug"
      placement="top"
      radius="md"
    >
      <Button
        isExternal
        isIconOnly
        as={Link}
        href={`${ISSUE_REPORT_URL}${componentTitle}`}
        size="sm"
        title="Report a bug"
        variant="light"
      >
        <BugIcon className="text-white dark:text-zinc-500" height={16} width={16} />
      </Button>
    </Tooltip>
  );
};
