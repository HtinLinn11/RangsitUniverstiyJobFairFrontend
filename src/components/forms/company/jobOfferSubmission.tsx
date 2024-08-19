import React, { useState } from 'react';
import { Button, Form, Input, Select, notification, Modal } from 'antd';
import { createJobOfferUnapproved } from '../../../utils/apiCalls';

const { Option } = Select; // Import Option from Select

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const App: React.FC<{ companyId: any }> = ({ companyId }) => {
  const [form] = Form.useForm(); // Use Form instance
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  const onFinish = async (values: any) => {
    const newJobOffer = {
      jobTitle: values.jobTitle,
      jobDescription: values.jobDescription,
      faculty: "",  // Add logic to get faculty value if needed
      jobType: values.jobType,
      jobLocation: values.jobLocation,
      companyId: companyId,
      approvalStatus: 'pending',
      additionalInfos: values.additionalInfos || "", // Adjust based on form input
    };

    try {
      const data = await createJobOfferUnapproved(newJobOffer);

      // Show notification with formatted message
      notification.success({
        message: 'Submission Complete',
        description: (
          <div>
            <p><strong>Job Title:</strong> {data.jobTitle}</p>
            <p><strong>Job Description:</strong> {data.jobDescription}</p>
            <p><strong>Job Type:</strong> {data.jobType}</p>
            <p><strong>Job Location:</strong> {data.jobLocation}</p>
            <p><strong>Additional Infos:</strong> {data.additionalInfos}</p>
          </div>
        ),
        duration: 0, // Set to 0 to keep the notification visible until manually closed
      });

      // Reset the form fields
      form.resetFields();
      setIsModalVisible(false); // Hide the modal after submission
    } catch (err: any) {
      notification.error({
        message: 'Submission Failed',
        description: `Failed to create job offer: ${err.message}`,
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" style={{ backgroundColor: '#0B5498'}} onClick={() => setIsModalVisible(true)}>
        New Job Offer
      </Button>

      <Modal
        title="Create Job Offer"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // Hide default footer
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          form={form} // Pass form instance to Form
          validateMessages={validateMessages}
        >
          <Form.Item name="jobTitle" label="Job Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jobDescription" label="Job Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jobType" label="Job Type" rules={[{ required: true }]}>
            <Select placeholder="Select job type">
              <Option value="full-time">Full-Time</Option>
              <Option value="part-time">Part-Time</Option>
              <Option value="contract">Contract</Option>
              <Option value="internship">Internship</Option>
            </Select>
          </Form.Item>
          <Form.Item name="jobLocation" label="Job Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="additionalInfos" label="Additional Infos">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: '8px' }} onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
