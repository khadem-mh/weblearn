import React from "react";
import './LoadingFallback.css'
import Loader from "../Loader/Loader";

export default function LoadingFallback() {

    return (
        <div className="loading-lazy">
          <p className="loading-lazy__text"> با <span className="poem-weblearn">وب لرن</span> آرزوهات رو بساز <span className="poem-weblearn">!!!</span></p>
          <Loader/>
        </div>
    )
}