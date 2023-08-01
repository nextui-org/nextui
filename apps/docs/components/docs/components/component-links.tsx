import {Button, ButtonProps, Link} from "@nextui-org/react";

import {GithubIcon, NpmIcon, AdobeIcon, StorybookIcon} from "@/components/icons";
import {COMPONENT_PATH, COMPONENT_THEME_PATH} from "@/libs/github/constants";

export interface ComponentLinksProps {
  component: string;
  styles?: string;
  storybook?: string;
  reactAriaHook?: string;
}

const ButtonLink = ({
  children,
  href,
  startContent,
  ...props
}: ButtonProps & {
  href: string;
}) => (
  <Button
    isExternal
    as={Link}
    className="!text-small py-4 bg-default-100 dark:bg-default-50 text-default-700"
    href={href}
    size="sm"
    startContent={startContent}
    {...props}
  >
    {children}
  </Button>
);

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
      <ButtonLink
        href={`https://storybook.nextui.org/?path=/story/components-${storybook || component}`}
        startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
      >
        Storybook
      </ButtonLink>
      <ButtonLink
        href={`https://www.npmjs.com/package/@nextui-org/${component}`}
        startContent={<NpmIcon className="text-2xl text-[#E53E3E]" />}
      >
        {`@nextui-org/${component}`}
      </ButtonLink>
      {reactAriaHook && (
        <ButtonLink
          href={`https://react-spectrum.adobe.com/react-aria/${reactAriaHook}.html`}
          startContent={<AdobeIcon className="text-lg text-[#E1251B]" />}
        >
          React Aria
        </ButtonLink>
      )}
      <ButtonLink href={`${COMPONENT_PATH}/${component}`} startContent={<GithubIcon size={20} />}>
        Source
      </ButtonLink>
      <ButtonLink
        href={`${COMPONENT_THEME_PATH}/${styles || component}.ts`}
        startContent={<GithubIcon size={20} />}
      >
        Styles source
      </ButtonLink>
    </div>
  );
};
