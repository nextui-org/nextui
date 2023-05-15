import {Button, Link} from "@nextui-org/react";

import {GithubIcon, NpmIcon, AdobeIcon, StorybookIcon} from "@/components/icons";
import {COMPONENT_PATH, COMPONENT_THEME_PATH} from "@/libs/github/constants";

export interface ComponentLinksProps {
  component: string;
  reactAriaHook?: string;
}

export const ComponentLinks = ({component, reactAriaHook}: ComponentLinksProps) => {
  if (!component) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        isExternal
        as={Link}
        className="text-neutral-700"
        href={`https://storiesv2.nextui.org/?path=/story/components-${component}`}
        radius="md"
        size="sm"
        startIcon={<StorybookIcon className="text-lg text-[#ff4785]" />}
        variant="flat"
      >
        Storybook
      </Button>
      <Button
        isExternal
        as={Link}
        className="text-neutral-700"
        href={`https://www.npmjs.com/package/@nextui-org/${component}`}
        radius="md"
        size="sm"
        startIcon={<NpmIcon className="text-2xl text-[#E53E3E]" />}
        variant="flat"
      >
        {`@nextui-org/${component}`}
      </Button>
      {reactAriaHook && (
        <Button
          isExternal
          as={Link}
          className="text-neutral-700"
          href={`https://react-spectrum.adobe.com/react-aria/${reactAriaHook}.html`}
          radius="md"
          size="sm"
          startIcon={<AdobeIcon className="text-lg text-[#E1251B]" />}
          variant="flat"
        >
          React Aria
        </Button>
      )}
      <Button
        isExternal
        as={Link}
        className="text-neutral-700"
        href={`${COMPONENT_PATH}/${component}`}
        radius="md"
        size="sm"
        startIcon={<GithubIcon />}
        variant="flat"
      >
        Source
      </Button>
      <Button
        isExternal
        as={Link}
        className="text-neutral-700"
        href={`${COMPONENT_THEME_PATH}/${component}.ts`}
        radius="md"
        size="sm"
        startIcon={<GithubIcon />}
        variant="flat"
      >
        Styles source
      </Button>
    </div>
  );
};
