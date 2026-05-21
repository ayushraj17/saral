import {clsx} from "clsx"
import type {ReactNode, ElementType, ComponentPropsWithoutRef} from "react"

export type HeaderTypographyVariant = "xs" | "s" | "m" | "l"

export type HeaderTypographyProps<C extends ElementType = ElementType> = {
  as?: C
  variant?: HeaderTypographyVariant
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<C>, "as" | "className" | "children">

const variantConfig: Record<
  HeaderTypographyVariant,
  {tag: ElementType; styles: string}
> = {
  xs: {tag: "h6", styles: "text-heading-xs"},
  s: {tag: "h5", styles: "text-heading-s"},
  m: {tag: "h4", styles: "text-heading-m"},
  l: {tag: "h3", styles: "text-heading-l"},
}

const defaultStyles: Record<HeaderTypographyVariant, string> = {
  xs: "font-semibold font-heading leading-tight",
  s: "font-semibold font-heading leading-tight",
  m: "font-semibold font-heading leading-none",
  l: "font-semibold font-heading leading-none",
}

export default function HeaderTypography<C extends ElementType = ElementType>({
  as,
  variant = "m",
  className,
  children,
  ...rest
}: HeaderTypographyProps<C>) {
  const config = variantConfig[variant]
  const Component = as || config.tag

  const classNames = clsx(config.styles, defaultStyles[variant], className)

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  )
}
