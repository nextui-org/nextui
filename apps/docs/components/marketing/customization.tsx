/* eslint-disable react/display-name */
import {Button, Link} from "@nextui-org/react";

import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {CodeWindow} from "@/components/code-window";
import landingContent from "@/content/landing";
import {GradientBox} from "@/components";
import {CustomButton} from "@/components/demos";

export const Customization = () => {
  return (
    <section className={sectionWrapper({class: "mt-44"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Customization made</h1>
            <div>
              <h1 className={title({size: "lg", color: "pink"})}>easy.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            NextUI is based on{" "}
            <Link
              isExternal
              className="text-xl text-neutral-500 font-light [&>svg]:ml-1"
              href="https://tailwind-variants.org"
              underline="always"
            >
              Tailwind Variants
            </Link>
            , it simplifies component slots customization while avoiding Tailwind class conflicts.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CodeWindow
            showWindowIcons
            className="min-h-[300px] h-auto"
            language="jsx"
            title="custom-button.tsx"
            value={landingContent.customizationCode}
          />
          <div className="flex flex-col justify-center gap-6">
            <GradientBox
              isCentered
              className="h-full min-h-[320px] py-12 px-8"
              color="pink"
              to="top-right"
            >
              <CustomButton />
            </GradientBox>
          </div>
        </div>
        <div className="flex w-1/2 justify-start">
          <Button
            as={Link}
            className="max-w-fit bg-pink-100 text-pink-500 dark:bg-pink-900 dark:text-pink-300"
            href="/docs/theme/customize-theme"
            radius="full"
            size="sm"
            variant="flat"
          >
            Learn more
          </Button>
        </div>
      </div>
      {/* <div className="absolute hidden dark:block dark:opacity-80 -bottom-[10%] -left-[0%] -z-[1]">
        <Image removeWrapper alt="a11y background" className="h-full" src="/gradients/green.svg" />
      </div> */}
    </section>
  );
};
