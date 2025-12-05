export interface Impact {
  viePrivee?: number;
  donnees?: number;
  argent?: number;
  securite?: number;
  dependance?: number;
  durabilite?: number;
}

export interface ApiQuestion {
  id: number;
  theme: string;
  question: string;
  correctAnswer: "Vrai" | "Faux";
  impact: Impact;
  explain: string;
  tip: string;
}

export interface ApiResponse {
  questions: ApiQuestion[];
}

export interface QuizState {
  currentIndex: number;
  score: number;
  showResult: boolean;
  impacts: {
    viePrivee: number;
    donnees: number;
    argent: number;
    securite: number;
    dependance: number;
    durabilite: number;
  };
}
