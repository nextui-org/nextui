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

const App = `import {usePagination, PaginationItemType} from "@nextui-org/react";
import {ChevronIcon} from "./ChevronIcon";

export default function App() {
  const {activePage, range, setPage, onNext, onPrevious} = usePagination({
    total: 6,
    showControls: true,
    siblings: 10,
    boundaries: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      <p>Active page: {activePage}</p>
      <ul className="flex gap-2 items-center">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onNext}
                >
                  <ChevronIcon className="rotate-180" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onPrevious}
                >
                  <ChevronIcon />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li key={page} className="w-4 h-4">
                ...
              </li>
            );
          }

          return (
            <li key={page} aria-label={\`page \${page}\`} className="w-4 h-4">
              <button
                className={cn(
                  "w-full h-full bg-default-300 rounded-full",
                  activePage === page && "bg-secondary"
                )}
                onClick={() => setPage(page)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
  "/ChevronIcon.jsx": ChevronIcon,
};

export default {
  ...react,
};
