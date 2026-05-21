import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Bell } from "lucide-react"
import Image from "next/image"
import React from "react"
import cardImage from "@/public/assets/gamification-dashboard/card.svg"
import gamificationDashboard from "@/public/assets/gamification-dashboard/gamification-dashboard.svg"
import Coupon from "@/public/assets/icons/Coupon.svg"
import Crown from "@/public/assets/icons/Crown.svg"
import Gift from "@/public/assets/icons/Gift.svg"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDictionary } from "../dicitionaries"
import CreateRewardSystemDialog from "./CreateRewardSystemDialog"

const GamificationPageDashboard = async ({
  params,
}: {
  params: Promise<{ lang: string }>
}) => {
  const { lang } = await params

  const { gamification: dict } = await getDictionary(lang as "en" | "hindi")

  return (
    <React.Fragment>
      <header className="flex h-16 items-center justify-between px-6 py-4">
        <h1 className="typography-header-lg">{dict.dashboard.title}</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              5
            </span>
            <Bell size={28} className="stroke-icon" />
          </div>
          <a href="https://github.com/ayushraj17" target="_blank">
            <Avatar>
              <AvatarImage
                src="https://github.com/ayushraj17.png"
                alt="@ayushraj17"
              />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </a>
        </div>
      </header>

      <div className="mx-auto space-y-10 p-10">
        <div className="relative flex h-full items-center justify-center">
          <Image
            src={gamificationDashboard}
            alt="Gamification Dashboard"
            width={960}
            height={322}
            className="absolute inset-0 z-0"
          />
          <div className="z-10 mt-15 text-center flex flex-col items-center justify-center space-y-4">
            <h2 className="font-semibold text-[28px] tracking-normal leading-9 text-magenta-9">
              {dict.dashboard.title}
            </h2>

            <p className="typography-body-md text-muted-foreground max-w-[250px]">
              {dict.dashboard.description}
            </p>
            {/* <CreateYourRewardSystemDialog triggerLabel={dict.dashboard.cta} /> */}
            <CreateRewardSystemDialog triggerLabel={dict.dashboard.cta} />
          </div>
        </div>

        <div className="z-10 mx-4.5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(dict.dashboard.cards).map((card, index) => (
            <div key={card.title || index} className="relative flex justify-center">
              <Image
                src={cardImage}
                alt="Gamification Dashboard"
                className="absolute inset-0 left-1/2 z-0 -translate-x-1/2"
              />
              <Card className="shadow-sticky-bar max-w-73 gap-2 py-5 ring-magenta-4">
                <span
                  className={cn(
                    "relative z-10 m-2 mx-auto flex h-13 w-13 items-center justify-center fill-primary text-primary",
                    "after:absolute after:inset-0 after:z-0 after:rounded-md after:bg-white",
                    "before:absolute before:inset-0 before:z-0 before:scale-135 before:rounded-xl before:bg-magenta-7"
                  )}
                >
                  <Image
                    src={
                      card.icon === "Gift"
                        ? Gift
                        : card.icon === "Crown"
                          ? Crown
                          : Coupon
                    }
                    className="z-10"
                    width={26}
                    height={26}
                    style={{ width: "auto", height: "auto" }}
                    alt={card.icon || "icon"}
                  />
                </span>
                <CardHeader className="mt-3">
                  <h1 className="typography-header-sm text-center">
                    {card.title}
                  </h1>
                </CardHeader>
                <CardContent>
                  <p className="typography-body-md text-center text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default GamificationPageDashboard
