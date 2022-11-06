import {Layout, Box, AcmeLogo, Content} from "./common";

const SearchIcon = `export const SearchIcon = ({size, fill, width = 24, height = 24, ...props}) => {
  return (
    <svg fill="none" height={size || height} viewBox="0 0 24 24" width={size || width} {...props}>
      <path
        d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};`;

const App = `import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { Layout } from "./Layout.js";
import { AcmeLogo } from "./AcmeLogo.js";
import { SearchIcon } from "./SearchIcon.js";

export default function App() {
  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand css={{ mr: "$4" }}>
          <AcmeLogo />
          <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
            ACME
          </Text>
          <Navbar.Content hideIn="xs" variant="highlight">
            <Navbar.Link isActive href="#">
              Dashboard
            </Navbar.Link>
            <Navbar.Link href="#">Team</Navbar.Link>
            <Navbar.Link href="#">Activity</Navbar.Link>
            <Navbar.Link href="#">Settings</Navbar.Link>
          </Navbar.Content>
        </Navbar.Brand>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "space-between",
            },
          }}
        >
          <Navbar.Item
            css={{
              "@xsMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px",
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
            />
          </Navbar.Item>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}`;

const react = {
  "/Content.js": Content,
  "/Layout.js": Layout,
  "/AcmeLogo.js": AcmeLogo,
  "/SearchIcon.js": SearchIcon,
  "/Box.js": Box,
  "/App.js": App,
};

export default {
  ...react,
};
