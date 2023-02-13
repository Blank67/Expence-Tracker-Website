import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenses-slice";
import { useState } from "react";
import EditExpenseForm from "./EditExpenseForm";

const ExpenseList = (props) => {
    const userID = useSelector((state) => (state.auth.userID));
    const expenseArr = useSelector((state) => (state.expense.items));
    const dispatch = useDispatch();
    const [showEditForm, setShowEditForm] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    const toggleEditExpenseFormHandler = () => {
        setShowEditForm((prevState) => !prevState);
    }

    const deleteExpenseHandler = async (id) => {
        dispatch(expenseActions.deleteExpense(id));
    }

    const editExpenseHandler = async (itm, uID) => {
        setItemToEdit(itm);
        toggleEditExpenseFormHandler();
    }

    const expenseItemList = expenseArr.map((itm) => {
        return (<ExpenseItem
            key={itm.id}
            id={itm.id}
            category={itm.category}
            title={itm.title}
            price={itm.price}
            onRemove={deleteExpenseHandler.bind(null, itm.id)}
            onEdit={editExpenseHandler.bind(null, itm, userID)}
        />)
    });

    return (
        <>
            {showEditForm && <EditExpenseForm show={showEditForm} hide={toggleEditExpenseFormHandler} item={itemToEdit} />}
            <ul className="my-3 mx-5">
                {expenseArr.length > 0 ? expenseItemList : <h4 className="text-center">NO EXPENSE ADDED</h4>}
            </ul>
        </>
    );
}

export default ExpenseList;