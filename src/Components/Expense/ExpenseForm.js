import { useContext, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ExpenseContext from "../../Context/expense-context";

const Expenseform = (props) => {
    const amountRef = useRef('');
    const descriptionRef = useRef('');
    const categoryRef = useRef('');
    const [error, setError] = useState(false);
    const expenseCtx = useContext(ExpenseContext);

    const addExpenseHandler = () => {
        if(amountRef.current.value < 1 || descriptionRef.current.value === ''){
            setError(true);
            return;
        }
        setError(false);
        const expense = {
            id: Math.floor(Math.random()*100),
            category: categoryRef.current.value,
            description: descriptionRef.current.value,
            price: amountRef.current.value
        };
        expenseCtx.addItem(expense);
        props.onClose();
    }

    return (
        <Modal show={props.onShow} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-center text-danger">Enter complete details.</p>}
                <Form.Control className="mb-2" id="amount" type="number" min={1} placeholder="Amount" required ref={amountRef} />
                <Form.Control className="mb-2" as="textarea" id="description" style={{ height: '200px' }} type="email" placeholder="Description" required ref={descriptionRef} />
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

export default Expenseform;