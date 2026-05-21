import {notFound} from "next/navigation"
import {getDictionary, hasLocale} from "./dicitionaries"

export default async function Page({params}: PageProps<"/[lang]">) {
  const {lang} = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  return (
    <div>
      <h1>{dict.gamification.dashboard.title}</h1>
      <p>{dict.gamification.dashboard.description}</p>
      <button>{dict.gamification.dashboard.cta}</button>
      <div>
        {dict.gamification.dashboard.cards.map((card, index) => (
          <div key={index}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
