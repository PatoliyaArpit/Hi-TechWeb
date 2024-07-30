import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getcart } from '../redux/Cart/Cart'

const CurrentUser = () => {
    const dispatch=useDispatch()
    const [cart,setcart]=useState([])
    const [LoginId, setLoginId] = useState([]);
    const [Final,setFinal]=useState([])
    const LoginUser = useSelector((state) => state.log.log);
    const cartitem = useSelector((state) => state.cart.cart);
     const cartdata=useSelector((state)=>state.Cartdata)

    useEffect(()=>{
      dispatch(getcart())
    },[dispatch])
    useEffect(()=>{
        setcart(cartdata.data)
    },[cartdata])

    useEffect(() => {
        LoginUser.map((val) => {
          setLoginId(val.Id);
        });
      }, [LoginUser]);
      useEffect(() => {
        if (LoginId !== null) {
          const Finalcart = cartdata.filter((val) => val.UserId === LoginId);
          if (LoginUser.length === 0) {
            setFinal(cartitem);
          } else {
            setFinal(Finalcart);
          }
        }
      }, [cartdata, LoginId]);

  return Final
}

export default CurrentUser