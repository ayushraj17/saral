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

import { LocaleLink } from "@/components/shared/LocaleLink"
import { cn } from "@/lib/utils"

import ApplicationsIcon from "@/public/assets/icons/Applications.svg"
import BrainIcon from "@/public/assets/icons/Brain.svg"
import BriefcaseIcon from "@/public/assets/icons/Briefcase.svg"
import HomeIcon from "@/public/assets/icons/Home.svg"
import ProfileIcon from "@/public/assets/icons/Profile.svg"
import PaymentsIcon from "@/public/assets/icons/Wallet.svg"
import { useParams, usePathname, useRouter } from "next/navigation"

const sidebarItems = {
  home: {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  insights: {
    label: "Insights",
    href: "/insights-dashboard",
    icon: BrainIcon,
  },
  gamification: {
    label: "Gamification",
    href: "/gamification-page-dashboard",
    icon: BriefcaseIcon,
  },
  applications: {
    label: "Applications",
    href: "/applications-dashboard",
    icon: ApplicationsIcon,
  },
  payments: {
    label: "Payments",
    href: "/payments-dashboard",
    icon: PaymentsIcon,
  },
}

type Props = {
  children: React.ReactNode
}

export default function GamificationPageDashboard({ children }: Props) {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const lang = (params?.lang as string) || "en"

  const handleLanguageSwitch = () => {
    let nextPathname = pathname
    if (lang === "en") {
      nextPathname = pathname.replace(/^\/en/, "/hindi")
    } else if (lang === "hindi") {
      nextPathname = pathname.replace(/^\/hindi/, "/en")
    }
    router.push(nextPathname)
  }

  const normalizedPathname = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/20">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup className="p-4">
              <SidebarGroupContent>
                <SidebarMenu className="mt-6 gap-1">
                  {Object.values(sidebarItems).map((item) => {
                    const localizedHref = item.href === "/" ? `/${lang}` : `/${lang}${item.href}`
                    const normalizedHref = localizedHref.endsWith("/") && localizedHref !== "/"
                      ? localizedHref.slice(0, -1)
                      : localizedHref

                    const isActive = item.href === "/"
                      ? normalizedPathname === normalizedHref
                      : (normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref + "/"))

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
                <SidebarMenuButton
                  onClick={handleLanguageSwitch}
                  className="text-secondary hover:text-primary flex items-center transition-colors duration-200"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 text-[9px] font-bold text-primary border border-primary/20 shrink-0">
                    {lang === "en" ? "EN" : "HI"}
                  </span>
                  <span className="text-sm leading-[130%] font-medium tracking-normal">
                    {lang === "en" ? "Switch to Hindi" : "English में बदलें"}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

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
