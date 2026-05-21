import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectOption = {
  label: string
  value: string
}

type SelectComponentProps = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  contentClassName?: string
  contentPosition?: "popper" | "item-aligned"
  hasError?: boolean
}

const SelectComponent = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled,
  contentClassName,
  contentPosition = "item-aligned",
  hasError,
}: SelectComponentProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full" aria-invalid={hasError}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position={contentPosition} className={contentClassName}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectComponent
