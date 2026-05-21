import {IconName} from "lucide-react/dynamic"
import {InputProps} from "../../input"

export type VariableDefinition =
  | {
      key: string
      placeholder: string
      type?: "input"
      startIcon?: IconName
      inputProps?: InputProps
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
