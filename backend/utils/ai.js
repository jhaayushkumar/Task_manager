const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const getTaskSuggestion = async (taskTitle) => {
  try {
    const prompt = `Suggest improvements or tips for my task: "${taskTitle}"`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
    });

    return response.data.choices[0].text.trim();
  } catch (err) {
    console.error("AI Error:", err.message);
    return null;
  }
};

module.exports = getTaskSuggestion;
