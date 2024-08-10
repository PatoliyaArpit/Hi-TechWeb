import React from "react";
import "@lottiefiles/lottie-player";

import { useNavigate } from "react-router-dom";

const Errorpage = () => {
  const navigate = useNavigate();

  const redirecthome = () => {
    navigate("/Home");
    
  };
  return (
    <>
      <section className="bg-light">
        <div className="container-fluid">
          <div className="row row-cols-1 justify-content-center py-5">
            <div className="col-xxl-7 mb-4">
              <div className="lc-block">
                <lottie-player
                  src="https://assets9.lottiefiles.com/packages/lf20_u1xuufn3.json"
                  className="mx-auto"
                  background="transparent"
                  speed={1}
                  loop=""
                  autoPlay=""
                />
              </div>
              {/* /lc-block */}
            </div>
            {/* /col */}
            <div className="col text-center">
              <div className="lc-block">
                {/* /lc-block */}
                <div className="lc-block mb-4">
                  <div editable="rich">
                    <p className="rfs-11 fw-light">
                      {" "}
                      The page you are looking for was moved, removed or might
                      never existed.
                    </p>
                  </div>
                </div>
                {/* /lc-block */}
                <div className="lc-block">
                  <button
                    className="btn btn-lg btn-primary"
                    onClick={redirecthome}
                    
                  >
                    Back to homepage
                  </button>
                
                </div>
                {/* /lc-block */}
              </div>
              {/* /lc-block */}
            </div>
            {/* /col */}
          </div>
        </div>
      </section>
      <p className="py-5 small text-center text-muted">
        {" "}
        Powered by{" "}
        <a href="https://library.livecanvas.com/">
          LiveCanvas HTML Templates for Bootstrap
        </a>
      </p>
    </>
  );
};

export default Errorpage;
