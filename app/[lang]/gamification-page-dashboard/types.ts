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
