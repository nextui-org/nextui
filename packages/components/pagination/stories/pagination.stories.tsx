import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {button, pagination, cn} from "@nextui-org/theme";
import {ChevronIcon} from "@nextui-org/shared-icons";

import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
  PaginationProps,
  usePagination,
} from "../src";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    page: {
      control: {
        type: "number",
      },
    },
    siblings: {
      control: {
        type: "number",
      },
    },
    boundaries: {
      control: {
        type: "number",
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["flat", "bordered", "light", "faded"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["neutral", "primary", "secondary", "success", "warning", "danger"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["none", "base", "sm", "md", "lg", "xl", "full"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
    showShadow: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Pagination>;

const defaultProps = {
  ...pagination.defaultVariants,
  total: 10,
  siblings: 1,
  boundaries: 1,
  initialPage: 1,
};

const Template: ComponentStory<typeof Pagination> = (args: PaginationProps) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithControls = Template.bind({});
WithControls.args = {
  ...defaultProps,
  showControls: true,
};

export const PaginationLoop = Template.bind({});
PaginationLoop.args = {
  ...defaultProps,
  showControls: true,
  loop: true,
};

export const InitialPage = Template.bind({});
InitialPage.args = {
  ...defaultProps,
  initialPage: 3,
};

export const IsCompact = Template.bind({});
IsCompact.args = {
  ...defaultProps,
  showControls: true,
  isCompact: true,
};

export const Controlled = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex flex-col gap-5">
      <p>Page: {currentPage}</p>
      <Pagination
        {...defaultProps}
        showShadow
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-2">
        <button
          className={button({color: "secondary", size: "sm", variant: "flat"})}
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </button>
        <button
          className={button({color: "secondary", size: "sm", variant: "flat"})}
          onClick={() => setCurrentPage((prev) => (prev < defaultProps.total ? prev + 1 : prev))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const CustomItems = () => {
  const renderItem = ({
    ref,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps<HTMLButtonElement>) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button className={cn(className, "bg-neutral-200")} onClick={onNext}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button className={cn(className, "bg-neutral-200")} onClick={onPrevious}>
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button className={className}>...</button>;
    }

    return (
      <button
        ref={ref}
        className={cn(
          className,
          isActive &&
            "bg-gradient-to-b shadow-lg from-neutral-500 to-neutral-800 dark:from-neutral-300 dark:to-neutral-100 text-white font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      {...defaultProps}
      disableCursor
      showControls
      className="gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
};

export const CustomWithStyles = Template.bind({});
CustomWithStyles.args = {
  ...defaultProps,
  showShadow: true,
  styles: {
    base: "gap-0 rounded border-1 border-neutral",
    item: "rounded-none bg-transparent",
    cursor: "rounded-sm",
  },
};

export const CustomWithHooks = () => {
  const {activePage, range, setPage, onNext, onPrevious} = usePagination({
    ...defaultProps,
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      <p>Active page: {activePage}</p>
      <ul className="flex gap-2">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page">
                <button className="w-5 h-5 bg-neutral-200 rounded-full" onClick={onNext}>
                  <ChevronIcon className="rotate-180" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page">
                <button className="w-5 h-5 bg-neutral-200 rounded-full" onClick={onPrevious}>
                  <ChevronIcon />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return <li key={page}>...</li>;
          }

          return (
            <li key={page} aria-label={`page ${page}`}>
              <button
                className={cn(
                  "w-4 h-4 bg-neutral-400  rounded-full",
                  activePage === page && "bg-secondary",
                )}
                onClick={() => setPage(page)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
