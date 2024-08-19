import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, notification } from 'antd';
import { createUser } from '../../../utils/apiCalls';

const { Option } = Select;

interface UserData {
  userType?: string;
  username?: string;
  password?: string;
  email?: string;
  faculty?: string;
  studentId?: string;
}

const facultyEnum = [
  'RSU_INTERNATIONAL_COLLEGE',
  'INTERNATIONAL_CHINESE_COLLEGE',
  'COLLEGE_OF_LIBERAL_ARTS',
  'COLLEGE_OF_DIGITAL_INNOVATION_TECH',
  'FACULTY_OF_BUSINESS_ADMINISTRATION',
  'COLLEGE_OF_COMMUNICATION_ARTS',
  'RSU_ENGLISH_LANGUAGE_INSTITUTE',
  'CHINESE_THAI_INSTITUTE',
  'RSU_INTERNATIONAL_OFFICE',
  'PERSONNEL_DEVELOPMENT_OFFICE',
  'OFFICE_OF_ALUMNI_AND_COMMUNITY_RELATIONS'
];

const UserForm: React.FC<{ userData_usertype: any }> = ({ userData_usertype }) => {
  const [userType, setUserType] = useState<string>('student');
  const [form] = Form.useForm();

  const handleUserTypeChange = (value: string) => {
    setUserType(value);
  };

  const onFinish = (values: UserData) => {
    const userData: UserData = {
      userType: values.userType,
      username: values.username,
      password: values.password,
      email: values.email,
      faculty: values.userType === 'student' || values.userType === 'ajarn' ? values.faculty : "RSU_INTERNATIONAL_COLLEGE",
      studentId: values.userType === 'student' ? values.studentId : "0000000",
    };

    console.log('Form values:', values);
    console.log('Sorted UserData:', userData);

    createUser(userData)
      .then((response) => {
        console.log('User created successfully:', response.data);
        notification.success({
          message: 'Success',
          description: 'User created successfully.',
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        notification.error({
          message: 'Error',
          description: 'There was an error creating the user. Please try again.',
        });
      });
  };

  if (userData_usertype === "admin") {
    return (
      <Card title="Create User" bordered={false} style={{ width: 400, margin: '0 auto', marginTop: '0px' }}>
        <Form
          form={form}
          name="userForm"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            faculty: 'RSU_INTERNATIONAL_COLLEGE',
            studentId: '0000000',
          }}
        >
          <Form.Item
            label="User Type"
            name="userType"
            rules={[{ required: true, message: 'Please select a user type!' }]}
          >
            <Select onChange={handleUserTypeChange} placeholder="Select a user type">
              <Option value="company">Company</Option>
              <Option value="ajarn">Ajarn</Option>
              <Option value="student">Student</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter the username!' }]}
          >
            <Input placeholder="Enter the username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter the email!' }]}
          >
            <Input type="email" placeholder="Enter the email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Input.Password placeholder="Enter the password" />
          </Form.Item>

          {userType !== 'company' && (
            <Form.Item
              label="Faculty"
              name="faculty"
              rules={[{ required: true, message: 'Please enter the faculty!' }]}
            >
              <Select>
                {facultyEnum.map((faculty) => (
                  <Option key={faculty} value={faculty}>
                    {faculty}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {userType === 'student' && (
            <Form.Item
              label="Student ID"
              name="studentId"
              rules={[{ required: true, message: 'Please enter the student ID!' }]}
            >
              <Input type="number" placeholder="Enter the student ID" />
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  } else {
    return null;
  }
};

export default UserForm;
