const supabaseAdmin = require("../config/supabaseAdmin");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
if (!supabaseAdmin || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({
      message: "Supabase client unavailable",
      error: "Supabase client is not properly configured"
    });
  }
  try {
    const { teamName, roomPoints, crosswordPoints, score } = req.body;

    if (!teamName || !roomPoints || !crosswordPoints || !score) {
      return res.status(400).json({
        message: "All fields are required",
        error: "Missing required fields",
      });
    }

   else{
   
      const { data: updatedParticipant, error: updateError } = await supabaseAdmin
        .from("participants")
        .update({
          room_score: parseFloat(roomPoints),
          crossword_score: parseFloat(crosswordPoints),
          score: parseFloat(score),
        })
        .eq("team_name", teamName)
        .select()
        .maybeSingle();

      if (updateError) {
        return res.status(500).json({
          message: "Failed to save crossword score",
          error: updateError.message,
        });
      }

      return res.status(200).json({
        message: "Crossword score saved successfully",
        participant: updatedParticipant,
      });
    }
  } catch (error) {
    console.error("Save score error:", error);
    return res.status(500).json({
      message: "Error processing request",
      error: error.message,
    });
  }
};
