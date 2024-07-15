import React, { useEffect, useState } from "react";
import {  useFormik } from "formik";
import { Edit } from "../Schema/Edit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updatelog } from "../redux/CartSlice";

const Editpop = (props) => {
  const [LoginId, setLoginId] = useState([]);

  const dispetch = useDispatch();
  const LoginUser = useSelector((state) => state.log.log);
  useEffect(() => {
    LoginUser.map((val) => {
      setLoginId(val.Id);
    });
  }, [LoginUser]);

  const initial = {
    Name: "",
    Contact: "",
    Github: "",
    Twitter: "",
    Instagram: "",
    Facebook: "",
    Bio: "",
    Profile: "",
  };
  const formik = useFormik({
    initialValues: initial,
    validationSchema: Edit,
    onSubmit: (values) => {
      dispetch(updatelog({ ...values, Id: LoginId }));
    
      axios
        .post(
          "http://localhost/RegisterEdit.php",
          { ...values, Id: LoginId },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          props.pass(props.pass);
        });
    },
  });

  // console.log(formik.values);
  useEffect(() => {
    if (LoginUser && LoginUser.length > 0) {
      const user = LoginUser[0];
      formik.setValues({
        Name: user.Name,
        Contact: user.Contact,
        Github: user.Github,
        Twitter: user.Twitter,
        Instagram: user.Instagram,
        Facebook: user.Facebook,
        Bio: user.Bio,
        Profile: user.Profile,
      });
    }
  }, [LoginUser]);

  
  return (
    <section className="modal-wrapper">
      <div className="model-container1">
        <button className="close" onClick={props.pass}>
          {" "}
          X
        </button>
        <h2 style={{ display: "inline-block", margin: "0 0 10px 0" }}>
          Edit Profile
        </h2>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="subcontainer1">
              {/* <div className="subin">
                <label style={{ margin: "3% 7% 0 0%" }}>Profile:</label>
                <div>
                 
                    
                  <input type="file" accept="image/*" onChange={handleChange} />
                </div>
                {formik.errors.Name && formik.touched.Name ? (
                  <p className="form-error">{formik.errors.Name}</p>
                ) : null}
              </div> */}
              <div className="subin">
                <label style={{ margin: "3% 9% 0 5%" }}>Bio:</label>
                <input
                  // className="logininput"
                  type="text"
                  placeholder="Enter Bio"
                  id="Bio"
                  name="Bio"
                  onChange={formik.handleChange}
                  value={formik.values.Bio}
                  onBlur={formik.handleBlur}
                ></input>
                {/* {formik.errors.Name && formik.touched.Name ? (
                  <p className="form-error">{formik.errors.Name}</p>
                ) : null} */}
              </div>

              <div className="subin">
                <label style={{ margin: "2% 8% 0 0" }}>Name:</label>
                <input
                  className="logininput"
                  type="text"
                  placeholder="Enter Name"
                  id="Name"
                  name="Name"
                  onChange={formik.handleChange}
                  value={formik.values.Name}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.Name && formik.touched.Name ? (
                  <p className="form-error">{formik.errors.Name}</p>
                ) : null}
              </div>
              <div className="subin">
                <label style={{ margin: "3% 5% 0 0" }}>Contact:</label>
                <input
                  type="text"
                  placeholder="Enter Number"
                  id="Contact"
                  name="Contact"
                  onChange={formik.handleChange}
                  value={formik.values.Contact}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.Contact && formik.touched.Contact ? (
                  <p className="form-error">{formik.errors.Contact}</p>
                ) : null}
              </div>
              <div className="subin">
                <label style={{ margin: "3% 6% 0 0" }}>Github:</label>
                <input
                  type="text"
                  placeholder="Enter Github"
                  id="Github"
                  name="Github"
                  onChange={formik.handleChange}
                  value={formik.values.Github}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.Github && formik.touched.Github ? (
                  <p className="form-error">{formik.errors.Github}</p>
                ) : null}
              </div>
              <div className="subin">
                <label style={{ margin: "2% 7% 0 0" }}>Twitter:</label>
                <input
                  type="text"
                  placeholder="Enter Twitter"
                  id="Twitter"
                  name="Twitter"
                  onChange={formik.handleChange}
                  value={formik.values.Twitter}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.Twitter && formik.touched.Twitter ? (
                  <p className="form-error">{formik.errors.Twitter}</p>
                ) : null}
              </div>
              <div className="subin">
                <label style={{ margin: "3% 1% 0 0" }}>Instagram:</label>
                <input
                  type="text"
                  placeholder="Enter Instagram"
                  id="Instagram"
                  name="Instagram"
                  onChange={formik.handleChange}
                  value={formik.values.Instagram}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.Instagram && formik.touched.Instagram ? (
                  <p className="form-error">{formik.errors.Instagram}</p>
                ) : null}
              </div>
              <div className="subin">
                <label style={{ margin: "3% 2% 0 0" }}>Facebook:</label>
                <input
                  type="text"
                  placeholder="Enter Facebook"
                  id="Facebook"
                  name="Facebook"
                  onChange={formik.handleChange}
                  value={formik.values.Facebook}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.Facebook && formik.touched.Facebook ? (
                  <p className="form-error">{formik.errors.Facebook}</p>
                ) : null}
              </div>
            </div>

            <button type="submit" className="model-btn">
              Change
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Editpop;
