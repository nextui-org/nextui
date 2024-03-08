import type {ModalProviderProps} from "@react-aria/overlays";
import type {SupportedCalendars} from "./types";
import type {Calendar} from "@internationalized/date";

import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {RouterProvider} from "@react-aria/utils";
import {OverlayProvider} from "@react-aria/overlays";

import {ProviderContext} from "./provider-context";

export interface NextUIProviderProps extends Omit<ModalProviderProps, "children"> {
  children: React.ReactNode;
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: I18nProviderProps["locale"];
  /**
   * This function helps to reduce the bundle size by providing a custom calendar system.
   *
   * In the example above, the createCalendar function from the `@internationalized/date` package
   * is passed to the useCalendarState hook. This function receives a calendar identifier string,
   * and provides Calendar instances to React Stately, which are used to implement date manipulation.
   *
   * By default, this includes all calendar systems supported by @internationalized/date. However,
   * if your application supports a more limited set of regions, or you know you will only be picking dates
   * in a certain calendar system, you can reduce your bundle size by providing your own implementation
   * of `createCalendar` that includes a subset of these Calendar implementations.
   *
   * For example, if your application only supports Gregorian dates, you could implement a `createCalendar`
   * function like this:
   *
   * @example
   *
   * import {GregorianCalendar} from '@internationalized/date';
   *
   * function createCalendar(identifier) {
   *  switch (identifier) {
   *    case 'gregory':
   *      return new GregorianCalendar();
   *    default:
   *      throw new Error(`Unsupported calendar ${identifier}`);
   *  }
   * }
   *
   * This way, only GregorianCalendar is imported, and the other calendar implementations can be tree-shaken.
   *
   * @default all calendars
   */
  createCalendar?: (calendar: SupportedCalendars) => Calendar | null;
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
  createCalendar,
  ...otherProps
}) => {
  let contents = children;

  if (navigate) {
    contents = <RouterProvider navigate={navigate}>{contents}</RouterProvider>;
  }

  return (
    <ProviderContext value={{createCalendar}}>
      <I18nProvider locale={locale}>
        <OverlayProvider {...otherProps}>{contents}</OverlayProvider>
      </I18nProvider>
    </ProviderContext>
  );
};
