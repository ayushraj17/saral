import React from "react"

import HomeIcon from "@/public/assets/icons/Home.svg"
import BrainIcon from "@/public/assets/icons/Brain.svg"
import BriefcaseIcon from "@/public/assets/icons/Briefcase.svg"
import ApplicationsIcon from "@/public/assets/icons/Applications.svg"
import PaymentsIcon from "@/public/assets/icons/Wallet.svg"
import SidebarBrandIcon from "@/public/assets/icons/Icon.svg"
import ProfileIcon from "@/public/assets/icons/Profile.svg"

// Map your custom icons into a clean dictionary lookup table
export const ICON_MAP = {
  home: HomeIcon,
  brain: BrainIcon,
  profile: ProfileIcon,
  applications: ApplicationsIcon,
  payments: PaymentsIcon,
  briefcase: BriefcaseIcon,
  sidebarBrand: SidebarBrandIcon,
} as const

export type IconType = keyof typeof ICON_MAP

// Extend the native HTML SVG properties to pass down sizes, fills, and click handlers
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconType
  size?: number | string
}

export function IconBarrel({name, size = 20, className, ...props}: IconProps) {
  const SelectedIcon = ICON_MAP[name]

  if (!SelectedIcon) {
    console.warn(`Icon component: "${name}" does not exist in the map.`)
    return null
  }

  return (
    <SelectedIcon
      width={size}
      height={size}
      className={className}
      {...props} // Spreads native properties like fill, stroke, onClick, etc.
    />
  )
}
