import React from 'react'
import Hero from '../components/Hero'
import LatestProducts from '../components/LatestProducts'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestProducts/>
        <Bestseller/>
        <OurPolicy/>
        <NewsletterBox/>
    </div>
  )
}

export default Home