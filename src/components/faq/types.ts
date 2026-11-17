export interface FaqItem {
  id: string;
  q: string;
  a: string;
}
export interface FaqCategory {
  key: string;
  title: string;
  intro?: string;
  items: FaqItem[];
}
export interface FaqData {
  version?: number | string;
  categories: FaqCategory[];
}
