import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
    
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.shop_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Gund Complex, Opposite Bharath Petrol Pump,Near Manjari Stud Farm, Pune Solapur Road, Manjari Farm, Pune - 412307 </p>
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156393.54606997556!2d73.88472476509554!3d18.496572272745077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c33067c2ce0d%3A0x533edc7076641b1!2sShivshambho%20Electricals!5e1!3m2!1sen!2sin!4v1749492749727!5m2!1sen!2sin"
  width="300"
  height="100"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          <p className='text-gray-500'>Tel: 9352735392 <br />Email:</p>
        </div>
      </div>

    </div>
  )
}

export default Contact