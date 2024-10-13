import {ShowcaseComponent} from "../showcase-component";

export default function FontSizeShowcase() {
  return (
    <ShowcaseComponent name="Line height (rem)">
      <div className="flex flex-col gap-2">
        <p className="text-tiny">Tiny</p>
        <p className="text-small">Small</p>
        <p className="text-medium">Medium</p>
        <p className="text-large">Large</p>
      </div>
    </ShowcaseComponent>
  );
}
