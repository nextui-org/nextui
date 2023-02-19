import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Link} from "@nextui-org/link";
import {Code} from "@nextui-org/code";
import {styled} from "@nextui-org/system";

import {Card, CardProps} from "../src";

export default {
  title: "General/Card",
  component: Card,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["shadow", "bordered", "flat"],
      },
    },
    borderWeight: {
      control: {
        type: "radio",
        options: ["light", "normal", "bold", "extrabold", "black"],
      },
    },
    isPressable: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
    isHoverable: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: CardProps) => (
  <Card {...args} className="max-w-[50%]">
    <Card.Body>A basic card</Card.Body>
  </Card>
);

export const Default = Template.bind({});
Default.args = {
  variant: "shadow",
};

export const Hoverable = Template.bind({});
Hoverable.args = {
  variant: "bordered",
  isHoverable: true,
};

export const Variants = () => (
  <div className="container flex gap-2">
    <div className="w-4/12">
      <Card>
        <Card.Body>
          <p>Default card. (shadow)</p>
        </Card.Body>
      </Card>
    </div>
    <div className="w-4/12">
      <Card variant="flat">
        <Card.Body>
          <p>Flat card.</p>
        </Card.Body>
      </Card>
    </div>
    <div className="w-4/12">
      <Card variant="bordered">
        <Card.Body>
          <p>Bordered card.</p>
        </Card.Body>
      </Card>
    </div>
  </div>
);

export const WithFooter = () => (
  <Card className="p-3 max-w-[400px]">
    <Card.Header>
      <img
        alt="nextui logo"
        height="34px"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width="34px"
      />
      <div className="flex flex-col pl-3">
        <h4 className="pb-2">Next UI</h4>
        <p>nextui.org</p>
      </div>
    </Card.Header>
    <Card.Body className="py-2">
      <p>Make beautiful websites regardless of your design experience.</p>
    </Card.Body>
    <Card.Footer>
      <Link isExternal color="primary" href="https://github.com/nextui-org/nextui" target="_blank">
        Visit source code on GitHub.
      </Link>
    </Card.Footer>
  </Card>
);

export const AbsImageWithHeader = () => {
  return (
    <div className="flex justify-center gap-2">
      <Card className="w-[330px]">
        <Card.Header className="absolute top-5 z-10">
          <div className="grid-cols-2">
            <p className="text-white/75 text-sm uppercase font-bold">What to watch</p>
            <h3 className="text-white text-xl">Stream the Apple event</h3>
          </div>
        </Card.Header>
        <Card.Image
          alt="Apple event background"
          autoResize={false}
          height={440}
          src={require("./assets/apple-event.jpeg")}
          style={{objectFit: "cover"}}
          width="100%"
        />
      </Card>
    </div>
  );
};

export const AbsImgWithHeaderFooter = () => {
  return (
    <div className="flex justify-center items-start gap-2">
      <Card className="w-[330px] bg-neutral-100">
        <Card.Header className="absolute top-5 z-10">
          <div className="flex flex-col">
            <p className="text-xs text-neutral-400 upper font-bold">New</p>
            <h2 className="text-lg text-black">HomePod mini</h2>
            <p className="text-xs text-foreground pr-1.5">
              Room-filling sound, Intelligent assistant. Smart home control. Works seamlessly with
              iPhone. Check it out
            </p>
          </div>
        </Card.Header>
        <Card.Image
          alt="Apple homedpods background"
          autoResize={false}
          height={440}
          src={require("./assets/homepod.jpeg")}
          style={{objectFit: "cover", paddingTop: "100px"}}
          width="100%"
        />
        <Card.Footer className="justify-between">
          <div>
            <p className="text-xs">Available soon.</p>
            <p className="text-xs">Get notified.</p>
          </div>
          <div>
            <div className="flex flex-wrap justify-end">
              <p className="text-xs upper font-bold">Notify Me</p>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Card className="w-[630px]">
        <Card.Header className="absolute top-5 z-10">
          <div className="flex flex-col">
            <p className="text-neutral-300 upper font-bold">Your day your way</p>
            <h3 className="text-white text-xl">Your checklist for better sleep</h3>
          </div>
        </Card.Header>
        <Card.Image
          alt="Apple homedpods background"
          autoResize={false}
          height={440}
          src={require("./assets/relaxing.jpeg")}
          style={{objectFit: "cover"}}
          width="100%"
        />
        <Card.Footer isBlurred className="absolute bottom-0 z-10 border-t border-border-dark">
          <div className="flex flex-grow items-start">
            <div className="w-[40px] mr-2">
              <Card.Image
                alt="Breathing app icon"
                autoResize={false}
                height={40}
                src={require("./assets/breathing-app-icon.jpeg")}
                style={{background: "black"}}
                width={40}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-neutral-400">Breathing App</p>
              <p className="text-xs text-neutral-400">Get a good night&apos;s sleep.</p>
            </div>
          </div>
          <p className="text-white upper font-bold">Get App</p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export const CoverImage = () => (
  <div className="gap-2 grid grid-cols-12">
    <div className="col-span-12 sm:col-span-4">
      <Card>
        <Card.Header className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-xs text-white/75 upper font-bold">What to watch</p>
          <h4 className="text-white font-medium text-lg">Stream the Acme event</h4>
        </Card.Header>
        <Card.Image
          alt="Card image background"
          height={340}
          objectFit="cover"
          src="https://nextui.org/images/card-example-4.jpeg"
          width="100%"
        />
      </Card>
    </div>
    <div className="col-span-12 sm:col-span-4">
      <Card>
        <Card.Header className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-xs text-white/75 upper font-bold">Plant a tree</p>
          <h4 className="text-white font-medium text-lg">Contribute to the planet</h4>
        </Card.Header>
        <Card.Image
          alt="Card image background"
          height={340}
          objectFit="cover"
          src="https://nextui.org/images/card-example-3.jpeg"
          width="100%"
        />
      </Card>
    </div>
    <div className="col-span-12 sm:col-span-4">
      <Card className="bg-black">
        <Card.Header className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-xs text-white/75 upper font-bold">Supercharged</p>
          <h4 className="text-white font-medium text-lg">Creates beauty like a beast</h4>
        </Card.Header>
        <Card.Image
          alt="Card image background"
          height={340}
          objectFit="cover"
          src="https://nextui.org/images/card-example-2.jpeg"
          width="100%"
        />
      </Card>
    </div>
    <div className="col-span-12 sm:col-span-5">
      <Card className="w-full h-[400px]">
        <Card.Header className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-xs text-white/75 upper font-bold">New</p>
          <h3 className="text-black font-medium text-2xl">Acme camera</h3>
        </Card.Header>
        <Card.Image
          alt="Card example background"
          height="100%"
          objectFit="cover"
          src="https://nextui.org/images/card-example-6.jpeg"
          width="100%"
        />
        <Card.Footer
          isBlurred
          className="absolute bg-white/50 bottom-0 border-t border-border-dark z-10"
        >
          <div>
            <p className="text-black text-xs">Available soon.</p>
            <p className="text-black text-xs">Get notified.</p>
          </div>
          <p className="text-xs upper font-bold text-inherit ml-auto">Notify Me</p>
        </Card.Footer>
      </Card>
    </div>
    <div className="col-span-12 sm:col-span-7">
      <Card className="w-full h-[400px]">
        <Card.Header className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-xs text-white/75 upper font-bold">Your day your way</p>
          <h3 className="text-white font-medium text-2xl">Your checklist for better sleep</h3>
        </Card.Header>
        <Card.Image
          alt="Relaxing app background"
          height="100%"
          objectFit="cover"
          src="https://nextui.org/images/card-example-5.jpeg"
          width="100%"
        />
        <Card.Footer
          isBlurred
          className="absolute bottom-0 z-10 bg-black/50 border-t border-border-dark"
        >
          <div className="flex flex-grow items-center">
            <div className="w-[40px] mr-2">
              <Card.Image
                alt="Breathing app icon"
                autoResize={false}
                height={40}
                src={require("./assets/breathing-app-icon.jpeg")}
                style={{background: "black"}}
                width={40}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-neutral-400">Breathing App</p>
              <p className="text-xs text-neutral-400">Get a good night&apos;s sleep.</p>
            </div>
          </div>
          <p className="text-white upper font-bold">Get App</p>
        </Card.Footer>
      </Card>
    </div>
  </div>
);

export const PrimaryAction = () => {
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
      title: "Advocato",
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

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        // eslint-disable-next-line no-console
        <Card key={index} isPressable onPress={() => console.log("item pressed", item)}>
          <Card.Body className="!p-0">
            <Card.Image
              alt={item.title}
              height={140}
              src={"https://nextui.org" + item.img}
              style={{objectFit: "cover"}}
              width="100%"
            />
          </Card.Body>
          <Card.Footer className="justify-between">
            <strong>{item.title}</strong>
            <p className="font-medium text-neutral-500">{item.price}</p>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

export const CenterImgWithHeader = () => {
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
          <Card isHoverable isPressable className="w-[200px] h-[200px]">
            <Card.Header className="!p-0">
              <h5 className="pl-6 pt-2.5">{item.title}</h5>
            </Card.Header>
            <Card.Body className="h-full justify-center">
              <Card.Image alt={item.title} autoResize={false} src={item.img} width={180} />
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const WithDivider = () => (
  <Card className="w-max-[400px]" variant="bordered">
    <Card.Header className="border-b border-border dark:border-border-dark">
      <strong>Description</strong>
    </Card.Header>
    <Card.Body>
      <p>The Object constructor creates an object wrapper for the given value.</p>
    </Card.Body>
    <Card.Footer className="border-t border-border dark:border-border-dark">
      <p>
        When called in a non-constructor context, Object behaves identically to{" "}
        <Code>new Object()</Code>.
      </p>
    </Card.Footer>
  </Card>
);

export const Shadows = () => {
  const Box = styled("div", {
    size: "120px",
    dflex: "center",
    bg: "$backgroundContrast",
    br: "$md",
  });

  const shadows = ["$xs", "$sm", "$md", "$lg", "$xl"];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 justify-center">
      <div className="flex justify-center col-span-2 sm:col-span-5">
        <strong>Drop shadows</strong>
      </div>
      {shadows.map((shadow, index) => (
        <div key={`${shadow}_${index}`}>
          <Box css={{dropShadow: shadow}}>
            <p>Shadow: {shadow}</p>
          </Box>
        </div>
      ))}
      <div className="flex justify-center col-span-2 sm:col-span-5">
        <strong>Box shadows</strong>
      </div>
      {shadows.map((shadow, index) => (
        <div key={`${shadow}_${index}`}>
          <Box css={{boxShadow: shadow}}>
            <p>Shadow: {shadow}</p>
          </Box>
        </div>
      ))}
    </div>
  );
};

//TODO: Input & Button still missing
// export const withForm = () => {
//   return (
//     <Card css={{mw: "400px"}}>
//       <Card.Header css={{justifyContent: "center"}}>
//         <Text size={18}>
//           Welcome to&nbsp;
//           <Text b size={18}>
//             NextUI
//           </Text>
//         </Text>
//       </Card.Header>
//       <Card.Body css={{px: "$10", pt: "$1", ov: "visible"}}>
//         <Input
//           bordered
//           clearable
//           fullWidth
//           color="primary"
//           contentLeft={<Mail fill="currentColor" />}
//           placeholder="Email"
//           size="lg"
//         />
//         <Spacer y={0.5} />
//         <Input
//           bordered
//           clearable
//           fullWidth
//           color="primary"
//           contentLeft={<Password />}
//           placeholder="Password"
//           size="lg"
//         />
//         <Spacer y={0.5} />
//         <Row align="center" justify="space-between">
//           <Checkbox>
//             <Text css={{color: "$accents8"}} size={14}>
//               Remember me
//             </Text>
//           </Checkbox>
//           <Link css={{color: "$link", fontSize: "$sm"}} href="#">
//             Forgot password?
//           </Link>
//         </Row>
//       </Card.Body>
//       <Card.Footer css={{pt: 0}}>
//         <Grid.Container gap={1} justify="flex-end">
//           <Grid>
//             <Button auto flat>
//               Sign Up
//             </Button>
//           </Grid>
//           <Grid>
//             <Button auto>Login</Button>
//           </Grid>
//         </Grid.Container>
//       </Card.Footer>
//     </Card>
//   );
// };
