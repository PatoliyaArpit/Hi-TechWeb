import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Poppop from "../Popup/Poppop";
import PoppopR from "../Popup/PoppopR";
import ReactWhatsapp from "react-whatsapp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PoppopEmail from "../Popup/PoppopEmail";
import PoppopNewPass from "../Popup/PoppopNewPass";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "../Popup/Sidebar";
import { getcart } from "../redux/Cart/Cart";



const Header = ( props ) => {
  const dispatch=useDispatch()
  const [toggleMenu, settoggleMenu] = useState(false);
  
  const cartitem = useSelector((state) => state.cart.cart);
  const UserLogin = useSelector((state) => state.log.log);
  const show = useSelector((state) => state.reg.reg);
  const [pop, setpop] = useState(false);
  const [popR, setpopR] = useState(false);
  const [popEmail, setpopEmail] = useState(false);
  const [popNewp, setpopNewp] = useState(false);
  const [LoginId, setLoginId] = useState([]);
  const [Final, setFinal] = useState([]);
  const [Loginname, setLoginname] = useState("");
  const [data, setdata] = useState("");

  const {Cart}=useSelector((state)=>state.Cartdata)


  useEffect(() => {
    UserLogin.map((val) => {
      const firstName = val.Name.split(" ")[0];
      const cut = firstName.slice(0, 7); // Split the full name and take the first part
      setLoginname(cut);
    });
  }, [UserLogin]);

  useEffect(() => {
    const names = UserLogin.map((val) => val.Name);
    setdata(names);
  }, [show]);

 

  useEffect(() => {
    UserLogin.map((val) => {
      setLoginId(val.Id);
    });
  }, [UserLogin]);

  useEffect(() => {
    if (LoginId !== null) {
      const Finalcart = Cart?.filter((val) => val.UserId === LoginId);
      if (UserLogin?.length === 0) {
        setFinal(cartitem);
        
      } else {
        setFinal(Finalcart);
        
      }
    }
  }, [Cart, LoginId]);

  const btn = () => {
    setpop(false);
   
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

  const clickup = () => {
    window.scroll(0, 0);
  };
 
 

  return (
    <>
      <header className="shadow headerZindex">
        {pop ? <Poppop pass={btn} pass2={btnr} pass3={btnForget} /> : null}
        {popR ? <PoppopR pass={btn1} pass2={Rbtnclose}></PoppopR> : null}
        {popEmail ? (
          <PoppopEmail pass={Emailbtn} pass2={EmailBtnSecond}></PoppopEmail>
        ) : null}
        {popNewp ? (
          <PoppopNewPass pass={Newpass} pass2={Newpass2}></PoppopNewPass>
        ) : null}
        {toggleMenu ? (
          <Sidebar pass={() => settoggleMenu(false)}></Sidebar>
        ) : null}
        
      

        <ToastContainer
          autoClose={100} // Toast will close after 3 seconds
          closeOnClick={true} // Allow closing the toast by clicking on it
          closeButton={true}
        ></ToastContainer>

        <ReactWhatsapp
          number="9316868577"
          message={`I am ${data}`}
          style={{ border: "none" }}
        >
          <img src="img/home1/Whatsapp.png" className="Whats"></img>
        </ReactWhatsapp>
        <a className="clicktoup" onClick={() => clickup()}>
          <i class="fa-solid fa-arrow-up" style={{ fontSize: "2.5rem" }}></i>
        
        </a>

        <div className="menu-area">
          <div className="container">
            <div className="row position-relative" >
              <div className="col-lg-2 col-sm-10 col-10 logo">
                <div className="logo">
                  <a>
                    <img src="img/home1/hitech2.jpg" alt="" />
                  </a>
                </div>
              </div>
             
              <div className="HamburgerMenu">
              <div className="sc-consultant">
                      <div className="Login">
                        {UserLogin.length === 0 ? (
                          <Link
                            as={Link}
                            onClick={() => setpop(true)}
                            className="link nav-link"
                          >
                            Login
                          </Link>
                        ) : (
                          <Link
                            as={Link}
                            to="/Profile"
                            className="link nav-link"
                            style={{ width: "80px", height: "45px" }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "auto auto",
                                gap: "4px",
                              }}
                            >
                              <i
                                class="fa-regular fa-user"
                                style={{ margin: "0 0 0 -14px" }}
                              ></i>

                              <p>{Loginname}</p>
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="cart">
                        {" "}
                        <Link
                          as={Link}
                          to="/Checkout"
                          className="link nav-link"
                        >
                          <i className="fa-solid fa-cart-shopping" />{" "}
                          {Final?.length}
                        </Link>
                        {/* <Link as={Link} to="/MyAdmin" className="link nav-link">admi</Link> */}
                      </div>
                    </div>
                      <Link
                        className="res"
                        onClick={() => settoggleMenu(!toggleMenu)}
                      >
                        <RxHamburgerMenu style={{ fontSize: "40px" }} />
                      </Link>
                    </div>
              <div className="col-lg-7 offset-lg-0 col-md-6 offset-md-0 col-sm-10 offset-sm-0 col-12  ">
                <div className="menu">
                  <nav id="mobile_menu_active">
                    <ul
                      style={{ margin: "0 20% 0 0 " }}
                      className={`responcive `}
                    >
                      <li>
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/About" className="nav-link">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link to="/Service" className="nav-link">
                          Services
                        </Link>
                       
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown2"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Cases
                        </a>
                        <ul className={`dropdown-menu mega-menu`}>
                          <li>
                            <ul>
                              <li>
                                <Link to="/Case" className="nav-link">
                                  Case
                                </Link>
                              </li>
                              <li>
                                <Link to="/CaseD" className="nav-link">
                                  CaseD
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li className={`nav-item dropdown `}>
                        <a className="nav-link dropdown-toggle">Shortcode</a>
                        <ul className={`dropdown-menu mega-menu`}>
                          <li>
                            <ul>
                              <li>
                                <Link
                                  href="26_shortcode-grid.html"
                                  className="nav-link"
                                >
                                  Tracking
                                </Link>
                              </li>
                              <li>
                                <Link to="/List" className="nav-link">
                                  List
                                </Link>
                              </li>
                              <li>
                                <Link to="/Team" className="nav-link">
                                  Team
                                </Link>
                              </li>
                              <li>
                                <Link to="/Gimg" className="nav-link">
                                  Image Box
                                </Link>
                              </li>
                              <li>
                                <Link to="/Gallery" className="nav-link">
                                  Gallery
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <ul>
                              <li>
                                <Link to="/Step" className="nav-link">
                                  Process Steps
                                </Link>
                              </li>
                              <li>
                                <Link to="/Contact" className="nav-link">
                                  Contact
                                </Link>
                              </li>
                              <li>
                                <Link to="/Map" className="nav-link">
                                  Map
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-10 mb-3 loginprofile">
                <div className="search-consultant">
                  <div className="sc-search">
                    <div className="sc-consultant">
                      <div className="Login">
                        {UserLogin.length === 0 ? (
                          <Link
                            as={Link}
                            onClick={() => setpop(true)}
                            className="link nav-link"
                          >
                            Login
                          </Link>
                        ) : (
                          <Link
                            as={Link}
                            to="/Profile"
                            className="link nav-link"
                            style={{ width: "80px", height: "45px" }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "auto auto",
                                gap: "4px",
                              }}
                            >
                              <i
                                class="fa-regular fa-user"
                                style={{ margin: "0 0 0 -14px" }}
                              ></i>

                              <p className="fs-4 Loginname">{Loginname}</p>
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="cart">
                        {" "}
                        <Link
                          as={Link}
                          to="/Checkout"
                          className="link nav-link"
                        >
                          <i className="fa-solid fa-cart-shopping" />{" "}
                          {Final?.length}
                        </Link>
                        {/* <Link as={Link} to="/MyAdmin" className="link nav-link">admi</Link> */}
                      </div>
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
