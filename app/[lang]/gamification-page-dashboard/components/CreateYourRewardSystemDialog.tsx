"use client"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import ComboBox from "@/components/ui/user/ComboBox"
import Typography from "@/components/ui/user/Typography"

import {X} from "lucide-react"
import {useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import {
  rewardEventOptions,
  rewardOptions,
  tierOptions,
  UPGRADE_COMMISSION_TIER,
} from "../config"
import {FormValues} from "../types"
import {getTierLabel, isRewardConfigured} from "../util"
import DialogFooter from "./DialogFooter"
import EndDateField from "./EndDateField"
import SelectDialog from "./SelectDialog"

const CreateYourRewardSystemDialog = ({
  triggerLabel,
}: {
  triggerLabel: string
}) => {
  const {control, handleSubmit, watch, setValue} = useForm<FormValues>({
    defaultValues: {
      isTimeBound: false,
    },
  })

  const reward = watch("reward")
  const rewardEvent = watch("rewardEvent")
  const isTimeBound = watch("isTimeBound")
  const endDate = watch("endDate")
  const formValues = watch()

  const selectedTier = watch(
    "rewardVariables.upgrade_commission_tier.tier_selection"
  )

  const rewardConfigured = isRewardConfigured(reward, formValues)
  const hasRequiredEndDate = !isTimeBound || !!endDate

  const canCreateReward =
    !!rewardEvent && rewardConfigured && hasRequiredEndDate

  const disableUpgradeCommissionTier = rewardEvent === "is_onboarded"

  useEffect(() => {
    if (disableUpgradeCommissionTier) {
      setValue("reward", "")
    }
  }, [disableUpgradeCommissionTier, setValue])

  const handleTierSave = (value: string) => {
    setValue("reward", UPGRADE_COMMISSION_TIER)
    setValue("rewardVariables.upgrade_commission_tier.tier_selection", value)
  }

  const onSubmit = async (payload: FormValues) => {
    const cleanedPayload = {
      ...payload,
      rewardEventVariables: payload.rewardEvent
        ? {
            [payload.rewardEvent]:
              payload.rewardEventVariables?.[payload.rewardEvent],
          }
        : undefined,
      rewardVariables: payload.reward
        ? {
            [payload.reward]: payload.rewardVariables?.[payload.reward],
          }
        : undefined,
    }
    console.log("Form submitted", cleanedPayload)
  }

  console.log("selectedTier", formValues)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-100" showCloseButton={false}>
        <DialogTitle className="flex items-center justify-between">
          <Typography variant="headingXl">Create your reward system</Typography>
          <DialogClose>
            <X className="text-secondary" />
          </DialogClose>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            <Label required>Reward event</Label>
            <ComboBox
              control={control}
              name="rewardEvent"
              placeholder="Select an event"
              options={rewardEventOptions}
            />
          </div>

          <div className="space-y-3">
            <Label required>Reward with</Label>
            <ComboBox
              control={control}
              name="reward"
              placeholder="Select a reward"
              options={rewardOptions}
              externalOptions={[
                {
                  option: {
                    value: UPGRADE_COMMISSION_TIER,
                    label: getTierLabel(selectedTier),
                    variables: [],
                  },
                  commandItemProps: {
                    disabled: disableUpgradeCommissionTier,
                    checked:
                      Boolean(selectedTier) &&
                      reward === UPGRADE_COMMISSION_TIER,
                    onClick: selectedTier
                      ? undefined
                      : () => {
                          setValue("reward", UPGRADE_COMMISSION_TIER)
                        },
                  },
                  render: () => (
                    <SelectDialog
                      triggerLabel={getTierLabel(selectedTier)}
                      fieldLabel="Upgrade to"
                      dialogTitle="Select a commission tier"
                      placeholder="Select a tier"
                      options={tierOptions}
                      selectedTier={selectedTier}
                      onSave={handleTierSave}
                    />
                  ),
                },
              ]}
            />
          </div>

          <div className="h-12">
            <div className="flex items-center justify-between space-y-2">
              <Typography variant="headingXs">
                Make the reward time bound
              </Typography>
              <Controller
                control={control}
                name="isTimeBound"
                render={({field}) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <Typography variant="tagSm" as="div" className="text-secondary">
              Choose an end date to stop this reward automatically.
            </Typography>
          </div>

          {isTimeBound && <EndDateField control={control} />}
          <DialogFooter canCreateReward={canCreateReward} />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateYourRewardSystemDialog
