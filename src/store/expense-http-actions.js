import axios from '../axios/axios';
import { expenseActions } from './expenses-slice';

export const fetchAllData = (userID) => {
    return async (dispatch) => {
        const getData = async () => {
            const response = await axios.get(`/${userID}.json`);
            if (response.statusText !== 'OK') {
                throw new Error('GET REQ FAILED');
            }
            return response.data;
        }
        try {
            let data = await getData();
            if (!data.items) {
                data = { items: [], ...data };
            }
            dispatch(expenseActions.replaceExpenseState(data));
        } catch (err) {
            console.log("EXPENSE-SLICE GET ERROR");
        }
    }
}

export const postAllData = (allExpenseData, userID) => {
    return async (dispatch) => {
        const postRequest = async () => {
            const response = await axios.put(`/${userID}.json`, allExpenseData);
            if (response.statusText !== 'OK') {
                throw new Error('POST REQ FAILED');
            }
        }
        try {
            await postRequest();
        } catch (err) {
            console.log("EXPENSE-SLICE POST ERROR");
        }
    }
}