"use client"

import {cn} from "@/lib/utils"
import type {ReactNode, ElementType, ComponentPropsWithoutRef} from "react"
import {useContext, createContext} from "react"

// Context to track parent <p> nesting
const ParentParagraphContext = createContext(false)

export type TypographyVariants =
  | "headingXs"
  | "headingSm"
  | "headingMd"
  | "headingLg"
  | "headingXl"
  | "bodyXs"
  | "bodySm"
  | "bodyMd"
  | "bodyLg"
  | "bodyXl"
  | "linkXs"
  | "linkSm"
  | "linkMd"
  | "linkLg"
  | "linkXl"
  | "labelXs"
  | "labelSm"
  | "labelMd"
  | "labelLg"
  | "labelXl"
  | "primaryXs"
  | "primarySm"
  | "primaryMd"
  | "primaryLg"
  | "primaryXl"
  | "tagXs"
  | "tagSm"
  | "tagMd"
  | "tagLg"
  | "tagXl"

export type TypographyProps<C extends ElementType = ElementType> = {
  ref?: React.Ref<Element>
  as?: C
  variant?: TypographyVariants
  className?: string
  children: ReactNode
  to?: string
} & Omit<ComponentPropsWithoutRef<C>, "as" | "className" | "children">

const variantConfig: Record<
  TypographyVariants,
  {tag: ElementType; styles: string; block?: boolean}
> = {
  headingXs: {tag: "h1", styles: "text-[14px]", block: true},
  headingSm: {tag: "h1", styles: "text-base", block: true},
  headingMd: {tag: "h1", styles: "text-5xl", block: true},
  headingLg: {tag: "h1", styles: "text-lg", block: true},
  headingXl: {tag: "h1", styles: "font-medium text-[20px]", block: true},

  bodyXs: {tag: "p", styles: "text-xs", block: true},
  bodySm: {tag: "p", styles: "text-xs", block: true},
  bodyMd: {tag: "p", styles: "text-sm", block: true},
  bodyLg: {tag: "p", styles: "text-base", block: true},
  bodyXl: {tag: "p", styles: "text-xl", block: true},

  linkXs: {tag: "a", styles: "underline text-blue-800 text-xs"},
  linkSm: {tag: "a", styles: "underline text-blue-800 text-sm"},
  linkMd: {tag: "a", styles: "underline text-blue-800 text-base"},
  linkLg: {tag: "a", styles: "underline text-blue-800 text-xl"},
  linkXl: {tag: "a", styles: "underline text-blue-800 text-xl"},

  labelXs: {tag: "span", styles: "uppercase text-xs"},
  labelSm: {tag: "span", styles: "uppercase text-xs"},
  labelMd: {tag: "span", styles: "uppercase text-sm"},
  labelLg: {tag: "span", styles: "uppercase text-xl"},
  labelXl: {tag: "span", styles: "uppercase text-xl"},

  primaryXs: {tag: "h2", styles: "text-xl", block: true},
  primarySm: {tag: "h2", styles: "text-3xl", block: true},
  primaryMd: {tag: "h2", styles: "font-semibold text-4xl", block: true},
  primaryLg: {tag: "h2", styles: "text-7xl lg:text-[7.5rem]", block: true},
  primaryXl: {tag: "h2", styles: "text-7xl lg:text-[7.5rem]", block: true},

  tagXs: {tag: "span", styles: "text-xs"},
  tagSm: {tag: "span", styles: "text-xs"},
  tagMd: {tag: "span", styles: "text-sm"},
  tagLg: {tag: "span", styles: "text-xl"},
  tagXl: {tag: "span", styles: "text-xl"},
}

const defaultLeadingTracking: Record<TypographyVariants, string> = {
  headingXs: "leading-[140%] tracking-normal font-heading",
  headingSm: "leading-[140%] tracking-normal font-heading",
  headingMd: "leading-[140%] tracking-normal font-heading",
  headingLg: "leading-[140%] tracking-normal font-heading",
  headingXl: "leading-[140%] tracking-normal font-heading",

  bodyXs: "leading-[140%] tracking-normal",
  bodySm: "leading-[140%] tracking-normal",
  bodyMd: "leading-[140%] tracking-normal",
  bodyLg: "leading-[140%] tracking-normal",
  bodyXl: "leading-[140%] tracking-normal",

  linkXs: "leading-none tracking-normal",
  linkSm: "leading-none tracking-normal",
  linkMd: "leading-none tracking-normal",
  linkLg: "leading-none tracking-normal",
  linkXl: "leading-none tracking-normal",

  labelXs: "leading-none tracking-normal",
  labelSm: "leading-none tracking-normal",
  labelMd: "leading-none tracking-normal",
  labelLg: "leading-none tracking-normal",
  labelXl: "leading-none tracking-normal",

  primaryXs: "leading-none tracking-normal",
  primarySm: "leading-none tracking-normal",
  primaryMd: "leading-none tracking-normal",
  primaryLg: "leading-none tracking-normal",
  primaryXl: "leading-none tracking-normal",

  tagXs: "leading-none tracking-normal",
  tagSm: "leading-none tracking-normal",
  tagMd: "leading-none tracking-normal",
  tagLg: "leading-none tracking-normal",
  tagXl: "leading-none tracking-normal",
}

export default function Typography<C extends ElementType = ElementType>({
  as,
  variant = "bodyMd",
  className,
  children,
  ...rest
}: TypographyProps<C>) {
  const parentIsParagraph = useContext(ParentParagraphContext)
  const config = variantConfig[variant] ?? variantConfig.bodyMd
  if (!variantConfig[variant]) {
    console.warn(`Unknown Typography variant: ${variant}`)
  }
  const isBlock = config.block ?? false

  // Auto-switch to <span> if inside <p> and would render <p>
  const shouldAvoidParagraph = parentIsParagraph && config.tag === "p"
  const Component = as || (shouldAvoidParagraph ? "span" : config.tag)

  const filteredDefaults = cn(className || "", defaultLeadingTracking[variant])

  const classNames = cn(
    config.styles,
    filteredDefaults,
    // Add margin if block element and not first-child
    isBlock && !shouldAvoidParagraph && "mt-0 first:mt-0"
  )

  const isParagraph = Component === "p"

  return (
    <ParentParagraphContext.Provider value={isParagraph}>
      <Component className={classNames} {...rest}>
        {children}
      </Component>
    </ParentParagraphContext.Provider>
  )
}
