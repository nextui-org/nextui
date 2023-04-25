import {useState} from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Input,
  Link,
  Button,
} from "@nextui-org/react";

import {NextUILogo, ThemeSwitch} from "@/components";
import {TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon} from "@/components/icons";

export const DocsNavbar = () => {
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

  return (
    <Navbar maxWidth="xl" position="sticky" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextUILogo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem as={Link} color="foreground" href="#">
          Docs
        </NavbarItem>
        <NavbarItem isActive as={Link} href="#">
          Components
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Showcase
        </NavbarItem>
        <NavbarItem as={Link} color="foreground" href="#">
          Figma
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex gap-2">
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
        <NavbarItem>
          <Input
            classNames={{
              input: "text-sm",
            }}
            labelPosition="outside"
            placeholder="Search..."
            onClear={() => {}}
          />
        </NavbarItem>
        <NavbarItem>
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
      </NavbarContent>
      <NavbarMenu>
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
    </Navbar>
  );
};
