import React, {forwardRef} from "react";
import stackblitzSdk from "@stackblitz/sdk";
import {SandpackFiles} from "@codesandbox/sandpack-react/types";

import {PreviewButton} from "./preview-button";

import {StackblitzIcon} from "@/components/icons";
import {useStackblitz} from "@/hooks/use-stackblitz";

export interface StackblitzButtonProps {
  files: SandpackFiles;
  typescriptStrict?: boolean;
  className?: string;
}

export const StackblitzButton = forwardRef<HTMLButtonElement, StackblitzButtonProps>(
  (props, ref) => {
    const {files, typescriptStrict = false, className, ...rest} = props;
    const {stackblitzPrefillConfig, entryFile} = useStackblitz({
      files,
      typescriptStrict,
    });

    return (
      <PreviewButton
        ref={ref}
        className={className}
        icon={
          <StackblitzIcon
            data-visible
            className="opacity-0 data-[visible=true]:opacity-100 transition-transform-opacity"
          />
        }
        onPress={() => {
          stackblitzSdk.openProject(stackblitzPrefillConfig, {
            openFile: [entryFile],
          });
        }}
        {...rest}
      />
    );
  },
);

StackblitzButton.displayName = "StackblitzButton";
