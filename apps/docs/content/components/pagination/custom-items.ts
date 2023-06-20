const ChevronIcon = `export const ChevronIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M15.5 19l-7-7 7-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
`;

const ChevronIconTs = `import {SVGProps} from "react";

type IconSvgProps = SVGProps<SVGSVGElement>;

export const ChevronIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M15.5 19l-7-7 7-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
`;

const AppTs = `import {Pagination, PaginationItemType, PaginationItemRenderProps} from "@nextui-org/react";
import {ChevronIcon} from "./ChevronIcon";

export default function App() {
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
        <button className={cn(className, "bg-default-200/50 w-8 h-8")} onClick={onNext}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button className={cn(className, "bg-default-200/50 w-8 h-8")} onClick={onPrevious}>
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button className={className}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        className={cn(
          className,
          isActive &&
            "bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30 shadow-lg font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursor
      showControls
      total={10}
      initialPage={1}
      className="gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
}`;

const App = `import {Pagination, PaginationItemType} from "@nextui-org/react";
import {ChevronIcon} from "./ChevronIcon";

export default function App() {
  const renderItem = ({
    ref,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button className={cn(className, "bg-default-200/50 w-8 h-8")} onClick={onNext}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button className={cn(className, "bg-default-200/50 w-8 h-8")} onClick={onPrevious}>
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button className={className}>...</button>;
    }

    // cursor is the default item
    return (
      <button
        ref={ref}
        className={cn(
          className,
          isActive &&
          "bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30 shadow-lg font-bold",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursor
      showControls
      total={10}
      initialPage={1}
      className="gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
}`;

const react = {
  "/App.jsx": App,
  "/ChevronIcon.jsx": ChevronIcon,
};

const reactTs = {
  "/App.tsx": AppTs,
  "/ChevronIcon.tsx": ChevronIconTs,
};

export default {
  ...react,
  ...reactTs,
};
