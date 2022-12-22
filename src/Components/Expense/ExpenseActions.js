import { Button } from "react-bootstrap";

const ExpenseActions = (props) => {
    return (
        <div className="d-flex justify-content-end" style={{marginBottom: "20px", marginTop: "-60px"}}>
            <Button variant="warning">Edit</Button>
            <Button variant="danger" className="mx-2" onClick={props.onRemove}>Delete</Button>
        </div>
    );
}

export default ExpenseActions;