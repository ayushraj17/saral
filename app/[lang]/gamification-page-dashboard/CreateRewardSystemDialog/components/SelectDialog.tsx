import { Button } from "@/components/ui/button"
import { CommandItem } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import SelectComponent from "@/components/ui/user/SelectComponent"
import { Pencil } from "lucide-react"
import { useState } from "react"

type SelectDialogProps = {
  triggerLabel: string
  fieldLabel: string
  dialogTitle: string
  placeholder: string
  options: { label: string; value: string }[]
  selectedTier?: string
  onSave: (value: string) => void
  isSelected?: boolean
  disabled?: boolean
  value?: string
}

const SelectDialog = ({
  triggerLabel,
  fieldLabel,
  dialogTitle,
  placeholder,
  options,
  isSelected,
  selectedTier,
  disabled,
  onSave,
  value,
}: SelectDialogProps) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(selectedTier || "")

  // Sync draft when selectedTier changes externally
  const handleOpen = (val: boolean) => {
    if (disabled) return
    if (val) setDraft(selectedTier || "")
    setOpen(val)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      {selectedTier ? (
        <CommandItem
          value={value}
          className="px-4"
          checked={isSelected}
          disabled={disabled}
          onSelect={() => {
            if (!disabled) {
              onSave(draft)
            }
          }}
        >
          <span className="typography-body-lg flex-1 text-left">
            {triggerLabel}
          </span>
          {isSelected && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-inherit hover:bg-transparent!"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setOpen(true)
              }}
            >
              <Pencil className="size-5 stroke-icon-secondary" />
            </Button>
          )}
        </CommandItem>
      ) : (
        <CommandItem
          value={value}
          checked={isSelected}
          disabled={disabled}
          className="px-4"
          onSelect={() => {
            if (!disabled) {
              setOpen(true)
            }
          }}
        >
          <span className="typography-body-lg flex-1">
            {triggerLabel}
          </span>
        </CommandItem>
      )}

      <DialogContent
        size="sm"
        className="overflow-visible md:max-w-100"
        aria-describedby={undefined}
      >
        <DialogTitle asChild>
          <h2 className="typography-header-xl">{dialogTitle}</h2>
        </DialogTitle>

        <div>
          <Label required className="mb-2">
            {fieldLabel}
          </Label>

          <SelectComponent
            value={draft}
            onChange={setDraft}
            options={options}
            placeholder={placeholder}
            contentPosition="popper"
          />

          <DialogFooter className="mt-4 grid grid-cols-2 items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Go Back
            </Button>

            <Button
              type="button"
              className="flex-1"
              disabled={!draft}
              onClick={() => {
                if (draft) {
                  onSave(draft)
                  handleClose()
                }
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectDialog
