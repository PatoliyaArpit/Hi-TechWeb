import { isCancel } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useReactToPrint } from "react-to-print";
import { getOrder } from "../redux/Order/Order";

function PopBill({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const orderdata = useSelector((state) => state.Order);

  const [Order, setOrder] = useState([]);
  const [FilterOrder, setFilterOrder] = useState([]);
  const orderId = localStorage.getItem("OrderId");
  const componentRef = useRef();
  console.log(Order, "bill");
 
  useEffect(() => {
    
    setOrder(orderdata.data);
  }, [dispatch, orderdata]);

  useEffect(()=>{
    dispatch(getOrder());
  },[dispatch])
  // const call=()=>{
  //       fetch("http://localhost/Ordershow.php")
  //       .then((result)=>{
  //         return result.json()
  //       })
  //       .then((res)=>{
  //         setOrder(res)
  //       })
  // }
  // useEffect(()=>{
  // call()
  // },[dispatch])

  useEffect(() => {
    const filteredOrder = Order.filter((val) => val.Id === orderId);
    setFilterOrder(filteredOrder);
  }, [Order, orderId]);

  const handlePrint = useReactToPrint({
  
    content: () => componentRef.current,
    
  });
  console.log(handlePrint,"print")

  return (
    <section className={`modal-wrapperbill ${isOpen ? "" : "hidden"}`}>
      <div className="model-containerbill">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          style={{ margin: "0 0 0 100%" }}
          onClick={onClose}
        ></button>
        {FilterOrder.map((val) => {
          return (
            <div className="page-content container" key={val.Id}>
              <div className="page-header text-blue-d2">
                <h1 className="page-title text-secondary-d1">
                  Invoice
                  <small className="page-info">
                    <i className="fa fa-angle-double-right text-80" />
                    ID: {val.Id}
                  </small>
                </h1>
                <div className="page-tools">
                  <div className="action-buttons">
                    <button
                      className="btn bg-white btn-light mx-1px text-95"
                      onClick={handlePrint}
                    >
                      <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2" />
                      Print
                    </button>
                  </div>
                </div>
              </div>
              <div className="container px-0" ref={componentRef}>
                <div className="row mt-4">
                  <div className="col-12 col-lg-12">
                    <div className="row">
                      <div className="col-12">
                        <div className="text-center text-150">
                          <span className="text-default-d3">
                            <img
                              src="img/home1/hitech2.jpg"
                              alt=""
                              width={150}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="row brc-default-l1 mx-n1 mb-4" />
                    <div className="row">
                      <div className="col-sm-6">
                        <div>
                          <span className="text-sm text-grey-m2 align-middle">
                            To:
                          </span>
                          <span className="text-600 text-110 text-blue align-middle">
                            {val.FName} {val.LName}
                          </span>
                        </div>
                        <div className="text-grey-m2">
                          <div className="my-1">{val.Address}</div>
                          <div className="my-1">{val.City}</div>
                          <div className="my-1">
                            <i className="fa fa-phone fa-flip-horizontal text-secondary" />{" "}
                            <b className="text-600">+91-93168 68577</b>
                          </div>
                        </div>
                      </div>
                      <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                        <hr className="d-sm-none" />
                        <div className="text-grey-m2">
                          <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                            Invoice
                          </div>
                          <div className="my-2">
                            <i className="fa fa-circle text-blue-m2 text-xs mr-1" />{" "}
                            <span className="text-600 text-90">ID:</span>{" "}
                            {val.Id}
                          </div>
                          <div className="my-2">
                            <i className="fa fa-circle text-blue-m2 text-xs mr-1" />{" "}
                            <span className="text-600 text-90">
                              Order Date:
                            </span>{" "}
                            {val.Date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="row text-600 text-white bgc-default-tp1 py-25">
                        <div className="d-none d-sm-block col-1">#</div>
                        <div className="col-9 col-sm-5">Description</div>
                        <div className="d-none d-sm-block col-4 col-sm-2">
                          Qty
                        </div>
                        <div className="d-none d-sm-block col-sm-2">
                          Unit Price
                        </div>
                        <div className="col-2">Amount</div>
                      </div>
                      <div className="text-95 text-secondary-d3">
                        <div className="row mb-2 mb-sm-0 py-25 row">
                          <div className="d-none d-sm-block col-1 cell">1</div>
                          <div className="col-9 col-sm-5 cell">
                            {val.Product}
                          </div>
                          <div className="d-none d-sm-block col-2 cell">
                            {val.Quantity}
                          </div>
                          <div className="d-none d-sm-block col-2 text-95 cell">
                            {val.ProductPrice}
                          </div>
                          <div className="col-2 text-secondary-d2 cell">
                            {val.ProductPrice * val.Quantity}
                          </div>
                        </div>
                      </div>
                      <div className="row border-b-2 brc-default-l2" />
                      <div className="row mt-3">
                        <div className="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                          Extra note such as company or payment information...
                        </div>
                        <div className="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                          <div className="row my-2">
                            <div className="col-7 text-right">SubTotal</div>
                            <div className="col-5">
                              <span className="text-120 text-secondary-d1">
                                Rs.{val.ProductPrice * val.Quantity}
                              </span>
                            </div>
                          </div>
                          <div className="row my-2">
                            <div className="col-7 text-right">Tax (10%)</div>
                            <div className="col-5">
                              <span className="text-110 text-secondary-d1"></span>
                            </div>
                          </div>
                          <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                            <div className="col-7 text-right">Total Amount</div>
                            <div className="col-5">
                              <span className="text-150 text-success-d3 opacity-2">
                                RS.{val.ProductPrice * val.Quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <span className="text-secondary-d1 text-105">
                          Thank you for your business
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PopBill;
