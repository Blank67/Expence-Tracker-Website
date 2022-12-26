import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import axios from '../../axios/axios';
import { useSelector } from "react-redux";

const Expenses = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const userID = useSelector((state) => (state.auth.userId));

    const toggleExpenseFormHandler = () => {
        setShowForm((prevState) => !prevState);
    }
    const amount = (amt) => {
        setTotalAmount(amt);
    }

    const postData = async (exp) => {
        try {
            const response = await axios.post(`/${userID}.json`, exp);
            setShowForm(false);
        } catch (err) {

        }
    }

    return (
        <Fragment>
            <section className="text-center">
                <Button onClick={toggleExpenseFormHandler}>Add Expense</Button>
                {showForm && <ExpenseForm onShow={showForm} onPost={postData} />}
            </section>
            <section>
                <h2 className="mt-5 mx-2">Expense List</h2>
                <ExpenseList setAmount={amount} />
                <h2 className="float-end me-2">Total Expense: Rs.{totalAmount}</h2>
            </section>
        </Fragment>
    );
}

export default Expenses;