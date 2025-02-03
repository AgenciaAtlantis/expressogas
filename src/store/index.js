import { configureStore } from "@reduxjs/toolkit";
import rootCart from './ducks/cart';
import rootExpress from './ducks/expressCart'
import rootProduct from './ducks/products'
import rootUser from './ducks/user';

export default configureStore({
    reducer: {
        cart: rootCart,
        expressCart: rootExpress,
        product: rootProduct,
        user: rootUser
    }
})