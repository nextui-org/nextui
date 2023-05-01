import {useState} from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Input,
  Link,
  Button,
  Kbd,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import {ChevronDownIcon} from "@nextui-org/shared-icons";

import {NextUILogo, ThemeSwitch} from "@/components";
import {TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon} from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPosition="outside"
      placeholder="Search..."
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3">
          <NextUILogo auto />
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button
                className="hidden sm:flex gap-0.5"
                endIcon={<ChevronDownIcon className="text-xs" />}
                radius="full"
                size="xs"
                variant="flat"
              >
                v2.0.0
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="NextUI versions"
              defaultSelectedKeys={["v2"]}
              selectionMode="single"
            >
              <DropdownItem key="v2">v2.0.0</DropdownItem>
              <DropdownItem key="v1">v1.0.0</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden lg:flex" justify="center">
        <NavbarItem as={Link} color="foreground" href="#">
          Docs
        </NavbarItem>
        <NavbarItem isActive as={Link} href="#">
          Components
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Figma
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex w-full sm:hidden" justify="center">
        <NavbarItem>{searchInput}</NavbarItem>
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href="https://twitter.com/getnextui">
            <TwitterIcon className="text-neutral-400" />
          </Link>
          <Link isExternal href="https://discord.gg/9b6yyZKmH4">
            <DiscordIcon className="text-neutral-400" />
          </Link>
          <Link isExternal href="https://github.com/nextui-org/nextui">
            <GithubIcon className="text-neutral-400" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            isExternal
            as={Link}
            className="group text-sm font-normal text-neutral-600"
            href="https://patreon.com/jrgarciadev"
            startIcon={
              <HeartFilledIcon className="text-danger group-data-[hover=true]:animate-heartbeat" />
            }
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu disableAnimation>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
