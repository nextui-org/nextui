import {
  Button,
  Tooltip,
  Input,
  Image,
  Card,
  CardBody,
  CardFooter,
  Switch,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import {MoonFilledIcon, SunFilledIcon} from "@nextui-org/shared-icons";
import {useTheme} from "next-themes";
import NextImage from "next/image";

import {FloatingTabs} from "./floating-tabs";

import {UserTwitterCard} from "@/components/demos/user-twitter-card";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {useMediaQuery} from "@/hooks/use-media-query";
import {NextUILogo} from "@/components/nextui-logo";

export const FloatingComponents: React.FC<{}> = () => {
  const {theme, setTheme} = useTheme();

  const isMounted = useIsMounted();
  const isSelected = theme === "dark" && isMounted;

  const isTablet = useMediaQuery(1024);

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="hidden lg:flex flex-col relative z-20 w-1/2">
      <>
        <Switch
          classNames={{
            base:
              "absolute -top-[220px] -right-[40px] animate-[levitate_13s_ease_infinite_1s_reverse]",
            wrapper: "shadow-sm",
            startContent: "text-white",
          }}
          endContent={<MoonFilledIcon />}
          isSelected={isSelected}
          size="xl"
          startContent={<SunFilledIcon />}
          onChange={onChange}
        />

        <Input
          className="absolute -top-[130px] -right-[120px] animate-[levitate_10s_ease_infinite] w-[200px]"
          color="secondary"
          defaultValue="NextUI"
          label="Input"
          labelPlacement="outside"
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
            as={NextImage}
            className="object-cover -translate-y-12 h-[100%]"
            height={120}
            src="/images/card-example-6.webp"
            width={120}
          />
          <CardFooter className="before:bg-black/10 before:border before:border-white/20 overflow-hidden justify-between py-2 absolute before:rounded-xl rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
            <p className="text-xs font-semibold text-white/80">Camera</p>
            <p className="text-xs font-semibold text-white/80">$525</p>
          </CardFooter>
        </Card>

        <FloatingTabs />

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

        {isMounted && (
          <Tooltip
            showArrow
            className="text-sm animate-[levitate_14s_ease_infinite]"
            color="secondary"
            content="Developers love Next.js"
            isOpen={!isTablet}
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
        )}

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
            as={NextImage}
            className="object-cover"
            height={200}
            src="/images/hero-card.webp"
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
    </div>
  );
};
