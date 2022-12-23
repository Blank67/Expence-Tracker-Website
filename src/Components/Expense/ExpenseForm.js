import { useContext, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
// import ExpenseContext from "../../Context/expense-context";
// import axios from '../../axios/axios';
// import AuthContext from "../../firebase/auth-context";
import AxiosContext from "../../AxiosContext/axios-context";

const ExpenseForm = (props) => {
    const amountRef = useRef('');
    const titleRef = useRef('');
    const categoryRef = useRef('');
    const [error, setError] = useState(false);
    // const expenseCtx = useContext(ExpenseContext);
    // const authCtx = useContext(AuthContext);
    const axiosCtx = useContext(AxiosContext);

    const addExpenseHandler = () => {
        if (amountRef.current.value < 1 || titleRef.current.value === '') {
            setError(true);
            return;
        }
        setError(false);
        const expense = {
            category: categoryRef.current.value,
            title: titleRef.current.value,
            price: amountRef.current.value
        };
        // expenseCtx.addItem(expense);
        axiosCtx.post(expense);
        props.onClose();
    }

    return (
        <Modal show={props.onShow} onHide={props.onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-center text-danger">Enter complete details.</p>}
                <Form.Control className="mb-2" id="amount" type="number" min={1} placeholder="Amount" required ref={amountRef} />
                <Form.Control className="mb-2" as="textarea" id="title" style={{ height: '75px' }} type="email" placeholder="Title" required ref={titleRef} />
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" ref={categoryRef}>
                    <option value="Food">Food</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Entertainment">Entertainment</option>
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={addExpenseHandler}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ExpenseForm;