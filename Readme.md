# System Design for Emergency App with AI Integration

## Overview

The app is designed to help users in emergency situations by:

- Sending alerts to pre-defined contacts with a CTA button.
- Recording and transmitting audio messages.
- Using AI to transcribe and summarize the audio message for contextual understanding.
- Supporting both Android and iOS platforms (React Native).
- Using AWS for backend, storage, and AI integration.
- Incorporating CI/CD for seamless deployments.

---

## Architecture Diagram

### Key Components:

1. **Frontend**: React Native app for iOS and Android.
2. **Backend**: Node.js with Express hosted on AWS Lambda.
3. **Database**: DynamoDB for storing user data and emergency contacts.
4. **AI Integration**:
   - **AWS Transcribe**: Convert audio files to text.
   - **AWS Comprehend**: Summarize and extract context from transcriptions.
5. **Notifications**: Push notifications using Firebase Cloud Messaging (FCM) and SMS using AWS SNS.
6. **Storage**: AWS S3 for storing audio files.
7. **CI/CD**: GitHub Actions integrated with AWS Amplify and AWS Lambda.

---

## High-Level Design

### **Frontend**

- **Framework**: React Native.
- **Features**:
  - Main screen with CTA button.
  - Settings screen for managing emergency contacts.
  - History screen for past alerts.
  - Audio recording and upload functionality.
- **Tools**:
  - `react-native-audio-recorder-player` for audio recording.
  - `react-navigation` for navigation.
  - `axios` for API calls.

### **Backend**

- **Framework**: Node.js with Express.
- **Endpoints**:
  1. `POST /emergency`: Trigger emergency notifications and handle audio uploads.
  2. `GET /contacts`: Fetch user's emergency contacts.
  3. `POST /contacts`: Add/update emergency contacts.
  4. `POST /transcribe`: Trigger transcription and summarization.
- **Tools**:
  - AWS Lambda for serverless computing.
  - AWS API Gateway to expose endpoints.

### **Database**

- **Choice**: AWS DynamoDB.
- **Tables**:
  - **Users**: Stores user profiles.
  - **Contacts**: Stores emergency contact details.
  - **Alerts**: Logs sent alerts.

### **AI Integration**

- **AWS Transcribe**:
  - Converts audio files into text.
- **AWS Comprehend**:
  - Summarizes the transcribed text.
  - Extracts key information (e.g., "fire", "injury").

### **Notifications**

- **Firebase Cloud Messaging (FCM)**: For push notifications.
- **AWS SNS**: For sending SMS alerts to contacts.

### **Storage**

- **AWS S3**:
  - Store user audio files.
  - Generate pre-signed URLs for secure access.

### **CI/CD**

- **Tools**:
  - GitHub Actions for automating builds and deployments.
  - AWS Amplify for frontend hosting.
  - Serverless Framework for backend deployments.
- **Pipeline**:
  - Code pushed to GitHub triggers CI/CD pipeline.
  - Runs tests and deploys updates to AWS.

---

## Detailed Flow

### **1. Emergency Alert Trigger**

1. User presses the CTA button on the app.
2. App records audio and uploads it to AWS S3 via pre-signed URL.
3. App sends a POST request to `/emergency` with:
   - User ID.
   - Contact list.
   - Audio file metadata (S3 path).

### **2. Backend Processing**

1. `/emergency` endpoint processes the request.
2. Triggers AWS Transcribe to convert the audio file to text.
3. Sends the transcription to AWS Comprehend for summarization.
4. Uses AWS SNS to send SMS alerts to contacts with:
   - Transcription summary.
   - Link to audio file.

### **3. Notifications**

1. Push notifications are sent via FCM to users with the app.
2. SMS notifications are sent via AWS SNS to non-app users.

### **4. Contact Management**

1. User can add/update contacts via the `/contacts` API.
2. Contacts are stored in DynamoDB under the user's ID.

---

## Deployment Plan

### **AWS Resources**

1. **Amplify**:
   - Host React Native app.
   - Manage authentication.
2. **Lambda**:
   - Host backend API.
   - Handle AI and notification logic.
3. **S3**:
   - Store audio files.
4. **DynamoDB**:
   - Store user data and contact information.
5. **SNS**:
   - Send SMS notifications.
6. **Transcribe & Comprehend**:
   - Process audio and extract context.

### **CI/CD Pipeline**

1. **Frontend**:
   - GitHub Actions deploy React Native updates to AWS Amplify.
2. **Backend**:
   - GitHub Actions deploy Lambda functions via Serverless Framework.
3. **Tests**:
   - Run unit tests and integration tests for both frontend and backend before deployment.

---

## Daily Work Schedule (1 Hour/Day)

### **Week 1: Project Setup**

1. Set up GitHub repo, initialize React Native project.
2. Configure AWS Amplify for authentication and storage.
3. Initialize Node.js backend and define API structure.
4. Set up DynamoDB tables and basic schema.

### **Week 2: Core Development**

1. Build frontend CTA and audio recording.
2. Implement `/emergency` API for alerts.
3. Integrate AWS S3 for audio storage.
4. Connect AWS Transcribe for transcription.
5. Add AWS Comprehend for summarization.

### **Week 3: Notifications and Enhancements**

1. Implement FCM and SNS for notifications.
2. Add contact management on frontend and backend.
3. Refine UI/UX and test workflows.
4. Automate CI/CD pipeline with GitHub Actions.

---

## Future Enhancements

- **Location Sharing**: Include user location in alerts.
- **AI Prioritization**: Rank alerts based on context (e.g., life-threatening situations).
- **Offline Support**: Cache contacts and messages for offline use.
- **Multilingual Support**: Use AWS Translate for message translations.
