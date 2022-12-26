import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('uID'),
    isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.token = action.token;
            state.userID = action.userID;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('uID', action.payload.userID);
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.clear('token');
            localStorage.clear('uID');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;