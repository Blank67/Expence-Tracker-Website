import React, { useContext, useState } from "react";
import AxiosContext from "./axios-context";
import axios from '../axios/axios';
import AuthContext from "../firebase/auth-context";

const AxiosProvider = (props) => {

    const [total, setTotal] = useState(0);
    const authCtx = useContext(AuthContext);
    const [items, setItems] = useState([]);

    const postData = async (item) => {
        try {
            const response = await axios.post(`/${authCtx.userId}.json`, item);
            console.log(response);
            getData();
        } catch (err) {

        }
    }

    const getData = async () => {
        try {
            setItems([]);
            setTotal(0);
            const response = await axios.get(`/${authCtx.userId}.json`);
            if (response.data) {
                const allExpenseArr = [];
                for (let key in response.data) {
                    allExpenseArr.push({ ...response.data[key], id: key });
                }
                setItems(allExpenseArr);
                console.log(allExpenseArr);
                // const sum = allExpenseArr.reduce((accumulator, object) => {
                //     return accumulator + (+object.price);
                // }, total);
                // console.log(sum);
                // setTotal(sum);
            } else {
                console.log("NO EXPENSE ADDED!");
            }
        } catch (err) {

        }
    }

    const deleteData = async (id) => {
        console.log(id);
        const response = await axios.delete(`/${authCtx.userId}/${id}.json`);
        console.log(response);
        getData();
    }

    const axiosContext = {
        items: items,
        totalAmount: total,
        post: postData,
        get: getData,
        put: (id) => { },
        delete: deleteData
    }

    return (
        <AxiosContext.Provider value={axiosContext}>
            {props.children}
        </AxiosContext.Provider>
    );
}

export default AxiosProvider;