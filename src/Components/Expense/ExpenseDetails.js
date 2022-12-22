const ExpenseDetails = (props) => {
    return (
        <div className="w-75 p-2">
            <div className="">Category: {props.category}</div>
            <div className="">Description: {props.description}</div>
            <div className="">Expense: Rs. {props.price}</div>
        </div>
    );
}

export default ExpenseDetails;