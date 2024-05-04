import type {ModalProviderProps} from "@react-aria/overlays";
import type {ProviderContextProps} from "./provider-context";
import type {Href} from "@react-types/shared";

import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {RouterProvider} from "@react-aria/utils";
import {OverlayProvider} from "@react-aria/overlays";
import {useMemo} from "react";
import {CalendarDate} from "@internationalized/date";

import {ProviderContext} from "./provider-context";

export interface NextUIProviderProps
  extends Omit<ModalProviderProps, "children">,
    ProviderContextProps {
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
  /**
   * Convert an `href` provided to a link component to a native `href`
   * For example, a router might accept hrefs relative to a base path,
   * or offer additional custom ways of specifying link destinations.
   * The original href specified on the link is passed to the navigate function of the RouterProvider,
   * and useHref is used to generate the full native href to put on the actual DOM element.
   */
  useHref?: (href: Href) => string;
}

export const NextUIProvider: React.FC<NextUIProviderProps> = ({
  children,
  navigate,
  useHref,
  locale = "en-US",
  defaultDates = {
    minDate: new CalendarDate(1900, 1, 1),
    maxDate: new CalendarDate(2099, 12, 31),
  },
  createCalendar,
  ...otherProps
}) => {
  let contents = children;

  if (navigate) {
    contents = (
      <RouterProvider navigate={navigate} useHref={useHref}>
        {contents}
      </RouterProvider>
    );
  }

  const context = useMemo<ProviderContextProps>(
    () => ({createCalendar, defaultDates}),
    [createCalendar, defaultDates?.maxDate, defaultDates?.minDate],
  );

  return (
    <ProviderContext value={context}>
      <I18nProvider locale={locale}>
        <OverlayProvider {...otherProps}>{contents}</OverlayProvider>
      </I18nProvider>
    </ProviderContext>
  );
};
