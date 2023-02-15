import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { darkActions } from "../../store/darkTheme-slice";
import { expenseActions } from "../../store/expenses-slice";
import { fetchAllData, postAllData } from "../../store/expense-http-actions";
// import { CSVLink } from "react-csv";

let firstLoad = true;

const Expenses = (props) => {
    const [showForm, setShowForm] = useState(false);
    const totalAmount = useSelector((state) => (state.expense.totalExpense));
    const userID = useSelector((state) => (state.auth.userID));
    const expenseState = useSelector((state) => (state.expense));
    const dispatch = useDispatch();
    const premiumStatus = useSelector((state) => (state.expense.premium));
    const [loading, setLoading] = useState(false);

    const toggleExpenseFormHandler = () => {
        setShowForm((prevState) => !prevState);
    }

    const activatePremium = () => {
        dispatch(expenseActions.activatePremium());
    }

    const changeThemeHandler = () => {
        dispatch(darkActions.toggle());
    }

    useEffect(() => {
        setLoading(true);
        dispatch(fetchAllData(userID));
        setLoading(false);
    }, [dispatch, userID]);

    useEffect(() => {
        if (!firstLoad) {
            dispatch(postAllData(expenseState, userID));
        } else {
            firstLoad = false;
        }
    }, [dispatch, expenseState, userID]);

    //Download CSV code
    //Using CSVLink
    // const headers = [
    //     {
    //         label: 'Category', key: 'category'
    //     },
    //     {
    //         label: 'Title', key: 'title'
    //     },
    //     {
    //         label: 'Amount', key: 'price'
    //     }
    // ]
    // const csvLink = {
    //     filename: 'Expenses.csv',
    //     headers: headers,
    //     data: expenseState.items
    // }
    //Using Blob

    return (
        <Fragment>
            <section className="d-flex justify-content-center">
                <Button onClick={toggleExpenseFormHandler}>Add Expense</Button>
                {showForm && <ExpenseForm onShow={showForm} onClose={toggleExpenseFormHandler} />}
            </section>
            <section>
                <h2 className="mt-5 mx-2">Expense List</h2>
                {totalAmount > 1000 && !premiumStatus && <div className="d-flex justify-content-end me-5">
                    <Button variant="outline-info" onClick={activatePremium}><b>Activate Premium</b></Button>
                </div>}
                {premiumStatus && <div className="d-flex justify-content-end me-5">
                    <Button variant="info" onClick={changeThemeHandler}>Change Theme</Button>
                </div>}
                {loading ? <h4 className="text-center">Please wait....</h4> : <ExpenseList />}
                <h2 className="d-flex justify-content-end me-5" style={{marginTop: '75px'}}>Total Expense: Rs.{totalAmount}</h2>
            </section>
            <div className="d-flex justify-content-center">
                {/* <Button variant="outline-danger"> */}
                {/* <CSVLink {...csvLink} className="text-decoration-none text-black">Download Expenses</CSVLink> */}
                {/* <img src="https://www.lua.org/images/downloadarrow.png" width={20} height={30}></img> */}
                {/* <Link download='expenses.csv'>Download Expenses</Link> */}
                {/* </Button> */}
            </div>
        </Fragment>
    );
}

export default Expenses;