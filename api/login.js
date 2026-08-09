const supabaseAdmin = require("../config/supabaseAdmin");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { team_name, code } = req.body;

    // Validate required fields
    if (!team_name || !code) {
      return res.status(400).json({
        message: "Team name and access code are required",
      });
    }

    // Validate access code
    const expectedCode = process.env.ACCESS_CODE;

    if (code !== expectedCode) {
      return res.status(401).json({
        message: "Invalid access code",
      });
    }

    // Check Supabase configuration
    if (
      !supabaseAdmin ||
      !process.env.SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return res.status(500).json({
        message: "Supabase client unavailable",
        error: "Supabase client is not properly configured",
      });
    }

    // Insert participant
    const { data: participant, error: insertError } = await supabaseAdmin
      .from("participants")
      .insert({ team_name })
      .select()
      .single();

    // Handle duplicate team
    if (insertError && insertError.code === "23505") {
      return res.status(409).json({
        message: "Team already logged in",
      });
    }

    // Handle other database errors
    if (insertError) {
      return res.status(500).json({
        message: "Failed to create participant",
        error: insertError.message,
      });
    }

    // Success
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

