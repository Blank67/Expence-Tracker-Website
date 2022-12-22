import { useContext, useEffect, useState } from "react";
import ExpenseContext from "../../Context/expense-context";
import ExpenseItem from "./ExpenseItem";
import axios from '../../axios/axios';
import AuthContext from "../../firebase/auth-context";

const ExpenseList = (props) => {
    const expenseCtx = useContext(ExpenseContext);
    const authCtx = useContext(AuthContext);
    const [expenseArr, setExpenseArr] = useState([]);
    let x = 0;

    const deleteExpenseHandler = (id) => {
        expenseCtx.removeItem(id);
    }

    useEffect(() => {
        const getExpense = async () => {
            const response = await axios.get(`/${authCtx.userId}.json`);
            // console.log(response);
            if(response.data){
                const allExpenseArr = [];
                for (let key in response.data) {
                    allExpenseArr.push({ ...response.data[key] });
                }
                // console.log(allExpenseArr[0]);
                const getExpenseArr = [];
                for (let key in allExpenseArr[0]) {
                    getExpenseArr.push({ ...allExpenseArr[0][key], id: key })
                }
                // console.log(getExpenseArr);
                // debugger;
                setExpenseArr(getExpenseArr);
            }else{
                console.log("NO EXPENSE ADDED!");
            }
            // const sum = expenseArr.reduce((partialSum, a) => partialSum + a, 0);
            // console.log(sum);
        }
        getExpense();
        props.total(x);
    }, [authCtx.userId]);


    const expenseItemList = expenseArr.map((itm) => {
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
            {expenseArr.length > 0 ? expenseItemList : <h4 className="text-center">NO EXPENSE ADDED</h4>}
        </ul>
    );
}

export default ExpenseList;