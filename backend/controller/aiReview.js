// import { GoogleGenAI } from "@google/genai";
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
const { json } = require("express");
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const aiReview = async (req, res) => {
  const { language, code, problemDescription } = req.body;
  //   console.log(problemDescription);
  //   console.log(language);
  //   console.log(code);
  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  try {
    const response = await ai.models.generateContent({
      model: process.env.GOOGLE_GEMINI_MODEL,
      contents: `Anyalze the code with the given problem desciption and genrate hints\n\n :  Language: ${language} Problem Description: ${problemDescription}Code: ${code}`,
    });
    console.log(response.text);
    return res.json({ review: response.text });
  } catch (err) {
    return res.json({ err: err.message });
  }
};

module.exports = { aiReview };
