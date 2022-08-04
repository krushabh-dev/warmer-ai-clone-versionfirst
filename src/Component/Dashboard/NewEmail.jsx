import React from 'react'
import Appbar from './Appbar'
import "../../Assets/Styles/dash.css";

function WarningSection(){
  return (
    <>
    <section>
        <div className="warning-section">
            <h6>Uh-oh...You have 10 credits left. Upgrade now!</h6>
        </div>
    </section>
    </>
  )
}

function NewEmail() {
  return (
    <>
    <Appbar />
    <WarningSection />
    <section id="homeSection">
    <div className="container">
        <div className="row">
            <div className="col-md-12 py-5">
                <h4 className="font-bold">Home</h4>
            </div>
            <div className="col-md-12 pb-5">
                <div className='w-md-50 m-auto'>
                <div class="card border-0">
                    <div className="icon">
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  />
</svg>

                    </div>
  <div class="card-body text-center">
    <h3 class="card-title">Create New Email</h3>
    <p class="card-text">Let's help you build a high-converting email using 1-1 personalized info</p>
    <a href="#" class="btn btn-primary abtn mb-3">Create New Email</a>
  </div>
</div>
                </div>
            </div>
        </div>
    </div>
    <div className="pb-5"></div>
    </section>
    </>
  )
}

export default NewEmail
export {WarningSection}