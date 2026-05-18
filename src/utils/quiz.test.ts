import { describe, expect, it } from "vitest";
import { lessons } from "../data/lessons";
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
});
