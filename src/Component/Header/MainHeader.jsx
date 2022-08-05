import React from 'react';
import "../../Assets/Styles/mainheader.css";

function MainHeader() {
  return (
    <>
    <section className="headarea">
        <span className="bgimg"></span>
        <div className="container">
            <div className="col-md-12 pt-3">
                <div className="section-title my-5 mb-lg-2">
                    <h2 className='mb-lg-0'>Our AI email writer <br /> personalizes in seconds</h2>
                </div>
                <div className="section-para">
                    <p className='mx-md-auto my-sm-4 mt-lg-0'>Sky rocket your cold emails with unique personalizations generated by AI</p>
                </div>
                <div className="section-btn-action mb-5 pb-5">
                    <a href="/login">Try AI Writer Email Now</a>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-5">
                    <img src="assets/step3.png" alt="step" style={{borderRadius: "1rem"}} />
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default MainHeader