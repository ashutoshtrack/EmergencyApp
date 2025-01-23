const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const transcribeRoutes = require("./routes/transcribeRoutes");

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api", transcribeRoutes); // Use transcription routes

// Dummy routes
app.get("/", (req, res) => {
  res.send("Emergency Service Backend is running");
});

// Emergency API Endpoint
app.post("/emergency", (req, res) => {
  const { user, message, location } = req.body;
  if (!user || !message || !location) {
    return res.status(400).send("Missing required fields");
  }

  // Handle emergency logic here, such as sending alerts, logging, etc.
  res
    .status(200)
    .send(`Emergency alert received from ${user} at ${location}: ${message}`);
});

app.post("/audio", upload.single("audioFile"), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send("No audio file uploaded");
  }

  // Handle file storage or processing here
  res.status(200).send(`Audio file uploaded: ${file.originalname}`);
});

app.get("/audio/:id", (req, res) => {
  const { id } = req.params;
  // Retrieve audio file by ID logic here (e.g., fetching from a database)
  res.status(200).send(`Retrieving audio file with ID: ${id}`);
});

// Notifications API Endpoint
app.post("/notifications", (req, res) => {
  const { user, message, friends } = req.body;
  if (!user || !message || !Array.isArray(friends) || friends.length === 0) {
    return res.status(400).send("Missing required fields");
  }

  // Logic to send notifications to friends goes here
  res.status(200).send(`Notification sent to friends: ${friends.join(", ")}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
