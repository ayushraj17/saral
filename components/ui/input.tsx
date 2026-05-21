import * as React from "react"

import { cn } from "@/lib/utils"

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
  const isInvalid =
    hasError ||
      !!errorMessage ||
      props["aria-invalid"] === true ||
      props["aria-invalid"] === "true"
      ? true
      : props["aria-invalid"]

  if (startAdornment) {
    return (
      <div
        className={cn(
          "flex h-10 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className
        )}
        aria-invalid={isInvalid}
      >
        <div className="flex flex-1 shrink-0 items-center justify-center min-w-9 h-full">
          {startAdornment}
        </div>

        <input
          type={type}
          data-slot="input"
          className={cn(
            "h-full w-full border-0 bg-transparent text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            { "border-l pl-2.5": startAdornment },
            className
          )}
          aria-invalid={isInvalid}
          {...props}
        />
      </div>
    )
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive",
        className
      )}
      aria-invalid={isInvalid}
      {...props}
    />
  )
}

export { Input }
