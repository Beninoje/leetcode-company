export interface QuestionsTableProps{
  questions: Question[];
}
type Company = {
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
  companies: Company[];
};