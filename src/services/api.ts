import type { ApiResponse } from "../types/quiz";

const API_URL = import.meta.env.VITE_QUIZ_API_URL || "/questions.json";

export const fetchQuestions = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // The API may return either { questions: [...] } or an array [...].
    const raw = await response.json();

    if (Array.isArray(raw)) {
      return { questions: raw } as ApiResponse;
    }

    if (raw && Array.isArray(raw.questions)) {
      return raw as ApiResponse;
    }

    throw new Error("Invalid questions format from API");
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
