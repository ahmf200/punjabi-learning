import { describe, expect, it } from "vitest";
import { lessons } from "../data/lessons";
import { translationPrompts } from "../data/translationPrompts";
import { vocabulary } from "../data/vocabulary";
import { buildQuizQuestions, isCloseAnswer } from "./quiz";

describe("quiz helpers", () => {
  it("builds questions from vocabulary and lesson sentences", () => {
    const questions = buildQuizQuestions(vocabulary, lessons);

    expect(questions.length).toBeGreaterThan(vocabulary.length);
    expect(questions.some((question) => question.options.length === 0)).toBe(true);
    expect(questions.some((question) => question.direction === "punjabi-to-english")).toBe(true);
  });

  it("accepts exact and partial roman Punjabi answers after normalization", () => {
    expect(isCloseAnswer("Mein khaun ga", "Mein kha+un ga.")).toBe(true);
    expect(isCloseAnswer("khaun", "Mein kha+un ga.")).toBe(true);
    expect(isCloseAnswer("totally different", "Mein kha+un ga.")).toBe(false);
  });

  it("provides a broad translation bank with sentence and paragraph prompts", () => {
    expect(translationPrompts.length).toBeGreaterThan(70);
    expect(translationPrompts.some((prompt) => prompt.level === "paragraph")).toBe(true);
    expect(translationPrompts.every((prompt) => prompt.english && prompt.punjabi)).toBe(true);
  });

  it("includes connected translation drills with sequencing language", () => {
    const connectedPrompts = translationPrompts.filter((prompt) =>
      /\b(and|then|after|before|but|when)\b/i.test(prompt.english),
    );
    const longerPrompts = translationPrompts.filter((prompt) => prompt.english.split(/\s+/).length >= 18);

    expect(connectedPrompts.length).toBeGreaterThan(25);
    expect(longerPrompts.length).toBeGreaterThan(20);
  });
});
