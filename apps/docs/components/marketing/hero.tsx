import {
  Button,
  Input,
  Tooltip,
  Image,
  CardFooter,
  Card,
  CardBody,
  Switch,
  Spinner,
  Pagination,
  Tabs,
  TabItem,
} from "@nextui-org/react";
import {clsx} from "@nextui-org/shared-utils";
import {ArrowRightIcon, MoonFilledIcon, SunFilledIcon} from "@nextui-org/shared-icons";
import {useTheme} from "next-themes";
import {useInView} from "framer-motion";
import {useRef} from "react";

import {useMediaQuery} from "@/hooks/use-media-query";
import {title, subtitle} from "@/components/primitives";
import {NextUILogo} from "@/components";
import {GithubIcon} from "@/components/icons";
import {UserTwitterCard} from "@/components/demos";
import useIsMounted from "@/hooks/use-is-mounted";

const FloatingComponents: React.FC<{mounted: boolean}> = ({mounted}) => {
  const {theme, setTheme} = useTheme();

  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "280px",
  });

  const isSelected = theme === "dark" && mounted;

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div ref={ref} className="hidden lg:flex flex-col relative  w-1/2">
      {!isInView ? null : (
        <>
          <Switch
            classNames={{
              base:
                "absolute -top-[220px] -right-[40px] animate-[levitate_13s_ease_infinite_1s_reverse]",
              wrapper: "shadow-sm",
              startIcon: "text-white",
            }}
            endIcon={<MoonFilledIcon />}
            isSelected={isSelected}
            size="xl"
            startIcon={<SunFilledIcon />}
            onChange={onChange}
          />

          <Input
            className="absolute -top-[130px] -right-[120px] animate-[levitate_10s_ease_infinite] w-[200px]"
            color="secondary"
            defaultValue="NextUI"
            label="Input"
            labelPosition="outside"
            radius="xl"
            variant="bordered"
            onClear={() => {}}
          />

          <Card
            isFooterBlurred
            className="absolute -top-[260px] right-[100px] h-[120px] animate-[levitate_12s_ease_infinite_1s] z-0 max-w-fit"
            radius="2xl"
          >
            <Image
              alt="Professional camera"
              className="object-cover -translate-y-12 h-[100%]"
              src="/images/card-example-6.jpeg"
              width={120}
            />
            <CardFooter className="before:bg-black/10 before:border before:border-white/20 overflow-hidden justify-between py-2 absolute before:rounded-xl rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
              <p className="text-xs font-semibold text-white/80">Camera</p>
              <p className="text-xs font-semibold text-white/80">$525</p>
            </CardFooter>
          </Card>

          <Tabs
            aria-label="Floating tabs example"
            className=""
            classNames={{
              base:
                "absolute left-[170px] -top-[160px] h-10 animate-[levitate_17s_ease_infinite_1s]",
              tabList: "max-w-[200px] bg-content1 shadow-sm",
            }}
            radius="full"
            size="xs"
          >
            <TabItem key="notes" title="Notes" />
            <TabItem key="tasks" title="Tasks" />
            <TabItem key="files" title="Files" />
          </Tabs>

          <UserTwitterCard className="absolute left-[80px] -top-[80px] animate-[levitate_16s_ease_infinite] border-none" />

          <Card className="absolute right-[110px] -top-[60px] animate-[levitate_18s_ease_infinite] shadow-lg z-10 max-w-fit border-none">
            <CardBody>
              <NextUILogo small size={60} />
            </CardBody>
          </Card>

          <div className="absolute z-10 -top-[40px] -right-[230px] animate-[levitate_14s_ease_infinite_1s]">
            <Pagination
              isCompact
              showControls
              showShadow
              classNames={{
                base: "shadow-sm rounded-xl",
                item: "bg-background dark:bg-content1",
                prev: "bg-background dark:bg-content1",
                next: "bg-background dark:bg-content1",
              }}
              initialPage={6}
              total={10}
            />
          </div>

          <Tooltip
            isOpen
            showArrow
            className="text-sm animate-[levitate_14s_ease_infinite]"
            color="secondary"
            content="Developers love Next.js"
            placement="top"
          >
            <Button
              className="absolute left-[200px] top-[160px] max-w-fit animate-[levitate_14s_ease_infinite_0.5s]"
              color="secondary"
              size="sm"
              variant="flat"
            >
              Tooltip
            </Button>
          </Tooltip>

          <Card className="absolute right-[10px] top-[30px] animate-[levitate_16s_ease_infinite] shadow-lg z-10 max-w-fit border-none">
            <CardBody>
              <Spinner color="secondary" size="xl" />
            </CardBody>
          </Card>

          <Card
            isFooterBlurred
            className="absolute right-[60px] top-[100px] animate-[levitate_12s_ease_infinite_1s] z-0 max-w-fit"
            radius="2xl"
          >
            <Image
              alt="Woman listing to music"
              className="object-cover"
              height={200}
              src="/images/hero-card.jpeg"
              width={200}
            />
            <CardFooter className="before:bg-white/10 overflow-hidden justify-between py-2 absolute before:rounded-xl rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
              <p className="text-xs text-white/80">Available soon.</p>
              <Button color="secondary" radius="full" size="xs" variant="flat">
                Notify me
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export const Hero = () => {
  const isTablet = useMediaQuery(1024);

  const isMounted = useIsMounted();

  return (
    <section className="flex relative w-full flex-nowrap justify-between items-center h-[calc(100dvh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      <div className="flex flex-col gap-6 w-full lg:w-1/2 xl:mt-10">
        <div>
          <h1 className={title()}>Make&nbsp;</h1>
          <h1 className={title({color: "violet"})}>beautiful&nbsp;</h1>
          <h1 className={title()}>websites regardless of your design experience.</h1>
        </div>
        <h4 className={subtitle({fullWidth: true})}>
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

      {!isTablet && <FloatingComponents mounted={isMounted} />}

      <div
        className={clsx(
          "absolute -top-20 lg:top-10 w-screen h-screen -z-50 opacity-0",
          "data-[mounted=true]:opacity-100 transition-opacity",
          "bg-left bg-no-repeat bg-[url('/gradients/looper-pattern.svg')]",
          "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-[-1]",
          isTablet
            ? "after:bg-gradient-to-l after:from-transparent after:to-white dark:after:to-black"
            : "after:bg-gradient-to-r after:from-transparent after:to-white dark:after:to-black after:z-[-1]",
        )}
        data-mounted={isMounted}
      />
    </section>
  );
};
