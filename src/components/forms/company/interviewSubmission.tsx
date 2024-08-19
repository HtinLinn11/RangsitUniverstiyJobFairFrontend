import React, { useState } from 'react';
import { Button, Form, Select, notification, Modal } from 'antd';
import { approveApplicationById } from '../../../utils/apiCalls';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const InterviewForm: React.FC<{ interviewData: any }> = ({ interviewData }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    const newInterview = {
      companyId: interviewData.companyId,
      applicationId: interviewData.applicationId,
      studentId: interviewData.studentId,
      interviewTime: values.interviewTime,
      faculty: interviewData.faculty,
    };

    try {
      await approveApplicationById(interviewData.applicationId, newInterview);

      notification.success({
        message: 'Submission Complete',
        description: 'Interview scheduled successfully.',
      });

      form.resetFields();
      setIsModalVisible(false);
    } catch (err: any) {
      notification.error({
        message: 'Submission Failed',
        description: `Failed to schedule interview: ${err.message}`,
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" style={{ backgroundColor: '#0B5498'}} onClick={() => setIsModalVisible(true)}>
        Schedule Interview
      </Button>

      <Modal
        title="Schedule Interview"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div>
          <p><strong>Job Title:</strong> {interviewData.jobTitle}</p>
          <p><strong>Student Name:</strong> {interviewData.username}</p>
          <p><strong>Faculty:</strong> {interviewData.faculty}</p>
          <br></br>
        </div>

        <Form
          {...layout}
          name="schedule-interview"
          onFinish={onFinish}
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Interview Time"
            name="interviewTime"
            rules={[{ required: true, message: 'Please select the interview time!' }]}
          >
            <Select placeholder="Select interview time">
              <Option value="Option A">Option A</Option>
              <Option value="Option B">Option B</Option>
              <Option value="Option C">Option C</Option>
            </Select>
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

export default InterviewForm;
