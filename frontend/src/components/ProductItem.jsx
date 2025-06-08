import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
// import assets from './assets/assets'

const ProductItem = ({id,images,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  
    
    //image import
    const imageSrc = Array.isArray(images) && images.length > 0 ? images[0] : '/path/to/default/image.jpg';

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden'>

            {/* image import */}
            <img className='hover:scale-110 transition ease-in-out' src={imageSrc} alt={name} />
           
            {/* <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="IMAGE" /> */}
        
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
