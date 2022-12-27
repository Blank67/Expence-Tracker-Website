import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, postAllData } from "../../store/expense-http-actions";

const Expenses = (props) => {
    const [showForm, setShowForm] = useState(false);
    const totalAmount = useSelector((state) => (state.expense.totalExpense));
    const userID = useSelector((state) => (state.auth.userID));
    const expenseState = useSelector((state) => (state.expense));
    const dispatch = useDispatch();

    const toggleExpenseFormHandler = () => {
        setShowForm((prevState) => !prevState);
    }

    useEffect(() => {
        dispatch(fetchAllData(userID));
    }, [dispatch, userID]);

    useEffect(() => {
        dispatch(postAllData(expenseState, userID));
    }, [dispatch, expenseState, userID]);


    return (
        <Fragment>
            <section className="text-center">
                <Button onClick={toggleExpenseFormHandler}>Add Expense</Button>
                {showForm && <ExpenseForm onShow={showForm} onClose={toggleExpenseFormHandler} />}
            </section>
            <section>
                <h2 className="mt-5 mx-2">Expense List</h2>
                {totalAmount > 1000 && <div className="d-flex justify-content-end me-5">
                    <Button variant="outline-info"><b>Activate Premium</b></Button>
                </div>}
                <ExpenseList />
                <h2 className="float-end me-5">Total Expense: Rs.{totalAmount}</h2>
            </section>
        </Fragment>
    );
}

export default Expenses;