import { Button, Card } from "react-bootstrap";
import ExpenseActions from "./ExpenseActions";
import ExpenseDetails from "./ExpenseDetails";

const ExpenseItem = (props) => {
    return (
        <li className="my-2">
            <Card>
                <ExpenseDetails category={props.category} description={props.description} price={props.price} />
                <div className="d-flex justify-content-end p-2" style={{ marginBottom: "20px", marginTop: "-65px" }}>
                    <Button variant="warning">Edit</Button>
                    <Button variant="danger" className="mx-2" onClick={props.onRemove}>Delete</Button>
                </div>
            </Card>
        </li>
    );
}

export default ExpenseItem;