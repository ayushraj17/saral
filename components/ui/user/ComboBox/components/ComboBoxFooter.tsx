import {Button} from "@/components/ui/button"

function ComboBoxFooter({
  onCancel,
  onSave,
}: {
  onCancel: () => void
  onSave: () => void
}) {
  return (
    <div id="combo-box-footer" className="grid grid-cols-2 gap-2 p-3 pt-2">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" onClick={onSave}>
        Save
      </Button>
    </div>
  )
}

export default ComboBoxFooter
