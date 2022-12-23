import React, { useReducer } from "react";
import ExpenseContext from "./expense-context";

const defaultState = {
    items: [],
    totalAmount: 0
}
const expenseReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = (+state.totalAmount) + (+action.item.price);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === 'REMOVE') {
        const itemIndex = state.items.findIndex((itm) => itm.id === action.id);
        const itemToRemove = state.items[itemIndex];
        const updatedTotalAmount = state.totalAmount - itemToRemove.price;
        const updatedItemsList = state.items.filter((itm) => itm.id !== action.id);
        return {
            items: updatedItemsList,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultState;
}

const ExpenseProvider = (props) => {

    const [expenseState, dispatchExpenseAction] = useReducer(expenseReducer, defaultState)

    const addExpenseHandler = (item) => {
        dispatchExpenseAction({ type: 'ADD', item: item })
    }
    const removeExpenseHandler = (id) => {
        dispatchExpenseAction({ type: 'REMOVE', id: id })
    }

    const expenseContext = {
        items: expenseState.items,
        totalAmount: expenseState.totalAmount,
        addItem: addExpenseHandler,
        removeItem: removeExpenseHandler
    }

    return (
        <ExpenseContext.Provider value={expenseContext}>
            {props.children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseProvider;