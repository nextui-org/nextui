"use client";

import {Button, Link} from "@nextui-org/react";

import {trackEvent} from "@/utils/va";

export const FigmaButton = () => (
  <Button
    isExternal
    showAnchorIcon
    as={Link}
    className="max-w-fit text-current"
    color="default"
    href="https://www.figma.com/community/file/1267584376234254760"
    variant="bordered"
    onPress={() => {
      trackEvent("FigmaPage - Open Figma Link", {
        action: "click",
        category: "figma",
      });
    }}
  >
    Open in Figma
  </Button>
);
