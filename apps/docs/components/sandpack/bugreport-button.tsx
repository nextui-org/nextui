import React from "react";
import {useRouter} from "next/router";
import {capitalize, join} from "lodash";
import {Tooltip, Link, Button} from "@nextui-org/react";

import {BugIcon} from "@/components/icons";
import {ISSUE_REPORT_URL} from "@/libs/github/constants";

export const BugReportButton = () => {
  const router = useRouter();

  const slug = router.query.slug || "";

  const componentTitle = Array.isArray(slug)
    ? join(
        slug.map((s) => capitalize(s)),
        "/",
      )
    : capitalize(slug);

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
        size="xs"
        title="Report a bug"
        variant="light"
      >
        <BugIcon className="text-zinc-500" height={16} width={16} />
      </Button>
    </Tooltip>
  );
};
