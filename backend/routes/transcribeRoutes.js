const express = require("express");
const router = express.Router();
const {
  startTranscription,
  getTranscriptionResult,
} = require("../controllers/transcribeController");

router.post("/transcribe", startTranscription);

router.get("/transcribe/result", getTranscriptionResult);
module.exports = router;
