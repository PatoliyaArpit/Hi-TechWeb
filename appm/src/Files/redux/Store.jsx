import{configureStore} from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import Product from "./Product";
import loremSlice from "./Product";


const store=configureStore({
    reducer:{
        cart:CartSlice,
        reg:CartSlice,
        log:CartSlice,
        payment:CartSlice,
        plan:CartSlice,
        check:CartSlice,
        Otp:CartSlice,
        filtercart:CartSlice,
        Address:CartSlice,
        Admincart:CartSlice,
        Rendomurl:CartSlice,
        lorem:loremSlice
    }
})
export default store