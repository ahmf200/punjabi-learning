export type SectionId = "dashboard" | "vocabulary" | "lessons" | "reading" | "practice" | "materials" | "notes";

export type VocabCategory = "pronouns" | "family" | "verbs" | "food" | "time" | "general";

export interface VocabularyItem {
  english: string;
  punjabi: string;
  category: VocabCategory;
  note?: string;
}

export interface LessonRule {
  title: string;
  body: string;
}

export interface SentencePair {
  english: string;
  punjabi: string;
}

export interface Passage {
  title: string;
  english: string;
  punjabi: string;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  date?: string;
  summary: string;
  source?: string;
  rules: LessonRule[];
  vocabulary: VocabularyItem[];
  sentences: SentencePair[];
  passage?: Passage;
}

export interface ReadingLine {
  speaker?: string;
  punjabi: string;
  english: string;
}

export interface ReadingItem {
  id: string;
  title: string;
  type: "conversation" | "story";
  level: string;
  source: string;
  summary: string;
  lines: ReadingLine[];
  wordTranslations: Record<string, string>;
  phraseTranslations: Record<string, string>;
}

export interface Material {
  id: string;
  title: string;
  fileName: string;
  type: "docx" | "pdf";
  tags: string[];
  summary: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  answer: string;
  direction: "english-to-punjabi" | "punjabi-to-english";
  options: string[];
}

export type TranslationDirection = "english-to-punjabi" | "punjabi-to-english";

export interface TranslationPrompt {
  id: string;
  english: string;
  punjabi: string;
  level: "sentence" | "paragraph";
  source: string;
}
