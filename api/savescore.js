const supabaseAdmin = require("../config/supabaseAdmin");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { team_name, code } = req.body;

    if (!team_name || !code) {
      return res.status(400).json({
        message: "Team name and access code are required",
      });
    }

    const expectedCode = process.env.ACCESS_CODE;

    if (code !== expectedCode) {
      return res.status(401).json({
        message: "Invalid access code",
      });
    }

    if (!supabaseAdmin || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(201).json({
        message: "Participant created successfully",
        participant: { team_name, id: "local-dev" },
      });
    }

    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from("participants")
      .select("id")
      .eq("team_name", team_name)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({
        message: "Error checking participant",
        error: fetchError.message,
      });
    }

    if (existingUser) {
      return res.status(409).json({
        message: "Participant already exists",
      });
    }

    const { data: participant, error: insertError } = await supabaseAdmin
      .from("participants")
      .insert({ team_name })
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({
        message: "Failed to create participant",
        error: insertError.message,
      });
    }

    return res.status(201).json({
      message: "Participant created successfully",
      participant,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
