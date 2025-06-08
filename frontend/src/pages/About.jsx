import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* <div className='my-10 flex flex-col md:flex-row gap-16'> */}
      {/* <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" /> */}
      <div className='flex text-gray-700 w-full bg-gray-100  p-20 flex-col justify-center gap-6 '>
        <p className='text-2xl'>Shivhambho Electricals is a popular electrical products wholesaler/supplier in Hadapsar, Pune since 2012.
        <br /> At Shivshambho Electricals we provide a vasriety of electric products and equipments such as fans, lights, mixers, water heaters, irons, premium switches, wires and cables, led panel lights and many more.
      
        <br /><br /> For more info call : 9325735392</p>
      </div>

      {/* </div> */}

      <br /><br />
      <div>
        {/* <Title text1={'TOP'} text2={'BRANDS'}/> */}
        <div className='inline-flex text-2xl gap-2 items-center mb-3'>
          <p className='text-gray-500'>TOP <span className='text-gray-700 font-medium'>BRANDS</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
        </div>
        <div className=' grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 gap-y-2 '>
          <img className=' p-4 w-2/4 max-w-100px' src={assets.bajaj_logo} alt="" />
          <img className=' mt-5 p-2 w-2/4 max-w-100px' src={assets.orient_logo} alt="" />
          <img className=' mt-7 p-2 w-2/4 max-w-100px' src={assets.crompton_logo} alt="" />
          <img className=' p-2 w-2/4 max-w-100px' src={assets.havells_logo} alt="" />
          <img className='mt-5 p-2 w-2/4 max-w-100px' src={assets.anchor_logo} alt="" />
          <img className='mt-5 p-2 w-2/4 max-w-100px' src={assets.polycab_logo} alt="" />
          <img className=' p-2 w-2/4 max-w-100px' src={assets.legrand_logo} alt="" />
          <img className=' p-2 w-2/4 max-w-100px' src={assets.syska_logo} alt="" />
        </div>
      </div>

      <div className='text-2xl py-4'>
        <Title text1={'WHY CHOOSE '} text2={'US'}/>
      </div>

      <div className='flex flex-col gap-4 md:flex-row text-sm mb-20'>
        <div className=' border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards</p>
        </div>
        <div className=' border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user friendly interface and hassle-free ordering process, shopping has never been easier</p>
        </div>
        <div className=' border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you on the way ensuring your satisfaction is our top priority</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About