/* eslint-disable react/display-name */
import {useMemo, useState} from "react";
import {Tabs, TabItem, Card, CardBody, Image, Button, RadioGroup, Radio} from "@nextui-org/react";
import get from "lodash/get";
import Link from "next/link";

import {shopCartStyles} from "./styles";

import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";
import {PaletteIcon, MagicIcon, GamingConsoleIcon, StarIcon} from "@/components/icons";
import {NextUILogo, CodeWindow} from "@/components";
import landingContent from "@/content/landing";

const themesTabs = [
  {
    id: "nextui",
    title: () => <p className="group-data-[selected=true]:text-primary">NextUI</p>,
    icon: () => (
      <NextUILogo
        small
        className="text-neutral-400 group-data-[selected=true]:text-primary"
        size={44}
      />
    ),
  },
  {
    id: "modern",
    title: () => <p className="group-data-[selected=true]:text-secondary">Modern</p>,
    icon: () => <PaletteIcon className="group-data-[selected=true]:text-secondary" size={44} />,
  },
  {
    id: "elegant",
    title: () => <p className="group-data-[selected=true]:text-foreground">Elegant</p>,
    icon: () => <MagicIcon size={44} />,
  },
  {
    id: "retro",
    title: () => <p className="group-data-[selected=true]:text-warning">Retro</p>,
    icon: () => <GamingConsoleIcon className="group-data-[selected=true]:text-warning" size={44} />,
  },
];

type Theme = "nextui" | "modern" | "elegant" | "retro";

const itemSizes = ["xs", "s", "m", "l", "xl"];

const codeHighlights = {
  nextui: "6-15",
  modern: "22-31",
  elegant: "38-47",
  retro: "54-67",
};

const CustomThemesExample = ({
  selectedTheme,
  onChangeTheme,
}: {
  selectedTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}) => {
  const [liked, setLiked] = useState(false);

  const slots = useMemo(
    () =>
      shopCartStyles({
        theme: selectedTheme as Theme,
      }),
    [selectedTheme],
  );

  const onSelectionChange = (value: React.Key) => {
    onChangeTheme(value as Theme);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <Tabs
        disableAnimation
        disableCursor
        aria-label="Custom themes tabs"
        classNames={{
          base: "max-w-[50%]",
          tab: "h-auto data-[selected=true]:bg-transparent",
          tabList: "max-w-1/2 justify-start gap-4",
          tabContent: "text-neutral-400 text-base",
        }}
        items={themesTabs}
        variant="light"
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <TabItem
            key={item.id}
            title={
              <div className="flex flex-col justify-center items-center gap-2">
                {item.icon()}
                {item.title()}
              </div>
            }
          />
        )}
      </Tabs>
      <Card className={slots.wrapper()} radius="2xl">
        <CardBody className="relative flex-col md:flex-row md:items-center gap-4 md:gap-9 overflow-visible">
          <div className={slots.imageWrapper()}>
            <Image
              removeWrapper
              alt="Shoes theme example"
              className={slots.img()}
              src="/images/shoes-1.png"
            />
          </div>
          <div className={slots.contentWrapper()}>
            <div className="relative flex flex-wrap items-baseline">
              <h1 className={slots.title()}>Nike Adapt BB 2.0</h1>
              <p className={slots.description()}>Consistent, customized fit, game-changing.</p>
              <p className={slots.price()}>$279.97</p>
              <p className={slots.previousPrice()}>$350</p>
              <p className={slots.percentOff()}>20% off</p>
            </div>
            <RadioGroup
              aria-label="select size"
              classNames={{
                base: "my-4",
              }}
              defaultValue="xs"
              orientation="horizontal"
            >
              {itemSizes.map((itemSize) => (
                <Radio
                  key={itemSize}
                  classNames={{
                    wrapper: "hidden",
                    labelWrapper: slots.sizeOption(),
                    label: "text-sm font-semibold text-inherit",
                  }}
                  value={itemSize}
                >
                  {itemSize.toUpperCase()}
                </Radio>
              ))}
            </RadioGroup>
            <div className="flex space-x-4">
              <Button
                className={slots.buyButton()}
                color="primary"
                radius="xl"
                variant={selectedTheme === "nextui" ? "shadow" : "solid"}
              >
                Buy now
              </Button>
              <Button
                className={slots.addToBagButton()}
                color="primary"
                radius="xl"
                variant="bordered"
              >
                Add to bag
              </Button>
            </div>
          </div>
          <Button
            isIconOnly
            className={slots.starButton()}
            data-liked={liked}
            radius="full"
            variant="light"
            onPress={() => setLiked((v) => !v)}
          >
            <StarIcon fill={liked ? "currentColor" : "none"} size={20} />
          </Button>
        </CardBody>
      </Card>
      <Button
        as={Link}
        className="max-w-fit"
        color="primary"
        href="/docs/theme/customize-theme"
        radius="full"
        size="sm"
        variant="flat"
      >
        Learn more
      </Button>
    </div>
  );
};

export const CustomThemes = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themesTabs[0].id as Theme);

  return (
    <section className={sectionWrapper({class: "pb-56"})}>
      <div className="flex flex-col gap-8">
        <div>
          <div className={titleWrapper()}>
            <h1 className={title({size: "lg"})}>Apply your own</h1>
            <div>
              <h1 className={title({color: "blue", size: "lg"})}>theming&nbsp;</h1>
              <h1 className={title({size: "lg"})}>decisions.</h1>
            </div>
          </div>
          <p className={subtitle()}>
            NextUI provides a custom TailwindCSS plugin that allows you to customize the default
            themes or create your own.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CustomThemesExample selectedTheme={selectedTheme} onChangeTheme={setSelectedTheme} />
          <CodeWindow
            showWindowIcons
            className="max-h-[440px] mt-12"
            highlightLines={get(codeHighlights, selectedTheme)}
            language="jsx"
            title="tailwind.config.js"
            value={landingContent.themingCode}
          />
        </div>
      </div>
      <div className="absolute -bottom-[25%] -left-[30%] -z-[1]">
        <Image
          removeWrapper
          alt="custom themes background"
          className="h-full"
          src="/gradients/blue-purple-1.svg"
        />
      </div>
    </section>
  );
};
