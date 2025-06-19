import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 my-10 text-sm'>

                <div >
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                    Shivhambho Electricals is a popular electrical products wholesaler/supplier in Hadapsar, Pune since 2012.
                    At Shivshambho Electricals we provide a vasriety of electric products and equipments such as fans, lights, mixers, water heaters, irons, premium switches, wires and cables, led panel lights and many more.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Locate our Store</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+91 7219354546</li>
                        <li>+91 9325735392</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024 Shivshambho Electricals - All Rights reserved</p>
                <p className='py-2 text-sm text-gray-500 text-center'>Website created by Omkar, Sumit & Sujal</p>
            </div>
        </div>
    )
}

export default Footer
