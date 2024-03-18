// components/RoleForm.js
import React from 'react';
import {Form, Button, Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../redux/roleSlice';
import axios from 'axios';

export default function RoleForm() {
    const name = useSelector((state) => state.role.name);
    const dispatch = useDispatch();

    const handleNameChange = (e) => {
    dispatch(setName(e.target.value));
    };

    const handleSubmit = async () => {
        // Dispatch an action or perform an async operation to submit the form
        const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'; // Fallback URL
        try {
            const response = await axios.post(`${baseUrl}/roles/`, { name });
            console.log(response.data);
            // Reset form or handle success
        } catch (error) {
            console.error("Error submitting role", error);
        }
    };



  return (
    <Form
        name="basic"
        labelCol={{span: 12}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 1080}}
        onFinish={handleSubmit}
    >
      <Form.Item
        label="Role Name"
        name="name"
        onChange={handleNameChange}
        rules={[
            {
                required: true,
                message: 'Please input Role Name!',
            },
        ]}
      >
          <Input />
      </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 16,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Create Role
      </Button>
    </Form.Item>
  </Form>
  );
}