"use client"
import {Button} from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {Input} from "@/components/ui/input"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SelectComponent from "@/components/ui/user/SelectComponent"
import Typography from "@/components/ui/user/Typography"
import {cn} from "@/lib/utils"
import {Check, ChevronDown} from "lucide-react"
import {DynamicIcon, IconName} from "lucide-react/dynamic"
import React from "react"
import {Control, Controller, FieldValues, Path, useWatch} from "react-hook-form"

// ─── Types ────────────────────────────────────────────────────────────────────

export type VariableDefinition =
  | {
      key: string
      placeholder: string
      type?: "input"
      startIcon?: IconName
      inputType?: "text" | "number"
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const varPath = <T extends FieldValues>(
  name: Path<T>,
  optionValue: string,
  varKey: string
) => `${String(name)}Variables.${optionValue}.${varKey}` as Path<T>

function resolveVariableDisplay(
  variable: VariableDefinition,
  value: string | undefined
): string | undefined {
  if (!value) return undefined
  if (variable.type === "select") {
    return variable.options.find((o) => o.value === value)?.label ?? value
  }
  return value
}

// ─── OptionLabel ──────────────────────────────────────────────────────────────

function OptionLabel<T extends FieldValues>({
  option,
  control,
  name,
}: {
  option: EventOption
  control: Control<T>
  name: Path<T>
}) {
  const variableValues = useWatch({
    control,
    name: option.variables.map((v) =>
      varPath(name, option.value, v.key)
    ) as Path<T>[],
  })

  const values = Array.isArray(variableValues)
    ? variableValues
    : [variableValues]

  let resolved = option.label
  option.variables.forEach((variable, index) => {
    const value = values[index]
    if (value) {
      const display = resolveVariableDisplay(variable, value) ?? value
      resolved = resolved.replace(variable.key, display)
    }
  })

  return <>{resolved}</>
}

// ─── VariableInput ────────────────────────────────────────────────────────────

function VariableInput<T extends FieldValues>({
  variable,
  control,
  name,
  optionValue,
  hasError,
}: {
  variable: VariableDefinition
  control: Control<T>
  name: Path<T>
  optionValue: string
  hasError: boolean
}) {
  const fieldPath = varPath(name, optionValue, variable.key)

  if (variable.type === "select") {
    return (
      <Controller
        control={control}
        name={fieldPath}
        render={({field}) => (
          <SelectComponent
            value={field.value ?? ""}
            onChange={field.onChange}
            options={variable.options}
            placeholder={variable.placeholder}
            errorMessage="Required"
            hasError={hasError}
          />
        )}
      />
    )
  }

  return (
    <Controller
      control={control}
      name={fieldPath}
      render={({field: varField}) => (
        <Input
          aria-invalid={hasError}
          type={variable.inputType ?? "text"}
          startAdornment={
            variable.startIcon && (
              <DynamicIcon
                name={variable.startIcon}
                className={cn(
                  "h-4 w-4",
                  hasError ? "text-destructive" : "text-secondary"
                )}
              />
            )
          }
          value={varField.value ?? ""}
          placeholder={variable.placeholder}
          hasError={hasError}
          errorMessage="Required"
          onChange={(e) => varField.onChange(e.target.value)}
        />
      )}
    />
  )
}

// ─── VariablesPanel ───────────────────────────────────────────────────────────

function VariablesPanel<T extends FieldValues>({
  option,
  control,
  name,
  variableErrors,
}: {
  option: EventOption
  control: Control<T>
  name: Path<T>
  variableErrors: Record<string, boolean>
}) {
  return (
    <div className="flex flex-1">
      <div
        className={cn(
          "grid flex-1 gap-2",
          option.variables.length === 1 ? "grid-cols-1" : "grid-cols-2"
        )}
      >
        {option.variables.map((variable) => (
          <VariableInput
            key={variable.key}
            variable={variable}
            control={control}
            name={name}
            optionValue={option.value}
            hasError={variableErrors[variable.key]}
          />
        ))}
      </div>
    </div>
  )
}

// ─── OptionRow ────────────────────────────────────────────────────────────────

function OptionRow<T extends FieldValues>({
  option,
  control,
  name,
  isSelected,
  variableErrors,
  onSelect,
}: {
  option: EventOption
  control: Control<T>
  name: Path<T>
  isSelected: boolean
  variableErrors: Record<string, boolean>
  onSelect: () => void
  onDeselect: () => void
}) {
  const hasFieldVariables = option.variables.length > 0

  const handleRowSelect = () => {
    onSelect()
  }

  return (
    <div>
      <CommandItem
        disabled={option.disabled}
        value={option.label}
        onSelect={handleRowSelect}
        checked={isSelected}
        className={cn("gap-0 px-3")}
      >
        <>
          <Typography variant="bodyLg" className="w-full" as="div">
            <OptionLabel option={option} control={control} name={name} />
          </Typography>
          <Check
            className={cn("size-5 stroke-magenta-12 opacity-0", {
              "opacity-100": isSelected,
            })}
          />
        </>
      </CommandItem>
      {hasFieldVariables && isSelected && (
        <VariablesPanel
          option={option}
          control={control}
          name={name}
          variableErrors={variableErrors}
        />
      )}
    </div>
  )
}

// ─── ComboBoxFooter ───────────────────────────────────────────────────────────

function ComboBoxFooter({
  onCancel,
  onSave,
}: {
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2 p-3 pt-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" onClick={onSave}>
        Save
      </Button>
    </div>
  )
}

// ─── ComboBoxTrigger ──────────────────────────────────────────────────────────

function ComboBoxTrigger<T extends FieldValues>({
  placeholder,
  selectedOption,
  control,
  name,
  open,
}: {
  placeholder: string
  selectedOption: EventOption | undefined
  control: Control<T>
  name: Path<T>
  open: boolean
}) {
  return (
    <PopoverTrigger asChild>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-base",
          {"ring-2 ring-primary": open}
        )}
      >
        <span
          className={cn("truncate", {
            "text-foreground": selectedOption,
            "text-disabled": !selectedOption,
          })}
        >
          {selectedOption ? (
            <OptionLabel
              option={selectedOption}
              control={control}
              name={name}
            />
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={cn(
            "ml-2 size-6 shrink-0 text-icon transition-transform",
            open && "rotate-180"
          )}
        />
      </Button>
    </PopoverTrigger>
  )
}

// ─── ComboBox ─────────────────────────────────────────────────────────────────

export const ComboBox = <T extends FieldValues>({
  placeholder,
  options,
  control,
  name,
}: {
  placeholder: string
  options: EventOption[]
  control: Control<T>
  name: Path<T>
}) => {
  const [open, setOpen] = React.useState(false)
  const [attempted, setAttempted] = React.useState(false)

  const selectedValue = useWatch({control, name})
  const selectedOption = options.find((o) => o.value === selectedValue)

  const variableValues = useWatch({
    control,
    name: (selectedOption?.variables ?? []).map((v) =>
      varPath(name, selectedOption!.value, v.key)
    ) as Path<T>[],
  })

  // ── Compute empty fields independently of attempted ────────────────────────
  const emptyFields = new Set<string>()
  if (selectedOption) {
    selectedOption.variables.forEach((v, i) => {
      const val = Array.isArray(variableValues)
        ? variableValues[i]
        : variableValues
      if (!val) emptyFields.add(v.key)
    })
  }

  // ── Only show errors after user clicks Save ────────────────────────────────
  const variableErrors: Record<string, boolean> = {}
  if (selectedOption) {
    selectedOption.variables.forEach((v) => {
      variableErrors[v.key] = attempted && emptyFields.has(v.key)
    })
  }

  const hideFooter = selectedOption?.variables.length === 0

  const handleSave = () => {
    setAttempted(true)
    if (emptyFields.size === 0) {
      setAttempted(false)
      setOpen(false)
    }
  }

  const handleCancel = (onChange: (v: undefined) => void) => {
    onChange(undefined)
    setAttempted(false)
    setOpen(false)
  }

  const handleOptionSelect = (
    onChange: (v: string) => void,
    optionValue: string
  ) => {
    const option = options.find((o) => o.value === optionValue)
    onChange(optionValue)
    setAttempted(false)
    if (option?.variables.length === 0) {
      setOpen(false)
    }
  }

  const handleDeselect = () => {
    setAttempted(false)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => (
        <Popover
          modal={false}
          open={open}
          onOpenChange={(o) => {
            if (!o) setAttempted(false)
            setOpen(o)
          }}
        >
          <PopoverAnchor asChild>
            <div className="w-full">
              <ComboBoxTrigger
                placeholder={placeholder}
                selectedOption={selectedOption}
                control={control}
                name={name}
                open={open}
              />
            </div>
          </PopoverAnchor>

          <PopoverContent
            align="start"
            sideOffset={4}
            alignOffset={0}
            className="w-(--radix-popover-trigger-width) p-0"
          >
            <Command
              key={open ? "open" : "closed"}
              className="gap-0 rounded-md p-0"
              selectFirstItem={false}
              disablePointerSelection
            >
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className="px-1">
                  {options.map((option) => (
                    <OptionRow
                      key={option.value}
                      option={option}
                      control={control}
                      name={name}
                      isSelected={field.value === option.value}
                      variableErrors={variableErrors}
                      onSelect={() =>
                        handleOptionSelect(field.onChange, option.value)
                      }
                      onDeselect={handleDeselect}
                    />
                  ))}
                  <OptionRow></OptionRow>
                </CommandGroup>
              </CommandList>
              {!hideFooter && (
                <ComboBoxFooter
                  onCancel={() => handleCancel(field.onChange)}
                  onSave={handleSave}
                />
              )}
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  )
}

export default ComboBox
