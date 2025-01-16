import {showcaseId} from "../../constants";

import {Avatar} from "./avatar";
import {Badge} from "./badge";
import {Breadcrumbs} from "./breadcrumbs";
import {Button} from "./button";
import {Checkbox} from "./checkbox";
import {Chip} from "./chip";
import {CircularProgress} from "./circular-progress";
import {Code} from "./code";
import {Content} from "./content";
import {Divider} from "./divider";
import {Dropdown} from "./dropdown";
import {FontSize} from "./font-size";
import {Input} from "./input";
import {Link} from "./link";
import {Pagination} from "./pagination";
import {Select} from "./select";
import {Slider} from "./slider";
import {Switch} from "./switch";
import {Tabs} from "./tabs";

export function Showcase() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full " id={showcaseId}>
      <Content />
      <Avatar />
      <Badge />
      <Breadcrumbs />
      <Button />
      <Divider />
      <Checkbox />
      <Chip />
      <Code />
      <CircularProgress />
      <Dropdown />
      <Input />
      <Link />
      <Pagination />
      <Select />
      <Switch />
      <Slider />
      <Tabs />
      <FontSize />
    </div>
  );
}
