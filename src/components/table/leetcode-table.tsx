"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuestionsTableProps } from "@/types";




export function QuestionsTable({ questions }: QuestionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Companies (top 5)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.title}</TableCell>
              <TableCell>{q.difficulty}</TableCell>
              <TableCell>
                {q.companies
                  .slice(0, 5)
                  .map((c) => `${c.name} (${c.frequency})`)
                  .join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
