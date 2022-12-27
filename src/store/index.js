import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice';
import expenseReducer from './expenses-slice';
import darkThemeReducer from './darkTheme-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        dark: darkThemeReducer
    }
});

export default store;