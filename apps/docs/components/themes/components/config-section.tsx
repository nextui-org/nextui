import {clsx} from "@nextui-org/shared-utils";

interface ConfigurationSectionProps {
  children: React.ReactNode;
  cols?: number;
  id?: string;
  title: string;
}

export function ConfigSection({children, cols = 2, id, title}: ConfigurationSectionProps) {
  return (
    <div id={id}>
      <span className="font-semibold">{title}</span>
      <div
        className={clsx("grid flex-wrap gap-4 mt-2", {
          "grid-cols-2": cols === 2,
          "grid-cols-3": cols === 3,
        })}
      >
        {children}
      </div>
    </div>
  );
}
