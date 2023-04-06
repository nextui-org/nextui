import {SSRProvider} from "@react-aria/ssr";
import {OverlayProvider} from "@react-aria/overlays";

export interface NextUIProviderProps {
  children: React.ReactNode;
}

export const NextUIProvider: React.FC<NextUIProviderProps> = ({children}) => {
  return (
    <SSRProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </SSRProvider>
  );
};
