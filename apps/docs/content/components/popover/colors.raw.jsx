import {Popover, PopoverTrigger, PopoverContent, Button} from "@heroui/react";

export default function App() {
  const content = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Popover Content</div>
        <div className="text-tiny">This is the popover content</div>
      </div>
    </PopoverContent>
  );

  const colors = ["default", "primary", "secondary", "success", "warning", "danger", "foreground"];

  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Popover key={color} color={color} placement="top">
          <PopoverTrigger>
            <Button className="capitalize" color={color}>
              {color}
            </Button>
          </PopoverTrigger>
          {content}
        </Popover>
      ))}
    </div>
  );
}
