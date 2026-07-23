const answers = require('../data/crosswordAnswers');

function verifyCrosswordWord(req, res) {
  const wordIndex = Number(req.params.wordIndex);
  const { answer } = req.body;

  if (!Number.isInteger(wordIndex) || !answers[wordIndex] || typeof answer !== 'string') {
    return res.status(400).json({ correct: false });
  }

  const correct = answer.length === answers[wordIndex].length &&
    answer.toUpperCase() === answers[wordIndex];

  // Return only the comparison result, never the stored answer.
  return res.json({ correct });
}

module.exports = { verifyCrosswordWord };