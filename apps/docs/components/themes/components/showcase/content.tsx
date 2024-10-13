import {Card, CardBody} from "@nextui-org/react";

import {contentShowcaseId} from "../../constants";
import {ShowcaseComponent} from "../showcase-component";

export function Content() {
  return (
    <ShowcaseComponent id={contentShowcaseId} name="Content colors">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-content1-foreground">
            <p>Content 1</p>
            <p>bg-content1 text-content-foreground1</p>
          </CardBody>
        </Card>
        <Card className="bg-content2 text-content2-foreground">
          <CardBody>
            <p>Content 2</p>
            <p>bg-content2 text-content-foreground2</p>
          </CardBody>
        </Card>
        <Card className="bg-content3 text-content3-foreground">
          <CardBody>
            <p>Content 3</p>
            <p>bg-content3 text-content-foreground3</p>
          </CardBody>
        </Card>
        <Card className="bg-content4 text-content4-foreground">
          <CardBody>
            <p>Content 4</p>
            <p>bg-content4 text-content-foreground4</p>
          </CardBody>
        </Card>
      </div>
    </ShowcaseComponent>
  );
}
