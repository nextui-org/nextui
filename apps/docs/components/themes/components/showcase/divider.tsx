import {Divider as NextUIDivider} from "@nextui-org/react";

import {ShowcaseComponent} from "../showcase-component";

export function Divider() {
  return (
    <ShowcaseComponent name="Divider">
      <div className="max-w-md">
        <div className="space-y-1">
          <h4 className="text-medium font-medium">NextUI Components</h4>
          <p className="text-small text-default-700">
            Beautiful, fast and modern React UI library.
          </p>
        </div>
        <NextUIDivider className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-small">
          <div>Blog</div>
          <NextUIDivider orientation="vertical" />
          <div>Docs</div>
          <NextUIDivider orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    </ShowcaseComponent>
  );
}
