import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Bestseller = () => {

    const {products} = useContext(ShopContext);
    // console.log("Filtered Bestsellers: ", bestProduct);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{

        // if (products && products.length > 0) { // Make sure products exist
        //     const bestProduct = products.filter(item => item.Bestseller); // Filter bestsellers
        //     setBestSeller(bestProduct.slice(0, 5));
        // }
        
        const bestProduct=products.filter((item)=>(item.bestseller))
        setBestSeller(bestProduct.slice(0,9))

    },[products])

    // const imageSrc = Array.isArray(image) && image.length > 0 ? image[0] : '/path/to/default/image.jpg';


  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
      </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
                ))
            }
        </div>

    </div>
  )
}

export default Bestseller


