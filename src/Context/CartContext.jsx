import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext(0);

export function CartContextProvider(props){

    let [totalPrice, setTotalPrice] = useState(0);
    let [numOfCartItems, setNumOfCartItems] = useState(0);
    let [products, setProducts] = useState(null);
    let [cartId, setCartId] = useState('');
    let [userId, setUserId] = useState('');

    let headers ={
        token : localStorage.getItem('userToken')
    }

    //getLoggedUserCart
    async function getLoggedUserCart(){
       try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        });
            setTotalPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            setProducts(data.data.products);
            setCartId(data.data._id);
            setUserId(data.data.cartOwner);
            console.log(data.numOfCartItems);
            return data;
            

       } catch (error) {
        console.log(error , 'getLoggedUserCart');
       }
    }

    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
            getLoggedUserCart()
        }
    }, [])

    //addProduct
    async function addProductToCart(productId){
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                { productId : productId},
                { headers : {
                    token : localStorage.getItem('userToken')
                }},
            )
            setTotalPrice(data.data.totalCartPrice);
            setNumOfCartItems(data.numOfCartItems);
            setProducts(data.data.products);
            return data
        } catch (error) {
            console.log(error);
        }
    }

    //deleteProduct
    async function deleteProduct(productId) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers
            });
            console.log(data);
            
            setNumOfCartItems(data.numOfCartItems);
            setTotalPrice(data.data.totalCartPrice);
            setProducts(data.data.products);
            toast.success('the product deleted successfully');
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    //clearCart
    async function clearCartItems(){
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers
            });
            toast.success('all products deleted from cart');
            setNumOfCartItems(0);
            setProducts([]);
            setTotalPrice(0);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    //updateCartProduct
    async function updateCartProduct(productId, count){
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { 
                count
                }, 
                {
                headers
                });
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice)
            return data;
        } catch (error) {
            console.log(error , "updateCartProduct");
        }
    }


    return <CartContext.Provider value={{ userId, setNumOfCartItems, setProducts, setTotalPrice, cartId, updateCartProduct, clearCartItems, deleteProduct, getLoggedUserCart, addProductToCart, totalPrice, numOfCartItems, products }}>
        {props.children}
    </CartContext.Provider>
}