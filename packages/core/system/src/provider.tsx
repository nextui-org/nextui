import type {ModalProviderProps} from "@react-aria/overlays";

import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {OverlayProvider} from "@react-aria/overlays";

export interface NextUIProviderProps extends Omit<ModalProviderProps, "children"> {
  children: React.ReactNode;
  /**
   * The locale to apply to the children.
   * @default "en-US"
   */
  locale?: I18nProviderProps["locale"];
}

export const NextUIProvider: React.FC<NextUIProviderProps> = ({
  children,
  locale = "en-US",
  ...otherProps
}) => {
  return (
    <I18nProvider locale={locale}>
      <OverlayProvider {...otherProps}>{children}</OverlayProvider>
    </I18nProvider>
  );
};
