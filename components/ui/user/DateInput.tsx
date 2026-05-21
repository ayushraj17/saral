"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FieldError } from "@/components/ui/field"
import { cn, formatDate } from "@/lib/utils"

import { CalendarIcon } from "lucide-react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

type DateInputProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: (date: Date) => boolean
    align?: "start" | "center" | "end"
    side?: "top" | "right" | "bottom" | "left"
    sideOffset?: number
}

const DateInput = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder = "Select date",
    required = false,
    disabled,
    align = "start",
    side = "top",
    sideOffset = 8,
}: DateInputProps<T>) => {
    return (
        <div className="space-y-3">
            {label && <Label required={required}>{label}</Label>}
            <Controller
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Popover modal>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                        "w-full items-center justify-start text-left font-normal transition-all",
                                        error && "border-destructive text-destructive"
                                    )}
                                >
                                    <CalendarIcon />
                                    <span
                                        className={cn("typography-body-lg", field.value ? "text-foreground" : "text-disabled")}
                                    >
                                        {field.value ? formatDate(field.value) : placeholder}
                                    </span>
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0" align={align} side={side} sideOffset={sideOffset}>
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date?.toISOString())}
                                    disabled={disabled}
                                />
                            </PopoverContent>
                        </Popover>
                        {error && error.message && (
                            <FieldError errors={[{ message: error.message }]} />
                        )}
                    </>
                )}
            />
        </div>
    )
}

export default DateInput
