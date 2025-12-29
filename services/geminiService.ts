import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPoem } from "../types";

const createClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing in process.env");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-dev' });
};

export const generateRomanticPoem = async (topic: string = "eternal love"): Promise<GeneratedPoem> => {
  const ai = createClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a short, deeply romantic poem in Chinese (with a title) about ${topic} and shooting stars. The tone should be emotional, beautiful, and poetic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The title of the poem",
            },
            content: {
              type: Type.STRING,
              description: "The content of the poem, with line breaks represented by newline characters",
            },
          },
          required: ["title", "content"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini");
    }

    return JSON.parse(text) as GeneratedPoem;
  } catch (error) {
    console.error("Error generating poem:", error);
    // Fallback in case of API error or quota limits for a smooth UI experience
    return {
      title: "星空下的约定",
      content: "流星划过天际的瞬间，\n是你我眼眸中永恒的誓言。\n在这浩瀚无垠的宇宙里，\n我们是彼此唯一的引力。\n\n时光虽如流沙逝去，\n爱意却如星光璀璨。\n愿执子之手，\n共赴这场漫长的浪漫。"
    };
  }
};
