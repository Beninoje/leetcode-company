"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "next-themes"

const MyToolTip = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="https://bnoje.com" className="fixed bottom-10 right-10 shadow-xl rounded-xl">
            <Image
              src={resolvedTheme === "dark" ? "/icons/noje_logo_light.svg" : "/icons/noje_logo_dark.svg"}
              alt="Bnoje Logo Icon"
              width={50}
              height={50}
              className="rounded-xl brightness-75 saturate-30 hover:brightness-100 hover:saturate-100 transition-all"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-800 px-3 py-1 rounded-md text-sm"
        >
          Visit my site!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default MyToolTip
