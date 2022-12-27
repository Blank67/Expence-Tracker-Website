import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useSelector } from "react-redux";

const Expenses = (props) => {
    const [showForm, setShowForm] = useState(false);
    // const userID = useSelector((state) => (state.auth.userId));
    const totalAmount = useSelector((state) => (state.expense.totalExpense));

    const toggleExpenseFormHandler = () => {
        setShowForm((prevState) => !prevState);
    }

    // const postData = async (exp) => {
    //     try {
    //         const response = await axios.post(`/${userID}.json`, exp);
    //         setShowForm(false);
    //     } catch (err) {

    //     }
    // }

    return (
        <Fragment>
            <section className="text-center">
                <Button onClick={toggleExpenseFormHandler}>Add Expense</Button>
                {showForm && <ExpenseForm onShow={showForm} onClose={toggleExpenseFormHandler} />}
            </section>
            <section>
                <h2 className="mt-5 mx-2">Expense List</h2>
                <ExpenseList />
                <h2 className="float-end me-2">Total Expense: Rs.{totalAmount}</h2>
            </section>
        </Fragment>
    );
}

export default Expenses;