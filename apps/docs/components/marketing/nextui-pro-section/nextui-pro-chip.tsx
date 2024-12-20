import {Chip} from "@nextui-org/react";

export const NextUIProChip = () => (
  <Chip
    classNames={{
      base: "ml-0.5 transition-colors bg-gradient-to-br from-cyan-600 to-blue-600",
      content: "text-tiny font-semibold",
    }}
    color="primary"
    size="sm"
  >
    PRO
  </Chip>
);
