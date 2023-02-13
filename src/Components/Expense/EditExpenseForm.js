import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expenses-slice";

const EditExpenseForm = (props) => {
    const [amount, setAmount] = useState(props.item.price || '');
    const [title, setTitle] = useState(props.item.title || '');
    const [category, setCategory] = useState(props.item.category || '');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const onAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const addExpenseHandler = () => {
        if (amount < 1 || title === '') {
            setError(true);
            return;
        }
        setError(false);
        const expense = {
            id: props.item.id,
            category: category,
            title: title,
            price: amount
        };
        dispatch(expenseActions.editExpense({ expense: expense }));
        props.hide();
    }

    return (
        <Modal show={props.show} onHide={props.hide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-center text-danger">Enter complete details.</p>}
                <Form.Control className="mb-2" id="amount" type="number" min={1} placeholder="Amount" value={amount} onChange={onAmountChange} required />
                <Form.Control className="mb-2" as="textarea" id="title" style={{ height: '75px' }} type="email" placeholder="Title" value={title} onChange={onTitleChange} required />
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" value={category} onChange={onCategoryChange} >
                    <option value="Food">Food</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Entertainment">Entertainment</option>
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={addExpenseHandler}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditExpenseForm;