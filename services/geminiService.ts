
import { GoogleGenAI, Type } from "@google/genai";
import { Scripture } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export interface QuizOption extends Scripture {
    isCorrect: boolean;
}

export const generateQuizOptions = async (question: string, correctAnswer: Scripture): Promise<QuizOption[] | null> => {
    if (!process.env.API_KEY) {
        return null;
    }

    try {
        const prompt = `You are a Bible quiz generator. Your task is to create a multiple-choice question.
Important: All generated scripture references and their text MUST come exclusively from the New World Translation of the Holy Scriptures (2013 Revision). Do not use any other Bible translation.

I will provide the main question and the correct scripture answer. You need to generate three plausible but incorrect scripture options. These incorrect options should be thematically related but not directly answer the question.

Question: "${question}"
Correct Answer: "${correctAnswer.reference} - ${correctAnswer.text}"

Please generate three incorrect options.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        incorrect_options: {
                            type: Type.ARRAY,
                            description: "An array of three plausible but incorrect scripture answers from the NWT 2013 Revision.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    reference: {
                                        type: Type.STRING,
                                        description: "The book, chapter, and verse of the scripture."
                                    },
                                    text: {
                                        type: Type.STRING,
                                        description: "The text of the scripture."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const jsonString = response.text;
        const result = JSON.parse(jsonString);
        
        const incorrectOptions = result.incorrect_options.map((opt: Scripture) => ({ ...opt, isCorrect: false }));

        const allOptions: QuizOption[] = [
            ...incorrectOptions,
            { ...correctAnswer, isCorrect: true },
        ];

        // Shuffle the options
        return allOptions.sort(() => Math.random() - 0.5);

    } catch (error) {
        console.error("Error generating quiz options with Gemini:", error);
        return null;
    }
};