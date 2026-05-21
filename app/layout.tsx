import {Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateStaticParams() {
  return [{lang: "en-US"}, {lang: "de"}]
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  return (
    <html
      lang={(await params).lang as string}
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
