import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    env: {},
};

export const fetchEnv = createAsyncThunk('env/fetchEnv', () => {
    // http://localhost:5000/api/load/environment - has been implement in node-okta-integration project
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/config/env`).then((resp) => resp.data.data);
});

const envSlice = createSlice({
    name: 'env',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchEnv.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchEnv.fulfilled, (state, action) => {
            state.loading = false;
            state.env = action.payload;
        });
        builder.addCase(fetchEnv.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default envSlice.reducer;
