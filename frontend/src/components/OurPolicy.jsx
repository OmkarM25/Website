import React from 'react'
import { assets } from '../assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-grey-700'>
        <div>
            <img src={assets.replace_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Replacement </p>
            <p className='text-gray-400'>We offer hassle-free replacment policy*</p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>100% original products </p>
            <p className='text-gray-400'>Genuine products with company warranty</p>
        </div>
        <div>
            <img src={assets.support_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best customer support </p>
            <p className='text-gray-400'>We provide best customer support</p>
        </div>

        
    </div>
  )
}

export default OurPolicy
