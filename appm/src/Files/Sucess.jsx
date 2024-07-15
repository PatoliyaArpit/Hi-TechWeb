import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./redux/CartSlice";
import axios from "axios";

const Sucess = () => {
  const navigat = useNavigate();
  const dispetch = useDispatch();

  const UserLogin = useSelector((state) => state.log.log);

  const [cartdata, setcartdata] = useState([]);
  const [LoginId, setLoginId] = useState([]);
  const [Final, setFinal] = useState([]);
  const [FinalData, setFinalData] = useState([]);
  const [cartplan, setcartplan] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Pincode, setPincode] = useState("");
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [date, setdate] = useState("");
  const [Time, setTime] = useState("");
  const [Day, setDay] = useState("");
  const [Paymentmethode, setPaymentmethode] = useState("Card");
  const plancart = useSelector((state) => state.Admincart.Admincart);
  const Plan = useSelector((state) => state.plan.plan);
  const SelectAddress = useSelector((state) => state.Address.Address);

  useEffect(() => {
    UserLogin.map((val) => {
      setLoginId(val.Id);
    });
  }, []);
  useEffect(() => {
    SelectAddress.map((val) => {
      setAddress(val.Addressd);
      setCity(val.City);
      setPincode(val.Pincode);
      setFName(val.FName);
      setLName(val.LName);
    });
  });
  useEffect(() => {
    plancart.map((val) => {
      setcartplan(val.Click);
    });
  }, [plancart]);

  useEffect(() => {
    if (LoginId !== null) {
      const Finalcart = cartdata.filter((val) => val.UserId === LoginId);
      setFinal(Finalcart);
    }
  }, [cartdata, LoginId]);
  useEffect(() => {
    if (cartplan === "Cart") {
      setFinalData(Final);
    } else {
      setFinalData(Plan);
    }
  }, [cartplan, Final, Plan]);

  console.log(SelectAddress, "address");

  const call1 = () => {
    fetch("http://localhost/cartshow.php")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setcartdata(result);
      });
  };
  useEffect(() => {
    call1();
  }, []);

  const removecart = () => {
    axios
      .request({
        method: "post",
        url: "http://localhost/FinalDelete.php",
        data: { UserId: LoginId },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {});
  };

  useEffect(() => {
    FinalData.map((item) => {
      axios
        .post(
          "http://localhost/Order.php",
          {
            Product: item.Title,
            UserId: LoginId,
            ProductImg: item.Img,
            Quantity: item.quantity,
            ProductPrice:item.Price,
            Address: Address,
            City: City,
            Pincode: Pincode,
            FName: FName,
            LName: LName,
            Date: date,
            Time: Time,
            Day: Day,
            PaymentMethode: Paymentmethode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          removecart();
          console.log("Item submitted:", res.data);
        })
        .catch((error) => {
          console.error("Error submitting item:", error);
        });
    });
  }, [FinalData]);

  useEffect(()=>{
    const date = new Date();

    const year = date.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDay = dayOfWeek;
    setdate(formattedDate)
    setTime(formattedTime)
    setDay(formattedDay)
    console.log(`Date: ${formattedDate}`);
    console.log(`Time: ${formattedTime}`);
    console.log(`Day: ${formattedDay}`);
    
  },[])

  // const makePaymentCard=()=>{
  //   navigat("/")

  //   Order()
  //   // removecart()
  // }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div
            style={{
              boxShadow: "0 15px 25px #00000019",
              padding: 45,
              width: "100%",
              textAlign: "center",
              margin: "40px auto",
              borderBottom: "solid 4px #28a745",
            }}
          >
            <i
              style={{ fontSize: 55, color: "#28a745" }}
              className="fa fa-check-circle"
              aria-hidden="true"
            />
            <h2
              style={{
                marginBottom: 12,
                fontSize: 40,
                fontWeight: 500,
                lineHeight: "1.2",
                marginTop: 10,
              }}
            >
              Your payment was successful
            </h2>
            <p
              style={{
                marginBottom: 0,
                fontSize: 18,
                color: "#495057",
                fontWeight: 500,
              }}
            >
              Thank you for your payment. We will be in contact with more
              details shortly.
            </p>
            <Link style={{ margin: "5% 0 0 0" }} to="/" className="links">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Sucess;
