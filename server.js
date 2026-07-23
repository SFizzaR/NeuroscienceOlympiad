const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});