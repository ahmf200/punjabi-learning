import "./styles.css";
import { lessons } from "./data/lessons";
import { materialHref, materials } from "./data/materials";
import { vocabulary } from "./data/vocabulary";
import type { QuizQuestion, SectionId, VocabCategory } from "./types";
import { byId, escapeHtml } from "./utils/dom";
import { buildQuizQuestions, isCloseAnswer, shuffle } from "./utils/quiz";
import { SpeechController } from "./utils/speech";

const sections: Array<{ id: SectionId; label: string }> = [
  { id: "dashboard", label: "Home" },
  { id: "vocabulary", label: "Vocab" },
  { id: "lessons", label: "Lessons" },
  { id: "practice", label: "Practice" },
  { id: "materials", label: "Materials" },
  { id: "notes", label: "Notes" },
];

const speech = new SpeechController();

interface AppState {
  section: SectionId;
  vocabCategory: VocabCategory | "all";
  activeLessonId: string;
  quizQuestions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  typedAnswer: string;
  notesTab: string;
}

const state: AppState = {
  section: "dashboard",
  vocabCategory: "all",
  activeLessonId: lessons[0]?.id ?? "",
  quizQuestions: buildQuizQuestions(vocabulary, lessons).slice(0, 18),
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  typedAnswer: "",
  notesTab: "General",
};

function render(): void {
  byId("app").innerHTML = `
    <header class="app-header">
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="brand" aria-label="Punjabi Seekho">
        <span class="brand-mark" aria-hidden="true">ਪ</span>
        <span>Punjabi <strong>Seekho</strong></span>
      </div>
      <nav class="top-nav" aria-label="Primary navigation">
        ${sections.map((section) => navButton(section.id, section.label)).join("")}
      </nav>
    </header>
    <main id="main" tabindex="-1">
      ${renderSection()}
    </main>
    <nav class="bottom-nav" aria-label="Mobile navigation">
      ${sections.map((section) => navButton(section.id, section.label)).join("")}
    </nav>
  `;

  bindEvents();
}

function navButton(sectionId: SectionId, label: string): string {
  const isActive = state.section === sectionId;
  return `
    <button class="nav-button" data-section="${sectionId}" aria-current="${isActive ? "page" : "false"}">
      ${iconForSection(sectionId)}
      <span>${label}</span>
    </button>
  `;
}

function renderSection(): string {
  switch (state.section) {
    case "dashboard":
      return renderDashboard();
    case "vocabulary":
      return renderVocabulary();
    case "lessons":
      return renderLessons();
    case "practice":
      return renderPractice();
    case "materials":
      return renderMaterials();
    case "notes":
      return renderNotes();
  }
}

function renderDashboard(): string {
  const sentenceCount = lessons.reduce((total, lesson) => total + lesson.sentences.length, 0);
  const nextLesson = lessons.find((lesson) => lesson.id === state.activeLessonId) ?? lessons[0];

  return `
    <section class="overview" aria-labelledby="dashboard-title">
      <div class="page-heading">
        <p class="section-label">Personal study space</p>
        <h1 id="dashboard-title">Practise Pakistani Punjabi from your lessons</h1>
        <p>Keep vocabulary, tutor notes, downloadable lesson files, and daily practice in one tidy mobile-friendly app.</p>
      </div>
      <div class="metric-grid" aria-label="Study summary">
        ${metric("Lessons", String(lessons.length))}
        ${metric("Words", String(vocabulary.length))}
        ${metric("Sentences", String(sentenceCount))}
        ${metric("Files", String(materials.length))}
      </div>
      <div class="study-layout">
        <article class="panel featured-panel">
          <div class="panel-title-row">
            <div>
              <p class="section-label">Continue</p>
              <h2>${escapeHtml(nextLesson.title)}</h2>
            </div>
            <button class="icon-button" data-section="lessons" aria-label="Open lessons">${icon("arrowRight")}</button>
          </div>
          <p>${escapeHtml(nextLesson.summary)}</p>
          ${renderSentencePair(nextLesson.sentences[0], true)}
        </article>
        <aside class="panel stack-panel" aria-label="Quick actions">
          ${quickAction("vocabulary", "Review vocabulary", "Filter by pronouns, food, verbs, days, and general words.")}
          ${quickAction("practice", "Start practice", "Multiple choice and typed translation from your real lesson sentences.")}
          ${quickAction("materials", "Open materials", "Download the tutor Word documents and past-tense PDF.")}
        </aside>
      </div>
    </section>
  `;
}

function renderVocabulary(): string {
  const categories: Array<VocabCategory | "all"> = ["all", "pronouns", "family", "verbs", "food", "time", "general"];
  const items =
    state.vocabCategory === "all"
      ? vocabulary
      : vocabulary.filter((item) => item.category === state.vocabCategory);

  return `
    <section aria-labelledby="vocab-title">
      <div class="page-heading compact-heading">
        <p class="section-label">Vocabulary</p>
        <h1 id="vocab-title">Words from your lessons</h1>
        <p>Tap listen to hear a phrase. The voice uses the closest Punjabi, Urdu, or Hindi system voice available.</p>
      </div>
      <div class="filter-row" role="list" aria-label="Vocabulary filters">
        ${categories
          .map(
            (category) =>
              `<button class="chip" data-vocab-category="${category}" aria-pressed="${state.vocabCategory === category}">
                ${labelForCategory(category)}
              </button>`,
          )
          .join("")}
      </div>
      <div class="vocab-grid">
        ${items
          .map(
            (item) => `
              <article class="vocab-card">
                <p>${escapeHtml(item.english)}</p>
                <h2>${escapeHtml(item.punjabi)}</h2>
                <button class="listen-button" data-speak="${escapeHtml(item.punjabi)}">${icon("volume")} Listen</button>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderLessons(): string {
  const activeLesson = lessons.find((lesson) => lesson.id === state.activeLessonId) ?? lessons[0];

  return `
    <section aria-labelledby="lessons-title">
      <div class="page-heading compact-heading">
        <p class="section-label">Lessons</p>
        <h1 id="lessons-title">Structured lesson library</h1>
        <p>Each lesson is data-driven. Add a new lesson object and it appears here, in practice, and in the dashboard.</p>
      </div>
      <div class="lesson-layout">
        <div class="lesson-list" role="list" aria-label="Lesson list">
          ${lessons
            .map(
              (lesson) => `
                <button class="lesson-list-item" data-lesson-id="${lesson.id}" aria-pressed="${lesson.id === activeLesson.id}">
                  <span>${lesson.number}</span>
                  <strong>${escapeHtml(lesson.title)}</strong>
                  <small>${escapeHtml(lesson.summary)}</small>
                </button>
              `,
            )
            .join("")}
        </div>
        <article class="panel lesson-detail">
          <div class="panel-title-row">
            <div>
              <p class="section-label">Lesson ${activeLesson.number}${activeLesson.date ? ` · ${activeLesson.date}` : ""}</p>
              <h2>${escapeHtml(activeLesson.title)}</h2>
            </div>
            ${activeLesson.source ? `<a class="button ghost" href="${materialHref(activeLesson.source)}">Source file</a>` : ""}
          </div>
          <p>${escapeHtml(activeLesson.summary)}</p>
          ${activeLesson.passage ? renderPassage(activeLesson.passage) : ""}
          <div class="rule-grid">
            ${activeLesson.rules
              .map(
                (rule) => `
                  <section class="rule-box">
                    <h3>${escapeHtml(rule.title)}</h3>
                    <p>${escapeHtml(rule.body)}</p>
                  </section>
                `,
              )
              .join("")}
          </div>
          <h3 class="content-heading">Practice Sentences</h3>
          <div class="sentence-list">
            ${activeLesson.sentences.map((sentence) => renderSentencePair(sentence, true)).join("")}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderPractice(): string {
  const question = state.quizQuestions[state.currentQuestionIndex];
  const progress = Math.round((state.currentQuestionIndex / state.quizQuestions.length) * 100);

  if (!question) {
    return renderQuizComplete();
  }

  const isTypeQuestion = question.options.length === 0;

  return `
    <section aria-labelledby="practice-title">
      <div class="page-heading compact-heading">
        <p class="section-label">Practice</p>
        <h1 id="practice-title">Test yourself</h1>
        <p>Use multiple choice for speed, and typed answers when you want translation recall.</p>
      </div>
      <div class="practice-shell">
        <div class="progress-row" aria-label="Question progress">
          <div class="progress-track"><span style="width:${progress}%"></span></div>
          <strong>${state.currentQuestionIndex + 1} / ${state.quizQuestions.length}</strong>
        </div>
        <article class="quiz-card">
          <p class="section-label">${question.direction === "english-to-punjabi" ? "English to Punjabi" : "Punjabi to English"}</p>
          <h2>${escapeHtml(question.prompt)}</h2>
          ${question.direction === "punjabi-to-english" ? `<button class="listen-button" data-speak="${escapeHtml(question.prompt)}">${icon("volume")} Listen</button>` : ""}
          ${
            isTypeQuestion
              ? renderTypedQuestion()
              : `<div class="option-grid">${question.options.map((option) => renderOption(option, question.answer)).join("")}</div>`
          }
          ${state.selectedAnswer ? renderFeedback(question) : ""}
        </article>
        <div class="action-row">
          <button class="button ghost" data-quiz-skip>Skip</button>
          <button class="button primary" data-quiz-next ${state.selectedAnswer ? "" : "disabled"}>Next</button>
          <button class="button ghost" data-quiz-reset>Restart</button>
        </div>
      </div>
    </section>
  `;
}

function renderMaterials(): string {
  return `
    <section aria-labelledby="materials-title">
      <div class="page-heading compact-heading">
        <p class="section-label">Materials</p>
        <h1 id="materials-title">Tutor documents and PDFs</h1>
        <p>These files are now part of the GitHub Pages app build and can be opened from any device.</p>
      </div>
      <div class="material-grid">
        ${materials
          .map(
            (material) => `
              <article class="material-card">
                <div class="material-type">${material.type.toUpperCase()}</div>
                <h2>${escapeHtml(material.title)}</h2>
                <p>${escapeHtml(material.summary)}</p>
                <div class="tag-row">${material.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
                <a class="button primary" href="${materialHref(material.fileName)}">Open file</a>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderNotes(): string {
  const tabs = ["General", "Vocab", "Grammar", "Sentences", "Questions"];
  const value = localStorage.getItem(noteKey(state.notesTab)) ?? "";

  return `
    <section aria-labelledby="notes-title">
      <div class="page-heading compact-heading">
        <p class="section-label">Notes</p>
        <h1 id="notes-title">Private study notes</h1>
        <p>Notes stay in this browser using local storage. They are useful for tutor corrections and lesson prep.</p>
      </div>
      <div class="notes-shell">
        <div class="filter-row" role="tablist" aria-label="Note sections">
          ${tabs
            .map(
              (tab) =>
                `<button class="chip" role="tab" data-note-tab="${tab}" aria-selected="${tab === state.notesTab}">${tab}</button>`,
            )
            .join("")}
        </div>
        <label class="sr-only" for="notes-area">${state.notesTab} notes</label>
        <textarea id="notes-area" class="notes-area" spellcheck="true">${escapeHtml(value)}</textarea>
        <p class="save-hint" aria-live="polite" id="notes-status">Saved to this device</p>
        <div class="quick-phrases" aria-label="Quick phrases">
          ${["Mein ___ aa", "Tusi kinnay wajay?", "Menu ___ passand aa", "Meray kol ___ aa", "Kal mein ___ c", "Oday baad"]
            .map((phrase) => `<button class="chip" data-insert-phrase="${escapeHtml(phrase)}">${escapeHtml(phrase)}</button>`)
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderTypedQuestion(): string {
  return `
    <div class="typed-answer">
      <label class="sr-only" for="typed-answer">Type the Punjabi translation</label>
      <input id="typed-answer" value="${escapeHtml(state.typedAnswer)}" placeholder="Mein..." autocomplete="off" />
      <div class="action-row compact">
        <button class="button primary" data-check-typed>Check</button>
        ${speech.canListen ? `<button class="button ghost" data-listen-answer>${icon("mic")} Speak</button>` : ""}
      </div>
    </div>
  `;
}

function renderQuizComplete(): string {
  return `
    <section aria-labelledby="practice-title">
      <div class="practice-shell">
        <article class="panel complete-card">
          <p class="section-label">Complete</p>
          <h1 id="practice-title">${state.score} / ${state.quizQuestions.length}</h1>
          <p>${state.score >= 14 ? "Bahut vadiya. Strong session." : "Good practice. Review missed sentences, then go again."}</p>
          <button class="button primary" data-quiz-reset>Start another session</button>
        </article>
      </div>
    </section>
  `;
}

function renderOption(option: string, answer: string): string {
  const selectedClass = state.selectedAnswer === option ? " selected" : "";
  const resultClass = state.selectedAnswer && option === answer ? " correct" : "";
  return `<button class="option-button${selectedClass}${resultClass}" data-option="${escapeHtml(option)}">${escapeHtml(option)}</button>`;
}

function renderFeedback(question: QuizQuestion): string {
  const isCorrect = state.selectedAnswer === question.answer || isCloseAnswer(state.selectedAnswer ?? "", question.answer);
  return `
    <div class="feedback ${isCorrect ? "success" : "error"}" role="status">
      <strong>${isCorrect ? "Correct" : "Not quite"}</strong>
      <span>Answer: ${escapeHtml(question.answer)}</span>
    </div>
  `;
}

function renderSentencePair(sentence: { english: string; punjabi: string } | undefined, withListen: boolean): string {
  if (!sentence) {
    return "";
  }

  return `
    <div class="sentence-pair">
      <p>${escapeHtml(sentence.english)}</p>
      <strong>${escapeHtml(sentence.punjabi)}</strong>
      ${withListen ? `<button class="listen-button" data-speak="${escapeHtml(sentence.punjabi)}">${icon("volume")} Listen</button>` : ""}
    </div>
  `;
}

function renderPassage(passage: NonNullable<(typeof lessons)[number]["passage"]>): string {
  return `
    <section class="passage">
      <p class="section-label">${escapeHtml(passage.title)}</p>
      <p>${escapeHtml(passage.english)}</p>
      <div class="divider"></div>
      <strong>${escapeHtml(passage.punjabi)}</strong>
      <button class="listen-button" data-speak="${escapeHtml(passage.punjabi)}">${icon("volume")} Listen</button>
    </section>
  `;
}

function metric(label: string, value: string): string {
  return `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`;
}

function quickAction(sectionId: SectionId, title: string, body: string): string {
  return `
    <button class="quick-action" data-section="${sectionId}">
      <strong>${title}</strong>
      <span>${body}</span>
      ${icon("arrowRight")}
    </button>
  `;
}

function bindEvents(): void {
  document.querySelectorAll<HTMLElement>("[data-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.section = button.dataset.section as SectionId;
      render();
      byId("main").focus();
    });
  });

  document.querySelectorAll<HTMLElement>("[data-speak]").forEach((button) => {
    button.addEventListener("click", () => speech.speak(button.dataset.speak ?? ""));
  });

  document.querySelectorAll<HTMLButtonElement>("[data-vocab-category]").forEach((button) => {
    button.addEventListener("click", () => {
      state.vocabCategory = button.dataset.vocabCategory as VocabCategory | "all";
      render();
    });
  });

  document.querySelectorAll<HTMLButtonElement>("[data-lesson-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeLessonId = button.dataset.lessonId ?? state.activeLessonId;
      render();
    });
  });

  bindPracticeEvents();
  bindNotesEvents();
}

function bindPracticeEvents(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = state.quizQuestions[state.currentQuestionIndex];
      const answer = button.dataset.option ?? "";
      state.selectedAnswer = answer;
      if (question && answer === question.answer) {
        state.score += 1;
      }
      render();
    });
  });

  document.querySelector("[data-check-typed]")?.addEventListener("click", checkTypedAnswer);
  byIdOrNull<HTMLInputElement>("typed-answer")?.addEventListener("input", (event) => {
    state.typedAnswer = (event.target as HTMLInputElement).value;
  });
  byIdOrNull<HTMLInputElement>("typed-answer")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkTypedAnswer();
    }
  });
  document.querySelector("[data-listen-answer]")?.addEventListener("click", () => {
    speech.listen(
      (transcript) => {
        state.typedAnswer = transcript;
        const input = byIdOrNull<HTMLInputElement>("typed-answer");
        if (input) input.value = transcript;
      },
      () => undefined,
    );
  });
  document.querySelector("[data-quiz-next]")?.addEventListener("click", () => {
    state.currentQuestionIndex += 1;
    state.selectedAnswer = null;
    state.typedAnswer = "";
    render();
  });
  document.querySelector("[data-quiz-skip]")?.addEventListener("click", () => {
    state.currentQuestionIndex += 1;
    state.selectedAnswer = null;
    state.typedAnswer = "";
    render();
  });
  document.querySelector("[data-quiz-reset]")?.addEventListener("click", resetQuiz);
}

function bindNotesEvents(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-note-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.notesTab = button.dataset.noteTab ?? "General";
      render();
    });
  });

  byIdOrNull<HTMLTextAreaElement>("notes-area")?.addEventListener("input", (event) => {
    localStorage.setItem(noteKey(state.notesTab), (event.target as HTMLTextAreaElement).value);
    const status = byIdOrNull("notes-status");
    if (status) status.textContent = "Saved just now";
  });

  document.querySelectorAll<HTMLButtonElement>("[data-insert-phrase]").forEach((button) => {
    button.addEventListener("click", () => {
      const area = byIdOrNull<HTMLTextAreaElement>("notes-area");
      if (!area) return;
      const phrase = button.dataset.insertPhrase ?? "";
      const start = area.selectionStart;
      area.value = `${area.value.slice(0, start)}${phrase}\n${area.value.slice(start)}`;
      area.focus();
      localStorage.setItem(noteKey(state.notesTab), area.value);
    });
  });
}

function checkTypedAnswer(): void {
  const question = state.quizQuestions[state.currentQuestionIndex];
  if (!question) return;

  const input = byIdOrNull<HTMLInputElement>("typed-answer")?.value ?? state.typedAnswer;
  state.selectedAnswer = input;
  if (isCloseAnswer(input, question.answer)) {
    state.score += 1;
  }
  render();
}

function resetQuiz(): void {
  state.quizQuestions = shuffle(buildQuizQuestions(vocabulary, lessons)).slice(0, 18);
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.selectedAnswer = null;
  state.typedAnswer = "";
  render();
}

function noteKey(tab: string): string {
  return `punjabi-seekho-note-${tab}`;
}

function byIdOrNull<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function labelForCategory(category: VocabCategory | "all"): string {
  if (category === "all") return "All";
  return category[0].toUpperCase() + category.slice(1);
}

function iconForSection(section: SectionId): string {
  const icons: Record<SectionId, string> = {
    dashboard: icon("home"),
    vocabulary: icon("book"),
    lessons: icon("layers"),
    practice: icon("target"),
    materials: icon("file"),
    notes: icon("note"),
  };
  return icons[section];
}

function icon(name: "home" | "book" | "layers" | "target" | "file" | "note" | "volume" | "arrowRight" | "mic"): string {
  const paths = {
    home: '<path d="M3 10.8 12 4l9 6.8V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M5 4h10a4 4 0 0 1 4 4v12H8a3 3 0 0 0-3 3z"/><path d="M5 4v16a3 3 0 0 1 3-3h11"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.8"/>',
    file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    note: '<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    volume: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9.5a4 4 0 0 1 0 5"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    mic: '<path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>',
  };

  return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths[name]}</svg>`;
}

void speech.loadVoices();
render();
