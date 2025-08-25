export interface FAQ {
  question: string;
  answer: string;
}

export interface AppInfo {
  slug: string;
  img: string;
  author: string;
  title: string;
  description: string;
  version: string;
  size: string;
  longDescription: string;
  category: string;
  faqs: FAQ[];
}