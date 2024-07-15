import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Footer from "../Footer";

import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import PoppopEmail from "../Popup/PoppopEmail";
import PoppopNewPass from "../Popup/PoppopNewPass";
import Poppop from "../Popup/Poppop";
import PoppopR from "../Popup/PoppopR";
import { Adcart } from "../redux/CartSlice";
import { useLocation } from "react-router-dom";

const Plan = () => {
  const { state } = useLocation();
  const [Fprice, setFprice] = useState(0);
  const [data, serdata] = useState([]);
  const [packdata, setpackdata] = useState([]);
  const navigate = useNavigate();
  const dispetch = useDispatch();
  const show = useSelector((state) => state.plan.plan);

  const final = useSelector((state) => state.log.log);

  const Title = localStorage.getItem("Title");
  const Price = localStorage.getItem("Price");
  const PlanImg = localStorage.getItem("PlanImg");
  const quantity = localStorage.getItem("quantity");
  const Img1 = localStorage.getItem("Img1");
  const Img2 = localStorage.getItem("Img2");
  const Img3 = localStorage.getItem("Img3");
  const Img4 = localStorage.getItem("Img4");
  const Row1 = localStorage.getItem("Row1");
  const Row2 = localStorage.getItem("Row2");
  const Row3 = localStorage.getItem("Row3");
  const Row4 = localStorage.getItem("Row4");

  console.log("state", state.Id);

  

  useEffect(() => {
    const Price1 = Number(Price);
    const Finalp = Price1 + 100;
    setFprice(Finalp);
  });

  const recoll = () => {
    setpop(true);
  };
  const [pop, setpop] = useState(false);
  const [popR, setpopR] = useState(false);
  const [popEmail, setpopEmail] = useState(false);
  const [popNewp, setpopNewp] = useState(false);

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
        Price: Price,
        Finalp: Fprice,
        Click: "Plan",
        planImg: PlanImg,
        Title: Title,
        quantity:quantity,
      })
    );
    navigate("/Order");
  };

  const call1 = () => {
    fetch("http://localhost/pack.php")
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        serdata(res);
      });
  };
  useEffect(() => {
    call1();
  }, []);

  useEffect(() => {
    if (state.Id && data) {
      const Packdata = data.find((val) => val.Id === state.Id);
      setpackdata(Packdata);
    }
  }, [state.Id, data]);
  console.log(packdata, "packdata");
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
      <div className="breadcumb-area bg-with-black">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcumb">
                <h2 className="name">Hi-Tech Kit</h2>
                <ul className="links">
                  <li>
                    {/* <a href="index.html">Home</a> */}
                    <Link as="Link" className="links" to="/">
                      Home
                    </Link>
                  </li>

                  <li>
                    <a href="11_gallery-cobbles.html" className="links">
                      Hi-Tech Kit
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        {packdata ? (
                          <div>
                            <h1>{packdata.Title}</h1>
                            <p>Price: {packdata.Price}</p>
                            {/* Render other details of the pack */}
                          </div>
                        ) : (
                          <p>Loading...</p>
                        )}
                        <div>
                          {/* <p className="mb-0">
                        <span className="text-muted">Sort by:</span>{" "}
                        <a href="#!" className="text-body">
                          price <i className="fas fa-angle-down mt-1" />
                        </a>
                      </p> */}
                        </div>
                      </div>
                      
                      {
                        packdata? <>
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={packdata.Img1}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{packdata.Row1}</h5>
                                  <p className="small mb-0"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={packdata.Img2}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{packdata.Row2}</h5>
                                  <p className="small mb-0"></p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center quantityb "></div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={packdata.Img3}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{packdata.Row3}</h5>
                                  <p className="small mb-0"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <img
                                    src={packdata.Img4}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: 65 }}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{packdata.Row4}</h5>
                                  <p className="small mb-0"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </>:null
                      }
                     
                    </div>

                    <div className="col-lg-5 mt-5">
                      {/* <div className="card bg-primary text-white rounded-3"> */}
                      <div
                        className="card  text-white rounded-3"
                        style={{ backgroundColor: "#4D869C" }}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                            <img
                              src="img/home1/hitech2.jpg"
                              className="img-fluid rounded-3"
                              style={{ width: 90, mixBlendMode: "multiply" }}
                              alt="Avatar"
                            />
                          </div>
                          <p className=" lang-time mb-2 justify-content-center">
                            Card type
                          </p>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-mastercard fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-visa fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-stripe fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-paypal fa-2x" />
                          </a>

                          <hr className="my-4" />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">Rs:{Price}</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">Rs:100.00</p>
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
