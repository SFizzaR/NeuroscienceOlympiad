# NeuroscienceOlympiad
 
A competitive neuroscience quiz and crossword platform built for AKUH SIMPCAT 2026, originally developed as an Electron app and now deployed as a lightweight frontend on Vercel.

**Quick access:**
- Username: Any random username (must not be taken)
- Password: `MYELIN7`
## About
 
This platform was created for the Neuroscience Olympiad competition at AKUH SIMPCAT 2026. It challenges participants with:
- **Quiz rounds** — Multiple choice questions on neuroscience topics
- **Crossword puzzles** — Brain-themed crosswords to test subject knowledge
The original Electron desktop application was migrated to a web-based deployment for broader accessibility.
 
## Tech Stack
 
- **Backend:** Node.js with `server.js` (vanilla server, no framework)
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (frontend only)
- **Authentication:** Custom login with hardcoded password

## Known Limitations
 
- **Answer keys are visible in the repository** — These were included for the competition context.
- **Hardcoded password** — All users share the same password (`MYELIN7`).
- **Frontend only on Vercel** — The server logic runs on Vercel's serverless functions.
