import { useContext, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
// import AuthContext from "../../firebase/auth-context";
import AxiosContext from "../../AxiosContext/axios-context";

const ExpenseList = (props) => {
    // const expenseCtx = useContext(ExpenseContext);
    // const authCtx = useContext(AuthContext);
    const axiosCtx = useContext(AxiosContext);
    // const [expenseArr, setExpenseArr] = useState([]);
    // let x = 0;

    const deleteExpenseHandler = (id) => {
        // expenseCtx.removeItem(id);
        axiosCtx.delete(id);
    }

    useEffect(() => {
        axiosCtx.get();
    }, []);

    const expenseItemList = axiosCtx.items.map((itm) => {
        return (<ExpenseItem
            key={itm.id}
            id={itm.id}
            category={itm.category}
            title={itm.title}
            price={itm.price}
            onRemove={deleteExpenseHandler.bind(null, itm.id)}
        />)
    });

    return (
        <ul className="my-3 mx-5">
            {axiosCtx.items.length > 0 ? expenseItemList : <h4 className="text-center">NO EXPENSE ADDED</h4>}
        </ul>
    );
}

export default ExpenseList;