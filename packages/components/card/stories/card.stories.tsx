import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {card} from "@nextui-org/theme";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/button";
import {Code} from "@nextui-org/code";
import {Image} from "@nextui-org/image";

import {Card, CardBody, CardHeader, CardFooter, CardProps} from "../src";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {
    shadow: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    radius: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isFooterBlurred: {
      control: {
        type: "boolean",
      },
    },
    isHoverable: {
      control: {
        type: "boolean",
      },
    },
    isPressable: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableRipple: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Card>;

const defaultProps = {
  ...card.defaultVariants,
  disableRipple: false,
};

const Template: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} className="max-w-md">
    <CardBody>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
    </CardBody>
  </Card>
);

const WithDividerTemplate: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} className="max-w-md">
    <CardHeader className="border-b border-divider dark:border-divider-dark">
      <strong>Description</strong>
    </CardHeader>
    <CardBody className="py-8">
      <p>The Object constructor creates an object wrapper for the given value.</p>
    </CardBody>
    <CardFooter className="border-t border-divider dark:border-divider-dark">
      <p>
        When called in a non-constructor context, Object behaves identically to{" "}
        <Code color="primary">new Object()</Code>.
      </p>
    </CardFooter>
  </Card>
);

const WithFooterTemplate: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} className="p-4 max-w-md">
    <CardHeader className="flex gap-3">
      <Image
        alt="nextui logo"
        height={34}
        radius="lg"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={34}
      />
      <div className="flex flex-col">
        <b className="text-lg">NextUI</b>
        <p className="text-default-500">nextui.org</p>
      </div>
    </CardHeader>
    <CardBody className="py-2">
      <p>Make beautiful websites regardless of your design experience.</p>
    </CardBody>
    <CardFooter>
      <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
        Visit source code on GitHub.
      </Link>
    </CardFooter>
  </Card>
);

const WithAbsImageHeaderTemplate: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} className="max-w-[330px]">
    <CardHeader className="absolute top-2 z-20">
      <div className="flex flex-col">
        <p className="text-white/60 text-xs uppercase font-bold">What to watch</p>
        <p className="text-white text-2xl">Stream the Apple event</p>
      </div>
    </CardHeader>
    <Image
      alt="Card background"
      className="w-full h-[440px] object-cover"
      height={440}
      src={require("./assets/apple-event.jpeg")}
      width={330}
    />
  </Card>
);

const WithAbsImgHeaderFooterTemplate: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card className="w-[330px] bg-zinc-100 dark:bg-zinc-100" {...args}>
    <CardHeader className="absolute top-2 z-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-black/40 uppercase font-bold">New</p>
        <h4 className="text-3xl font-medium text-black">HomePod mini</h4>
        <p className="text-sm text-black/80 pr-1.5">
          Room-filling sound, Intelligent assistant. Smart home control. Works seamlessly with
          iPhone. Check it out
        </p>
      </div>
    </CardHeader>
    <Image
      alt="Card background"
      className="w-full h-[440px] pt-10 object-contain"
      height={440}
      src={require("./assets/homepod.jpeg")}
      width={300}
    />
    <CardFooter className="justify-between absolute bottom-0 z-10">
      <div>
        <p className="text-xs text-black/80">Available soon.</p>
        <p className="text-xs text-black/80">Get notified.</p>
      </div>
      <Button className="text-tiny" color="primary" radius="full" size="sm">
        Notify Me
      </Button>
    </CardFooter>
  </Card>
);

const CoverImgTemplate: ComponentStory<typeof Card> = (args: CardProps) => (
  <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-xs text-white/60 uppercase font-bold">What to watch</p>
        <h4 className="text-white font-medium text-lg">Stream the Acme event</h4>
      </CardHeader>
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src="https://nextui.org/images/card-example-4.jpeg"
      />
    </Card>
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-xs text-white/60 uppercase font-bold">Plant a tree</p>
        <h4 className="text-white font-medium text-lg">Contribute to the planet</h4>
      </CardHeader>
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src="https://nextui.org/images/card-example-3.jpeg"
      />
    </Card>
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-xs text-white/60 uppercase font-bold">Supercharged</p>
        <h4 className="text-white font-medium text-lg">Creates beauty like a beast</h4>
      </CardHeader>
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src="https://nextui.org/images/card-example-2.jpeg"
      />
    </Card>
    <Card {...args} isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-xs text-white/60 uppercase font-bold">New</p>
        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
      </CardHeader>
      <img
        alt="Card example background"
        className="w-full h-full scale-125 -translate-y-10 object-cover"
        src="https://nextui.org/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t border-slate-300 z-10 justify-between">
        <div>
          <p className="text-black text-xs">Available soon.</p>
          <p className="text-black text-xs">Get notified.</p>
        </div>
        <Button color="secondary" radius="full" size="sm" variant="flat">
          Notify Me
        </Button>
      </CardFooter>
    </Card>
    <Card {...args} isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-xs text-white/60 uppercase font-bold">Your day your way</p>
        <h4 className="text-white/90 font-medium text-2xl">Your checklist for better sleep</h4>
      </CardHeader>
      <img
        alt="Relaxing app background"
        className="w-full h-full object-cover"
        src="https://nextui.org/images/card-example-5.jpeg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <img
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src={require("./assets/breathing-app-icon.jpeg")}
          />
          <div className="flex flex-col">
            <p className="text-xs text-white/60">Breathing App</p>
            <p className="text-xs text-white/60">Get a good night&apos;s sleep.</p>
          </div>
        </div>
        <Button radius="full">Get App</Button>
      </CardFooter>
    </Card>
  </div>
);

const CenterImgTemplate: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} className="max-w-fit py-4 px-0">
    <CardHeader className="pb-0 pt-2 px-4 flex-col !items-start">
      <p className="text-xs uppercase font-bold">Daily Mix</p>
      <small className="text-default-500">12 Tracks</small>
      <h4 className="font-bold text-lg">Frontend Radio</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image
        isBlurred
        alt="Card background"
        src={require("./assets/local-image-1.jpeg")}
        width={300}
      />
    </CardBody>
  </Card>
);

const PrimaryActionTemplate: ComponentStory<typeof Card> = (args: CardProps) => {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  type ListItem = typeof list[number];

  const handlePress = (item: ListItem) => {
    // eslint-disable-next-line no-console
    console.log("item pressed", item);
  };

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        // eslint-disable-next-line no-console
        <Card {...args} key={index} isPressable onPress={() => handlePress(item)}>
          <CardBody className="p-0">
            <img
              alt={item.title}
              className="w-full h-[140px] object-cover"
              src={"https://nextui.org" + item.img}
            />
          </CardBody>
          <CardFooter className="justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const CenterImgWithHeaderTemplate: ComponentStory<typeof Card> = (args: CardProps) => {
  const list = [
    {
      title: "Mac",
      img: require("./assets/mac.png"),
    },
    {
      title: "iPhone",
      img: require("./assets/iphone.png"),
    },
    {
      title: "iPad",
      img: require("./assets/ipad.png"),
    },
    {
      title: "Apple Watch",
      img: require("./assets/apple-watch.png"),
    },
    {
      title: "AirPods",
      img: require("./assets/airpods.png"),
    },
    {
      title: "AirTag",
      img: require("./assets/airtag.png"),
    },
    {
      title: "Apple TV",
      img: require("./assets/appletv.png"),
    },
    {
      title: "HomePod mini",
      img: require("./assets/homepod-mini.png"),
    },
    {
      title: "Accessories",
      img: require("./assets/accessories.png"),
    },
  ];

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {list.map((item, index) => (
        <div key={index}>
          <Card {...args} isPressable className="w-[200px] h-[200px]">
            <CardHeader className="p-0">
              <h5 className="pl-6 pt-3">{item.title}</h5>
            </CardHeader>
            <CardBody className="h-full justify-center">
              <img alt={item.title} className="w-[180px]" src={item.img} />
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const WithDivider = WithDividerTemplate.bind({});
WithDivider.args = {
  ...defaultProps,
};

export const WithFooter = WithFooterTemplate.bind({});
WithFooter.args = {
  ...defaultProps,
};

export const WithAbsImageHeader = WithAbsImageHeaderTemplate.bind({});
WithAbsImageHeader.args = {
  ...defaultProps,
};

export const WithAbsImgHeaderFooter = WithAbsImgHeaderFooterTemplate.bind({});
WithAbsImgHeaderFooter.args = {
  ...defaultProps,
};

export const CoverImg = CoverImgTemplate.bind({});
CoverImg.args = {
  ...defaultProps,
};

export const CenterImg = CenterImgTemplate.bind({});
CenterImg.args = {
  ...defaultProps,
};

export const PrimaryAction = PrimaryActionTemplate.bind({});
PrimaryAction.args = {
  ...defaultProps,
};

export const CenterImgWithHeader = CenterImgWithHeaderTemplate.bind({});
CenterImgWithHeader.args = {
  ...defaultProps,
};
