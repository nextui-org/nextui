/* eslint-disable react/display-name */
import {
  Button,
  Link as NextUILink,
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {motion, useInView} from "framer-motion";
import {TRANSITION_EASINGS} from "@nextui-org/framer-transitions";
import {clsx} from "@nextui-org/shared-utils";
import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from "@nextui-org/shared-icons";
import Link from "next/link";
import {useRef} from "react";

import {FeaturesGrid} from "../features-grid";

import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {IconSvgProps} from "@/types";

const a11yItems = [
  "Keyboard navigation",
  "Managed focus",
  "Collision aware",
  "Alignment control",
  "Screen reader support",
  "Typehead support",
];

const MotionTickBoldIcon = ({
  size = 24,
  delay = 0,
  width,
  height,
}: IconSvgProps & {
  delay?: number;
}) => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, {
    margin: "10px",
    once: true,
  });

  const variants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: delay,
        easing: TRANSITION_EASINGS.spring,
      },
    },
    hidden: {
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <motion.svg
      ref={ref as any}
      animate={isInView ? "visible" : "hidden"}
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      initial={false}
      role="presentation"
      variants={variants}
      viewBox="0 0 24 24"
      width={size || width}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </motion.svg>
  );
};

const iconClasses = "text-2xl text-neutral-500 pointer-events-none flex-shrink-0";

export const A11yOtb = () => {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, {
    margin: "-10px",
  });

  return (
    <section className={sectionWrapper({class: "pb-56"})}>
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
          <div className="flex flex-col mt-8 gap-6">
            <FeaturesGrid
              classNames={{
                base: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",
                header: "pb-3",
                iconWrapper: "bg-neutral-100 text-neutral-400",
              }}
              features={a11yItems.map((item, index) => ({
                title: item,
                icon: <MotionTickBoldIcon delay={index * 0.2} />,
              }))}
            />
            <Button
              as={Link}
              className="max-w-fit text-neutral-600"
              color="neutral"
              href="/docs/theme/customize-theme"
              radius="full"
              size="sm"
              variant="flat"
            >
              Learn more
            </Button>
          </div>
          <div
            ref={ref}
            className="w-full h-full min-h-[390px] bg-gradient-to-r rounded-xl flex pt-8 items-start justify-center from-[#4ADE80] to-[#06B6D4]"
          >
            {isInView && (
              <Dropdown isOpen className="shadow-xl" placement="bottom" shouldFlip={false}>
                <DropdownTrigger>
                  <Button color="success" variant="flat">
                    Actions
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Actions"
                  closeOnSelect={false}
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
          </div>
        </div>
      </div>
    </section>
  );
};
