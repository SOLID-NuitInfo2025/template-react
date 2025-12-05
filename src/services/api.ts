import type { ApiResponse } from "../types/quiz";

const API_URL =
  import.meta.env.VITE_QUIZ_API_URL || "http://localhost:3001/api/questions";

export const fetchQuestions = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
