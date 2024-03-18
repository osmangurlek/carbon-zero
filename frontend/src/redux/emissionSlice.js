// src/redux/emissionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const emissionSlice = createSlice({
  name: 'emission',
  initialState: {
    workspaceId: '',
    waterConsumption: 0,
    fuelConsumption: 0,
    oilConsumption: 0,
    co2Consumption: 0,
  },
  reducers: {
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
    },
    setWaterConsumption: (state, action) => {
      state.waterConsumption = action.payload;
    },
    setFuelConsumption: (state, action) => {
      state.fuelConsumption = action.payload;
    },
    setOilConsumption: (state, action) => {
      state.oilConsumption = action.payload;
    },
    setCo2Consumption: (state, action) => {
      state.co2Consumption = action.payload;
    },
  },
});

export const { setWorkspaceId, setWaterConsumption, setFuelConsumption, setOilConsumption, setCo2Consumption } = emissionSlice.actions;

export default emissionSlice.reducer;
