import {EventOption} from "@/components/ui/user/ComboBox/types"

export const UPGRADE_COMMISSION_TIER = "upgrade_commission_tier"

export const rewardEventOptions: EventOption[] = [
  {
    label: "Cross $X in sales",
    value: "cross_sales",
    variables: [
      {
        key: "X",
        placeholder: "e.g. 100",
        type: "input",
        startIcon: "dollar-sign",
        inputType: "number",
      },
    ],
  },
  {
    label: "Post X times every Y period",
    value: "post_times",
    variables: [
      {
        key: "X",
        placeholder: "e.g. 3",
        type: "input",
        inputType: "number",
      },
      {
        key: "Y",
        placeholder: "Select duration",
        type: "select",
        options: [
          {value: "14", label: "14 Days"},
          {value: "30", label: "30 Days"},
          {value: "60", label: "60 Days"},
          {value: "90", label: "90 Days"},
          {value: "180", label: "6 months"},
          {value: "365", label: "1 year"},
        ],
      },
    ],
  },
  {
    label: "Is Onboarded",
    value: "is_onboarded",
    variables: [],
  },
]

export const rewardOptions: EventOption[] = [
  {
    label: "Flat $X bonus",
    value: "flat_bonus",
    variables: [
      {
        key: "X",
        placeholder: "e.g. 100",
        startIcon: "dollar-sign",
        type: "input",
      },
    ],
  },
]

export const tierOptions = [
  {
    label: "Tier 1",
    value: "tier_1",
  },
  {
    label: "Tier 2",
    value: "tier_2",
  },
  {
    label: "Tier 3",
    value: "tier_3",
  },
]
