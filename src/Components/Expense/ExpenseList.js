import { useContext } from "react";
import ExpenseContext from "../../Context/expense-context";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
    const expenseCtx = useContext(ExpenseContext);

    const deleteExpenseHandler = (id) => {
        expenseCtx.removeItem(id);
    }

    const expenseItemList = expenseCtx.items.map((itm) => (
        <ExpenseItem
            key={itm.id}
            category={itm.category}
            description={itm.description}
            price={itm.price}
            onRemove={deleteExpenseHandler.bind(null,itm.id)}
        />
    ));

    return (
        <ul className="mt-3">
            {expenseItemList}
        </ul>
    );
}

export default ExpenseList;