"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

import Image from "next/image"

import {LocaleLink} from "@/components/shared/LocaleLink"
import {cn} from "@/lib/utils"

import ApplicationsIcon from "@/app/[lang]/gamification-page-dashboard/assets/gamification-dashboard/icons/Applications.svg"
import BrainIcon from "@/app/[lang]/gamification-page-dashboard/assets/gamification-dashboard/icons/Brain.svg"
import BriefcaseIcon from "@/app/[lang]/gamification-page-dashboard/assets/gamification-dashboard/icons/Briefcase.svg"
import HomeIcon from "@/app/[lang]/gamification-page-dashboard/assets/gamification-dashboard/icons/Home.svg"
import ProfileIcon from "@/app/[lang]/gamification-page-dashboard/assets/gamification-dashboard/icons/Profile.svg"
import PaymentsIcon from "@/app/[lang]/gamification-page-dashboard/assets/gamification-dashboard/icons/Wallet.svg"
import {usePathname} from "next/navigation"

const sidebarItems = {
  home: {
    label: "Home",
    href: "/work-in-progress",
    icon: HomeIcon,
  },
  insights: {
    label: "Insights",
    href: "/work-in-progress",
    icon: BrainIcon,
  },
  gamification: {
    label: "Gamification",
    href: "/gamification-page-dashboard",
    icon: BriefcaseIcon,
  },
  applications: {
    label: "Applications",
    href: "/work-in-progress",
    icon: ApplicationsIcon,
  },
  payments: {
    label: "Payments",
    href: "/work-in-progress",
    icon: PaymentsIcon,
  },
}

type Props = {
  children: React.ReactNode
}

export default function GamificationPageDashboard({children}: Props) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup className="p-4">
              <SidebarGroupContent>
                <SidebarMenu className="mt-6 gap-1">
                  {Object.values(sidebarItems).map((item) => {
                    const isActive = pathname.includes(item.href)

                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          className={cn(
                            "flex h-9 items-center gap-2 text-secondary",
                            isActive && "bg-white text-primary"
                          )}
                        >
                          <LocaleLink href={item.href}>
                            <Image
                              src={item.icon}
                              alt={item.label}
                              width={20}
                              height={20}
                            />
                            <span className="text-sm leading-[130%] font-medium tracking-normal">
                              {item.label}
                            </span>
                          </LocaleLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-secondary">
                  <Image
                    src={ProfileIcon}
                    alt="Profile"
                    className="text-red-500"
                  />
                  <span className="text-sm leading-[130%] font-medium tracking-normal">
                    Settings
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
