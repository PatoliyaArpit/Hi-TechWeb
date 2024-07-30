import{configureStore} from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import Product from "./Product";
import loremSlice from "./Product";
import PlanSlice from "./Plan/Plan"
import OrderSlice from"./Order/Order"
import CartdataSlice from "./Cart/Cart"



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
        lorem:loremSlice,
        plan:PlanSlice,
        Order:OrderSlice,
        Cartdata:CartdataSlice,
    }
})
export default store