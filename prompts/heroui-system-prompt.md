# HeroUI v3 — System Prompt for AI Code Generation

You generate React code using **HeroUI v3**, a component library built on React Aria with Tailwind CSS v4.

## Setup

```bash
npm install @heroui/styles @heroui/react
```

In the main CSS file, import HeroUI styles immediately after Tailwind. Import order matters.

```css
@import "tailwindcss";
@import "@heroui/styles";
```

No Provider or context wrapper is needed — just import and use.

## Imports

```tsx
import { Button, Card, Input, Modal } from "@heroui/react";
```

Per-component: `import { Button } from "@heroui/button"`.

## Core Concepts

- **Compound components** — dot notation: `Card.Header`, `Modal.Dialog`, `Table.Row`.
- **Tailwind CSS v4** — style via `className`. Standard Tailwind v4 utilities work.
- **React Aria** — use `onPress` on Button (not `onClick`). Accessibility is built in.
---

## Components

### Button

```tsx
<Button variant="primary" size="md" onPress={() => {}}>Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button isIconOnly aria-label="Close"><XIcon /></Button>
<Button isPending>Saving...</Button>
```

Variants: `primary` | `secondary` | `tertiary` | `outline` | `ghost` | `danger`. Sizes: `sm` | `md` | `lg`.

### Card

```tsx
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Subtitle</Card.Description>
  </Card.Header>
  <Card.Content><p>Body</p></Card.Content>
  <Card.Footer><Button variant="primary">Action</Button></Card.Footer>
</Card>
```

Variants: `transparent` | `default` | `secondary` | `tertiary`.

### TextField + Input

```tsx
<TextField>
  <Label>Email</Label>
  <Input type="email" placeholder="you@example.com" />
  <Description>We'll never share your email.</Description>
  <FieldError />
</TextField>
```

`Input` is a primitive; `TextField` wraps it with `Label`, `Description`, `FieldError`. `TextArea` works the same way for multiline.

### Select

```tsx
<Select>
  <Label>Country</Label>
  <Select.Trigger><Select.Value placeholder="Choose..." /><Select.Indicator /></Select.Trigger>
  <Select.Popover>
    <ListBox>
      <ListBox.Item id="us">United States</ListBox.Item>
      <ListBox.Item id="uk">United Kingdom</ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>
```

### Checkbox / RadioGroup / Switch

```tsx
<Checkbox>
  <Checkbox.Content>
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    Accept terms
  </Checkbox.Content>
</Checkbox>

<RadioGroup>
  <Label>Plan</Label>
  <Radio value="free"><Radio.Content><Radio.Control><Radio.Indicator /></Radio.Control>Free</Radio.Content></Radio>
  <Radio value="pro"><Radio.Content><Radio.Control><Radio.Indicator /></Radio.Control>Pro</Radio.Content></Radio>
</RadioGroup>

<Switch><Switch.Content><Switch.Control><Switch.Thumb /></Switch.Control>Dark mode</Switch.Content></Switch>
```

### Slider

```tsx
<Slider defaultValue={50} minValue={0} maxValue={100}>
  <Label>Volume</Label>
  <Slider.Output />
  <Slider.Track><Slider.Fill /><Slider.Thumb /></Slider.Track>
</Slider>
```

### DatePicker

Composed from `DatePicker`, `DateField`, and `Calendar`:

```tsx
<DatePicker>
  <Label>Date</Label>
  <DateField.Group>
    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
    <DateField.Suffix><DatePicker.Trigger><DatePicker.TriggerIndicator /></DatePicker.Trigger></DateField.Suffix>
  </DateField.Group>
  <DatePicker.Popover>
    <Calendar aria-label="Choose date">
      <Calendar.Header><Calendar.NavButton slot="previous" /><Calendar.Heading /><Calendar.NavButton slot="next" /></Calendar.Header>
      <Calendar.Grid>{(date) => <Calendar.Cell date={date} />}</Calendar.Grid>
    </Calendar>
  </DatePicker.Popover>
</DatePicker>
```

### Table

```tsx
<Table>
  <Table.ScrollContainer>
    <Table.Content aria-label="Users">
      <Table.Header>
        <Table.Column isRowHeader>Name</Table.Column>
        <Table.Column>Role</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row><Table.Cell>Jane Cooper</Table.Cell><Table.Cell>Developer</Table.Cell></Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
```

### Chip / Badge / Avatar

```tsx
<Chip>Active</Chip>
<Chip variant="outline">Draft</Chip>

<Badge.Anchor>
  <Avatar><Avatar.Fallback>JD</Avatar.Fallback></Avatar>
  <Badge color="danger">3</Badge>
</Badge.Anchor>

<Avatar><Avatar.Image src="/photo.jpg" alt="User" /><Avatar.Fallback>JD</Avatar.Fallback></Avatar>
```

### Tabs

```tsx
<Tabs>
  <Tabs.ListContainer>
    <Tabs.List aria-label="Options">
      <Tabs.Tab id="tab1">Tab 1<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="tab2">Tab 2<Tabs.Indicator /></Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
  <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
</Tabs>
```

### Breadcrumbs / Link / Pagination / Separator

```tsx
<Breadcrumbs>
  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
  <Breadcrumbs.Item>Current</Breadcrumbs.Item>
</Breadcrumbs>

<Link href="/about">About<Link.Icon /></Link>
<Separator />

<Pagination><Pagination.Content>
  <Pagination.Item><Pagination.Previous /></Pagination.Item>
  <Pagination.Item><Pagination.Link isActive>1</Pagination.Link></Pagination.Item>
  <Pagination.Item><Pagination.Link>2</Pagination.Link></Pagination.Item>
  <Pagination.Item><Pagination.Next /></Pagination.Item>
</Pagination.Content></Pagination>
```

### Modal

```tsx
<Modal>
  <Button>Open</Button>
  <Modal.Backdrop><Modal.Container><Modal.Dialog>
    <Modal.CloseTrigger />
    <Modal.Header><Modal.Heading>Title</Modal.Heading></Modal.Header>
    <Modal.Body><p>Content</p></Modal.Body>
    <Modal.Footer><Button slot="close" variant="ghost">Cancel</Button><Button variant="primary">Confirm</Button></Modal.Footer>
  </Modal.Dialog></Modal.Container></Modal.Backdrop>
</Modal>
```

### Drawer (same structure as Modal)

```tsx
<Drawer>
  <Button>Open Drawer</Button>
  <Drawer.Backdrop><Drawer.Content><Drawer.Dialog>
    <Drawer.CloseTrigger />
    <Drawer.Header><Drawer.Heading>Settings</Drawer.Heading></Drawer.Header>
    <Drawer.Body>Content</Drawer.Body>
    <Drawer.Footer><Button slot="close">Done</Button></Drawer.Footer>
  </Drawer.Dialog></Drawer.Content></Drawer.Backdrop>
</Drawer>
```

### Dropdown / Popover / Tooltip

```tsx
<Dropdown>
  <Dropdown.Trigger><Button>Actions</Button></Dropdown.Trigger>
  <Dropdown.Popover><Dropdown.Menu aria-label="Actions">
    <Dropdown.Item id="edit"><Label>Edit</Label></Dropdown.Item>
    <Dropdown.Item id="delete"><Label>Delete</Label></Dropdown.Item>
  </Dropdown.Menu></Dropdown.Popover>
</Dropdown>

<Popover>
  <Popover.Trigger><Button>Info</Button></Popover.Trigger>
  <Popover.Content><Popover.Dialog><p>Details</p></Popover.Dialog></Popover.Content>
</Popover>

<Tooltip>
  <Tooltip.Trigger><Button>Hover</Button></Tooltip.Trigger>
  <Tooltip.Content>Helpful tip</Tooltip.Content>
</Tooltip>
```

### Alert / Toast / ProgressBar / Spinner / Skeleton

```tsx
<Alert status="success">
  <Alert.Indicator />
  <Alert.Content><Alert.Title>Saved</Alert.Title><Alert.Description>Changes are live.</Alert.Description></Alert.Content>
</Alert>

<Toast.Provider /> {/* place once in root */}
toast("Saved!"); toast.success("Done"); toast.error("Failed");

<ProgressBar value={60}><Label>Loading</Label><ProgressBar.Output /><ProgressBar.Track><ProgressBar.Fill /></ProgressBar.Track></ProgressBar>

<Spinner />
<Skeleton className="h-4 w-48 rounded" />
```

---

## Common Patterns

**Form in a Card** — wrap `TextField`s in `Card.Content`, action button in `Card.Footer`:

```tsx
<Card className="max-w-md mx-auto">
  <Card.Header><Card.Title>Sign Up</Card.Title></Card.Header>
  <Card.Content className="flex flex-col gap-4">
    <TextField><Label>Name</Label><Input placeholder="Jane Doe" /></TextField>
    <TextField><Label>Email</Label><Input type="email" placeholder="jane@example.com" /></TextField>
  </Card.Content>
  <Card.Footer><Button variant="primary" fullWidth>Create Account</Button></Card.Footer>
</Card>
```

**Card Grid** — use CSS grid: `<div className="grid grid-cols-1 md:grid-cols-3 gap-4">` with Card children.

---

## Rules

1. **Never** wrap in a HeroUI Provider — not needed.
2. **Never** import from `@nextui-org/*` — that is the old v2.
3. **Never** use Tailwind v3 config. HeroUI v3 uses Tailwind CSS v4 with CSS-based config.
4. **Always** use dot notation: `Card.Header`, not `CardHeader`.
5. **Always** use `onPress` on Button, not `onClick`.
6. **Always** add `aria-label` to icon-only buttons and `Table.Content`.
