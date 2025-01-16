import {Select, SelectItem} from "@nextui-org/react";

import {templates} from "../templates";
import {ConfigColors, Template, TemplateType} from "../types";

interface SelectTemplateProps {
  name: TemplateType | null;
  onChange: (template: Template) => void;
}

export function SelectTemplate({name, onChange}: SelectTemplateProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as TemplateType;
    const template = templates.find((template) => template.name === value);

    if (template) {
      onChange(template);
    }
  }

  return (
    <Select
      label={<div className="text-default-500">Prebuilt Themes</div>}
      labelPlacement="outside"
      placeholder="Select a theme"
      selectedKeys={name === null ? [] : [name]}
      onChange={handleChange}
    >
      {templates.map((template, index) => (
        <SelectItem
          key={template.name}
          startContent={<Swatch colors={template.value.light.brandColor} />}
          value={index}
        >
          {template.label}
        </SelectItem>
      ))}
    </Select>
  );
}

interface SwatchProps {
  colors: ConfigColors["brandColor"];
}

function Swatch({colors}: SwatchProps) {
  return (
    <div className="flex h-6 rounded-lg">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="w-2 h-full" style={{background: value}} />
      ))}
    </div>
  );
}
