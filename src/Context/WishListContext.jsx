import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let WishListContext = createContext();

export default function WishListContextProvider(props){

    let[dataList, setDataList] = useState(null);

    //getLoggedUserWishList
    async function getLoggedUserWishList(){
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {headers :{
                    token : localStorage.getItem('userToken')
                }}
            )
            setDataList(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function AddProductToWishlist(productId){
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId : productId },
                {headers : {
                    token : localStorage.getItem('userToken')
                }}
            )
            if(dataList?.some((item)=> item.id === productId)){
                deleteProductFromWishlist(productId);
            }
            else if(dataList?.filter((item)=> item.id !== productId)){
                setDataList(data.data)
                toast.success(data.message)
                getLoggedUserWishList()
            }

            console.log(data);
        } catch (error) {
            console.log(error , "add product to wish list");
        }
    }

    //removeFromWishList
    async function deleteProductFromWishlist(productId){
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {headers : {
                    token : localStorage.getItem('userToken')
                }}
            )
            console.log(data);
            console.log(data.data);
            getLoggedUserWishList();
            return data
        } catch (error) {
            console.log(error , "remove product to wish list");
        }
    }

    return <WishListContext.Provider value={{ getLoggedUserWishList, AddProductToWishlist, dataList, deleteProductFromWishlist }}>
         {props.children}
    </WishListContext.Provider>
}