import React, { useState } from 'react';
import { Button, Form, notification, Modal } from 'antd';
import axios from 'axios';
import { createApplication } from '../../../utils/apiCalls';

interface UploadResponse {
  fileUrl: string;
}

interface FileUploadParams {
  jobOfferId: any;
  studentId: any;
  faculty: any;
}

const GoogleDriveUploadForm: React.FC<FileUploadParams> = ({ jobOfferId, studentId, faculty }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      notification.error({
        message: 'No File Selected',
        description: 'Please select a file to upload.',
      });
      return;
    }
  
    const uploadEndpoint = 'https://rangsituniversityjobfair.onrender.com/upload'; // Make sure this is correct
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', '1pCVkXD55fVv8G8wJym4sSU7MXTSDY1F2'); // Google Drive Folder ID
    formData.append('jobOfferId', jobOfferId);
    formData.append('studentId', studentId);
    formData.append('faculty', faculty);
  
    try {
      const response = await axios.post<UploadResponse>(uploadEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const fileUrl = response.data.fileUrl;
      setFileLink(fileUrl);
      const applicationData = {
        jobOfferId :jobOfferId, 
        studentId :studentId, 
        faculty :faculty,
        resumeURL: fileUrl,
        approvalStatus: `pending`,
      }
      await createApplication(applicationData); // Ensure createApplication is awaited
      notification.success({
        message: 'File Uploaded Successfully',
        description: (
          <div>
            <p><strong>File Link:</strong> <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a></p>
          </div>
        ),
      });
  
      // Close the modal after successful upload
      setIsModalVisible(false);
    } catch (error: any) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      notification.error({
        message: 'File Upload Failed',
        description: `Failed to upload file: ${error.response ? error.response.data : error.message}`,
      });
    }
  };
  
  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{backgroundColor: '#EE962E'}}>
        Resume Submission
      </Button>

      <Modal
        title="Upload File"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form> 
          <div>
            <p>Upload your resume to this job offer?</p>
            <br></br>
          </div>

          <Form.Item>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.xlsx,.jpg,.png"
              style={{ marginBottom: 16 }}
            />
            <Button
              type="primary"
              onClick={handleFileUpload}
              style={{backgroundColor: '#EE962E'}}
            >
              Upload Resume
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GoogleDriveUploadForm;
