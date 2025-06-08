import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


// razorpay_order_id
// : 
// "order_QeoppccoH73oQl"
// razorpay_payment_id
// : 
// "pay_Qeoq5sx3Bi9swM"
// razorpay_signature
// : 
// "5900e73a1dca462594076e7e54a127b8e8f072271b3d3282034efbc5e87d16a7"


const Verify = () => {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe',
                {success,orderId},
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>



    </div>
  )
}

export default Verify