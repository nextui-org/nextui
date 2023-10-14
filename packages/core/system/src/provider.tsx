import type {ModalProviderProps} from "@react-aria/overlays";

import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
// @ts-ignore - react-aria issue: https://github.com/adobe/react-spectrum/issues/5194
import {RouterProvider} from "@react-aria/utils";
import {OverlayProvider} from "@react-aria/overlays";

export interface NextUIProviderProps extends Omit<ModalProviderProps, "children"> {
  children: React.ReactNode;
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: I18nProviderProps["locale"];
  /**
   * Provides a client side router to all nested components such as
   * Link, Menu, Tabs, Table, etc.
   */
  navigate?: (path: string) => void;
}

export const NextUIProvider: React.FC<NextUIProviderProps> = ({
  children,
  locale = "en-US",
  navigate,
  ...otherProps
}) => {
  let contents = children;

  if (navigate) {
    contents = <RouterProvider navigate={navigate}>{contents}</RouterProvider>;
  }

  return (
    <I18nProvider locale={locale}>
      <OverlayProvider {...otherProps}>{contents}</OverlayProvider>
    </I18nProvider>
  );
};
