const expressAsyncHandler = require("express-async-handler");
const supabaseAdmin = require("../config/supabaseAdmin");
const { error } = require("proc-log");

const login = expressAsyncHandler(async (req, res) => {
    const { team_name, code } = req.body;

    if (!team_name || !code) {
        return res.status(400).json({
            message: "Team name and access code are required",
        });
    }

    if (code !== process.env.ACCESS_CODE) {
        return res.status(401).json({
            message: "Invalid access code",
        });
    }

    // Check if participant already exists
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

    // Insert new participant
    const { data: participant, error: insertError } = await supabaseAdmin
        .from("participants")
        .insert({
            team_name: team_name,
        })
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
});

const savescore = expressAsyncHandler(async (req, res) => {
    const { teamName, roomPoints, crosswordPoints, score } = req.body;

    if (!teamName) {
        return res.status(400).json({
            message: "Team name is required",
            error: "Missing team name",
        });
    }

    // Save room score
    if (roomPoints !== undefined) {
        const { data: participant, error: updateError } = await supabaseAdmin
            .from("participants")
            .update({
                room_score: roomPoints,
            })
            .eq("team_name", teamName)
            .select()
            .single();

        if (updateError) {
            return res.status(500).json({
                message: "Failed to update room score",
                error: updateError.message,
            });
        }

        console.log(`Saved room score for ${teamName}: ${roomPoints}`);

        return res.status(200).json({
            message: "Room score saved successfully",
            participant,
        });
    }

    // Save crossword score
    if (crosswordPoints !== undefined && score !== undefined) {
        
    try {
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

        console.log(`Saved crossword score for ${teamName}: ${crosswordPoints}`);
        console.log(`Saved total score for ${teamName}: ${score}`);

        return res.status(200).json({
            message: "Crossword score saved successfully",
            participant: updatedParticipant,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error saving crossword score",
            error: error.message,
        });
    }
    }

    return res.status(400).json({
        message: "Either roomPoints or crosswordPoints must be provided",
    });
});
module.exports = { login, savescore };