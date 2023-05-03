/* eslint-disable react/display-name */
import {Code, Button, Link} from "@nextui-org/react";

import {MusicPlayer} from "@/components/demos";
import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {ThemeSwitch} from "@/components/theme-switch";
import {CodeWindow} from "@/components/code-window";
import landingContent from "@/content/landing";
import {GradientBox} from "@/components";

export const DarkMode = () => {
  return (
    <section className={sectionWrapper({class: "mt-16 lg:mt-44"})}>
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
          <div className="flex flex-col justify-center gap-6">
            <GradientBox isCentered className="py-12 px-4 lg:px-8" color="orange" to="top-right">
              <MusicPlayer />
              <ThemeSwitch
                classNames={{
                  base: "p-1.5 absolute top-2 right-2 bg-transparent rounded-xl",
                  wrapper: "!text-white/70 dark:!text-black/70",
                }}
              />
            </GradientBox>
          </div>
          <CodeWindow
            showWindowIcons
            className="min-h-[340px] h-auto"
            highlightLines="7-9"
            language="jsx"
            title="_app.tsx"
            value={landingContent.darkModeCode}
          />
        </div>
        <div className="flex w-1/2 justify-start">
          <Button
            as={Link}
            className="max-w-fit"
            color="warning"
            href="/docs/theme/customize-theme"
            radius="full"
            size="sm"
            variant="flat"
          >
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
};
