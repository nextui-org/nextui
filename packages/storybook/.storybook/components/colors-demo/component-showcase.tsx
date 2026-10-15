/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Alert,
  AlertDialog,
  Avatar,
  Button,
  Card,
  Checkbox,
  Chip,
  CloseButton,
  Dropdown,
  Header,
  Input,
  Label,
  Link,
  ListBox,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Slider,
  Spinner,
  Surface,
  Switch,
  Tabs,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import React from "react";

import {HeroUILogo} from "../heroui-logo";

export function ComponentShowcase() {
  return (
    <div>
      {/* Navigation */}
      <nav className="flex flex-wrap items-end gap-4 border-b border-border px-4 pt-4 pb-3 text-sm font-medium @min-[448px]/preview:px-6">
        <HeroUILogo size={24} />
        <a className="text-foreground hover:text-accent" href="#">
          Pricing
        </a>
        <a className="text-foreground hover:text-accent" href="#">
          Docs
        </a>
        <a className="text-foreground hover:text-accent" href="#">
          Blog
        </a>
      </nav>
      <main className="flex min-w-0 flex-col gap-4 p-4 @min-[448px]/preview:p-6">
        {/* Hero Section */}
        <h1 className="text-2xl leading-tight font-extrabold text-foreground @min-[448px]/preview:text-3xl">
          Beautiful by default.
          <br />
          Customizable by design.
          <br />
        </h1>
        <p className="rounded-xl text-sm text-muted">
          HeroUI is the modern UI library for web and mobile.
        </p>
        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="tertiary">
            Tertiary
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="ghost">
            Ghost
          </Button>
          <Button size="sm" variant="danger">
            Danger
          </Button>
          <Button size="sm" variant="danger-soft">
            Danger Soft
          </Button>
        </div>

        <Separator />

        {/* Chips Section */}
        <h3 className="text-sm font-semibold text-muted">Status Chips</h3>
        <div className="flex flex-wrap gap-2">
          <Chip color="accent" variant="secondary">
            Accent
          </Chip>
          <Chip color="default" variant="secondary">
            Default
          </Chip>
          <Chip color="success" variant="secondary">
            Success
          </Chip>
          <Chip color="warning" variant="secondary">
            Warning
          </Chip>
          <Chip color="danger" variant="secondary">
            Danger
          </Chip>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip color="accent" variant="soft">
            Accent Soft
          </Chip>
          <Chip color="success" variant="soft">
            Success Soft
          </Chip>
          <Chip color="warning" variant="soft">
            Warning Soft
          </Chip>
          <Chip color="danger" variant="soft">
            Danger Soft
          </Chip>
        </div>

        {/* Borders and Surfaces Section */}
        <div className="grid grid-cols-1 gap-4 @min-[448px]/preview:grid-cols-2">
          {/* Borders */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted">Borders</h3>
            <div className="flex flex-col gap-2">
              <div className="flex h-12 items-center justify-start rounded-xl border border-border ps-3">
                <span className="text-sm text-foreground">Border default</span>
              </div>
              <div className="flex h-12 items-center justify-start rounded-xl border border-border-secondary ps-3">
                <span className="text-sm text-foreground">Border secondary</span>
              </div>
              <div className="flex h-12 items-center justify-start rounded-xl border border-border-tertiary ps-3">
                <span className="text-sm text-foreground">Border tertiary</span>
              </div>
            </div>
          </div>

          {/* Surfaces */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted">Surfaces</h3>
            <div className="flex flex-col gap-2">
              <Surface className="rounded-xl p-3" variant="default">
                <span className="text-sm text-foreground">Surface default</span>
              </Surface>
              <Surface className="rounded-xl p-3" variant="secondary">
                <span className="text-sm text-foreground">Surface secondary</span>
              </Surface>
              <Surface className="rounded-xl p-3" variant="tertiary">
                <span className="text-sm text-foreground">Surface tertiary</span>
              </Surface>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted">Cards</h3>
          <div className="flex w-full items-center justify-center">
            <div className="grid w-full max-w-2xl grid-cols-12 gap-4">
              {/* Row 1: Large Product Card - Available Soon */}
              <Card className="col-span-12 flex h-auto min-h-[152px] flex-col @min-[480px]/preview:flex-row">
                <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl @min-[480px]/preview:h-[120px] @min-[480px]/preview:w-[120px]">
                  <img
                    alt="Cherries"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
                    loading="lazy"
                    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <Card.Header className="gap-1">
                    <Card.Title className="pe-8">Become an ACME Creator!</Card.Title>
                    <Card.Description>
                      Lorem ipsum dolor sit amet consectetur. Sed arcu donec id aliquam.
                    </Card.Description>
                    <CloseButton aria-label="Close banner" className="absolute end-3 top-3" />
                  </Card.Header>
                  <Card.Footer className="mt-auto flex w-full flex-col items-start justify-between gap-3 @min-[480px]/preview:flex-row @min-[480px]/preview:items-center">
                    <span className="text-sm font-medium text-foreground">Only 10 spots</span>
                    <Button className="w-full @min-[480px]/preview:w-auto">Apply Now</Button>
                  </Card.Footer>
                </div>
              </Card>

              {/* Row 2 */}
              <div className="col-span-12 grid grid-cols-12 gap-4">
                {/* Left Column */}
                <div className="col-span-12 grid grid-cols-12 gap-4">
                  {/* Top Card */}
                  <Card className="col-span-12">
                    <div className="absolute end-3 top-3 z-10">
                      <CloseButton aria-label="Close notification" />
                    </div>
                    <Card.Header className="gap-3">
                      <Icon
                        aria-label="Dollar sign icon"
                        className="text-primary size-8 shrink-0"
                        icon="gravity-ui:circle-dollar"
                        role="img"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-muted uppercase">PAYMENT</span>
                        <Card.Title className="pe-8 text-sm sm:text-base">
                          You can now withdraw on crypto
                        </Card.Title>
                        <Card.Description className="text-xs sm:text-sm">
                          Add your wallet in settings to withdraw
                        </Card.Description>
                      </div>
                    </Card.Header>
                    <Card.Footer>
                      <Link aria-label="Go to settings" href="#" rel="noopener noreferrer">
                        Go to settings
                        <Link.Icon aria-hidden="true" />
                      </Link>
                    </Card.Footer>
                  </Card>
                  {/* Bottom cards */}
                  <div className="col-span-12 grid grid-cols-12 gap-4">
                    {/* Left Card */}
                    <Card className="col-span-12 gap-2 @min-[400px]/preview:col-span-6">
                      <Card.Header>
                        <Avatar className="size-[56px] rounded-xl">
                          <Avatar.Image
                            alt="Demo 1"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                          />
                          <Avatar.Fallback>JK</Avatar.Fallback>
                        </Avatar>
                      </Card.Header>
                      <Card.Content className="mt-1">
                        <p className="text-sm leading-4 font-medium">Indie Hackers</p>
                        <p className="text-xs text-muted">148 members</p>
                      </Card.Content>
                      <Card.Footer className="flex items-center gap-2">
                        <Avatar className="size-4">
                          <Avatar.Image
                            alt="John"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                          />
                          <Avatar.Fallback>JK</Avatar.Fallback>
                        </Avatar>
                        <p className="text-xs text-muted">By John</p>
                      </Card.Footer>
                    </Card>
                    {/* Right Card */}
                    <Card className="col-span-12 gap-2 @min-[400px]/preview:col-span-6">
                      <Card.Header>
                        <Avatar className="size-[56px] rounded-xl">
                          <Avatar.Image
                            alt="Demo 2"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
                          />
                          <Avatar.Fallback>AB</Avatar.Fallback>
                        </Avatar>
                      </Card.Header>
                      <Card.Content className="mt-1">
                        <p className="text-sm leading-4 font-medium">AI Builders</p>
                        <p className="text-xs text-muted">362 members</p>
                      </Card.Content>
                      <Card.Footer className="flex items-center gap-2">
                        <Avatar className="size-4">
                          <Avatar.Image
                            alt="John"
                            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                          />
                          <Avatar.Fallback>M</Avatar.Fallback>
                        </Avatar>
                        <p className="text-xs text-muted">By Martha</p>
                      </Card.Footer>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="col-span-12 grid grid-cols-12 gap-4">
                {/* Right Column: Cards Stack */}
                <div className="col-span-12 flex flex-col gap-2 md:col-span-12 md:justify-between md:gap-2">
                  {/* 1 */}
                  <Card className="flex flex-row gap-3 p-1 shadow-none" variant="secondary">
                    <img
                      alt="Avocado"
                      className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none @min-[448px]/preview:h-20 @min-[448px]/preview:w-20"
                      loading="lazy"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                      <Card.Title className="text-sm">Avocado Hackathon</Card.Title>
                      <Card.Description className="text-xs">Wed, 4:30 PM</Card.Description>
                    </div>
                  </Card>
                  {/* 2 */}
                  <Card className="flex flex-row gap-3 p-1 shadow-none" variant="tertiary">
                    <img
                      alt="Sound Electro event"
                      className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none @min-[448px]/preview:h-20 @min-[448px]/preview:w-20"
                      loading="lazy"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                      <Card.Title className="text-sm">Sound Electro | Beyond art</Card.Title>
                      <Card.Description className="text-xs">Fri, 8:00 PM</Card.Description>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted">Tabs</h3>
          <Tabs>
            <Tabs.ListContainer>
              <Tabs.List aria-label="Options">
                <Tabs.Tab id="overview">
                  Overview
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="analytics">
                  Analytics
                  <Tabs.Indicator />
                </Tabs.Tab>
                <Tabs.Tab id="settings">
                  Settings
                  <Tabs.Indicator />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel className="pt-2 text-sm text-muted" id="overview">
              Overview content goes here.
            </Tabs.Panel>
            <Tabs.Panel className="pt-2 text-sm text-muted" id="analytics">
              Analytics content goes here.
            </Tabs.Panel>
            <Tabs.Panel className="pt-2 text-sm text-muted" id="settings">
              Settings content goes here.
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 gap-4 @min-[448px]/preview:grid-cols-2">
          {/* Checkbox & Switch */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-muted">Controls</h3>

            <Checkbox defaultSelected name="notifications">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label className="text-sm">Enable notifications</Label>
              </Checkbox.Content>
            </Checkbox>

            <Checkbox name="marketing">
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label className="text-sm">Marketing emails</Label>
              </Checkbox.Content>
            </Checkbox>

            <Separator />

            <Switch defaultSelected>
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Label className="text-sm">Dark mode</Label>
              </Switch.Content>
            </Switch>

            <Switch>
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Label className="text-sm">Auto-save</Label>
              </Switch.Content>
            </Switch>
          </div>

          {/* Avatars & Spinners */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-muted">Avatars</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar color="accent">
                <Avatar.Fallback>AC</Avatar.Fallback>
              </Avatar>
              <Avatar color="success">
                <Avatar.Fallback>SC</Avatar.Fallback>
              </Avatar>
              <Avatar color="warning">
                <Avatar.Fallback>WR</Avatar.Fallback>
              </Avatar>
              <Avatar color="danger">
                <Avatar.Fallback>DG</Avatar.Fallback>
              </Avatar>
              <Avatar>
                <Avatar.Image
                  alt="User"
                  src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                />
                <Avatar.Fallback>US</Avatar.Fallback>
              </Avatar>
            </div>

            <h3 className="text-sm font-semibold text-muted">Spinners</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Spinner color="accent" size="sm" />
              <Spinner color="current" size="sm" />
              <Spinner color="success" size="sm" />
              <Spinner color="warning" size="sm" />
              <Spinner color="danger" size="sm" />
            </div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted">Slider</h3>
          <Slider defaultValue={60}>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Volume</Label>
              <Slider.Output className="text-sm text-muted" />
            </div>
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
        </div>

        {/* Radio Group Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted">Radio Group</h3>
          <RadioGroup className="flex-wrap" defaultValue="pro" name="plan" orientation="horizontal">
            <Radio value="starter">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Label className="text-sm">Starter</Label>
              </Radio.Content>
            </Radio>
            <Radio value="pro">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Label className="text-sm">Pro</Label>
              </Radio.Content>
            </Radio>
            <Radio value="enterprise">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Label className="text-sm">Enterprise</Label>
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </div>

        {/* Alert Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted">Alerts</h3>
          <div className="flex flex-col gap-2">
            <Alert status="accent">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Update available</Alert.Title>
              </Alert.Content>
            </Alert>
            <Alert status="success">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Payment successful</Alert.Title>
              </Alert.Content>
            </Alert>
            <Alert status="warning">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Storage almost full</Alert.Title>
              </Alert.Content>
            </Alert>
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Connection error</Alert.Title>
              </Alert.Content>
            </Alert>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-muted">Links</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="#">
              Learn more
              <Link.Icon />
            </Link>
            <Link href="#">
              Documentation
              <Link.Icon />
            </Link>
            <Link href="#">
              View source
              <Link.Icon />
            </Link>
          </div>
        </div>

        {/* Input Example */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Email</Label>
          <Input fullWidth placeholder="Enter your email" type="email" />
        </div>

        {/* Select Example */}
        <Select className="w-full" placeholder="Select an option">
          <Label>Country</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="usa" textValue="United States">
                United States
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="uk" textValue="United Kingdom">
                United Kingdom
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="canada" textValue="Canada">
                Canada
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="germany" textValue="Germany">
                Germany
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Dropdown Example */}
        <Dropdown>
          <Button aria-label="Menu" variant="secondary">
            Actions
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={() => {}}>
              <Dropdown.Section>
                <Header>File Actions</Header>
                <Dropdown.Item id="new" textValue="New file">
                  <Label>New file</Label>
                </Dropdown.Item>
                <Dropdown.Item id="copy" textValue="Copy">
                  <Label>Copy</Label>
                </Dropdown.Item>
                <Dropdown.Item id="edit" textValue="Edit">
                  <Label>Edit</Label>
                </Dropdown.Item>
              </Dropdown.Section>
              <Separator />
              <Dropdown.Section>
                <Dropdown.Item id="delete" textValue="Delete" variant="danger">
                  <Label>Delete</Label>
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Overlays Section */}
        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-sm font-semibold text-muted">Overlays</h3>
          <div className="flex flex-wrap gap-3">
            {/* Modal */}
            <Modal>
              <Button size="sm" variant="secondary">
                Open Modal
              </Button>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog className="sm:max-w-[360px]">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                        <Icon className="size-5" icon="gravity-ui:rocket" />
                      </Modal.Icon>
                      <Modal.Heading>Welcome to HeroUI</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-sm text-muted">
                        A beautiful, fast, and modern React UI library for building accessible and
                        customizable web applications with ease.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" slot="close">
                        Continue
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>

            {/* Popover */}
            <Popover>
              <Button isIconOnly aria-label="Info" size="sm" variant="tertiary">
                <Icon icon="gravity-ui:circle-info" />
              </Button>
              <Popover.Content>
                <Popover.Dialog>
                  <Popover.Arrow />
                  <Popover.Heading>Popover Info</Popover.Heading>
                  <p className="text-sm text-muted">This is a popover with helpful information.</p>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>

            {/* Alert Dialog - Danger */}
            <AlertDialog>
              <Button size="sm" variant="danger">
                Delete
              </Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-[400px]">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="danger" />
                      <AlertDialog.Heading>Delete item permanently?</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p className="text-sm text-muted">
                        This action cannot be undone. All data will be permanently removed.
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        Cancel
                      </Button>
                      <Button slot="close" variant="danger">
                        Delete
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          </div>

          {/* Additional Alert Dialog variants */}
          <div className="flex flex-wrap gap-3">
            <AlertDialog>
              <Button className="bg-success-soft text-success-soft-foreground" size="sm">
                Confirm
              </Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-[400px]">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="success" />
                      <AlertDialog.Heading>Complete this task?</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p className="text-sm text-muted">
                        This will mark the task as complete and notify all team members.
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        Not Yet
                      </Button>
                      <Button slot="close">Mark Complete</Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>

            <AlertDialog>
              <Button className="bg-warning-soft text-warning-soft-foreground" size="sm">
                Discard
              </Button>
              <AlertDialog.Backdrop>
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-[400px]">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="warning" />
                      <AlertDialog.Heading>Discard unsaved changes?</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p className="text-sm text-muted">
                        You have unsaved changes that will be permanently lost.
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button slot="close" variant="tertiary">
                        Keep Editing
                      </Button>
                      <Button slot="close">Discard</Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>

            {/* Popover with User Card */}
            <Popover>
              <Popover.Trigger aria-label="User info" className="flex items-center">
                <div className="flex cursor-pointer items-center gap-2">
                  <Avatar className="size-5" size="sm">
                    <Avatar.Image
                      alt="Zoe"
                      src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
                    />
                    <Avatar.Fallback>Z</Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm font-medium">Zoe</span>
                </div>
              </Popover.Trigger>
              <Popover.Content className="w-[280px]">
                <Popover.Dialog className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar size="md">
                        <Avatar.Image
                          alt="Zoe"
                          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
                        />
                        <Avatar.Fallback>Z</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Zoey Lang</span>
                        <span className="text-xs text-muted">@zoe</span>
                      </div>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>
                  <p className="text-sm text-muted">Design Engineer, @hero_ui lover 🎉</p>
                  <div className="flex gap-3">
                    <div className="flex gap-1">
                      <span className="text-sm font-semibold">4</span>
                      <span className="text-sm text-muted">Following</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm font-semibold">97.1K</span>
                      <span className="text-sm text-muted">Followers</span>
                    </div>
                  </div>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          </div>
        </div>

        {/* Modal Variations */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-muted">Modal Variations</h3>
          <div className="flex flex-wrap gap-3">
            {/* Modal with Form */}
            <Modal>
              <Button size="sm" variant="secondary">
                Contact Form
              </Button>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog className="sm:max-w-md">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                        <Icon className="size-5" icon="gravity-ui:envelope" />
                      </Modal.Icon>
                      <Modal.Heading>Contact Us</Modal.Heading>
                      <p className="text-sm text-muted">
                        Fill out the form below and we'll get back to you.
                      </p>
                    </Modal.Header>
                    <Modal.Body className="p-0.5">
                      <Surface variant="default">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1">
                            <Label className="text-sm">Name</Label>
                            <Input fullWidth placeholder="Enter your name" variant="secondary" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <Label className="text-sm">Email</Label>
                            <Input
                              fullWidth
                              placeholder="Enter your email"
                              type="email"
                              variant="secondary"
                            />
                          </div>
                        </div>
                      </Surface>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button slot="close" variant="secondary">
                        Cancel
                      </Button>
                      <Button slot="close">Send Message</Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>

            {/* Modal with Custom Backdrop */}
            <Modal>
              <Button size="sm" variant="secondary">
                Premium Modal
              </Button>
              <Modal.Backdrop
                className="bg-linear-to-t from-accent-soft/80 via-accent-soft/40 to-transparent dark:from-accent-soft/80 dark:via-accent-soft/40"
                variant="blur"
              >
                <Modal.Container>
                  <Modal.Dialog className="sm:max-w-[360px]">
                    <Modal.Header className="items-center text-center">
                      <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                        <Icon className="size-5" icon="gravity-ui:sparkles" />
                      </Modal.Icon>
                      <Modal.Heading>Premium Feature</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center text-sm text-muted">
                        This modal features a sophisticated gradient backdrop with blur effect that
                        adapts to light and dark modes.
                      </p>
                    </Modal.Body>
                    <Modal.Footer className="flex-col-reverse">
                      <Button className="w-full" slot="close">
                        Amazing!
                      </Button>
                      <Button className="w-full" slot="close" variant="secondary">
                        Close
                      </Button>
                    </Modal.Footer>
                    <Modal.CloseTrigger />
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>

            {/* Alert Dialog with Custom Backdrop */}
            <AlertDialog>
              <Button size="sm" variant="danger">
                Delete Account
              </Button>
              <AlertDialog.Backdrop
                className="bg-linear-to-t from-danger-soft/90 via-danger-soft/50 to-transparent dark:from-danger-soft/95 dark:via-danger-soft/60"
                variant="blur"
              >
                <AlertDialog.Container>
                  <AlertDialog.Dialog className="sm:max-w-[420px]">
                    <AlertDialog.CloseTrigger />
                    <AlertDialog.Header className="items-center text-center">
                      <AlertDialog.Icon status="danger">
                        <Icon className="size-5" icon="gravity-ui:triangle-exclamation" />
                      </AlertDialog.Icon>
                      <AlertDialog.Heading>Delete your account?</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p className="text-center text-sm text-muted">
                        This action cannot be undone. All your data will be permanently removed.
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer className="flex-col-reverse">
                      <Button className="w-full" slot="close" variant="tertiary">
                        Keep Account
                      </Button>
                      <Button className="w-full" slot="close" variant="danger">
                        Delete Forever
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          </div>
        </div>
      </main>
    </div>
  );
}
