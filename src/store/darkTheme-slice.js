import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDark: false };

const darkThemeSlice = createSlice({
    name: "dark",
    initialState: initialState,
    reducers: {
        toggle: (state) => {
            state.isDark = !state.isDark;
        },
        logoutTheme: (state) => {
            state.isDark = false;
        }
    },
});

export const darkActions = darkThemeSlice.actions;
export default darkThemeSlice.reducer;
