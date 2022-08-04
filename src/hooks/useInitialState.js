import { useEffect, useState } from "react";
import initialState from "../initialState"
import axios from "axios";

const API = "http://localhost:1337/api/products?populate=%2A";

const useInitialState = () => {
    const [state, setState] = useState(initialState);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
          const response = await axios(API);
          setProducts(response.data.data);
          console.log(response);
        }
        getData();
      }, []);
    
    const addToCart = (payload) => {
        console.log(state.cart.length);
        setState({
            ...state,
            cart: [...state.cart, payload]
        });
    };

    const removeFromCart = (payload) => {
        setState({
            ...state,
            cart: state.cart.filter(items => items.id !== payload.id)
        });
    };
    const addToBuyer = payload => {
        setState({
            ...state, 
            buyer: [...state.buyer, payload]
        })
    };

    const addNewOrder = payload => 
    setState({
        ...state,
        orders: [...state.orders, payload]
    })
    return {
        addToCart,
        removeFromCart,
        state,
        addToBuyer,
        addNewOrder,
        products
    };
};

export default useInitialState;