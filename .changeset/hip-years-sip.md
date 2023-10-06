---
"@nextui-org/shared-icons": patch
"@nextui-org/popover": patch
"@nextui-org/tooltip": patch
"@nextui-org/select": patch
"@nextui-org/slider": patch
"@nextui-org/badge": patch
"@nextui-org/theme": patch
---

Changes

- Slider tooltip support added

Breaking Changes

- Popover API changed to improve the arrow implementation, arrow is now a pseudo element, this allows the popover to also move the arrow all-together, this change impacts the Popover, Tooltip and Select implementations.

Popover changes:

```diff
  <Popover
      showArrow
      backdrop="opaque"
      placement="right"
      classNames={{
-        base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
+        base: [
+          // the "before" pseudo element is now the popover' arrow
+          "before:bg-default-200"
+        ],
-        arrow: "bg-default-200",
+        content: [ // now we need to use the "content" slot to actually modify the popover' content styles
+          "py-3 px-4 border border-default-200",
+          "bg-gradient-to-br from-white to-default-300",
+          "dark:from-default-100 dark:to-default-50",
        ],
      }}
    >
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-small font-bold" {...titleProps}>
              Popover Content
            </h3>
            <div className="text-tiny">This is the popover content</div>
          </div>
        )}
      </PopoverContent>
  </Popover>
```

Tooltip changes:

```diff
 <Tooltip
      showArrow
      placement="right"
      content="I am a tooltip"
      classNames={{
-        base: "py-2 px-4 shadow-xl text-black bg-gradient-to-br from-white to-neutral-400",
-        arrow: "bg-neutral-400 dark:bg-white",
+        base: [
+          // the "before" pseudo element is now the popover' arrow
+          "before:bg-neutral-400 dark:before:bg-white",
+        ],
+        content: [ // now we need to use the "content" slot to actually modify the popover' content styles
+          "py-2 px-4 shadow-xl",
+          "text-black bg-gradient-to-br from-white to-neutral-400",
+        ],
      }}
    >
      <Button variant="flat">Hover me</Button>
</Tooltip>
```

Select changes:

```diff
 <Select
      items={users}
      label="Assigned to"
      className="max-w-xs"
      variant="bordered"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-unit-16",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
-          base: "p-0 border-small border-divider bg-background",
-          arrow: "bg-default-200",
+          base: "before:bg-default-200", // the before pseudo element controls the popover's arrow
+          content: "p-0 border-small border-divider bg-background", // now instead of the "base" slot we use the "content" slot
        },
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Avatar
              alt={item.data.name}
              className="flex-shrink-0"
              size="sm"
              src={item.data.avatar}
            />
            <div className="flex flex-col">
              <span>{item.data.name}</span>
              <span className="text-default-500 text-tiny">({item.data.email})</span>
            </div>
          </div>
        ));
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}`;
```
