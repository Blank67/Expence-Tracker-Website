import { Button, Card } from "react-bootstrap";

const ExpenseItem = (props) => {
    return (
        <li className="my-2">
            <Card>
                <div className="w-25">{props.category}</div>
                <div className="w-25">{props.description}</div>
                <div className="w-25">Rs. {props.price}</div>
                <div className="d-flex justify-content-end m-2">
                    <Button variant="warning">Edit</Button>
                    <Button variant="danger" className="mx-2" onClick={props.onRemove}>Delete</Button>
                </div>
            </Card>
        </li>
    );
}

export default ExpenseItem;