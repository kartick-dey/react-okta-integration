import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: '',
    user: {},
};

export const fetchUser = createAsyncThunk('user/fetchUser', () => {
    const tokens = JSON.parse(localStorage.getItem('okta-token-storage'));
    const accessToken = tokens?.accessToken?.accessToken || '';
    // http://localhost:5000/api/user - has been implement in node-okta-integration project
    return axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((resp) => resp.data.data);
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = '';
            state.user = {};
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload || {};
            state.error = '';
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = {};
            state.error = '';
        });
    },
});

export default userSlice.reducer
