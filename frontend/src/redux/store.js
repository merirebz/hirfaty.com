import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { promoProductReducer } from "./reducers/promoProducts";
import { blogReducer } from "./reducers/blogReducer"; 



const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    promoProducts: promoProductReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    blogs: blogReducer,
    
  },
});

export default Store;
