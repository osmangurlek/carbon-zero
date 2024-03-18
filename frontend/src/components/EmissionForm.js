// components/EmissionForm.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkspaceId, setWaterConsumption, setFuelConsumption, setOilConsumption, setCo2Consumption } from '../redux/emissionSlice';
import axios from 'axios';
import {Button, Form, Input} from "antd";

export default function EmissionForm() {
    const emission = useSelector((state) => state.emission);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'workspaceId':
                dispatch(setWorkspaceId(value));
                break;
            case 'waterConsumption':
                dispatch(setWaterConsumption(value));
                break;
            case 'fuelConsumption':
                dispatch(setFuelConsumption(value));
                break;
            case 'oilConsumption':
                dispatch(setOilConsumption(value));
                break;
            case 'co2Consumption':
                dispatch(setCo2Consumption(value));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
    const payload = {
        workspaceId: parseInt(emission.workspaceId, 10), // String'den Integer'a dönüştürme
        waterConsumption: parseFloat(emission.waterConsumption), // String'den Float'a dönüştürme
        fuelConsumption: parseFloat(emission.fuelConsumption), // String'den Float'a dönüştürme
        oilConsumption: parseFloat(emission.oilConsumption), // String'den Float'a dönüştürme
        co2Consumption: parseFloat(emission.co2Consumption) // String'den Float'a dönüştürme
    };

    try {
        const response = await axios.post(`${baseUrl}/emissions/`, payload);
        console.log(response.data);
        // Handle success
    } catch (error) {
        console.error("Error submitting emission", error.response ? error.response.data : error);
        // Handle error, display a message to the user
    }
};


    return (
        <Form
            labelCol={{span: 12}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 1080}}
            onFinish={handleSubmit}
        >
            {/* Repeat for each input field, changing 'workspaceId', 'waterConsumption', etc. */}
            <Form.Item
                label = "Workspace ID"
            >
                <Input
                    type="number"
                    className="form-input"
                    id="workspaceId"
                    name="workspaceId"
                    value={emission.workspaceId}
                    onChange={handleInputChange}
                    placeholder="Enter Workspace ID"
                />
            </Form.Item>
            {/* Input field for waterConsumption */}
            <Form.Item
                label = "Water Consumption"
            >
                <Input
                    type="number"
                    className="form-input"
                    id="waterConsumption"
                    name="waterConsumption"
                    value={emission.waterConsumption}
                    onChange={handleInputChange}
                    placeholder="Enter water consumption in liters"
                />
            </Form.Item>

            {/* Input field for fuelConsumption */}
            <Form.Item
                label = "Fuel Consumption"
            >
                <Input
                    type="number"
                    className="form-input"
                    id="fuelConsumption"
                    name="fuelConsumption"
                    value={emission.fuelConsumption}
                    onChange={handleInputChange}
                    placeholder="Enter fuel consumption in liters"
                />
            </Form.Item>

            {/* Input field for oilConsumption */}
            <Form.Item
                label = "Oil Consumption"
            >
                <Input
                    type="number"
                    className="form-input"
                    id="oilConsumption"
                    name="oilConsumption"
                    value={emission.oilConsumption}
                    onChange={handleInputChange}
                    placeholder="Enter oil consumption in liters"
                />
            </Form.Item>

            {/* Input field for co2Consumption */}
            <Form.Item
                label = "CO2 Consumption"
            >
                <Input
                    type="number"
                    className="form-input"
                    id="co2Consumption"
                    name="co2Consumption"
                    value={emission.co2Consumption}
                    onChange={handleInputChange}
                    placeholder="Enter CO2 consumption in kilograms"
                />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                offset: 16,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                  Record Emission
                </Button>
            </Form.Item>
        </Form>
    );
}
