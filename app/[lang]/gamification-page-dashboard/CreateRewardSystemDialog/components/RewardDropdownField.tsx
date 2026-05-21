

import { ChevronDown } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandList
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { EventOption } from "../types"

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

export default RewardDropdownField