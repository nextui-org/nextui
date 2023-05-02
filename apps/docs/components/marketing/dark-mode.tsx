/* eslint-disable react/display-name */
import {Button, Code} from "@nextui-org/react";
import Link from "next/link";

import {MusicPlayer} from "@/components/demos";
import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {ThemeSwitch} from "@/components/theme-switch";
import {CodeWindow} from "@/components/code-window";
import landingContent from "@/content/landing";

export const DarkMode = () => {
  return (
    <section className={sectionWrapper({class: "mt-44"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Dark mode</h1>
            <div>
              <h1 className={title({size: "lg"})}>is&nbsp;</h1>
              <h1 className={title({color: "yellow", size: "lg"})}>effortless.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            NextUI comes with a fully well-scaled default dark theme that you can apply to your
            application with just adding the <Code>dark</Code> attribute to your <Code>html</Code>.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-auto lg:h-[400px] bg-gradient-to-tr rounded-2xl flex py-12 px-8 items-center justify-center from-[#FFB457] to-[#FF705B]">
              <MusicPlayer />
              <ThemeSwitch
                classNames={{
                  base: "p-1.5 absolute top-2 right-2 bg-transparent rounded-xl",
                  wrapper: "!text-white/70 dark:!text-black/70",
                }}
              />
            </div>
            <Button
              as={Link}
              className="max-w-fit text-warning-300 bg-warning-50/50"
              color="warning"
              href="/docs/theme/customize-theme"
              radius="full"
              size="sm"
              variant="flat"
            >
              Learn more
            </Button>
          </div>
          <CodeWindow
            showWindowIcons
            className="h-[400px]"
            language="jsx"
            title="_app.tsx"
            value={landingContent.darkModeCode}
          />
        </div>
      </div>
      {/* <div className="absolute hidden dark:block dark:opacity-80 -bottom-[10%] -left-[0%] -z-[1]">
        <Image removeWrapper alt="a11y background" className="h-full" src="/gradients/green.svg" />
      </div> */}
    </section>
  );
};
