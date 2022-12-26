import { Fragment, useContext, useState } from "react";
// import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import axios from '../../axios/axios';
import AuthContext from "../../Context/FirebaseContext/auth-context";

const Expenses = (props) => {
    // const overlay = document.getElementById('custompopups');
    const [showForm, setShowForm] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const authCtx = useContext(AuthContext);
    const [func, setFunc] = useState();

    const toggleExpenseFormHandler = () => {
        setShowForm((prevState) => !prevState);
    }
    const amount = (amt) => {
        setTotalAmount(amt);
    }

    const postData = async (exp) => {
        try {
            const response = await axios.post(`/${authCtx.userId}.json`, exp);
            console.log(response);
            setShowForm(false);
        } catch (err) {

        }
    }
    const getData = (cb) => {
        setFunc(cb);
    }

    // useEffect(()=>{},[totalAmount]);

    return (
        <Fragment>
            <section className="text-center">
                <Button onClick={toggleExpenseFormHandler}>Add Expense</Button>
                {showForm && <ExpenseForm onShow={showForm} onPost={postData} onGet={func} />}
                {/* {showForm && ReactDOM.createPortal(<Expenseform onShow={showForm} onClose={toggleExpenseFormHandler} />, overlay)} */}
            </section>
            <section>
                <h2 className="mt-5 mx-2">Expense List</h2>
                <ExpenseList setAmount={amount} getData={getData} />
                <h2 className="float-end me-2">Total Expense: Rs.{totalAmount}</h2>
            </section>
        </Fragment>
    );
}

export default Expenses;