const ExpenseDetails = (props) => {
    return (
        <div className="w-75 p-2">
            <div className="">Title: {props.title}</div>
            <div className="">Category: {props.category}</div>
            <div className="">Expense: Rs. {props.price}</div>
        </div>
    );
}

export default ExpenseDetails;