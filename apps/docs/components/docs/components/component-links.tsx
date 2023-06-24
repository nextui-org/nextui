import {Button, Link} from "@nextui-org/react";

import {GithubIcon, NpmIcon, AdobeIcon, StorybookIcon} from "@/components/icons";
import {COMPONENT_PATH, COMPONENT_THEME_PATH} from "@/libs/github/constants";

export interface ComponentLinksProps {
  component: string;
  styles?: string;
  storybook?: string;
  reactAriaHook?: string;
}

export const ComponentLinks = ({
  component,
  storybook,
  styles,
  reactAriaHook,
}: ComponentLinksProps) => {
  if (!component) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Button
        isExternal
        as={Link}
        className="bg-default-100 dark:bg-default-50 text-default-700"
        href={`https://storiesv2.nextui.org/?path=/story/components-${storybook || component}`}
        radius="md"
        size="sm"
        startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
      >
        Storybook
      </Button>
      <Button
        isExternal
        as={Link}
        className="bg-default-100 dark:bg-default-50 text-default-700"
        href={`https://www.npmjs.com/package/@nextui-org/${component}`}
        radius="md"
        size="sm"
        startContent={<NpmIcon className="text-2xl text-[#E53E3E]" />}
      >
        {`@nextui-org/${component}`}
      </Button>
      {reactAriaHook && (
        <Button
          isExternal
          as={Link}
          className="bg-default-100 dark:bg-default-50 text-default-700"
          href={`https://react-spectrum.adobe.com/react-aria/${reactAriaHook}.html`}
          radius="md"
          size="sm"
          startContent={<AdobeIcon className="text-lg text-[#E1251B]" />}
        >
          React Aria
        </Button>
      )}
      <Button
        isExternal
        as={Link}
        className="bg-default-100 dark:bg-default-50 text-default-700"
        href={`${COMPONENT_PATH}/${component}`}
        radius="md"
        size="sm"
        startContent={<GithubIcon />}
      >
        Source
      </Button>
      <Button
        isExternal
        as={Link}
        className="bg-default-100 dark:bg-default-50 text-default-700"
        href={`${COMPONENT_THEME_PATH}/${styles || component}.ts`}
        radius="md"
        size="sm"
        startContent={<GithubIcon />}
      >
        Styles source
      </Button>
    </div>
  );
};
