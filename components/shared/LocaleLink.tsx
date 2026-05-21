"use client"

import Link, {LinkProps} from "next/link"
import {useParams} from "next/navigation"

type Props = LinkProps & {
  children: React.ReactNode
  className?: string
}

export function LocaleLink({href, children, className, ...props}: Props) {
  const params = useParams()

  const lang = params.lang as string

  const localizedHref = typeof href === "string" ? `/${lang}${href}` : href

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  )
}
