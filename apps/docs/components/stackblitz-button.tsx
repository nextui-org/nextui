import React, {forwardRef} from "react";
import stackblitzSdk from "@stackblitz/sdk";
import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {StackblitzIcon} from "./icons";

import {useStackblitz} from "@/hooks/use-stackblitz";
import {Tooltip} from "@/../../packages/components/tooltip/src";
import {Button, ButtonProps} from "@/../../packages/components/button/src";

export interface StackblitzButtonProps extends ButtonProps {
  files: SandpackFiles;
  typescriptStrict?: boolean;
  className?: string;
  button?: React.ReactElement;
  icon?: React.ReactNode;
}

export const StackblitzButton = forwardRef<HTMLButtonElement, StackblitzButtonProps>(
  (props, ref) => {
    const {
      files,
      typescriptStrict = false,
      className,
      button = <Button />,
      icon = (
        <StackblitzIcon
          data-visible
          className="opacity-0 data-[visible=true]:opacity-100 transition-transform-opacity"
        />
      ),
      ...rest
    } = props;
    const {stackblitzPrefillConfig, entryFile} = useStackblitz({
      files,
      typescriptStrict,
    });

    return (
      <Tooltip closeDelay={0} content="Open in Stackblitz">
        {React.cloneElement(button, {
          ref,
          className,
          icon,
          onPress: () => {
            stackblitzSdk.openProject(stackblitzPrefillConfig, {
              openFile: [entryFile],
            });
          },
          children: icon,
          ...rest,
        })}
      </Tooltip>
    );
  },
);

StackblitzButton.displayName = "StackblitzButton";
