// Import required AWS SDK clients
const {
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
} = require("@aws-sdk/client-transcribe");
const { transcribeClient } = require("../config/awsConfig");

require("dotenv").config();

exports.startTranscription = async (req, res) => {
  console.log("AWS Region Used for API Call:");
  const { bucketName, fileName, languageCode } = req.body;

  const transcriptionJobName = `Transcription_${Date.now()}`;
  const mediaUri = `s3://${bucketName}/${fileName}`;

  const params = {
    TranscriptionJobName: transcriptionJobName,
    LanguageCode: languageCode,
    Media: {
      MediaFileUri: mediaUri,
    },
    MediaFormat: "wav", // Adjust based on your file format
    OutputBucketName: bucketName, // Optional, specify where the result should be stored
  };
  // const region = process.env.AWS_REGION || "us-east-1";

  try {
    // Start transcription job
    const command = new StartTranscriptionJobCommand(params);
    const response = await transcribeClient.send(command);

    res.status(200).json({
      message: "Transcription job started successfully",
      jobName: transcriptionJobName,
      response,
    });
  } catch (error) {
    console.error("Error starting transcription job:", error);
    res.status(500).json({
      message: "Failed to start transcription job",
      error,
    });
  }
};

exports.getTranscriptionResult = async (req, res) => {
  const { transcriptionJobName } = req.query;

  const params = {
    TranscriptionJobName: transcriptionJobName,
  };

  console.log(params);
  try {
    const command = new GetTranscriptionJobCommand(params);
    const response = await transcribeClient.send(command);

    if (response.TranscriptionJob.TranscriptionJobStatus === "COMPLETED") {
      const transcriptUri =
        response.TranscriptionJob.Transcript.TranscriptFileUri;

      res.status(200).json({
        message: "Transcription job completed successfully",
        transcriptUri,
      });
    } else {
      res.status(200).json({
        message: "Transcription job is still in progress",
        status: response.TranscriptionJob.TranscriptionJobStatus,
      });
    }
  } catch (error) {
    console.error("Error fetching transcription result:", error);
    res.status(500).json({
      message: "Failed to fetch transcription result",
      error,
    });
  }
};
