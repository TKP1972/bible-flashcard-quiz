import { GoogleGenAI, Type } from "@google/genai";

export const generateQuizOptions = async (question, correctAnswer) => {
    // Check for API key availability at the point of use.
    if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
        console.warn("API_KEY environment variable not set. AI features will be disabled.");
        return null;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
        
        try {
            const result = JSON.parse(jsonString);

            if (!result.incorrect_options || !Array.isArray(result.incorrect_options)) {
                console.error("Invalid response structure from Gemini:", result);
                return null;
            }
            
            const incorrectOptions = result.incorrect_options.map((opt) => ({ ...opt, isCorrect: false }));

            const allOptions = [
                ...incorrectOptions,
                { ...correctAnswer, isCorrect: true },
            ];

            // Shuffle the options
            return allOptions.sort(() => Math.random() - 0.5);
        } catch (parseError) {
            console.error("Error parsing JSON response from Gemini:", parseError);
            console.error("Original response text:", jsonString);
            return null;
        }

    } catch (error) {
        console.error("Error generating quiz options with Gemini:", error);
        return null;
    }
};