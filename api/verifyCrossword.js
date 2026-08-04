const answers = require("../public/data/crosswordAnswers");

module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const wordIndex = Number(req.query.wordIndex);
  const { answer } = req.body;

  if (!Number.isInteger(wordIndex) || !answers[wordIndex] || typeof answer !== "string") {
    return res.status(400).json({ correct: false });
  }

  const correct = answer.length === answers[wordIndex].length && answer.toUpperCase() === answers[wordIndex];
  return res.json({ correct });
};
