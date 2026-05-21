import { EventOption } from "./types"

export const getTierLabel = (tier?: string) => {
  if (!tier) return "Upgrade Commission Tier"

  return `Upgrade to ${tier.replaceAll("_", " ")}`
}

// Pure utility — resolves template variable placeholders in option labels
export const getDynamicLabel = (
  option: EventOption | undefined,
  confirmedVariables: Record<string, Record<string, string>>
) => {
  if (!option) return ""
  let label = option.label
  const optionVars = confirmedVariables[option.value] || {}
  option.variables.forEach((variable) => {
    const value = optionVars[variable.key]
    if (value) {
      if (variable.type === "select") {
        const selectedOpt = variable.options?.find((o) => o.value === value)
        label = label.replace(
          variable.key,
          selectedOpt ? selectedOpt.label.toLowerCase() : value
        )
      } else {
        label = label.replace(variable.key, value)
      }
    }
  })
  return label
}