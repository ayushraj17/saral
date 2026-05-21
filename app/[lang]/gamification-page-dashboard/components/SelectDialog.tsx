import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import SelectComponent from "@/components/ui/user/SelectComponent"
import Typography from "@/components/ui/user/Typography"
import {Pencil, X} from "lucide-react"
import {useState} from "react"

type SelectDialogProps = {
  triggerLabel: string
  fieldLabel: string
  dialogTitle: string
  placeholder: string
  options: {label: string; value: string}[]
  selectedTier?: string
  onSave: (value: string) => void
}

const SelectDialog = ({
  triggerLabel,
  fieldLabel,
  dialogTitle,
  placeholder,
  options,
  selectedTier,
  onSave,
}: SelectDialogProps) => {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(selectedTier || "")

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-1 items-center justify-between gap-2">
        {selectedTier && (
          <button onClick={() => onSave(draft)}>
            <Typography variant="bodyLg">{triggerLabel}</Typography>
          </button>
        )}
        {selectedTier ? (
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil className="size-5 stroke-icon-secondary" />
            </Button>
          </DialogTrigger>
        ) : (
          <DialogTrigger asChild>
            <Typography variant="bodyLg">{triggerLabel}</Typography>
          </DialogTrigger>
        )}
      </div>

      <DialogContent
        className="overflow-visible md:max-w-100"
        showCloseButton={false}
      >
        <DialogTitle className="flex items-center justify-between">
          <Typography variant="headingXl">{dialogTitle}</Typography>

          <DialogClose onClick={handleClose}>
            <X className="text-secondary" />
          </DialogClose>
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
