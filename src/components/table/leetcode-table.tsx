"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  flexRender,
} from "@tanstack/react-table"
import { BookOpen, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { QuestionsTableProps } from "@/types"
import { companyIcons } from "@/constants"
import Image from "next/image"

export function QuestionsDataTable({ questions }: QuestionsTableProps) {
  // --- column & filter state ---
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  // --- get unique filter values ---
  const difficulties = Array.from(new Set(questions.map((q) => q.difficulty)))
  const patterns = Array.from(new Set(questions.flatMap((q) => q.pattern)))
  const companies = Array.from(new Set(questions.flatMap((q) => q.companies.map((c) => c.name))))

  // --- define columns ---
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <Link
          href={`https://leetcode.com/problems/${row.original.slug}`}
          target="_blank"
          className="text-amber-500 dark:text-amber-400 hover:underline"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: "solutions",
      header: "Solutions",
      cell: ({ row }) => (
        <Link
          href={`https://leetcode.com/problems/${row.original.slug}/discuss/?currentPage=1&orderBy=most_votes`}
          target="_blank"
          className="text-amber-500 dark:text-amber-400 hover:underline"
        >
         <BookOpen className="w-5 h-5" /> 
        </Link>
      ),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => {
        const diff = row.getValue("difficulty")
        const color =
          diff === "Easy" ? "bg-green-500/10 text-green-600 rounded-sm" :
          diff === "Medium" ? "bg-yellow-500/10 text-yellow-600 rounded-sm" :
          "bg-red-500/10 text-red-600 rounded-sm"

        return <Badge className={color}>{diff as string}</Badge>
      },
    },
    {
      accessorKey: "pattern",
      header: "Patterns",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.pattern.map((p: string) => (
            <Badge key={p} variant="outline"  className="rounded-sm dark:bg-zinc-800 bg-zinc-50">{p}</Badge>
          ))}
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true
        const patternNames = row.original.pattern
        return patternNames.includes(filterValue)
      },
    },
    {
      accessorKey: "companies",
      header: "Companies",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.companies.map((c: any) => (
    <Badge key={c.name} variant="outline" className="flex items-center gap-2 py-1 rounded-sm dark:bg-zinc-800 bg-zinc-50 text-[12px]">
      {companyIcons[c.name] && (
        <Image src={companyIcons[c.name]} alt={c.name} className="w-5 h-5" width={24} height={24} />
      )}
      {c.name}
    </Badge>
  ))}

        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true
        const companyNames = row.original.companies.map((c: any) => c.name)
        return companyNames.includes(filterValue)
      },
    },
  ]

  // --- table instance ---
  const table = useReactTable({
    data: questions,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const selectedDifficulty = table.getColumn("difficulty")?.getFilterValue() as string
  const selectedPattern = table.getColumn("pattern")?.getFilterValue() as string
  const selectedCompany = table.getColumn("companies")?.getFilterValue() as string

  return (
    <div className="w-full space-y-4 relative">
      {/* 🔍 Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        {/* Difficulty Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="outline">
              Difficulty : {selectedDifficulty || "All"} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All",...difficulties].map((diff) => (
               <DropdownMenuCheckboxItem
                key={diff}
                checked={selectedDifficulty === diff || (!selectedDifficulty && diff === "All")}
                onCheckedChange={(checked) =>
                  table
                    .getColumn("difficulty")
                    ?.setFilterValue(diff === "All" ? undefined : diff)
                }
                className="cursor-pointer"
              >
                {diff}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pattern Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
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
                className="cursor-pointer"
              >
                {p}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Company Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
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
                className="cursor-pointer"
              >
                {c}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 📊 Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const isNameColumn = cell.column.id === "name"
                    const cellWidth = isNameColumn ? "w-[120px]" : "w-auto"

                    return (
                      <TableCell
                        key={cell.id}
                        className={`${cellWidth} truncate max-w-[150px]`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
    </div>
  )
}
