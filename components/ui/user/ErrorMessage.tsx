import React from "react"

type ErrorMessageProps = {
  error?: boolean
  errorMessage?: string
}
const ErrorMessage = ({error, errorMessage}: ErrorMessageProps) => {
  if (!error) return null
  return <span className="text-xs text-destructive">{errorMessage}</span>
}

export default ErrorMessage
