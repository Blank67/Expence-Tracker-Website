const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    items: [],
    totalExpense: 0,
    premium: false
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialState,
    reducers: {
        addExpense(state, action) {
            const newExpense = action.payload.expense;
            state.totalExpense = (+state.totalExpense) + (+newExpense.price);
            state.items.push({id:newExpense.id, title: newExpense.title, category: newExpense.category, price: newExpense.price });
        },
        deleteExpense(state, action) { 
            const id = action.payload;
            const itemToDelete = state.items.find((itm) => itm.id === id);
            state.items = state.items.filter((itm) => itm.id !==id);
            state.totalExpense = (+state.totalExpense) - (+itemToDelete.price);
        },
        editExpense(state, action) { },
        replaceExpenseState (state, action) {
            state.items = action.payload.items;
            state.totalExpense = action.payload.totalExpense;
            state.premium = action.payload.premium;
        },
        clearSliceOnLogout(state, action) {
            state.items = [];
            state.totalExpense = 0;
            state.premium = false;
        },
        activatePremium(state) {
            state.premium = true;
        }
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;