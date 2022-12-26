import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import axios from '../../axios/axios';
import { useSelector } from "react-redux";

const ExpenseList = (props) => {
    const userID = useSelector((state) => (state.auth.userId));
    const [expenseArr, setExpenseArr] = useState([]);

    const deleteExpenseHandler = async (id) => {
        const response = await axios.delete(`/${userID}/${id}.json`);
        getdata();
    }

    useEffect(() => {
        getdata();
    }, []);

    const getdata = async () => {
        try {
            setExpenseArr([]);
            const response = await axios.get(`/${userID}.json`);
            if (response.data) {
                const allExpenseArr = [];
                for (let key in response.data) {
                    allExpenseArr.push({ ...response.data[key], id: key });
                }
                setExpenseArr(allExpenseArr);
                const sum = allExpenseArr.reduce((accumulator, expence) => {
                    return accumulator + (+expence.price);
                }, 0);
                props.setAmount(sum);
            } else {
                console.log("NO EXPENSE ADDED!");
            }
        } catch (err) {

        }
    }

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