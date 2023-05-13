import {Button, Link} from "@nextui-org/react";

import {GithubIcon, NpmIcon, AdobeIcon, StorybookIcon} from "@/components/icons";
import {COMPONENT_PATH, COMPONENT_THEME_PATH} from "@/libs/github/constants";

export interface ComponentLinksProps {
  component: string;
  reactAria?: string;
}

export const ComponentLinks = ({component, reactAria}: ComponentLinksProps) => {
  if (!component) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        isExternal
        as={Link}
        className="text-neutral-700 font-normal"
        href={`${COMPONENT_PATH}/${component}`}
        size="sm"
        startIcon={<GithubIcon />}
        variant="flat"
      >
        Source
      </Button>
      <Button
        isExternal
        as={Link}
        className="text-neutral-700 font-normal"
        href={`${COMPONENT_THEME_PATH}/${component}.ts`}
        size="sm"
        startIcon={<GithubIcon />}
        variant="flat"
      >
        Styles source
      </Button>
      <Button
        isExternal
        as={Link}
        className="text-neutral-700 font-normal"
        href={`https://www.npmjs.com/package/@nextui-org/${component}`}
        size="sm"
        startIcon={<NpmIcon className="text-2xl text-[#E53E3E]" />}
        variant="flat"
      >
        {`@nextui-org/${component}`}
      </Button>

      <Button
        isExternal
        as={Link}
        className="text-neutral-700 font-normal"
        href={`https://storiesv2.nextui.org/?path=/story/components-${component}`}
        size="sm"
        startIcon={<StorybookIcon className="text-lg text-[#ff4785]" />}
        variant="flat"
      >
        Storybook
      </Button>

      {reactAria && (
        <Button
          isExternal
          as={Link}
          className="text-neutral-700 font-normal"
          href={reactAria}
          size="sm"
          startIcon={<AdobeIcon />}
          variant="flat"
        >
          React Aria
        </Button>
      )}
    </div>
  );
};
