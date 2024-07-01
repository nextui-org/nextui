import {useEffect, useRef, useState} from "react";
import {Button, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {HexColorInput, HexColorPicker} from "react-colorful";
import Values from "values.js";
import {readableColor} from "color2k";
import {MoonIcon} from "@nextui-org/shared-icons";

import {colorWeight} from "../constants";
import {ColorPickerType} from "../types";
import {colorValuesToRgb} from "../utils/colors";

interface ColorPickerProps {
  hexColor: string;
  icon?: React.ReactNode;
  label: string;
  type: ColorPickerType;
  onChange: (hexColor: string) => void;
  onClose: (hexColor: string) => void;
}

export function ColorPicker({hexColor, icon, label, type, onChange, onClose}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [colorValues, setColorValues] = useState<Values[]>(new Values(hexColor).all(colorWeight));
  const initialized = useRef(false);
  const selectedColor = useRef(hexColor);

  function handleChange(hexColor: string) {
    const values = new Values(hexColor);

    onChange(hexColor);
    selectedColor.current = hexColor;
    setColorValues(values.all(colorWeight));
  }

  useEffect(() => {
    if (isOpen && !initialized.current) {
      setColorValues(new Values(hexColor).all(colorWeight));
      initialized.current = true;
    }
    if (!isOpen && initialized.current) {
      onClose(selectedColor.current);
      initialized.current = false;
    }
  }, [isOpen, hexColor, onClose]);

  return (
    <div>
      <Popover isOpen={isOpen} placement="bottom" onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button
            fullWidth
            className={getColor(type)}
            size="sm"
            style={{
              color: ["background", "foreground", "focus", "overlay"].includes(type)
                ? readableColor(hexColor)
                : undefined,
            }}
          >
            <MoonIcon />
            {label} {icon}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 max-w-48 my-2">
            <div className="grid grid-cols-5 gap-2">
              {colorValues?.slice(0, colorValues.length - 1).map((colorValue, index: number) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="h-6 w-6 rounded"
                    style={{backgroundColor: colorValuesToRgb(colorValue)}}
                  />
                  <span className="text-xs mt-1">{index === 0 ? 50 : index * 100}</span>
                </div>
              ))}
            </div>
            <HexColorPicker className="!w-full" color={hexColor} onChange={handleChange} />
            <HexColorInput
              prefixed
              className="px-2 py-1 w-full rounded-md"
              color={hexColor}
              onChange={handleChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function getColor(type: ColorPickerType) {
  switch (type) {
    case "primary":
      return "bg-primary text-primary-foreground";
    case "secondary":
      return "bg-secondary text-secondary-foreground";
    case "success":
      return "bg-success text-success-foreground";
    case "warning":
      return "bg-warning text-warning-foreground";
    case "danger":
      return "bg-danger text-danger-foreground";
    case "background":
      return "bg-background text-foreground";
    case "foreground":
      return "bg-foreground text-black";
    case "default":
      return "bg-default";
    case "content1":
      return "bg-content1 text-content1-foreground";
    case "content2":
      return "bg-content2 text-content2-foreground";
    case "content3":
      return "bg-content3 text-content3-foreground";
    case "content4":
      return "bg-content4 text-content4-foreground";
    case "divider":
      return "bg-divider";
    case "focus":
      return "bg-focus";
    case "overlay":
      return "bg-overlay";
    default:
      return undefined;
  }
}
