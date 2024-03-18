import React from 'react';
import {Button, Form, Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setWorkspaceName } from '../redux/workspaceSlice';
import axios from 'axios';


export default function WorkspaceForm() {
  const name = useSelector((state) => state.workspace.name);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    dispatch(setWorkspaceName(e.target.value));
  };

  const handleSubmit = async () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
        try {
            console.log(`Submitting Workspace Name: ${name}`);
            const response = await axios.post(`${baseUrl}/workspaces/`, { name });
            console.log(response.data);
            // Reset form or handle success
        } catch (error) {
            console.error("Error submitting workspace", error);
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
        label="Workspace Name"
        value={name}
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
      <Button type="primary" htmlType="submit" >
        Create Workspace
      </Button>
    </Form.Item>
  </Form>
  );
}