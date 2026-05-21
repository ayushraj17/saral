"use client"
import DateInput from "@/components/ui/user/DateInput"
import { Control, FieldValues, Path } from "react-hook-form"

type EndDateFieldProps<T extends FieldValues> = {
  control: Control<T>
  name?: Path<T>
}

const EndDateField = <T extends FieldValues>({
  control,
  name = "endDate" as Path<T>,
}: EndDateFieldProps<T>) => {
  return (
    <DateInput
      control={control}
      name={name}
      label="End date"
      placeholder="Select end date"
      required
      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
    />
  )
}

export default EndDateField
