import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getpackdetail, getplan } from "../redux/Plan/Plan";
import { plan } from "../redux/CartSlice";

const Pack = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const {pack,packdetails} = useSelector((state) => state.plan);
  
  
  useEffect(() => {
    dispatch(getpackdetail());
    dispatch(getplan())
  }, [dispatch]);
  
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
           {pack && pack.length > 0 ? (
        pack.map((val, index) => (
          <div key={index} className="single-pricing">
            <div className="top">
              {val.Title === "Popular" && <p className="popular">Popular Pack</p>}
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
                {packdetails
                  ?.filter((filter) => filter.Main_title === val.Title)
                  ?.map((item, idx) => (
                    <li key={idx}>{item.Product_title}</li>
                  ))}
              </ul>
              <div className="buy">
                <button className="button" onClick={() => byplan(val)}>
                  Buy this Plan
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No plans available</p>
      )}
        </div>
      </div>
    </div>
  );
};

export default Pack;
