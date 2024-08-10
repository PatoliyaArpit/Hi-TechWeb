import{configureStore} from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import PlanSlice from "./Plan/Plan"
import OrderSlice from"./Order/Order"
import CartdataSlice from "./Cart/Cart"
import HomeDataSlice from "./Home/Product"



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
        plan:PlanSlice,
        Order:OrderSlice,
        Cartdata:CartdataSlice,
        HomeData:HomeDataSlice,
    }
})
export default store