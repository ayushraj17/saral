import { Check } from "lucide-react"
import React from "react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    CommandItem
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import SelectComponent from "@/components/ui/user/SelectComponent"
import { getDynamicLabel } from "../util"
import { EventOption, VariableConfig } from "../types"

interface OptionItemProps {
    opt: EventOption
    isSelected: boolean
    confirmedVars: Record<string, Record<string, string>>
    onSelect: () => void
    onSave: (values: Record<string, string>) => void
    onCancel: () => void
}

function OptionItem({
    opt,
    isSelected,
    confirmedVars,
    onSelect,
    onSave,
    onCancel,
}: OptionItemProps) {
    return (
        <div className="flex flex-col px-1">
            <CommandItem
                value={opt.value}
                onSelect={onSelect}
                checked={isSelected}
            >
                <p className="typography-body-lg">
                    {getDynamicLabel(opt, isSelected ? confirmedVars : {})}
                </p>
                <Check
                    className={cn("size-5 stroke-primary opacity-0", {
                        "opacity-100": isSelected,
                    })}
                />
            </CommandItem>

            {isSelected && opt.variables.length > 0 && (
                <VariableFormContent
                    variables={opt.variables}
                    initialValues={confirmedVars[opt.value] || {}}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            )}
        </div>
    )
}


interface VariableFormProps {
    variables: VariableConfig[]
    initialValues: Record<string, string>
    onSave: (values: Record<string, string>) => void
    onCancel: () => void
}

function VariableInput({ variable }: { variable: VariableConfig }) {
    const { register, setValue, formState: { errors } } = useFormContext<Record<string, string>>()
    const { min, max, maxLength, required, type } = variable.inputProps || {}
    const fieldError = errors[variable.key]

    return (
        <Input
            startAdornment={variable.startAdronment && (
                <span className="typography-body-lg text-secondary">{variable.startAdronment}</span>
            )}
            placeholder={variable.placeholder}
            type={type}
            hasError={!!fieldError}
            {...register(variable.key, {
                required: required ? "Field is required" : false,
                min: min !== undefined ? { value: min, message: `Must be at least ${min}` } : undefined,
                max: max !== undefined ? { value: max, message: `Cannot exceed ${max.toLocaleString()}` } : undefined,
            })}

            onInput={(e) => {
                const el = e.target as HTMLInputElement
                if (maxLength && el.value.length > maxLength) {
                    el.value = el.value.slice(0, maxLength)
                    setValue(variable.key, el.value, { shouldValidate: true })
                }
            }}
        />
    )
}



function VariableSelect({ variable }: { variable: VariableConfig }) {
    const { control, formState: { errors } } = useFormContext<Record<string, string>>()
    const fieldError = errors[variable.key]

    return (
        <Controller
            control={control}
            name={variable.key}
            rules={{ required: "Please select a duration" }}
            render={({ field }) => (
                <SelectComponent
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    options={variable.options ?? []}
                    placeholder={variable.placeholder}
                    hasError={!!fieldError}
                    contentPosition="popper"
                />
            )}
        />
    )
}

function VariableFormContent({ variables, initialValues, onSave, onCancel }: VariableFormProps) {
    const methods = useForm<Record<string, string>>({ mode: "onChange", defaultValues: initialValues })
    const { handleSubmit, formState: { errors } } = methods

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); handleSubmit(onSave)() }}
                onKeyDown={(e) => e.stopPropagation()}
                className="flex flex-col gap-2"
            >
                <div className={cn("gap-2", variables.length > 1 ? "grid grid-cols-2" : "flex flex-col")}>
                    {variables.map((variable) => (
                        <div key={variable.key} className="flex w-full flex-col space-y-1">
                            {variable.type === "input" ? <VariableInput variable={variable} /> : <VariableSelect variable={variable} />}
                            {errors[variable.key] && (
                                <span className="text-[11px] font-medium text-destructive">
                                    {errors[variable.key]?.message}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 items-center gap-2">
                    <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </FormProvider>
    )
}


export default OptionItem