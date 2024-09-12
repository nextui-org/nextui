import {Button, ButtonProps, Code, Link, Tooltip} from "@nextui-org/react";
import {ReactNode} from "react";
import Balancer from "react-wrap-balancer";

import {GithubIcon, NpmIcon, AdobeIcon, StorybookIcon, NextJsIcon} from "@/components/icons";
import {COMPONENT_PATH, COMPONENT_THEME_PATH} from "@/libs/github/constants";
import {trackEvent} from "@/utils/va";

export interface ComponentLinksProps {
  component: string;
  npm?: string;
  source?: string;
  styles?: string;
  storybook?: string;
  rscCompatible?: boolean;
  reactAriaHook?: string;
}

const ButtonLink = ({
  children,
  href,
  startContent,
  tooltip,
  ...props
}: ButtonProps & {
  href: string;
  tooltip?: string | ReactNode;
}) => {
  const handlePress = () => {
    if (!href) return;

    trackEvent("ComponentLinks - Click", {
      category: "docs",
      action: "click",
      data: href || "",
    });
  };

  const button = (
    <Button
      isExternal
      as={Link}
      className="!text-small py-4 bg-default-100 dark:bg-default-50 text-default-700"
      href={href}
      size="sm"
      startContent={startContent}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Button>
  );

  return tooltip ? (
    <Tooltip className="max-w-[230px]" content={tooltip}>
      {button}
    </Tooltip>
  ) : (
    button
  );
};

export const ComponentLinks = ({
  component,
  npm,
  source,
  storybook,
  styles,
  rscCompatible,
  reactAriaHook,
}: ComponentLinksProps) => {
  if (!component) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <ButtonLink
        href={`https://storybook.nextui.org/?path=/story/components-${
          storybook || component
        }--default`}
        startContent={<StorybookIcon className="text-lg text-[#ff4785]" />}
      >
        Storybook
      </ButtonLink>
      <ButtonLink
        href={`https://www.npmjs.com/package/@nextui-org/${npm || component}`}
        startContent={<NpmIcon className="text-2xl text-[#E53E3E]" />}
      >
        {`@nextui-org/${npm || component}`}
      </ButtonLink>
      {reactAriaHook && (
        <ButtonLink
          href={`https://react-spectrum.adobe.com/react-aria/${reactAriaHook}.html`}
          startContent={<AdobeIcon className="text-lg text-[#E1251B]" />}
        >
          React Aria
        </ButtonLink>
      )}
      {rscCompatible && (
        <ButtonLink
          href="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
          startContent={<NextJsIcon size={18} />}
          tooltip={
            <p>
              <Balancer>
                This component doesn&apos;t use the
                <Code className="font-normal bg-transparent px-0 py-0 text-code-mdx">
                  `use client;`
                </Code>
                directive making it compatible with RSC.
              </Balancer>
            </p>
          }
        >
          Server component
        </ButtonLink>
      )}

      <ButtonLink
        href={`${COMPONENT_PATH}/${source || component}`}
        startContent={<GithubIcon size={20} />}
      >
        Source
      </ButtonLink>
      <ButtonLink
        href={`${COMPONENT_THEME_PATH}/${styles || component}.ts`}
        startContent={<GithubIcon size={20} />}
      >
        Styles source
      </ButtonLink>

      <div className="flex flex-col gap-y-2 my-3 items-start">
        <a
          href="https://www.producthunt.com/posts/zigma-by-nextui-yc-s24?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-zigma&#0045;by&#0045;nextui&#0045;yc&#0045;s24"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Zigma&#0032;by&#0032;NextUI&#0032;&#0040;YC&#0032;S24&#0041; - Connect&#0032;your&#0032;design&#0032;files&#0032;to&#0032;production&#0032;code&#0032;in&#0032;minutes | Product Hunt"
            className="m-0"
            height="54"
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=488715&theme=light"
            style={{width: "250px", height: "54px"}}
            width="250"
          />
        </a>
        <p className="text-sm text-default-500 font-semibold !p-0 m-0">
          We&apos;re live on Product Hunt! Join the conversation and help us get to #1 Product of
          the day 🚀
        </p>
      </div>
    </div>
  );
};
