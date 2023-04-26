import {useState, useEffect} from "react";
import {
  Button,
  Input,
  Tooltip,
  Card,
  Image,
  CardFooter,
  CardBody,
  Switch,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import {ArrowRightIcon, MoonFilledIcon, SunFilledIcon} from "@nextui-org/shared-icons";
import {useTheme} from "next-themes";
import dynamic from "next/dynamic";

import {GithubIcon} from "@/components/icons";
import {UserTwitterCard} from "@/components/demos";

const DynamicLopperBG = dynamic(() => import("./looper-bg").then((mod) => mod.LooperBg), {
  ssr: true,
});

const FloatingComponents: React.FC = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  const isSelected = theme === "dark" && mounted;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        className="w-[200px]"
        color="secondary"
        defaultValue="NextUI"
        label="Input"
        labelPosition="outside"
        radius="xl"
        variant="bordered"
        onClear={() => {}}
      />

      <Switch
        classNames={{
          startIcon: "text-white",
        }}
        endIcon={<MoonFilledIcon />}
        isSelected={isSelected}
        size="xl"
        startIcon={<SunFilledIcon />}
        onChange={onChange}
      />

      <UserTwitterCard />

      <Tooltip
        isOpen
        showArrow
        className="text-sm"
        color="secondary"
        content="Developers love Next.js"
        placement="top"
      >
        <Button className="max-w-fit" color="secondary" size="sm" variant="flat">
          Tooltip
        </Button>
      </Tooltip>

      <Card isFooterBlurred className="max-w-fit" radius="2xl">
        <Image className="object-cover" height={400} src="/images/hero-card.png" />
        <CardFooter className="bg-white/10 justify-between py-2 rounded-none absolute -bottom-0.5 z-10">
          <p className="text-xs text-white/80">Available soon.</p>
          <Button color="secondary" radius="full" size="xs" variant="flat">
            Notify me
          </Button>
        </CardFooter>
      </Card>

      <Card className="max-w-fit border-none">
        <CardBody>
          <Spinner color="secondary" size="xl" />
        </CardBody>
      </Card>

      <Pagination isCompact showControls showShadow initialPage={6} total={10} />
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="flex relative w-full flex-nowrap justify-between items-center h-[calc(84vh_-_64px)]">
      <div className="flex flex-col gap-6 w-2/3">
        <div>
          <h1 className="text-6xl tracking-tight inline font-semibold">Make&nbsp;</h1>
          <h1 className="text-6xl tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]">
            beautiful&nbsp;
          </h1>
          <h1 className="text-6xl tracking-tight inline font-semibold">
            websites regardless of your design experience.
          </h1>
        </div>
        <h4 className="font-normal text-xl text-neutral-500">
          Beautiful, fast and modern React UI library.
        </h4>
        <div className="flex items-center gap-4">
          <Button
            color="primary"
            endIcon={
              <ArrowRightIcon
                className="group-data-[hover=true]:translate-x-0.5 transition-transform"
                strokeWidth={2}
              />
            }
            radius="full"
            size="lg"
          >
            Get Started
          </Button>
          <Button radius="full" size="lg" startIcon={<GithubIcon />} variant="bordered">
            Github
          </Button>
        </div>
      </div>
      <div>
        <FloatingComponents />
      </div>
      <DynamicLopperBG className="absolute top-0 -z-50" />
    </section>
  );
};
