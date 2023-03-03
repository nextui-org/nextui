import React, {ReactNode} from "react";
import {SSRProvider} from "@react-aria/ssr";

export interface NextUIProviderProps {
  children?: ReactNode;
}

export const NextUIProvider: React.FC<NextUIProviderProps> = ({children}) => {
  return <SSRProvider>{children}</SSRProvider>;
};
