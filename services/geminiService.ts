import { GoogleGenAI, Type } from "@google/genai";
import type { QuranVerse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Fix: Removed unsupported 'required' property from responseSchema.
// Properties defined in the 'properties' object are implicitly required by the Gemini API.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    surahName: {
      type: Type.STRING,
      description: "The name of the Surah in English (e.g., Al-Baqarah).",
    },
    verseNumber: {
      type: Type.STRING,
      description: "The verse number(s) (e.g., '2:155' or '3:139-140').",
    },
    arabicText: {
      type: Type.STRING,
      description: "The full verse in its original Arabic script, including tashkeel.",
    },
    englishTranslation: {
      type: Type.STRING,
      description: "A clear and accurate English translation of the verse.",
    },
    bengaliTranslation: {
      type: Type.STRING,
      description: "A clear and accurate Bengali translation of the verse.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, one-sentence explanation of the verse's relevance to the user's emotion.",
    },
  },
};

export const getVerseForEmotion = async (emotion: string): Promise<QuranVerse> => {
  const prompt = `
    I am feeling ${emotion}. 
    Please provide one single, specific, and comforting verse from the Quran that can provide guidance or solace for this feeling.
    Provide the verse in Arabic, with its English translation, and also with its Bengali translation.
    Also, provide a brief, one-sentence explanation of the verse's relevance to the feeling of ${emotion}.
    Do not provide any other commentary, just the verse details and the one-sentence explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);

    // Basic validation to ensure the response matches our expected structure
    if (
      !parsedResponse.surahName ||
      !parsedResponse.verseNumber ||
      !parsedResponse.arabicText ||
      !parsedResponse.englishTranslation ||
      !parsedResponse.bengaliTranslation ||
      !parsedResponse.explanation
    ) {
      throw new Error("Invalid response structure from API.");
    }
    
    return parsedResponse as QuranVerse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};