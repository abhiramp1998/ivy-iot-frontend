import axios from 'axios';

// IMPORTANT: Ensure this matches your Node.js backend port
// const API_URL = 'http://localhost:3000/api'; 
// src/api/deviceApi.js
const API_URL = 'https://ivy-iot-api-abhiram-gqb2bde6efagheh4.westeurope-01.azurewebsites.net/api';

// --- Device Management Endpoints ---
export const fetchDevices = async () => {
    try {
        const response = await axios.get(`${API_URL}/devices`);
        return response.data;
    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
};

export const createDevice = async (deviceData) => {
    try {
        const response = await axios.post(`${API_URL}/devices`, deviceData);
        return response.data.device; 
    } catch (error) {
        console.error("Error creating device:", error);
        throw error;
    }
};

export const updateDevice = async (deviceId, updateData) => {
    try {
        const response = await axios.put(`${API_URL}/devices/${deviceId}`, updateData);
        return response.data.device; 
    } catch (error) {
        console.error(`Error updating device ${deviceId}:`, error);
        throw error;
    }
};

// --- Telemetry and Alert Endpoints ---
export const fetchTelemetry = async (deviceId, limit = 50) => {
    try {
        const response = await axios.get(`${API_URL}/telemetry/${deviceId}?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching telemetry for ${deviceId}:`, error);
        throw error;
    }
};

// Creative Extension Endpoint
export const fetchAllAlerts = async () => {
    try {
        const response = await axios.get(`${API_URL}/telemetry/alerts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all alerts:", error);
        throw error;
    }
};