import {I18nProvider, I18nProviderProps} from "@react-aria/i18n";
import {OverlayProvider} from "@react-aria/overlays";

export interface NextUIProviderProps {
  children: React.ReactNode;
  locale?: I18nProviderProps["locale"];
}

export const NextUIProvider: React.FC<NextUIProviderProps> = ({children, locale = "en"}) => {
  return (
    <I18nProvider locale={locale}>
      <OverlayProvider>{children}</OverlayProvider>
    </I18nProvider>
  );
};
