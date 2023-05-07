import {FC} from "react";

import {Route} from "@/libs/docs/page";
import {MetaProps} from "@/libs/docs/meta";

export interface DocsTocProps {
  routes: Route[];
  currentRoute?: Route;
  meta?: MetaProps;
}

export const DocsToc: FC<DocsTocProps> = ({}) => {
  return <div>Content</div>;
};
