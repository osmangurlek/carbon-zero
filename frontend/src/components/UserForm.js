// components/UserForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkspaceId, setRoleId, setEmail, setHashedPassword } from '../redux/userSlice';
import axios from 'axios';
import {Button, Form, Input} from "antd";


export default function UserForm() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'workspaceId':
                dispatch(setWorkspaceId(value));
                break;
            case 'roleId':
                dispatch(setRoleId(value));
                break;
            case 'email':
                dispatch(setEmail(value));
                break;
            case 'hashedPassword':
                dispatch(setHashedPassword(value));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
    try {
      const response = await axios.post(`${baseUrl}/users/`, user);
      console.log(response.data);
      // Reset form or handle success
    } catch (error) {
      console.error("Error submitting user", error);
      // Handle error
    }
    };


    return (
        <Form
            labelCol={{span: 12}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 1080}}
            onFinish={handleSubmit}
        >
            {/* Input field for workspaceId */}
            <Form.Item
                label = "Workspace ID"
            >
              <Input
                type="number"
                id="workspaceId"
                name="workspaceId"
                value={user.workspaceId}
                onChange={handleInputChange}
                placeholder="Enter Workspace ID"
              />
            </Form.Item>

            {/* Input field for roleId */}
            <Form.Item
                label = "Role ID"
            >
              <Input
                type="number"
                id="roleId"
                name="roleId"
                value={user.roleId}
                onChange={handleInputChange}
                placeholder="Enter Role ID"
              />
            </Form.Item>

            {/* Input field for email */}
            <Form.Item
                label = "Email"
            >
              <Input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Enter Email Address"
              />
            </Form.Item>

            {/* Input field for hashedPassword */}
            <Form.Item
                label = "Password"
            >
              <Input
                type="password"
                id="hashedPassword"
                name="hashedPassword"
                value={user.hashedPassword}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 16,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Create User
                </Button>
            </Form.Item>
        </Form>
    );
}
