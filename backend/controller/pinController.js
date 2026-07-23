const roomPins = require('../data/roomPins');

function verifyPin(req, res) {
  const roomNumber = Number(req.params.roomNumber);
  const { pin } = req.body;

  if (!Number.isInteger(roomNumber) || !/^\d{4}$/.test(pin || '')) {
    return res.status(400).json({ correct: false });
  }

  // Only the result of the comparison is sent to the renderer. The PIN is
  // never included in a response or in the frontend room data.
  const correct = roomPins[roomNumber] === pin;
  return res.status(200).json({ correct });
}

module.exports = { verifyPin };