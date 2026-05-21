import {FieldValues, Path} from "react-hook-form"
import {VariableDefinition} from "./types"

export function resolveVariableDisplay(
  variable: VariableDefinition,
  value: string | undefined
): string | undefined {
  if (!value) return undefined
  if (variable.type === "select") {
    return variable.options.find((o) => o.value === value)?.label ?? value
  }
  return value
}

export const varPath = <T extends FieldValues>(
  name: Path<T>,
  optionValue: string,
  varKey: string
) => `${String(name)}Variables.${optionValue}.${varKey}` as Path<T>
