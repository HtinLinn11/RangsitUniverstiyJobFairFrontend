import React, { useState } from 'react';
import { Button, Form, notification, Modal } from 'antd';
import { approveJobOfferUnapprovedById } from '../../../utils/apiCalls';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const jobOfferForm: React.FC<{ jobOfferData: any }> = ({ jobOfferData }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (_values: any) => {
    const newJobOffer = {
        connectedId: jobOfferData.jobOfferId,
        faculty: jobOfferData.faculty,
    };

    try {
        
      await approveJobOfferUnapprovedById(newJobOffer.connectedId, newJobOffer.faculty);

      notification.success({
        message: 'Submission Complete',
        description: `Job added to ${newJobOffer.faculty} faculty successfully.`,
      });

      form.resetFields();
      setIsModalVisible(false);
    } catch (err: any) {
      notification.error({
        message: 'Submission Failed',
        description: `Failed to add job to faculty: ${err.message}`,
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" style={{ backgroundColor: '#5A7131'}} onClick={() => setIsModalVisible(true)}>
        Approve to Faculty
      </Button>

      <Modal
        title="Schedule Interview"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div>
          <p><strong>Job Title:</strong> {jobOfferData.jobTitle}</p>
          <p><strong>Job Description:</strong> {jobOfferData.jobDescription}</p>
          <p><strong>Faculty:</strong> {jobOfferData.faculty}</p>
          <br></br>
          <p><strong>Are you sure you want to add to faculty?</strong></p>
          <br></br>
        </div>

        <Form
          {...layout}
          name="schedule-interview"
          onFinish={onFinish}
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" style={{ backgroundColor: '#5A7131'}} htmlType="submit">
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

export default jobOfferForm;
