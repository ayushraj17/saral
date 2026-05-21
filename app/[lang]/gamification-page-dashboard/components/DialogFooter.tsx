import {Button} from "@/components/ui/button"

const DialogFooter = ({canCreateReward = false}) => {
  return (
    <div className="grid grid-cols-1 items-center justify-end gap-4 sm:grid-cols-2">
      <Button variant="outline">Cancel</Button>
      <Button disabled={!canCreateReward}>Create Reward</Button>
    </div>
  )
}

export default DialogFooter
