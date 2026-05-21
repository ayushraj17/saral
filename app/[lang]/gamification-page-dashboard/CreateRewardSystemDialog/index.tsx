"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandList
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import EndDateField from "./components/EndDateField"
import OptionItem from "./components/OptionItem"
import SelectDialog from "./components/SelectDialog"
import { UPGRADE_COMMISSION_TIER, rewardEventOptions, rewardOptions, tierOptions } from "./config"
import { getDynamicLabel, getTierLabel } from "./util"
import { EventOption } from "./types"



const masterFormSchema = z.object({
    rewardEvent: z.string().min(1, "Please select an event"),
    rewardType: z.string().min(1, "Please select a reward"),
    isTimeBound: z.boolean().default(false),
    endDate: z.string().optional(),
}).refine(
    (data) => {
        if (data.isTimeBound) {
            return !!data.endDate
        }
        return true
    },
    {
        message: "Please select an end date",
        path: ["endDate"],
    }
)

export default function CreateYourRewardSystemDialog({ triggerLabel = "" }) {
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEventOpen, setIsEventOpen] = useState(false)
    const [isRewardOpen, setIsRewardOpen] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    // Top level stores for validated data properties
    const [confirmedEventVars, setConfirmedEventVars] = useState<
        Record<string, Record<string, string>>
    >({})
    const [confirmedRewardVars, setConfirmedRewardVars] = useState<
        Record<string, Record<string, string>>
    >({})

    const masterMethods = useForm<z.infer<typeof masterFormSchema>>({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: zodResolver(masterFormSchema as any),
        defaultValues: {
            rewardEvent: "",
            rewardType: "",
            isTimeBound: false,
            endDate: undefined,
        },
    })

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { errors: masterErrors },
    } = masterMethods

    const selectedEventValue = useWatch({ control, name: "rewardEvent" })
    const selectedRewardValue = useWatch({ control, name: "rewardType" })
    const isTimeBound = useWatch({ control, name: "isTimeBound" })

    const currentEventOpt = rewardEventOptions.find((o) => o.value === selectedEventValue)
    const currentRewardOpt = rewardOptions.find((o) => o.value === selectedRewardValue)

    const [activeEventValue, setActiveEventValue] = useState<string>("")
    const [activeRewardValue, setActiveRewardValue] = useState<string>("")

    const handleOpenChange = (
        open: boolean,
        setIsOpen: typeof setIsEventOpen,
        setActiveValue: typeof setActiveEventValue,
        selectedValue: string
    ) => {
        setIsOpen(open)
        if (open) {
            setActiveValue(selectedValue || "")
        }
    }

    const handleEventOpenChange = (open: boolean) =>
        handleOpenChange(open, setIsEventOpen, setActiveEventValue, selectedEventValue)

    const handleRewardOpenChange = (open: boolean) =>
        handleOpenChange(open, setIsRewardOpen, setActiveRewardValue, selectedRewardValue)

    const selectOption = (
        fieldName: "rewardEvent" | "rewardType",
        opt: EventOption,
        setConfirmedVars: typeof setConfirmedEventVars,
        setActiveValue: typeof setActiveEventValue,
        setDropdownOpen: typeof setIsEventOpen
    ) => {
        if (opt.variables.length === 0) {
            setValue(fieldName, opt.value, { shouldValidate: true })
            setConfirmedVars({})
            setDropdownOpen(false)
        } else {
            setActiveValue(opt.value)
        }
    }

    const saveOption = (
        fieldName: "rewardEvent" | "rewardType",
        opt: EventOption,
        validValues: Record<string, string>,
        setConfirmedVars: typeof setConfirmedEventVars,
        setDropdownOpen: typeof setIsEventOpen
    ) => {
        setValue(fieldName, opt.value, { shouldValidate: true })
        setConfirmedVars((prev) => ({ ...prev, [opt.value]: validValues }))
        setDropdownOpen(false)
    }

    useEffect(() => {
        if (selectedEventValue === "is_onboarded" && selectedRewardValue === UPGRADE_COMMISSION_TIER) {
            setValue("rewardType", "")
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setConfirmedRewardVars((prev) => {
                const next = { ...prev }
                delete next[UPGRADE_COMMISSION_TIER]
                return next
            })
        }
    }, [selectedEventValue, selectedRewardValue, setValue])

    const handleMasterSubmit = (values: z.infer<typeof masterFormSchema>) => {
        const combinedFinalPayload = {
            ...values,
            eventVariables: confirmedEventVars[values.rewardEvent] || {},
            rewardVariables: confirmedRewardVars[values.rewardType] || {},
        }
        console.log("FINAL SYSTEM PAYLOAD SUBMITTED:", combinedFinalPayload)
        setConfirmedEventVars({})
        setConfirmedRewardVars({})
        setActiveEventValue("")
        setActiveRewardValue("")
        setIsOpen(false)
        alert("Form submitted: " + JSON.stringify(combinedFinalPayload, null, 2))
        setTimeout(() => {
            reset()
        }, 500)
    }

    // Derived trigger labels
    const eventTriggerLabel = selectedEventValue
        ? getDynamicLabel(currentEventOpt, confirmedEventVars)
        : ""

    const rewardTriggerLabel = selectedRewardValue
        ? selectedRewardValue === UPGRADE_COMMISSION_TIER
            ? getTierLabel(confirmedRewardVars[UPGRADE_COMMISSION_TIER]?.tier_selection)
            : getDynamicLabel(currentRewardOpt, confirmedRewardVars)
        : ""


    const handleOnOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            setConfirmedEventVars({})
            setConfirmedRewardVars({})
            setActiveEventValue("")
            setActiveRewardValue("")
            reset()
        }
    }
    if (!mounted) {
        return (
            <Button className="w-full">
                {triggerLabel}
            </Button>
        )
    }

    console.log({ masterErrors })
    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleOnOpenChange}
        >
            <DialogTrigger asChild>
                <Button className="w-full">
                    {triggerLabel}
                </Button>
            </DialogTrigger>

            <DialogContent
                size="sm"
                aria-describedby={undefined}
            >
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <DialogTitle asChild>
                        <h1 className="typography-header-xl">Create your reward system</h1>
                    </DialogTitle>
                </DialogHeader>

                <FormProvider {...masterMethods}>
                    <div className="space-y-4 overflow-hidden px-1">

                        {/* Field 1: Reward Event */}
                        <RewardDropdownField
                            label="Reward event"
                            placeholder="Select an event"
                            isOpen={isEventOpen}
                            onOpenChange={handleEventOpenChange}
                            hasError={!!masterErrors.rewardEvent}
                            errorMessage={masterErrors.rewardEvent?.message}
                            triggerLabel={eventTriggerLabel}
                            options={rewardEventOptions}
                            renderOption={(opt) => (
                                <OptionItem
                                    key={opt.value}
                                    opt={opt}
                                    isSelected={activeEventValue === opt.value}
                                    confirmedVars={confirmedEventVars}
                                    onSelect={() =>
                                        selectOption(
                                            "rewardEvent",
                                            opt,
                                            setConfirmedEventVars,
                                            setActiveEventValue,
                                            setIsEventOpen
                                        )
                                    }
                                    onSave={(validValues) =>
                                        saveOption(
                                            "rewardEvent",
                                            opt,
                                            validValues,
                                            setConfirmedEventVars,
                                            setIsEventOpen
                                        )
                                    }
                                    onCancel={() => setIsEventOpen(false)}
                                />
                            )}
                        />

                        {/* Field 2: Reward With */}
                        <RewardDropdownField
                            label="Reward with"
                            placeholder="Select a reward"
                            isOpen={isRewardOpen}
                            onOpenChange={handleRewardOpenChange}
                            hasError={!!masterErrors.rewardType}
                            errorMessage={masterErrors.rewardType?.message}
                            triggerLabel={rewardTriggerLabel}
                            options={rewardOptions}
                            renderOption={(opt) => {
                                const isSelected = activeRewardValue === opt.value
                                // Special case: tier selection via SelectDialog
                                if (opt.value === UPGRADE_COMMISSION_TIER) {
                                    const savedTier =
                                        confirmedRewardVars[UPGRADE_COMMISSION_TIER]?.tier_selection
                                    const isTierDisabled = selectedEventValue === "is_onboarded"
                                    return (
                                        <div key={opt.value}>
                                            <SelectDialog
                                                value={opt.value}
                                                isSelected={activeRewardValue === UPGRADE_COMMISSION_TIER}
                                                triggerLabel={getTierLabel(savedTier)}
                                                fieldLabel="Upgrade to"
                                                dialogTitle="Select a commission tier"
                                                placeholder="Select a tier"
                                                options={tierOptions}
                                                selectedTier={savedTier}
                                                disabled={isTierDisabled}
                                                onSave={(tier) =>
                                                    saveOption(
                                                        "rewardType",
                                                        opt,
                                                        { tier_selection: tier },
                                                        setConfirmedRewardVars,
                                                        setIsRewardOpen
                                                    )
                                                }
                                            />
                                        </div>
                                    )
                                }

                                return (
                                    <OptionItem
                                        key={opt.value}
                                        opt={opt}
                                        isSelected={isSelected}
                                        confirmedVars={confirmedRewardVars}
                                        onSelect={() =>
                                            selectOption(
                                                "rewardType",
                                                opt,
                                                setConfirmedRewardVars,
                                                setActiveRewardValue,
                                                setIsRewardOpen
                                            )
                                        }
                                        onSave={(validValues) =>
                                            saveOption(
                                                "rewardType",
                                                opt,
                                                validValues,
                                                setConfirmedRewardVars,
                                                setIsRewardOpen
                                            )
                                        }
                                        onCancel={() => setIsRewardOpen(false)}
                                    />
                                )
                            }}
                        />

                        {/* Time-Bound Toggle */}
                        <div>
                            <div className="flex items-center justify-between pt-1">
                                <h1 className="typography-header-xs">Make the reward time bound</h1>
                                <Controller
                                    control={control}
                                    name="isTimeBound"
                                    render={({ field }) => (
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    )}
                                />
                            </div>
                            <div className="typography-tag-sm mt-1 text-secondary">
                                Choose an end date to stop this reward automatically.
                            </div>
                        </div>

                        {isTimeBound && <EndDateField control={control} />}

                        {/* Footer Actions */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                onClick={handleSubmit(
                                    handleMasterSubmit,
                                    (errors) => console.log("FORM VALIDATION ERRORS:", errors)
                                )}
                            >
                                Create Reward
                            </Button>
                        </div>

                    </div>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}


interface RewardDropdownFieldProps {
    label: string
    placeholder: string
    isOpen: boolean
    onOpenChange: (val: boolean) => void
    hasError: boolean
    errorMessage?: string
    triggerLabel: string
    options: EventOption[]
    renderOption: (opt: EventOption) => React.ReactNode
}

function RewardDropdownField({
    label,
    placeholder,
    isOpen,
    onOpenChange,
    hasError,
    errorMessage,
    triggerLabel,
    options,
    renderOption,
}: RewardDropdownFieldProps) {
    const hasValue = !!triggerLabel && triggerLabel !== placeholder

    return (
        <Field>
            <FieldLabel className="text-sm font-normal text-slate-500" required>
                {label}
            </FieldLabel>

            <Popover open={isOpen} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "h-11 w-full justify-between text-left text-[15px] font-normal transition-all",
                            hasError
                            && "border-destructive text-destructive",
                            !hasValue && "text-disabled",
                            isOpen && "border-primary ring-1 ring-primary"
                        )}
                    >
                        {hasValue ? triggerLabel : placeholder}
                        <ChevronDown
                            className={cn(
                                "size-6 shrink-0 stroke-icon transition-transform duration-200",
                                isOpen && "rotate-180"
                            )}
                        />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-(--radix-popover-trigger-width) p-0"
                    align="end"
                    sideOffset={2}
                >
                    <Command className="px-0">
                        <CommandList className="p-0">
                            <CommandGroup className="p-0 -mt-1">
                                {options.map(renderOption)}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {hasError && errorMessage && (
                <FieldError errors={[{ message: errorMessage }]} />
            )}
        </Field>
    )
}