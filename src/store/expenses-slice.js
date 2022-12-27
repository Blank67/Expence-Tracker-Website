const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    items: [],
    totalExpense: 0
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            const newExpense = action.payload.expense;
            state.totalExpense = (+state.totalExpense) + (+newExpense.price);
            state.items.push({ title: newExpense.title, category: newExpense.category, price: newExpense.price });
        },
        deleteExpense(state, action) { }
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;