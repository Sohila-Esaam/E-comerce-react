import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query'

export default function useProducts() {

    function getAllProduct(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let reponseObject = useQuery({
        queryKey : ['allProducts'],
        queryFn : getAllProduct
    })

  return reponseObject
}
