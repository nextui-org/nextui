import {Calendar} from "@heroui/react";
import {I18nProvider} from "@react-aria/i18n";

export default function App() {
  return (
    <I18nProvider locale="zh-CN-u-ca-chinese">
      <Calendar aria-label="Date (International Calendar)" />
    </I18nProvider>
  );
}
