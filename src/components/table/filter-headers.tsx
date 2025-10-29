"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function FiltersHeader({ table, difficulties, patterns, companies }:any) {
  const [isSticky, setIsSticky] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return

      const offsetTop = filterRef.current.getBoundingClientRect().top
      const headerHeight = 64 // adjust if your fixed page header is taller
      setIsSticky(offsetTop <= headerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const selectedDifficulty = table.getColumn("difficulty")?.getFilterValue() as string
  const selectedPattern = table.getColumn("pattern")?.getFilterValue() as string
  const selectedCompany = table.getColumn("companies")?.getFilterValue() as string

  return (
    <div
      ref={filterRef}
      className={`flex flex-wrap items-center gap-3 bg-white dark:bg-zinc-900 transition-all ${
        isSticky ? "fixed top-[70px] left-0 w-full z-30 shadow-md p-2" : ""
      }`}
    >
      <Input
        placeholder="Search by title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
        className="max-w-sm"
      />

      {/* Difficulty Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Difficulty : {selectedDifficulty || "All"} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["All", ...difficulties].map((diff) => (
            <DropdownMenuCheckboxItem
              key={diff}
              checked={selectedDifficulty === diff || (!selectedDifficulty && diff === "All")}
              onCheckedChange={(checked) =>
                table.getColumn("difficulty")?.setFilterValue(diff === "All" ? undefined : diff)
              }
            >
              {diff}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Pattern Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Pattern : {selectedPattern || "All"} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-64 overflow-y-auto">
          {["All", ...patterns].map((p) => (
            <DropdownMenuCheckboxItem
              key={p}
              checked={selectedPattern === p || (!selectedPattern && p === "All")}
              onCheckedChange={(checked) =>
                table.getColumn("pattern")?.setFilterValue(p === "All" ? undefined : p)
              }
            >
              {p}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Company Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Company : {selectedCompany || "All"} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-64 overflow-y-auto">
          {["All", ...companies].map((c) => (
            <DropdownMenuCheckboxItem
              key={c}
              checked={selectedCompany === c || (!selectedCompany && c === "All")}
              onCheckedChange={(checked) =>
                table.getColumn("companies")?.setFilterValue(c === "All" ? undefined : c)
              }
            >
              {c}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
