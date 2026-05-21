"use client"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Switch} from "@/components/ui/switch"
import SelectComponent, {EventOption} from "@/components/ui/user/ComboBox"
import Typography from "@/components/ui/user/Typography"
import {CalendarIcon, X} from "lucide-react"
import {useEffect} from "react"
import {Controller, FieldValues, useForm} from "react-hook-form"

const rewardEventOptions: EventOption[] = [
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
    renderLabel: (vars) => <span>Cross $ {vars["X"]} in sales</span>,
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
    renderLabel: (vars) => (
      <span>
        Post $ {vars["X"]} times every {vars["Y"]} period
      </span>
    ),
  },
  {
    label: "Is Onboarded",
    value: "is_onboarded",
    variables: [],
    renderLabel: () => <span>Is Onboarded</span>,
  },
]

const rewardOptions: EventOption[] = [
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
    renderLabel: (vars) => <span>Flat ${vars.X} bonus</span>,
  },
  {
    label: "Upgrade Commission Tier",
    value: "upgrade_commission_tier",
    renderLabel: (vars) => <span>Upgrade to {vars.tier}</span>,
    variables: [
      {
        key: "tier",
        placeholder: "Select a tier",
        type: "selectDialog",
        dialogTitle: "Select a commission tier",
        fieldLabel: "Upgrade to",
        selectedLabel: "Upgrade to {tier}",
        options: [
          {value: "tier_1", label: "Tier Name 1"},
          {value: "tier_2", label: "Tier Name 2"},
          {value: "tier_3", label: "Tier Name 3"},
        ],
      },
    ],
  },
]

const formatEndDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

const isRewardConfigured = (reward: string | undefined, values: FormValues) => {
  if (!reward) return false
  if (reward === "is_onboarded") return true
  if (reward === "flat_bonus") {
    return !!values.rewardVariables?.flat_bonus?.X
  }
  if (reward === "upgrade_commission_tier") {
    return !!values.rewardVariables?.upgrade_commission_tier?.tier
  }
  return false
}

type FormValues = FieldValues
const CreateYourRewardSystemDialog = () => {
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

  const rewardConfigured = isRewardConfigured(reward, formValues)

  const canCreateReward =
    !!rewardEvent && rewardConfigured && (!isTimeBound || !!endDate)

  const disableUpgradeCommissionTier = rewardEvent === "is_onboarded"

  useEffect(() => {
    if (disableUpgradeCommissionTier) {
      setValue("reward", "")
    }
  }, [disableUpgradeCommissionTier, setValue])

  useEffect(() => {
    if (reward === "upgrade_commission_tier" && rewardConfigured) {
      setValue("isTimeBound", true)
      if (!endDate) {
        setValue("endDate", new Date().toISOString())
      }
    }
  }, [reward, rewardConfigured, endDate, setValue])

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Gamification</Button>
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
            <SelectComponent
              control={control}
              name="rewardEvent"
              placeholder="Select an event"
              options={rewardEventOptions}
            />
          </div>

          <div className="space-y-3">
            <Label required>Reward with</Label>

            <SelectComponent
              control={control}
              name="reward"
              placeholder="Select a reward"
              options={rewardOptions.map((i) => ({
                ...i,
                disabled:
                  disableUpgradeCommissionTier &&
                  i.value === "upgrade_commission_tier",
              }))}
            />
          </div>

          {
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
          }

          {isTimeBound && (
            <div className="space-y-3">
              <Label required>End date</Label>

              <Controller
                control={control}
                name="endDate"
                render={({field}) => (
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full items-center justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        <Typography
                          variant="bodyLg"
                          as="span"
                          className={
                            field.value ? "text-foreground" : "text-disabled"
                          }
                        >
                          {field.value
                            ? formatEndDate(field.value)
                            : "Select end date"}
                        </Typography>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                      // avoidCollisions={false}
                      sideOffset={8}
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-4 md:flex-nowrap">
            <Button variant="outline" className="flex-1/2">
              Cancel
            </Button>
            <Button className="flex-1/2" disabled={!canCreateReward}>
              Create Reward
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateYourRewardSystemDialog
