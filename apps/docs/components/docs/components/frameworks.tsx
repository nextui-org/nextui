import {NewNextJSIcon, ViteIcon, RemixIcon, AstroIcon} from "@/components/icons";
import {FeaturesGrid} from "@/components/marketing/features-grid";

const frameworks = [
  {
    title: "Next.js",
    description: "Full-featured React framework with great developer experience.",
    icon: <NewNextJSIcon height={40} width={40} />,
    href: "/docs/frameworks/nextjs",
  },
  {
    title: "Vite",
    description: "Fast and modern development server and build tool.",
    icon: <ViteIcon height={40} width={40} />,
    href: "/docs/frameworks/vite",
  },
  {
    title: "Remix",
    description: "Full stack framework focused on web fundamentals and modern UX.",
    icon: <RemixIcon className="text-foreground" height={40} width={40} />,
    href: "/docs/frameworks/remix",
  },
  {
    title: "Astro",
    description: "The all-in-one web framework designed for speed.",
    icon: <AstroIcon className="text-foreground" height={40} width={40} />,
    href: "/docs/frameworks/astro",
  },
];

export const Frameworks = () => {
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
