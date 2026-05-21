
type RewardEventVariables = {
  [key: string]: Record<string, string>
}

type RewardVariables = {
  [key: string]: Record<string, string>
}

export type FormValues = {
  reward?: string
  rewardEvent?: string
  isTimeBound: boolean
  endDate?: string
  rewardEventVariables?: RewardEventVariables
  rewardVariables?: RewardVariables
}

export interface EventOption {
  label: string
  value: string
  variables: VariableConfig[]
}

export interface VariableConfig {
  key: string
  placeholder: string
  type: "input" | "select"
  startAdronment?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    min?: number
    max?: number
    maxLength?: number
    required?: boolean
  }
  options?: { value: string; label: string }[]
}