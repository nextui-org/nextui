import type {ColorVariableValue} from "../../hooks/use-color-variables";

import React from "react";

import {groupVariablesByCategory} from "../../hooks/use-color-variables";

interface ColorVariablesListProps {
  variables: ColorVariableValue[];
}

interface ColorSwatchProps {
  value: string;
  name: string;
}

function ColorSwatch({name, value}: ColorSwatchProps) {
  return (
    <div
      className="size-6 shrink-0 rounded border border-border/50"
      style={{backgroundColor: value}}
      title={`${name}: ${value}`}
    />
  );
}

interface ColorVariableRowProps {
  variable: ColorVariableValue;
}

function ColorVariableRow({variable}: ColorVariableRowProps) {
  const displayValue = variable.computedValue || variable.rawValue || "unset";

  return (
    <div className="flex items-start gap-2 py-1">
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="min-w-0 font-mono text-xs font-semibold wrap-anywhere text-foreground">
            {variable.name}
          </span>
          <ColorSwatch name={variable.name} value={displayValue} />
        </div>
        <span className="font-mono text-xs wrap-anywhere text-accent">{displayValue}</span>
      </div>
    </div>
  );
}

export function ColorVariablesList({variables}: ColorVariablesListProps) {
  const groupedVariables = groupVariablesByCategory(variables);

  const categoryOrder = [
    "primitive",
    "base",
    "surface",
    "overlay",
    "semantic",
    "accent",
    "status",
    "field",
    "border",
  ];

  const categoryLabels: Record<string, string> = {
    primitive: "Primitives",
    base: "Base",
    surface: "Surface",
    overlay: "Overlay",
    semantic: "Semantic",
    accent: "Accent",
    status: "Status",
    field: "Fields",
    border: "Borders",
  };

  return (
    <div className="flex min-w-0 flex-col gap-4 pe-2 text-sm">
      {categoryOrder.map((category) => {
        const categoryVars = groupedVariables[category];

        if (!categoryVars || categoryVars.length === 0) return null;

        return (
          <div key={category} className="flex flex-col gap-1">
            <h3 className="mb-1 text-xs font-semibold tracking-wider text-muted uppercase">
              {categoryLabels[category] || category}
            </h3>
            {categoryVars.map((variable) => (
              <ColorVariableRow key={variable.name} variable={variable} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
