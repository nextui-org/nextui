/* eslint-disable react/display-name */
import {
  Button,
  Image,
  Link as NextUILink,
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {useInView} from "framer-motion";
import {clsx} from "@nextui-org/shared-utils";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@nextui-org/shared-icons";
import Link from "next/link";
import {useRef} from "react";

import {FeaturesGrid} from "./features-grid";

import {GradientBox} from "@/components";
import {
  KeyboardBoldIcon,
  MouseCircleBoldIcon,
  SquaresBoldIcon,
  FatrowsBoldIcon,
  EyeBoldIcon,
  KeyboardOpenBoldIcon,
} from "@/components/icons";
import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {useIsMobile} from "@/hooks/use-media-query";

const a11yItems = [
  {
    title: "Keyboard navigation",
    icon: <KeyboardBoldIcon />,
  },
  {
    title: "Managed focus",
    icon: <MouseCircleBoldIcon />,
  },
  {
    title: "Collision aware",
    icon: <SquaresBoldIcon />,
  },
  {
    title: "Alignment control",
    icon: <FatrowsBoldIcon />,
  },
  {
    title: "Screen reader support",
    icon: <EyeBoldIcon />,
  },
  {
    title: "Typehead support",
    icon: <KeyboardOpenBoldIcon />,
  },
];

const iconClasses = "text-2xl text-neutral-500 pointer-events-none flex-shrink-0";

export const A11yOtb = () => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, {
    margin: "-10px",
  });

  const isMobile = useIsMobile();

  return (
    <section className={sectionWrapper({class: "mt-44"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Accessibility</h1>
            <div>
              <h1 className={title({color: "green", size: "lg"})}>out of the&nbsp;</h1>
              <h1 className={title({size: "lg"})}>box.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            NextUI components are built on top of&nbsp;
            <NextUILink
              isExternal
              className="text-xl text-neutral-500 font-light [&>svg]:ml-1"
              href="https://react-spectrum.adobe.com/react-aria/"
              underline="always"
            >
              React Aria
            </NextUILink>
            &nbsp;ensuring exceptional accessibility support as a top priority.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col mt-16 gap-6">
            <FeaturesGrid
              classNames={{
                base: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",
                header: "pb-3",
                iconWrapper: "bg-neutral-100 dark:bg-transparent text-neutral-500/50",
              }}
              features={a11yItems}
            />
            <Button
              as={Link}
              className="max-w-fit"
              color="success"
              href="/docs/theme/customize-theme"
              radius="full"
              size="sm"
              variant="flat"
            >
              Learn more
            </Button>
          </div>
          <GradientBox
            ref={ref}
            className="h-full min-h-[200px] lg:min-h-[390px] lg:pt-8 items-center lg:items-start justify-center"
            color="green"
            to="right"
          >
            {isInView && ref.current && (
              <Dropdown
                defaultOpen
                className="shadow-xl"
                placement="bottom"
                portalContainer={ref.current}
                shouldBlockScroll={isMobile}
                shouldFlip={isMobile}
              >
                <DropdownTrigger>
                  <Button color="success" variant="flat">
                    {isMobile ? "Click me" : "Actions"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Actions"
                  closeOnSelect={true}
                  color="neutral"
                  variant="flat"
                >
                  <DropdownSection title="Actions">
                    <DropdownItem
                      key="new"
                      description="Create a new file"
                      shortcut="⌘N"
                      startContent={<AddNoteBulkIcon className={iconClasses} />}
                    >
                      New file
                    </DropdownItem>
                    <DropdownItem
                      key="copy"
                      description="Copy the file link"
                      shortcut="⌘C"
                      startContent={<CopyDocumentBulkIcon className={iconClasses} />}
                    >
                      Copy link
                    </DropdownItem>
                    <DropdownItem
                      key="edit"
                      description="Allows you to edit the file"
                      shortcut="⌘⇧E"
                      startContent={<EditDocumentBulkIcon className={iconClasses} />}
                    >
                      Edit file
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection title="Danger zone">
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      description="Permanently delete the file"
                      shortcut="⌘⇧D"
                      startContent={
                        <DeleteDocumentBulkIcon className={clsx(iconClasses, "!text-danger")} />
                      }
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            )}
          </GradientBox>
        </div>
      </div>
      <div className="absolute hidden dark:block dark:opacity-80 -bottom-[10%] -left-[0%] -z-[1]">
        <Image removeWrapper alt="a11y background" className="h-full" src="/gradients/green.svg" />
      </div>
    </section>
  );
};
