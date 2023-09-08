import {NewNextJSIcon} from "@/components/icons";
import {FeaturesGrid} from "@/components/marketing/features-grid";

const frameworks = [
  {
    title: "Next.js 13 (App) Template",
    isExternal: true,
    description:
      "A Next.js 13 with app directory template pre-configured with NextUI (v2) and Tailwind CSS.",
    icon: <NewNextJSIcon height={40} width={40} />,
    href: "https://github.com/nextui-org/next-app-template",
  },
  {
    title: "Next.js 13 (Pages) Template",
    isExternal: true,
    description:
      "A Next.js 13 with pages directory template pre-configured with NextUI (v2) and Tailwind CSS.",
    icon: <NewNextJSIcon height={40} width={40} />,
    href: "https://github.com/nextui-org/next-pages-template",
  },
];

export const NextJsTemplates = () => {
  return (
    <FeaturesGrid
      classNames={{
        base: "mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",
        iconWrapper: "bg-default-300/20",
        body: "py-0",
      }}
      features={frameworks}
    />
  );
};
