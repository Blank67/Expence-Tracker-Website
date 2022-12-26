import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');
const initialUserId = localStorage.getItem('uID');

const initialAuthState = {
    token: initialToken,
    userId: initialUserId,
    isLoggedIn: !!initialToken,
};

const authSlice = createSlice({
    name: 'Auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            // debugger;
            state.token = action.token;
            state.userID = action.userID;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('uID', action.payload.userID);
            state.isLoggedIn = true;
        },
        logout(state) {
            // debugger;
            state.isLoggedIn = false;
            localStorage.clear('token');
            localStorage.clear('uID');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;