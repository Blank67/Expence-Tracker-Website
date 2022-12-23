import { Fragment, useContext, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import AxiosContext from "../../Context/AxiosContext/axios-context";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const Expenses = (props) => {
    const [showForm, setShowForm] = useState(false);
    // const overlay = document.getElementById('custompopups');

    const toggleExpenseFormHandler = () => {
        setShowForm((prevState) => !prevState);
    }

    return (
        <Fragment>
            <section className="text-center">
                <Button onClick={toggleExpenseFormHandler}>Add Expense</Button>
                {showForm && <ExpenseForm onShow={showForm} onClose={toggleExpenseFormHandler} />}
                {/* {showForm && ReactDOM.createPortal(<Expenseform onShow={showForm} onClose={toggleExpenseFormHandler} />, overlay)} */}
            </section>
            <section>
                <h2 className="mt-5 mx-2">Expense List</h2>
                <ExpenseList />
                <h2 className="float-end me-2">Total Expense: Rs.{0}</h2>
            </section>
        </Fragment>
    );
}

export default Expenses;