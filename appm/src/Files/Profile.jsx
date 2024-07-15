import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, logcleare } from "./redux/CartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import axios from "axios";
import Editpop from "./Popup/Editpop";

import PopBill from "./Popup/PopBill";

const Profile = () => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.log.log);

  const [cartdata, setcartdata] = useState([]);
  const [LoginId, setLoginId] = useState([]);
  const [Final, setFinal] = useState([]);
  const [ProfilePic, setProfilepic] = useState();
  const [Profiledata, setprofiledata] = useState([]);
  const [FilterUser, setFilteruser] = useState({});
  const [poppop, setpopop] = useState(false);

  const [order, setorder] = useState([]);
  const [FinalOrder, setFinalOrder] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [billpop, setbillpop] = useState(false);
  const [Day, setday] = useState("");

  const dispatch = useDispatch();
  const notify = () => {
    toast.error("Account has been logout", {
      position: "top-center", // directly use string value for position
    });
  };
  const handleLogout = () => {
    notify();

    setTimeout(() => {
      navigate("/");
      dispatch(clearCart());
      window.localStorage.removeItem("log");
      dispatch(logcleare());

      axios.post(
        "http://localhost/LoginCleare.php",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }, 1500);
  };
  useEffect(() => {
    const filter = order.filter((val) => val.UserId === LoginId);
    setFinalOrder(filter);
  }, [order]);
  const call2 = () => {
    fetch("http://localhost/cartshow.php")
      .then((val) => {
        return val.json();
      })
      .then((res) => {
        setcartdata(res);
      });
  };
  useEffect(() => {
    call2();
  }, []);

  useEffect(() => {
    profile.map((val) => {
      setLoginId(val.Id);
    });
  }, []);

  useEffect(() => {
    const Finalcart = cartdata.filter((val) => val.UserId === LoginId);
    setFinal(Finalcart);
  }, [cartdata, LoginId]);
  const call3 = () => {
    fetch("http://localhost/Registershow.php")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setprofiledata(result);
      });
  };
  useEffect(() => {
    call3();
  }, []);

  useEffect(() => {
    const filter = Profiledata.find((val) => val.Id === LoginId);
    setFilteruser(filter);
  }, [Profiledata, LoginId]);

  useEffect(() => {
    if (FilterUser) {
      setProfilepic(FilterUser.Profile);
    }
  }, [FilterUser]);

  const btn = () => {
    setpopop(false);
    setbillpop(false);
  };

  const call5 = () => {
    fetch("http://localhost/Ordershow.php")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setorder(result);
      });
  };
  useEffect(() => {
    call5();
  }, []);
  const Cancleorder = (data) => {
    // alert("hello")
    alert("Cancel Order");
    axios
      .post("http://localhost/OrderCancel.php", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        call5();
      })
      .catch((error) => {
        console.error("There was an error deleting the item!", error);
      });
  };
  const Bill = (val) => {
    setbillpop(!billpop);
    localStorage.setItem("OrderId", val);
  };
 
  return (
    <>
      <Header></Header>
      {poppop ? <Editpop pass={btn}></Editpop> : null}
      {billpop ? <PopBill pass={btn}></PopBill> : null}

      <section style={{ backgroundColor: "#eee" }}>
        <ToastContainer></ToastContainer>
        <div className="container py-5">
          <div className="row" key={""}>
            {profile.map((val) => {
              return (
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      {ProfilePic === "" ? (
                        <img
                          src="img/home1/User.jpg"
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: 150 }}
                        />
                      ) : (
                        <img
                          src={val.Profile}
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: 150 }}
                        />
                      )}

                      <h5 className="my-3">{""}</h5>
                      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                        {val.Name}
                      </p>
                      <p className="text-muted mb-4">{val.Bio}</p>

                      <div className="row ">
                        <div className="col-sm-3">
                          <p className="mb-0">Total Cart :{Final.length}</p>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-sm-3">
                          <p className="mb-0">
                            Total Order :{FinalOrder.length}
                          </p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mb-2">
                        <button
                          className="Logoutbtn"
                          onClick={() => handleLogout()}
                          style={{ margin: "0 15% 0 0" }}
                        >
                          {" "}
                          Logout
                        </button>
                        <button
                          className="Editbtn"
                          onClick={() => setpopop(true)}
                          style={{ margin: "0 0 0 0%" }}
                        >
                          {" "}
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card mb-4 mb-lg-0">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush rounded-3">
                        {val.Github === "" ? null : (
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <i className="fab fa-github fa-lg text-body" />
                            <a
                              className="mb-0"
                              href={val.Github}
                              target="_blank"
                            >
                              {val.Github}
                            </a>
                          </li>
                        )}
                        {val.Twitter === "" ? null : (
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <i
                              className="fab fa-twitter fa-lg"
                              style={{ color: "#55acee" }}
                            />
                            <a
                              href={val.Twitter}
                              className="mb-0"
                              target="_blank"
                            >
                              {val.Twitter}
                            </a>
                          </li>
                        )}
                        {val.Instagram === "" ? null : (
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <i
                              className="fab fa-instagram fa-lg"
                              style={{ color: "#ac2bac" }}
                            />
                            <a href={val.Instagram} target="_blank">
                              {val.Instagram}
                            </a>
                          </li>
                        )}
                        {val.Facebook === "" ? null : (
                          <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <i
                              className="fab fa-facebook-f fa-lg"
                              style={{ color: "#3b5998" }}
                            />
                            <a
                              className="mb-0"
                              href={val.Facebook}
                              target="_blank"
                            >
                              {val.Facebook}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {profile.map((val) => {
              return (
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{val.Name}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{val.Email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{val.Contact}</p>
                        </div>
                      </div>
                      <hr />
                      {/* <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            Bay Area, San Francisco, CA
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div>
                    <a href="#" class="View" onClick={() => settoggle(!toggle)}>
                      {toggle ? "Close" : " View Order"}
                    </a>
                  </div>

                  {toggle ? (
                    <section className="vh-0 gradient-custom-2 scrollbar-hide ">
                      {FinalOrder.map((val) => {
                        return (
                          <div className="container h-100 scrollbar-hide flex justify-center ">
                            <div className="row d-flex justify-center align-items-center h-100 mb-3">
                              <div className="col-md-12">
                                <div
                                  className="card card-stepper"
                                  style={{
                                    borderRadius: "16px",
                                    margin: " 0 auto",
                                    width: "62rem",
                                  }}
                                >
                                  <div>
                                    <div className="card-header ">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <p className="text-muted mb-2">
                                            {" "}
                                            Order ID{" "}
                                            <span className="fw-bold text-body">
                                              {val.Id}
                                            </span>
                                          </p>
                                          <p className="text-muted mb-0">
                                            {" "}
                                            Place On{" "}
                                            <span className="fw-bold text-body">
                                              {val.Date}
                                              {val.date}
                                            </span>{" "}
                                          </p>
                                        </div>
                                        <div>
                                          <h6 class="mb-0">
                                            {" "}
                                            Place Time
                                            <span href="fw-bold text-body">
                                              {" "}
                                              {val.Time}
                                            </span>
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card-body p-4">
                                      <div className="d-flex flex-row mb-4 pb-2">
                                        <div className="flex-fill">
                                          <h5 className="bold">
                                            {val.Product}
                                          </h5>
                                          <p className="text-muted">
                                            {" "}
                                            Qt: {val.Quantity} item
                                          </p>
                                          <h4 className="mb-3">
                                            {" "}
                                            Rs:{val.ProductPrice}{" "}
                                            <span className="small text-muted">
                                              {" "}
                                              via ({val.PaymentMethode}){" "}
                                            </span>
                                          </h4>
                                          <p className="text-muted">
                                            Delivery On:{" "}
                                            <span className="text-body">
                                              {(() => {
                                                const [month, day, year] =
                                                  val.Date.split("-");
                                                const originalDate = new Date(
                                                  `${year}-${month}-${day}`
                                                );

                                                // Increment the date by 5 days
                                                const incrementedDate =
                                                  new Date(originalDate);
                                                incrementedDate.setDate(
                                                  originalDate.getDate() + 5
                                                );

                                                // Format the incremented date
                                                const options = {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                };
                                                const formattedIncrementedDate =
                                                  incrementedDate.toLocaleDateString(
                                                    "en-US",
                                                    options
                                                  );

                                                // Return the formatted incremented date
                                                return formattedIncrementedDate;
                                              })()}
                                            </span>
                                          </p>
                                        </div>
                                        <div>
                                          <img
                                            className="align-self-center img-fluid"
                                            style={{ width: "12rem" }}
                                            src={val.ProductImg}
                                            width={250}
                                          />
                                        </div>
                                      </div>
                                      <ul
                                        id="progressbar-1"
                                        className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4"
                                      >
                                        <li className="step0 active" id="step1">
                                          <span
                                            style={{
                                              marginLeft: "22px",
                                              marginTop: "12px",
                                            }}
                                          >
                                            PLACED
                                          </span>
                                        </li>
                                        <li
                                          className="step0 active text-center"
                                          id="step2"
                                        >
                                          <span>SHIPPED</span>
                                        </li>
                                        <li
                                          className="step0 text-muted text-end"
                                          id="step3"
                                        >
                                          <span style={{ marginRight: "22px" }}>
                                            DELIVERED
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="card-footer p-4">
                                      <div className="d-flex justify-content-between">
                                        <h5 className="fw-normal mb-0">
                                          <Link className="nav-link" href="#!">
                                            Track
                                          </Link>
                                        </h5>
                                        <div className="border-start h-100" />
                                        <h5 className="fw-normal mb-0">
                                          <Link
                                            className="nav-link"
                                            onClick={() => {
                                              const data = {
                                                Id: val.Id,
                                              };
                                              Cancleorder(data);
                                            }}
                                          >
                                            Cancel
                                          </Link>
                                        </h5>
                                        <div className="border-start h-100" />
                                        <h5 className="fw-normal mb-0">
                                          <Link
                                            className="nav-link"
                                            onClick={() => Bill(val.Id)}
                                          >
                                            Generate Bil
                                          </Link>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </section>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
