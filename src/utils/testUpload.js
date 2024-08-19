import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Path to your credentials file
const SERVICE_ACCOUNT_FILE = 'src/utils/tensile-impact-432911-r9-e1fc3962a075.json';
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Authenticate and build the service
const authenticate = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
};

// Define file to upload
const uploadFile = async () => {
  const drive = await authenticate();

  const fileMetadata = {
    name: 'testfile.txt', // Change to your desired file name
    parents: ['1pCVkXD55fVv8G8wJym4sSU7MXTSDY1F2'], // Replace with your folder ID
  };

  const media = {
    mimeType: 'text/plain',
    body: fs.createReadStream(path.resolve('public/company.png')), // Use path.resolve for platform-independent paths
  };

  try {
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    console.log('File ID:', response.data.id);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

uploadFile();
