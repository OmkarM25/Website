import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'



const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const navigate=useNavigate() 
  const {userId, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',

  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }))

  }

  // const initPay = (order) =>{
  //   const options = {
  //     key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: 'Order Payment',
  //     description: 'Order Payment',
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);
  //       try {
  //         const {data} = await axios.post(
  //           backendUrl + '/api/order/verifyRazorpay',
  //           { response },
  //           { headers: { Authorization: `Bearer ${token}` } })
  //           if (data.success) {
  //             navigate('/orders')
  //             setCartItems({})
  //           }
  //       } catch (error) {
  //         console.log(error);
  //         toast.error(error.message)
  //       }        
  //     }
  //   }
  //   const rzp = new window.Razorpay(options)
  //   rzp.open();
  // }



  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const { data } = await axios.post(
            backendUrl + 'api/order/verifyRazorpay',
            {
              userId,                 // Make sure userId is accessible here
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error('Payment verification failed');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  





  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      // console.log("cartItems:", cartItems);
      // console.log("products:", products);

      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          // Find the product from products array by _id
          const product = products.find(p => p._id === productId);
          if (product) {
            // Clone product to avoid mutating original
            const itemInfo = structuredClone(product);
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }
      // console.log("Final orderItems:", orderItems); 

      let orderData = {
        userId,
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        // API CALLS FOR COD ORDER
        case 'cod':
          const response = await axios.post(backendUrl+'api/order/place', 
            orderData, 
            { headers: { Authorization: `Bearer ${token}` } })
            // {headers:token})
            console.log(response.data);
            
          if (response.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          
          break;


          case 'stripe':
            const responseStripe = await axios.post(backendUrl+'api/order/stripe', 
              orderData, 
              { headers: { Authorization: `Bearer ${token}` } })
              if (responseStripe.data.success){
                const {session_url} = responseStripe.data
                window.location.replace(session_url)
                // setCartItems({})
                // navigate('/orders')
              }else{
                toast.error(response.data.message)
              }
            break;


            case 'razorpay':
              const responseRazorpay = await axios.post(backendUrl+'api/order/razorpay',
                orderData,
                { headers: { Authorization: `Bearer ${token}`}})
                if (responseRazorpay.data.success) {
                  initPay(responseRazorpay.data.order);
                  
                }

              break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>

      {/* --------LEFT SIDE-------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input onChange={onChangeHandler} name='phone' value={formData.phone} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />

        <input onChange={onChangeHandler} name='street' value={formData.street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input onChange={onChangeHandler} name='state' value={formData.state} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip-Code' />
          <input onChange={onChangeHandler} name='country' value={formData.country} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
      </div>


      {/* --------RIGHT SIDE--------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* ----PAYMENT METHOD SELECT------ */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'stripe' ? 'bg-green-400 ' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'razorpay' ? 'bg-green-400 ' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3 border border-gray-300 rounded-full ${method === 'cod' ? 'bg-green-400 ' : ''}`}></p>
              <p className='text-gray-600 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>

        </div>

      </div>


    </form>
  )
}

export default PlaceOrder
