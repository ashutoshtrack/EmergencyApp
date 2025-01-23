const awsTranscribeService = require("../services/awsTranscribe"); // Path to your service file

// Controller to start transcription job
exports.startTranscription = async (req, res) => {
  try {
    const { bucketName, fileName, languageCode = "en-US" } = req.body;

    // Validate parameters
    if (!bucketName || !fileName) {
      return res
        .status(400)
        .json({ message: "Bucket name and file name are required." });
    }

    // Call the existing service function to start the transcription job
    await awsTranscribeService.startTranscription(req, res); // Directly pass req and res to the service
  } catch (error) {
    console.error("Error in startTranscription controller:", error);
    res.status(500).json({
      message: "Error in controller while starting transcription job",
      error: error.message || error,
    });
  }
};

// Controller to get transcription job result
exports.getTranscriptionResult = async (req, res) => {
  try {
    await awsTranscribeService.getTranscriptionResult(req, res);
  } catch (error) {
    console.error("Error fetching transcription job result:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch transcription job result" });
  }
};
