import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PoppopEmail from "../Popup/PoppopEmail";
import PoppopNewPass from "../Popup/PoppopNewPass";
import Poppop from "../Popup/Poppop";
import PoppopR from "../Popup/PoppopR";
import { Adcart } from "../redux/CartSlice";
import { useLocation } from "react-router-dom";
import { getpackdetail, getplan } from "../redux/Plan/Plan";

const Plan = () => {
  const { state } = useLocation();
  const [Fprice, setFprice] = useState(0);
  const [packdata, setpackdata] = useState([]);

  const navigate = useNavigate();
  const dispetch = useDispatch();

  const final = useSelector((state) => state.log.log);
  const { pack, packdetails } = useSelector((state) => state.plan);

  const [pop, setpop] = useState(false);
  const [popR, setpopR] = useState(false);
  const [popEmail, setpopEmail] = useState(false);
  const [popNewp, setpopNewp] = useState(false);
  // const [plandata, setplandata] = useState([]);
  const [Quantity, setQuantity] = useState(1);
  const [filterplan, setfilterplan] = useState([]);
  const [planPrice, setplanPrice] = useState("");

  useEffect(() => {
    const Price1 = Number(planPrice * Quantity);
    const Finalp = Price1 + 0;
    setFprice(Finalp);
  },[planPrice,Quantity]);

  useEffect(() => {
    dispetch(getpackdetail());
    dispetch(getplan());
  }, [dispetch, packdetails]);

  const recoll = () => {
    setpop(true);
  };

  const btn = () => {
    setpop(false);
    // Login();
  };
  const btnr = () => {
    setpopR(true);
    setpop(false);
  };
  const Rbtnclose = () => {
    setpopR(false);
  };
  const btn1 = () => {
    setpop(true);
    setpopR(false);
  };
  const Emailbtn = () => {
    setpopEmail(false);
  };
  const EmailBtnSecond = () => {
    setpopEmail(false);
    setpopNewp(true);
  };
  const btnForget = () => {
    setpopEmail(true);
    setpop(false);
  };
  const Newpass = () => {
    setpopNewp(false);
  };
  const Newpass2 = () => {
    setpopNewp(false);
    setpop(true);
  };
  const MoveAddress = () => {
    dispetch(
      Adcart({
        Price: planPrice * Quantity,
        Finalp: Fprice,
        Click: "Plan",
        Img: state.Img,
        Title: state.Title,
        quantity: Quantity,

      })
    );
    navigate("/Order");
  };

  useEffect(() => {
    if (state?.Title && packdetails?.length) {
      const Pack = packdetails.filter((val) => val.Pack_Id === state.Id);

      setpackdata(Pack);
    }
  }, [state, packdetails]);
 
  useEffect(() => {
    const filterplan = pack?.filter((val) => val.Title === state.Title);
    filterplan?.map((val) => {
      setplanPrice(val.Price);
    });
    setfilterplan(filterplan);
  }, [pack,state]);

  const handleincrease = () => {
    setQuantity(Quantity + 1);
  };
  const handledecrease = () => {
    if (Quantity > 1) {
      setQuantity(Quantity - 1);
    }
  };

  return (
    <>
      <Header></Header>

      {pop ? <Poppop pass={btn} pass2={btnr} pass3={btnForget} /> : null}
      {popR ? <PoppopR pass={btn1} pass2={Rbtnclose}></PoppopR> : null}
      {popEmail ? (
        <PoppopEmail pass={Emailbtn} pass2={EmailBtnSecond}></PoppopEmail>
      ) : null}
      {popNewp ? (
        <PoppopNewPass pass={Newpass} pass2={Newpass2}></PoppopNewPass>
      ) : null}

      {/* breadcumb-area-end */}
      {/* page-gallery-area-start */}

      <section className="" style={{ backgroundColor: "#eee", height: "100%" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <Link to="/" className="links">
                          <i className="fas fa-long-arrow-alt-left me-2" />
                          Continue shopping
                        </Link>
                      </h5>
                      <hr />

                      {/* <div className="shadow PlanTitle">
                        <div className=" ">
                          <h2>
                            {" "}
                            Pack Name:<span>{state.Title}</span>
                          </h2>
                          <p style={{ display: "flex" }}>
                            Price: <span>{state.Price}</span>
                          </p>
                        </div>
                      </div> */}
                      {filterplan && filterplan.length > 0 ? (
                        filterplan.map((val) => (
                          <div key={val.Title} className="card mb-3 shadow">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                  <div>
                                    <img
                                      src={val.Img}
                                      className="img-fluid rounded-3"
                                      alt="Shopping item"
                                      style={{ width: 65 }}
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h5>{val.Title}</h5>
                                    <p className="small mb-0"></p>
                                  </div>
                                </div>
                                <div className="d-flex flex-row align-items-center quantityb">
                                  <button
                                    className="incredecre"
                                    onClick={() => handledecrease(val.Title)}
                                  >
                                    -
                                  </button>

                                  <div style={{ width: 50 }}>
                                    <h5 className="fw-normal mb-0">
                                      {Quantity}
                                    </h5>
                                  </div>
                                  <button
                                    className="incredecre"
                                    onClick={() => handleincrease(val.Title)}
                                  >
                                    +
                                  </button>
                                  <div style={{ width: 80 }}>
                                    <h5 className="mb-0">
                                      {Quantity * val.Price}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No plans available</p>
                      )}

                      <div className="container shadow p-6 Planheading mb-4">
                        <h4 className=" mb-5 mt-5 ">
                          Select Pack in Available item{" "}
                        </h4>
                      </div>
                      <div className="row">
                        {packdata?.map((val) => {
                          return (
                            <div className="col-lg-4 col-sm-6 col-md-6 col-12 mb-3 mt-4 shadow">
                              <div className="single-service">
                                <div className="img PlanImg ">
                                  <div className="img-cover">
                                    <img src={val.Product_Img} alt="" />
                                  </div>
                                </div>
                                <div className="content">
                                  <h2 className="title titlefix">
                                    {val.Product_title}
                                  </h2>
                                  <p className="text textfix">
                                    {val.Description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="col-lg-5 mt-5">
                      <div
                        className="card text-white rounded-3"
                        style={{ backgroundColor: "" }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0 fontcolor">Card details</h5>
                            <img
                              src="img/home1/hitech2.jpg"
                              className="img-fluid rounded-3"
                              style={{ width: 90, mixBlendMode: "multiply" }}
                              alt="Avatar"
                            />
                          </div>
                          <p className=" lang-time mb-2 justify-content-center fontcolor">
                            Card type
                          </p>
                          <a href="#!" type="submit" className="text-black ">
                            <i className="fab fa-cc-mastercard fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-black ">
                            <i className="fab fa-cc-visa fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-black ">
                            <i className="fab fa-cc-stripe fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-black ">
                            <i className="fab fa-cc-paypal fa-2x" />
                          </a>

                          <hr className="my-4" />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">Rs:{planPrice * Quantity}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">Free</p>
                          </div>
                          {/* <div className="d-flex justify-content-between">
                        <p className="mb-2">Discount</p>
                        <p className="mb-2">- $60.00</p>
                      </div> */}

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">Rs:{Fprice}</p>
                          </div>

                          {final.length === 0 ? (
                            <button
                              type="button"
                              className="btn btn-info btn-block btn-lg"
                              style={{
                                backgroundColor: "#F5004F",
                                color: "black",
                              }}
                              onClick={() => {
                                recoll();
                              }}
                            >
                              <Link
                                to=""
                                className="d-flex justify-content-between text-decoration-none"
                              >
                                <span> Total:{Fprice}</span>
                                <span>
                                  payment
                                  <i className="fas fa-long-arrow-alt-right ms-2" />
                                </span>
                              </Link>
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-info btn-block btn-lg"
                              style={{
                                backgroundColor: "#F5004F",
                                color: "black",
                              }}
                              onClick={() => {
                                MoveAddress();
                              }}
                            >
                              <Link
                                to=""
                                className="d-flex justify-content-between text-decoration-none"
                              >
                                <span> Total:{Fprice}</span>
                                <span>
                                  payment
                                  <i className="fas fa-long-arrow-alt-right ms-2" />
                                </span>
                              </Link>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Plan;
