type SpeechRecognitionConstructor = new () => SpeechRecognition;

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export class SpeechController {
  private voice: SpeechSynthesisVoice | null = null;
  private recognition: SpeechRecognition | null = null;

  constructor(private readonly rate = 0.82) {
    this.configureRecognition();
  }

  get canListen(): boolean {
    return this.recognition !== null;
  }

  async loadVoices(): Promise<SpeechSynthesisVoice[]> {
    if (!("speechSynthesis" in window)) {
      return [];
    }

    const voices = await new Promise<SpeechSynthesisVoice[]>((resolve) => {
      const current = window.speechSynthesis.getVoices();
      if (current.length > 0) {
        resolve(current);
        return;
      }

      window.speechSynthesis.onvoiceschanged = () => resolve(window.speechSynthesis.getVoices());
      window.setTimeout(() => resolve(window.speechSynthesis.getVoices()), 350);
    });

    this.voice = this.pickVoice(voices);
    return voices;
  }

  speak(text: string): void {
    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replaceAll("+", ""));
    utterance.rate = this.rate;
    utterance.pitch = 1;
    if (this.voice) {
      utterance.voice = this.voice;
    }
    window.speechSynthesis.speak(utterance);
  }

  listen(onTranscript: (transcript: string) => void, onEnd: () => void): void {
    if (!this.recognition) {
      onEnd();
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join("");
      onTranscript(transcript);
    };
    this.recognition.onend = onEnd;
    this.recognition.onerror = onEnd;

    try {
      this.recognition.start();
    } catch {
      onEnd();
    }
  }

  private pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    const score = (voice: SpeechSynthesisVoice) => {
      if (/pa-PK/i.test(voice.lang)) return 0;
      if (/ur-PK/i.test(voice.lang)) return 1;
      if (/pa-IN/i.test(voice.lang)) return 2;
      if (/hi-IN/i.test(voice.lang)) return 3;
      if (/pa/i.test(voice.lang)) return 4;
      if (/ur/i.test(voice.lang)) return 5;
      if (/hi/i.test(voice.lang)) return 6;
      return 7;
    };

    return [...voices].sort((a, b) => score(a) - score(b))[0] ?? null;
  }

  private configureRecognition(): void {
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      return;
    }

    this.recognition = new Recognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = "pa-PK";
  }
}
