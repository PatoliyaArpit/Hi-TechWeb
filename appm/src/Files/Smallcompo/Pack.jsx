import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getplan } from "../redux/Plan/Plan";
import { plan } from "../redux/CartSlice";

const Pack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data3, setdata3] = useState([]);
  const redux = useSelector((state) => state.plan);
  const reduxplan1 = redux.data;
  const [reduxplan, setreduxplan] = useState([]);
  console.log(reduxplan, "reduxplan");

  useEffect(() => {
    dispatch(getplan());
  }, [dispatch]);
  useEffect(() => {
    if (reduxplan1) {
      setreduxplan(reduxplan1);
    }
  }, [reduxplan1]);

  const call3 = () => {
    fetch("http://localhost/pack.php")
      .then((result) => result.json())
      .then((res) => {
        setdata3(res);
      });
  };

  useEffect(() => {
    call3();
  }, []);

  const byplan = (item) => {
    navigate("/Plan", {
      state: {
        Title: item.Title,
        Price: item.Price,
        Img: item.Img,
        Quantity: item.quantity,
      },
    });
    dispatch(plan(item));
  };

  return (
    <div className="pricing-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-12 col-12">
            <div className="section-title">
              <h2>Our Combo Pack</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form by
                injected humour or randomised words which even slightly
                believable.
              </p>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {data3.map((val, index) => (
            <div key={index} className="single-pricing">
              <div className="top">
                {val.Title === "Popular" ? (
                  <p className="popular">Popular Pack</p>
                ) : null}
                <h2 className="name">{val.Title}</h2>
                <h5 className="type">Consulting Pack</h5>
              </div>
              <div className="price">
                <h4 className="tag">
                  <span>Rs</span>
                  {val.Price}
                </h4>
              </div>
              <div className="bottom">
                <ul className="feature">
                  {reduxplan.filter((filter)=>filter.Main_title===val.Title).map((item, idx) => (
                    <li key={idx}>{item.Product_title	}</li>
                  ))}
                </ul>
                <div className="buy">
                  <button
                    className="button"
                    onClick={() => byplan(val)}
                  >
                    Buy this Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pack;
