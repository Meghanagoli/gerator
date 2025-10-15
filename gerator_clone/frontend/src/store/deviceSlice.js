import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDevices = createAsyncThunk('devices/fetchDevices', async () => {
    const response = await axios.get('https://gerator-backend-1.onrender.com/api/devices');
    return response.data;
});

const deviceSlice = createSlice({
    name: 'devices',
    initialState: {
        devices: [], // default empty array
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.loading = false;
                state.devices = action.payload;
            })
            .addCase(fetchDevices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default deviceSlice.reducer;
