import {Button} from "@heroui/react";
import React from "react";

export const ButtonsDemo = () => {
  return (
    <div className="grid w-full max-w-[352px] grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-2">
      <Button size="sm">Call to action</Button>
      <Button size="sm" variant="secondary">
        Call to action
      </Button>
      <Button size="sm" variant="tertiary">
        Call to action
      </Button>
      <Button size="sm" variant="danger">
        Call to action
      </Button>
      <Button size="sm" variant="danger-soft">
        Call to action
      </Button>
      <Button size="sm" variant="ghost">
        Call to action
      </Button>
    </div>
  );
};
