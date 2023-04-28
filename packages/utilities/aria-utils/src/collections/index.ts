import {CollectionBase} from "@react-types/shared";
import {ReactElement, ReactNode} from "react";

export interface CollectionProps<T> extends Omit<CollectionBase<T>, "children" | "items"> {
  items?: T[];
  /** The contents of the collection. */
  children?: ReactNode | ((item: T) => ReactElement);
}

export * from "./item";
