import {UPGRADE_COMMISSION_TIER} from "./config"
import {FormValues} from "./types"

export const getTierLabel = (tier?: string) => {
  if (!tier) return "Upgrade Commission Tier"

  return `Upgrade to ${tier.replaceAll("_", " ")}`
}

export const formatEndDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

export const isRewardConfigured = (
  reward: string | undefined,
  values: FormValues
) => {
  if (!reward) return false
  if (reward === "is_onboarded") return true
  if (reward === "flat_bonus") {
    return !!values.rewardVariables?.flat_bonus?.X
  }
  if (reward === UPGRADE_COMMISSION_TIER) {
    return !!values.rewardVariables?.upgrade_commission_tier?.tier_selection
  }
  return false
}
