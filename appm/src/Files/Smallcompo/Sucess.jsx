import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Sucess = () => {
  const navigate = useNavigate();
  const UserLogin = useSelector((state) => state.log.log);
  const plancart = useSelector((state) => state.Admincart.Admincart);
  const Plan = useSelector((state) => state.Admincart.Admincart);
  const SelectAddress = useSelector((state) => state.Address.Address);

  const [cartdata, setcartdata] = useState([]);
  const [FinalData, setFinalData] = useState([]);
  const [LoginId, setLoginId] = useState(null);
  const [cartplan, setcartplan] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Pincode, setPincode] = useState("");
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [date, setdate] = useState("");
  const [Time, setTime] = useState("");
  const [Day, setDay] = useState("");
  const [Contact,setContact]=useState('')
  const [PaymentMethod, setPaymentMethod] = useState("Card");

  useEffect(() => {
    if (UserLogin.length > 0) {
      setLoginId(UserLogin[0].Id);
    }
  }, [UserLogin]);

  useEffect(() => {
    if (SelectAddress.length > 0) {
      const { Addressd, City, Pincode, FName, LName,Contact } = SelectAddress[0];
      setAddress(Addressd);
      setCity(City);
      setPincode(Pincode);
      setFName(FName);
      setLName(LName);
      setContact(Contact)
    }
  }, [SelectAddress]);

  useEffect(() => {
    if (plancart.length > 0) {
      setcartplan(plancart[0].Click);
    }
  }, [plancart]);

  const fetchCartData = async () => {
    try {
      const response = await fetch("http://localhost/cartshow.php");
      const result = await response.json();
      setcartdata(result);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    if (cartdata.length > 0 && LoginId !== null) {
      const Finalcart = cartdata.filter((val) => val.UserId === LoginId);
      setFinalData(cartplan === "Cart" ? Finalcart : Plan);
    }
  }, [cartdata, LoginId, cartplan, Plan]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const daysOfWeek = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    setdate(`${day}-${month}-${year}`);
    setTime(`${hours}:${minutes}:${seconds}`);
    setDay(dayOfWeek);
  }, []);

  useEffect(() => {
    if (FinalData && FinalData.length > 0 && LoginId !== null) {
      FinalData.forEach((item) => {
        axios.post(
          "http://localhost/Order.php",
          {
            Product: item.Title,
            UserId: LoginId,
            ProductImg: item.Img,
            Quantity: item.quantity,
            ProductPrice: item.Price,
            Address: Address,
            City: City,
            Pincode: Pincode,
            FName: FName,
            LName: LName,
            Date: date,
            Time: Time,
            Day: Day,
            PaymentMethode: PaymentMethod,
            Order_Status:"In progress",
            Contact:Contact
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
    }
  }, [FinalData, LoginId, Address, City, Pincode, FName, LName, date, Time, Day, PaymentMethod]);

  const removecart = () => {
    if (cartplan === "Cart") {
    axios.post("http://localhost/FinalDelete.php", { UserId: LoginId }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log("Cart removed:", res.data);
    }).catch((error) => {
      console.error("Error removing cart:", error);
    });
  };
  }
  const backhome = () => {
    navigate("/Home");
    window.location.reload();
  };

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
            <Link style={{ margin: "5% 0 0 0" }} onClick={backhome} className="links">
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
