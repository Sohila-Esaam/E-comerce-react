import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast/headless';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
  //product id
  let {id, category} = useParams();

  let { addProductToCart } = useContext(CartContext);

  let [isLoading, useIsLoading] = useState(false);

  async function addProduct(){
    useIsLoading(true);

    let data = await addProductToCart(id);
    console.log(data);
    if(data){
      toast.success(data.message)
      useIsLoading(false);
    }else{
      toast.error('error');
      useIsLoading(false);
    }
  }
  
  let [productDetails, setProductDetails] = useState([]);
  let [relatedProducts, setRelatedProducts] = useState([]);


   function getProductDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      setProductDetails(data.data)
    })
    .catch((error)=>{
      console.log(error);
    })
   }

   function getRelatedProducts(category){
      //url ==> getAllProducts
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        let allProducts = data.data;
        let related = allProducts.filter((product)=> product.category.name == category);
        setRelatedProducts(related);
      })
      .catch((error)=>{
        console.log(error);
      })
   }

   //component did mount
   useEffect(()=>{
    getProductDetails(id);
    getRelatedProducts(category);
   },[id, category])  //==>[id, category] component will update ==> 34an lma click 3la ay product mn related products y8er f products details 3ady

   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let {AddProductToWishlist} = useContext(WishListContext);

  async function addToWishList(productId){
    let data = await AddProductToWishlist(productId);
    console.log(data);
    if(data){
      toast.success(data.message)
    }else{
      toast.error('error')
    }
  }

  return (
    <>
      <div className="row">
        <div className="w-1/4">
        <Slider {...settings}>
            {productDetails?.images?.map((src, idx)=> <img key={idx} src={src} className='w-full' alt={productDetails?.title} /> )}
        </Slider>
          
        </div>
        <div className="w-3/4 p-6">
          <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
          <p className='text-gray-500 mt-4 font-light mb-3'>{productDetails?.description}</p>
          <div className="flex items-center justify-between my-4">
                <span>{productDetails.price} EGP</span>
                <span>{productDetails.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
              </div>

              <button onClick={addProduct} className='btn my-3'>
                {isLoading? <i className='fa-solid fa-spinner fa-spin text-white'></i> : 'Add To Cart'}
                </button>
              
              <button onClick={()=>{addToWishList(productDetails.id)}} className='btn my-3'>Add To WishList</button>

        </div>
      </div>

      <h3 className='text-green-500 font-bold text-2xl my-7'>Related Products</h3>

      <div className="grid md:grid-cols-6">
        {relatedProducts.map((product)=> 
          <div key={product.id} className='product p-2 my-3 mx-2'>

            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full' alt={product.title} />
              <span className='text-green-600 mt-2 d-block font-light'>{product.category.name}</span>
              <h3 className='text-lg text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>

              <div className="flex items-center justify-between">
                <span>{product.price} EGP</span>
                <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
              </div>

            </Link>
              <button className='btn my-3'>Add To Cart</button>

          </div>
        )}
      </div>
    </>
  )
}
