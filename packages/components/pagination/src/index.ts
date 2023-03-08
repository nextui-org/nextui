import Pagination from "./pagination";
import PaginationItem from "./pagination-item";

// export types
export type {PaginationProps} from "./pagination";
export type {PaginationItemRenderProps} from "./use-pagination";
export type {PaginationItemProps} from "./pagination-item";
export type {DOTS as PAGINATION_DOTS} from "@nextui-org/use-pagination";

// export hooks
export {usePagination} from "./use-pagination";
export {usePaginationItem} from "./use-pagination-item";

// export component
export {Pagination, PaginationItem};
