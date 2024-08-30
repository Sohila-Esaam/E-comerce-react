import axios from 'axios';
import React from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

export default function CategoryDetails() {

    let {id} = useParams();
    console.log(id)

    async function categoryDetails(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    }

    let {isFetching, isLoading, data, isError, error} = useQuery({
        queryKey : ['categoryDetails'],
        queryFn : categoryDetails
    })

    console.log(data?.data.data);
    

    if(isLoading){
        return <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
                    <FallingLines
                        color="#fff"
                        width="100"
                        visible={true}
                        ariaLabel="falling-circles-loading"
                    />         
                </div>
    }

    if(isError){
        return <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
              <h3>{error}</h3>
          </div>
    }
    
  return (
    <>
        <div className="flex items-center">
            <div className="md:w-1/4">
                <img src={data?.data.data.image} className='w-full' alt={data?.data.data.name} />
            </div>

            <div className="md-w-2/4 p-6">
                <h2 className='text-2xl font-mono'>Category Name : {data?.data.data.name}</h2>
                <h2 className='text-2xl font-mono mt-4'>Category Slug : {data?.data.data.slug}</h2>
            </div>
        </div>
    </>
  )
}