import axios from 'axios';

//constants
let initialData = {
    fetching: false,
    array: [],
    filtering: []
}

const URL = 'http://localhost:3001/api'

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
const GET_PRODUCTS_ERROR = "GET_PRODUCTS_ERROR";

const ORDER_PRODUCTS_BY_PRICE = "ORDER_PRODUCTS_BY_PRICE";
const FILTER_PRODUCTS_BY_CONDITION = "FILTER_PRODUCTS_BY_CONDITION";

//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case FILTER_PRODUCTS_BY_CONDITION:
            return { ...state, filtering: action.payload }
        case ORDER_PRODUCTS_BY_PRICE:
            return { ...state, filtering: action.payload }
        case GET_PRODUCTS:
            return { ...state, fetching: true }
        case GET_PRODUCTS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_PRODUCTS_SUCCESS:
            return { ...state, array: action.payload, filtering: action.payload, fetching: false }
        default:
            return state      
    }

}

//actions
export let fiterProductsByCondition = (filter) => (dispatch, getState) => {
    //logic
    let { array } = getState().products
    let filtering = [];
    //filter:
    // {label: 'Sort By Category', code: 0 },
    // {label: 'New', code: 1 },
    // {label: 'Used', code: 2 },
    // {label: 'Other', code: 3 },
    if (filter.code > 0) {
            filtering = array.filter((obj) => {
             if(obj.condition ==  ( filter.label.toLowerCase() === 'other' ? 'not_specified' : filter.label.toLowerCase() ) ){
               return obj;
             }
            });
        
    } else {
        filtering = [...array]
    }

    dispatch({
        type: FILTER_PRODUCTS_BY_CONDITION,
        payload: [...filtering]
    })
}

export let orderProductsByPriceAction = (sort) => (dispatch, getState) => {
    //logic
    let { filtering } = getState().products
    
    if( sort > 0 ) {
        filtering.sort((a, b) => 
            sort === 2 ? 
                a.price > b.price ? 1 
                : -1 
                : a.price < b.price ? 1 
                : -1
        );
    } else {
        filtering.sort((a, b) => (a.key > b.key ? 1 : -1))
    }
    //dispatch
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: [...filtering]
    })

}

export let getProductsAction = ( keyword ) => (dispatch, getState) => {
    dispatch({
        type: GET_PRODUCTS
    })

    return axios.get(`${URL}/search`, { params: { keyword } })
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