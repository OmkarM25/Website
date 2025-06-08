import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'

const orderRouter = express.Router()

// ADMIN ROUTES
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// PAYMENT ROUTES
orderRouter.post('/place',authUser,placeOrder)   //---FOR COD
orderRouter.post('/stripe',authUser,placeOrderStripe)   //---FOR STRIPE
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)   //---FOR RAZORPAY

// USER ROUTES
orderRouter.post('/userorders',authUser,userOrders) //---DISPLAY USER ORDERS

// VERIFY PAYMENT
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter