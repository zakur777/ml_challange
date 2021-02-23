import axios from 'axios';

//constants
let initialData = {
    fetching: false,
    array: []
}

const URL = 'http://localhost:3001/prueba'

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";

//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, fetching: true }
        case GET_PRODUCTS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_PRODUCTS_SUCCESS:
            return { ...state, array: action.payload, fetching: false }
        default:
            return state      
    }

}

//actions
export let getProductsAction = ( keyword ) => (dispatch, getState) => {
    dispatch({
        type: GET_PRODUCTS
    })

    return axios.get(URL, { params: { keyword } })
        .then(res => {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_PRODUCTS_ERROR,
                payload: err.response.message
            })
        })
}