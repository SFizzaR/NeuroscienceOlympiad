const roomPins = require("../backend/data/roomPins");

module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const roomNumber = Number(req.query.roomNumber);
    const { pin } = req.body;

    if (!Number.isInteger(roomNumber) || !/^\d{4}$/.test(pin || "")) {
      return res.status(400).json({ correct: false });
    }

    const correct = roomPins[roomNumber] === pin;
    return res.status(200).json({ correct });
  } catch (error) {
    console.error("PIN verification error:", error);
    return res.status(400).json({ correct: false });
  }
};