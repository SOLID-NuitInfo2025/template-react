import type { ApiResponse } from "../types/quiz";
import questionsData from "../data/questions.json";

export const fetchQuestions = async (): Promise<ApiResponse> => {
  // Directly return the imported JSON data. Wrapped in a Promise to match async API.
  return new Promise((resolve) => {
    resolve(questionsData as ApiResponse);
  });
};
