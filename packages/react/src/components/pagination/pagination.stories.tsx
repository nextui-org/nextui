import type {PaginationProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Separator} from "../separator";

import {Pagination} from "./index";

export default {
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  title: "Components/Navigation/Pagination",
} as Meta<typeof Pagination>;

const defaultArgs: PaginationProps = {
  children: null,
};

/* -------------------------------------------------------------------------------------------------
 * Default
 * -----------------------------------------------------------------------------------------------*/
const DefaultTemplate = (props: PaginationProps) => (
  <Pagination {...props}>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous>
          <Pagination.PreviousIcon />
          <span>Previous</span>
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link isActive>1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>2</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>3</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next>
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
);

export const Default = {
  args: defaultArgs,
  render: DefaultTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * Sizes
 * -----------------------------------------------------------------------------------------------*/
const SizesTemplate = (props: PaginationProps) => {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex flex-col gap-8">
      {sizes.map((size, index) => (
        <React.Fragment key={size}>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-muted capitalize">{size}</span>
            <Pagination {...props} aria-label={`${size} pagination`} size={size}>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous>
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Link isActive>1</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Link>2</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Link>3</Pagination.Link>
                </Pagination.Item>
                <Pagination.Item>
                  <Pagination.Next>
                    <span>Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
          {index < sizes.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Sizes = {
  args: defaultArgs,
  render: SizesTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * With Ellipsis
 * -----------------------------------------------------------------------------------------------*/
const WithEllipsisTemplate = (props: PaginationProps) => (
  <Pagination {...props}>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous>
          <Pagination.PreviousIcon />
          <span>Previous</span>
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link isActive>1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>2</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>3</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>10</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>11</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>12</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next>
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
);

export const WithEllipsis = {
  args: defaultArgs,
  render: WithEllipsisTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * Simple (Prev / Next only)
 * -----------------------------------------------------------------------------------------------*/
const SimplePrevNextTemplate = (props: PaginationProps) => (
  <Pagination {...props}>
    <Pagination.Summary>1 to 5 of 10 invoices</Pagination.Summary>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous>
          <Pagination.PreviousIcon />
          <span>Prev</span>
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next>
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
);

export const SimplePrevNext = {
  args: defaultArgs,
  render: SimplePrevNextTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * With Summary
 * -----------------------------------------------------------------------------------------------*/
const WithSummaryTemplate = (props: PaginationProps) => (
  <div className="w-full min-w-[640px]">
    <Pagination {...props}>
      <Pagination.Summary>Showing 1-10 of 120 results</Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>10</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>11</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link>12</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  </div>
);

export const WithSummary = {
  args: defaultArgs,
  render: WithSummaryTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * Custom Icons
 * -----------------------------------------------------------------------------------------------*/
const CustomIconsTemplate = (props: PaginationProps) => (
  <Pagination {...props}>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous>
          <Pagination.PreviousIcon>
            <Icon icon="gravity-ui:arrow-left" />
          </Pagination.PreviousIcon>
          <span>Back</span>
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link isActive>1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>2</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>3</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next>
          <span>Forward</span>
          <Pagination.NextIcon>
            <Icon icon="gravity-ui:arrow-right" />
          </Pagination.NextIcon>
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
);

export const CustomIcons = {
  args: defaultArgs,
  render: CustomIconsTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * Controlled (with state management)
 * -----------------------------------------------------------------------------------------------*/
const ControlledTemplate = (props: PaginationProps) => {
  const [page, setPage] = React.useState(1);
  const totalPages = 12;
  const itemsPerPage = 10;
  const totalItems = 120;

  const getPageNumbers = () => {
    const pages: (number | "start-ellipsis" | "end-ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("start-ellipsis");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("end-ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="w-full min-w-[640px]">
      <Pagination {...props}>
        <Pagination.Summary>
          Showing {startItem}-{endItem} of {totalItems} results
        </Pagination.Summary>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>
          {getPageNumbers().map((p) =>
            p === "start-ellipsis" || p === "end-ellipsis" ? (
              <Pagination.Item key={p}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ),
          )}
          <Pagination.Item>
            <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};

export const Controlled = {
  args: defaultArgs,
  render: ControlledTemplate,
};

/* -------------------------------------------------------------------------------------------------
 * Disabled
 * -----------------------------------------------------------------------------------------------*/
const DisabledTemplate = (props: PaginationProps) => (
  <Pagination {...props}>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous isDisabled>
          <Pagination.PreviousIcon />
          <span>Previous</span>
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link isActive>1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>2</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link>3</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next>
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
);

export const Disabled = {
  args: defaultArgs,
  render: DisabledTemplate,
};
