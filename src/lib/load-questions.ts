// app/lib/loadQuestions.ts
import fs from "fs";
import path from "path";

export type Company = {
  name: string;
  slug: string;
  frequency: number;
};

export type Question = {
  id: number;
  title: string;
  slug: string;
  pattern: string[];
  difficulty: string;
  premium: boolean;
  companies: Company[];
};

export function loadQuestions(): Question[] {
  const filePath = path.join(process.cwd(), "src/data/questions.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileContents);
  return jsonData.data;
}
