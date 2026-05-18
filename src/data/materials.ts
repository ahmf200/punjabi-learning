import type { Material } from "../types";

export const materials: Material[] = [
  {
    id: "lessons-1-8",
    title: "Lessons 1-8",
    fileName: "lessons_1-8.docx",
    type: "docx",
    tags: ["core lessons", "grammar", "sentences"],
    summary: "The original lesson pack covering pronouns, this/that, tenses, daily routine, and have/like patterns.",
  },
  {
    id: "daily-routine",
    title: "Daily Routine and Practice Sentences",
    fileName: "daily_routine+practice_sentences.docx",
    type: "docx",
    tags: ["daily routine", "time", "numbers"],
    summary: "Daily routine passage, time questions, numbers 1-12, and routine practice sentences.",
  },
  {
    id: "simple-conversation",
    title: "Simple Conversation and Practice Sentences",
    fileName: "simple_conversation+practice_sentences.docx",
    type: "docx",
    tags: ["conversation", "family", "present tense"],
    summary: "Formal conversation practice with family questions and common present-tense responses.",
  },
  {
    id: "past-tense-transitive",
    title: "Past Tense Transitive",
    fileName: "past_tense_transitive.docx",
    type: "docx",
    tags: ["past tense", "transitive", "grammar"],
    summary: "Notes on simple past, direct objects, and the use of ne in transitive past-tense sentences.",
  },
  {
    id: "past-tense-pdf",
    title: "Past Tense Transitive and Intransitive Concepts",
    fileName: "Past tense Transitive and Intransitive Concepts Punjabi.pdf",
    type: "pdf",
    tags: ["past tense", "intransitive", "grammar"],
    summary: "PDF explanation of transitive and intransitive past tense concepts with examples.",
  },
  {
    id: "practice-recap",
    title: "Practice Recap",
    fileName: "practice_recap.docx",
    type: "docx",
    tags: ["recap", "questions", "symptoms"],
    summary: "Family questions, travel recap, and phrases for needs or feelings.",
  },
  {
    id: "days-practice",
    title: "Practice Sentences and Names of Days",
    fileName: "pratice_sentences_+_name_of_days.docx",
    type: "docx",
    tags: ["days", "future tense", "practice"],
    summary: "Days of the week and simple future-tense practice sentences.",
  },
  {
    id: "assignment-practice",
    title: "Assignment Practice",
    fileName: "assignment_practice.docx",
    type: "docx",
    tags: ["assignment", "likes", "have"],
    summary: "Tutor assignment sentences about likes, family, rooms, and possessions.",
  },
  {
    id: "previous-day",
    title: "Talking About Previous Day",
    fileName: "talking_about_previous_day.docx",
    type: "docx",
    tags: ["past tense", "passage", "conversation"],
    summary: "A longer previous-day passage in English and Roman Punjabi for past-tense practice.",
  },
];

export const materialHref = (fileName: string) =>
  `./punjabi_lesson_material/${encodeURIComponent(fileName)}`;
