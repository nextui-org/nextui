import {useRef, useState, FC, ReactNode} from "react";
import {
  link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
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
import dynamic from "next/dynamic";
import {ChevronDownIcon, LinkIcon} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";
import NextLink from "next/link";
import {useRouter} from "next/router";
import {includes} from "lodash";
import {SearchIcon} from "@nextui-org/shared-icons";
import {motion, AnimatePresence} from "framer-motion";

import {Route} from "@/libs/docs/page";
import {LargeLogo, ThemeSwitch} from "@/components";
import {TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon} from "@/components/icons";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {isActive} from "@/utils/links";
import RouterEvents from "@/libs/router-events";

export interface NavbarProps {
  routes: Route[];
  tag?: string;
  slug?: string;
  children?: ReactNode;
}

const DocsSidebar = dynamic(
  () => import("@/components/docs/sidebar").then((mod) => mod.DocsSidebar),
  {ssr: false},
);

export const Navbar: FC<NavbarProps> = ({children, routes, slug, tag}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);

  const ref = useRef(null);
  const isMounted = useIsMounted();

  const router = useRouter();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-400/20 dark:bg-default-500/20",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  RouterEvents.on("routeChangeStart", () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  return (
    <NextUINavbar
      ref={ref}
      className="z-[100001]"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-3" href="/">
            <LargeLogo className="h-5 md:h-6" />
          </NextLink>
          {ref.current ? (
            <Dropdown placement="bottom-start" portalContainer={ref.current}>
              <AnimatePresence>
                {isMounted && (
                  <motion.div animate={{opacity: 1}} exit={{opacity: 0}} initial={{opacity: 0}}>
                    <DropdownTrigger>
                      <Button
                        className="hidden w-[65px] sm:flex gap-0.5"
                        endIcon={<ChevronDownIcon className="text-xs" />}
                        radius="full"
                        size="xs"
                        variant="flat"
                      >
                        v2.0.0
                      </Button>
                    </DropdownTrigger>
                  </motion.div>
                )}
              </AnimatePresence>
              <DropdownMenu
                aria-label="NextUI versions"
                defaultSelectedKeys={["v2"]}
                selectionMode="single"
              >
                <DropdownItem key="v2">v2.0.0</DropdownItem>
                <DropdownItem key="v1" endContent={<LinkIcon />}>
                  v1.0.0
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-[80px]" />
          )}
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 ml-10 justify-start">
          <NavbarItem>
            <NextLink
              className={clsx(
                link({color: "foreground"}),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              data-active={
                !!(
                  isActive(router.pathname, "/docs/[[...slug]]") &&
                  !includes(router.asPath, "components")
                )
              }
              href="/docs/guide/introduction"
            >
              Docs
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                link({color: "foreground"}),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              data-active={includes(router.asPath, "components")}
              href="/docs/components/avatar"
            >
              Components
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink
              className={clsx(
                link({color: "foreground"}),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              data-active={router.asPath === "/figma"}
              href="/figma"
            >
              Figma
            </NextLink>
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent className="flex w-full gap-3 sm:hidden" justify="end">
        <Link isExternal href="https://github.com/nextui-org/nextui">
          <GithubIcon className="text-default-600 dark:text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href="https://twitter.com/getnextui">
            <TwitterIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <Link isExternal href="https://discord.gg/9b6yyZKmH4">
            <DiscordIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <Link isExternal href="https://github.com/nextui-org/nextui">
            <GithubIcon className="text-default-600 dark:text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            isExternal
            as={Link}
            className="group text-sm font-normal text-default-600 bg-default-400/20 dark:bg-default-500/20"
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
        {searchInput}
        <DocsSidebar routes={routes} slug={slug} tag={tag} />
        {children}
      </NavbarMenu>
    </NextUINavbar>
  );
};
