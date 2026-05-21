"use client"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import Typography from "@/components/ui/user/Typography"

import {CalendarIcon} from "lucide-react"
import {Control, Controller} from "react-hook-form"
import {FormValues} from "../types"
import {formatEndDate} from "../util"

const EndDateField = ({control}: {control: Control<FormValues>}) => {
  return (
    <div className="space-y-3">
      <Label required>End date</Label>

      <Controller
        control={control}
        name="endDate"
        render={({field}) => (
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full items-center justify-start text-left font-normal"
              >
                <CalendarIcon />

                <Typography
                  variant="bodyLg"
                  as="span"
                  className={field.value ? "text-foreground" : "text-disabled"}
                >
                  {field.value ? formatEndDate(field.value) : "Select end date"}
                </Typography>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  )
}

export default EndDateField
