import * as React from "react"

import {cn} from "@/lib/utils"
import ErrorMessage from "./user/ErrorMessage"

export type InputProps = React.ComponentProps<"input"> & {
  startAdornment?: React.ReactNode
  hasError?: boolean
  errorMessage?: string
}

function Input({
  className,
  type,
  startAdornment,
  hasError,
  errorMessage,
  ...props
}: InputProps) {
  if (startAdornment) {
    return (
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "flex h-10 w-full min-w-0 items-center rounded-md border border-input bg-transparent px-2.5 shadow-xs transition-[color,box-shadow] focus-within:border-primary focus-within:ring-1 focus-within:ring-primary aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            className
          )}
          aria-invalid={props["aria-invalid"]}
        >
          <div className="mr-2 flex shrink-0 items-center text-muted-foreground">
            {startAdornment}
          </div>

          <input
            type={type}
            data-slot="input"
            className="h-full w-full border-0 bg-transparent py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            {...props}
          />
        </div>
        <ErrorMessage error={hasError} errorMessage={errorMessage} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-10 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive",
          className
        )}
        {...props}
      />
      <ErrorMessage error={hasError} errorMessage={errorMessage} />
    </div>
  )
}

export {Input}
