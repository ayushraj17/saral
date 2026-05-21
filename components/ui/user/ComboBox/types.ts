import {IconName} from "lucide-react/dynamic"

export type VariableDefinition =
  | {
      key: string
      placeholder: string
      type?: "input"
      startIcon?: IconName
      inputType?: "text" | "number"
    }
  | {
      key: string
      placeholder: string
      type: "select"
      options: {value: string; label: string}[]
      selectedLabel?: string
      fieldLabel?: string
    }

export type EventOption = {
  label: string
  value: string
  variables: VariableDefinition[]
  disabled?: boolean
}
