const App = `import {Calendar} from "@nextui-org/react";
import {I18nProvider} from "@react-aria/i18n";

export default function App() {
  return (
    <I18nProvider locale="zh-CN-u-ca-chinese">
      <Calendar aria-label="Date (International Calendar)" />
    </I18nProvider>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
