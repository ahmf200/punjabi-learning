import type { Lesson, QuizQuestion, VocabularyItem } from "../types";
import { normaliseAnswer } from "./dom";

export function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function buildQuizQuestions(vocabulary: VocabularyItem[], lessons: Lesson[]): QuizQuestion[] {
  const vocabQuestions = vocabulary.flatMap((item, index) => {
    const wrongPunjabi = shuffle(vocabulary.filter((candidate) => candidate.punjabi !== item.punjabi))
      .slice(0, 3)
      .map((candidate) => candidate.punjabi);
    const wrongEnglish = shuffle(vocabulary.filter((candidate) => candidate.english !== item.english))
      .slice(0, 3)
      .map((candidate) => candidate.english);

    return [
      {
        id: `vocab-en-pa-${index}`,
        prompt: item.english,
        answer: item.punjabi,
        direction: "english-to-punjabi" as const,
        options: shuffle([item.punjabi, ...wrongPunjabi]),
      },
      {
        id: `vocab-pa-en-${index}`,
        prompt: item.punjabi,
        answer: item.english,
        direction: "punjabi-to-english" as const,
        options: shuffle([item.english, ...wrongEnglish]),
      },
    ];
  });

  const sentenceQuestions = lessons.flatMap((lesson) =>
    lesson.sentences.map((sentence, index) => ({
      id: `${lesson.id}-sentence-${index}`,
      prompt: sentence.english,
      answer: sentence.punjabi,
      direction: "english-to-punjabi" as const,
      options: [],
    })),
  );

  return shuffle([...vocabQuestions, ...sentenceQuestions]);
}

export function isCloseAnswer(input: string, answer: string): boolean {
  const submitted = normaliseAnswer(input);
  const expected = normaliseAnswer(answer);

  if (!submitted) {
    return false;
  }

  return submitted === expected || (expected.includes(submitted) && submitted.length > 4);
}
