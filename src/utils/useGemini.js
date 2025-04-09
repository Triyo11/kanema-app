import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY_GEMINI,
});

export async function getGeminiResponse(propertySearchByAI) {
  const prompt = `
    Hi, you are a movie watcher.
    I have a movie or series with description like this:
    Genre: ${propertySearchByAI.genre.map((item) => item.value).join(", ")} 
    Year: ${propertySearchByAI.year}
    Casts: ${propertySearchByAI.casts}
    Synopsis: ${propertySearchByAI.synopsis}

    Please provide me a list of movies or series that match the description, 
    from the closest to the description to the least close. 
    Send a response in Array of Object form with template like below.
    Give a full description in Indonesian.
    Do not include any other text in your response.
    Example:
    [
      {
        title: "title1",
        year: 2023,
        type: "movie",
        description: "description"
      },
      {
        title: "title2",
        year: 2023,
        type: "tv",
        description: "description"
      },
    ]`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: prompt,
  });

  const result = parseMarkdownJson(response.text);
  return result;
}

function parseMarkdownJson(raw) {
  // Hilangkan ```json dan ```
  const cleaned = raw
    .replace(/^```json\n/, "") // hapus ```json di awal
    .replace(/\n```$/, ""); // hapus ``` di akhir

  return JSON.parse(cleaned);
}
