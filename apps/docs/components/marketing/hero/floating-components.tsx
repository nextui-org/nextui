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
            base: "absolute -top-[220px] -right-[40px] animate-[levitate_13s_ease_infinite_1s_reverse]",
            wrapper: "shadow-sm",
            startContent: "text-white",
          }}
          endContent={<MoonFilledIcon />}
          isSelected={isSelected}
          size="lg"
          startContent={<SunFilledIcon />}
          onChange={onChange}
        />

        <Input
          className="absolute -top-[130px] -right-[120px] animate-[levitate_10s_ease_infinite] w-[200px]"
          color="secondary"
          defaultValue="NextUI"
          label="Input"
          labelPlacement="outside"
          variant="bordered"
          onClear={() => {}}
        />

        <Card
          isFooterBlurred
          className="absolute -top-[260px] right-[100px] h-[120px] animate-[levitate_12s_ease_infinite_1s] z-0 max-w-fit"
        >
          <Image
            alt="Professional camera"
            as={NextImage}
            className="object-cover -translate-y-12 h-[100%]"
            height={120}
            src="/images/card-example-6.webp"
            width={120}
          />
          <CardFooter className="before:bg-black/10 border-white/20 border-1 overflow-hidden justify-between py-2 absolute before:rounded-xl rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-lg ml-1 z-10">
            <p className="text-xs font-semibold text-white/80">Camera</p>
            <p className="text-xs font-semibold text-white/80">$525</p>
          </CardFooter>
        </Card>

        <FloatingTabs />

        <UserTwitterCard className="absolute left-[80px] -top-[80px] animate-[levitate_16s_ease_infinite] border-none" />

        <Card
          className="absolute right-[110px] -top-[60px] animate-[levitate_18s_ease_infinite] z-10 max-w-fit border-none"
          shadow="lg"
        >
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
              base: "rounded-xl",
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

        <Card
          className="absolute right-[10px] top-[30px] animate-[levitate_16s_ease_infinite] z-10 max-w-fit border-none"
          shadow="lg"
        >
          <CardBody>
            <Spinner color="secondary" size="lg" />
          </CardBody>
        </Card>

        <Card
          isFooterBlurred
          className="absolute right-[60px] top-[100px] animate-[levitate_12s_ease_infinite_1s] z-0 max-w-fit"
        >
          <Image
            alt="Woman listing to music"
            as={NextImage}
            className="object-cover"
            height={200}
            src="/images/hero-card.webp"
            width={200}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button
              className="text-tiny text-white bg-black/20"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Notify me
            </Button>
          </CardFooter>
        </Card>
      </>
    </div>
  );
};
