import {NewNextJSIcon, ViteIcon, RemixIcon, AstroIcon} from "@/components/icons";
import {FeaturesGrid} from "@/components/marketing/features-grid";

const frameworks = [
  {
    title: "Next.js",
    icon: <NewNextJSIcon height={40} width={40} />,
    href: "/docs/frameworks/nextjs",
  },
  {
    title: "Vite",
    icon: <ViteIcon height={40} width={40} />,
    href: "/docs/frameworks/vite",
  },
  {
    title: "Remix",
    icon: <RemixIcon className="text-foreground" height={40} width={40} />,
    href: "/docs/frameworks/remix",
  },
  {
    title: "Astro",
    icon: <AstroIcon className="text-foreground" height={40} width={40} />,
    href: "/docs/frameworks/astro",
  },
];

export const Frameworks = () => {
  return (
    <FeaturesGrid
      classNames={{
        base: "mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4",
        header: "pb-3",
        iconWrapper: "bg-default-300/20",
      }}
      features={frameworks}
    />
  );
};
