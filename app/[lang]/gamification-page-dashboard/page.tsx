import {Card, CardContent, CardHeader} from "@/components/ui/card"
import Typography from "@/components/ui/user/Typography"
import {cn} from "@/lib/utils"
import {Bell} from "lucide-react"
import Image from "next/image"
import React from "react"
import cardImage from "./assets/gamification-dashboard/card.svg"
import gamificationDashboard from "./assets/gamification-dashboard/gamification-dashboard.svg"
import CreateYourRewardSystemDialog from "./components/CreateYourRewardSystemDialog"
import Gift from "./assets/gamification-dashboard/icons/Gift.svg"
import Crown from "./assets/gamification-dashboard/icons/Crown.svg"
import Coupon from "./assets/gamification-dashboard/icons/Coupon.svg"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {getDictionary} from "../dicitionaries"

const GamificationPageDashboard = async ({
  params,
}: {
  params: Promise<{lang: string}>
}) => {
  const {lang} = await params

  const {gamification: dict} = await getDictionary(lang as "en" | "hindi")

  return (
    <React.Fragment>
      <header className="flex h-16 items-center justify-between px-6 py-4">
        <Typography variant="headingLg">{dict.dashboard.title}</Typography>

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
          <div className="z-10 mt-15 space-y-4 text-center">
            <Typography variant="primaryMd" className="text-magenta-9">
              {dict.dashboard.title}
            </Typography>

            <Typography variant="bodyMd" className="text-muted-foreground">
              {dict.dashboard.description}
            </Typography>
            <CreateYourRewardSystemDialog triggerLabel={dict.dashboard.cta} />
          </div>
        </div>

        <div className="z-10 mx-4.5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(dict.dashboard.cards).map((card) => (
            <div key={card.title} className="relative flex justify-center">
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
                    alt={card.icon || "icon"}
                  />
                </span>
                <CardHeader className="mt-3">
                  <Typography variant="headingSm" className="text-center">
                    {card.title}
                  </Typography>
                </CardHeader>
                <CardContent>
                  <Typography
                    variant="bodyMd"
                    className="text-center text-muted-foreground"
                  >
                    {card.description}
                  </Typography>
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
