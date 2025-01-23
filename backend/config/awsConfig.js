const { S3Client } = require("@aws-sdk/client-s3");
const { TranscribeClient } = require("@aws-sdk/client-transcribe");
require("dotenv").config(); // Ensure environment variables are loaded

// Initialize AWS Clients with Region and Credentials
const region = process.env.AWS_REGION; // Replace with your preferred region

// Create S3 Client
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create Transcribe Client
const transcribeClient = new TranscribeClient({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Log the configured region
console.log("AWS Region Configured:", region);

// Export the clients for use in other files
module.exports = { s3Client, transcribeClient };
