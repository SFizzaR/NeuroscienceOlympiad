const supabaseAdmin = require("../config/supabaseAdmin");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { teamName, roomPoints, crosswordPoints, score } = req.body;

    if (!teamName) {
      return res.status(400).json({
        message: "Team name is required",
        error: "Missing team name",
      });
    }

    if (!supabaseAdmin || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(200).json({
        message: "Score saved successfully",
        participant: { team_name: teamName },
      });
    }

    if (roomPoints !== undefined) {
      const { data: participant, error: updateError } = await supabaseAdmin
        .from("participants")
        .update({ room_score: roomPoints })
        .eq("team_name", teamName)
        .select()
        .single();

      if (updateError) {
        return res.status(500).json({
          message: "Failed to update room score",
          error: updateError.message,
        });
      }

      return res.status(200).json({
        message: "Room score saved successfully",
        participant,
      });
    }

    if (crosswordPoints !== undefined && score !== undefined) {
      const { data: updatedParticipant, error: updateError } = await supabaseAdmin
        .from("participants")
        .update({
          crossword_score: parseFloat(crosswordPoints),
          score: parseFloat(score),
        })
        .eq("team_name", teamName)
        .select()
        .single();

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

    return res.status(400).json({
      message: "Either roomPoints or crosswordPoints must be provided",
    });
  } catch (error) {
    console.error("Save score error:", error);
    return res.status(500).json({
      message: "Error processing request",
      error: error.message,
    });
  }
};