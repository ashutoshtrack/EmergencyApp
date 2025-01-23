const { s3Client } = require("../config/awsConfig");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

/**
 * Uploads a file to an S3 bucket
 * @param {string} bucketName - Name of the S3 bucket
 * @param {string} key - Key (path/filename) for the uploaded file
 * @param {Buffer|string} body - File content
 * @param {string} contentType - MIME type of the file
 */
const uploadFile = async (bucketName, key, body, contentType) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Downloads a file from an S3 bucket
 * @param {string} bucketName - Name of the S3 bucket
 * @param {string} key - Key (path/filename) for the file to download
 */
const downloadFile = async (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File downloaded successfully:", response);
    return response.Body;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};

/**
 * Deletes a file from an S3 bucket
 * @param {string} bucketName - Name of the S3 bucket
 * @param {string} key - Key (path/filename) for the file to delete
 */
const deleteFile = async (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File deleted successfully:", response);
    return response;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

module.exports = { uploadFile, downloadFile, deleteFile };
