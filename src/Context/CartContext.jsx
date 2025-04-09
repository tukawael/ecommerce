import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./TokenContext";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
    const { token } = useContext(tokenContext)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState('')
    const [cartDetails, setCartDetails] = useState(null)
    const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`
    const Order_URL = `https://ecommerce.routemisr.com/api/v1/orders`
    const headers = {
        token
    }
    useEffect(() => {
        token && getCart();
    }, [token])
    async function addToCart(productId) {
        const { data } = await axios.post(API_URL, { productId }, {
            headers
        });
        // console.log(data);
        if (data.status == 'success') {
            setNumOfCartItems(data.numOfCartItems)
        }
        return data
    }
    async function getCart() {
        const { data } = await axios.get(API_URL, {
            headers
        });
        console.log(data);
        if (data.status == 'success') {

            setNumOfCartItems(data.numOfCartItems)
        }
        setCartId(data.cartId)
        setCartDetails(data)
        return data


    }
    async function removeProduct(id) {
        const { data } = await axios.delete(`${API_URL}/${id}`, {
            headers
        });
        console.log(data, "dataaaaaaaaaaaaaaaaa");
        if (data.status == 'success') {
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        return data
    }
    async function updateCount(id, count) {
        const { data } = await axios.put(`${API_URL}/${id}`, { count }, {
            headers
        });
        if (data.status == 'success') {
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        return data
    }
    async function cashOnDelievry(shippingAddress) {
        const { data } = await axios.post(`${Order_URL}/${cartId}`, { shippingAddress }, {
            headers
        });
        if(data.status == "success"){
            getCart()
        }
        return data
    }
    async function onlinePayment(shippingAddress) {
        const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, { shippingAddress }, {
            headers
        });
        // if(data.status == "success"){
        //     getCart()
        // }
        return data
    }
    async function getUserOrder(userId) {
        const { data } = await axios.get(`${Order_URL}/user/${userId}`);
        // if(data.status == "success"){
        //     getCart()
        // }
        return data
    }

    // https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17
    return (
        <cartContext.Provider value={{
             numOfCartItems, setNumOfCartItems, addToCart,
              getCart, cartDetails, removeProduct, 
              updateCount, cashOnDelievry ,onlinePayment ,getUserOrder}}>
            {children}
        </cartContext.Provider>
    )
}
