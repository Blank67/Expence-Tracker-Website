import { Card } from "react-bootstrap";

const ExpenseItem = (props) => {
    return (
        <li className="my-2">
            <Card>
                <div>{props.category}</div>
                <div>{props.description}</div>
                <div>{props.price}</div>
                <button onClick={props.onRemove}>Delete</button>
            </Card>
        </li>
    );
}

export default ExpenseItem;