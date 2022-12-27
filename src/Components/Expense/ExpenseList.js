import ExpenseItem from "./ExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenses-slice";

const ExpenseList = (props) => {
    // const userID = useSelector((state) => (state.auth.userId));
    const expenseArr = useSelector((state) => (state.expense.items));
    const dispatch = useDispatch();

    const deleteExpenseHandler = async (id) => {
        dispatch(expenseActions.deleteExpense(id));
    }

    const expenseItemList = expenseArr.map((itm) => {
        return (<ExpenseItem
            key={itm.id}
            id={itm.id}
            category={itm.category}
            title={itm.title}
            price={itm.price}
            onRemove={deleteExpenseHandler.bind(null, itm.id)}
        />)
    });

    return (
        <ul className="my-3 mx-5">
            {expenseArr.length > 0 ? expenseItemList : <h4 className="text-center">NO EXPENSE ADDED</h4>}
        </ul>
    );
}

export default ExpenseList;