import React from "react";
import './PAdminItem.css'

export default function PAdminItem({ title, count }) {
  return (
    <div className="col-3 mx-3 px-5 card-det-admin d-flex justify-content-between">

      <div className="home-box-left">

        <div className="home-box-title">
          <span>_ {title} _</span>
        </div>

        <div className="home-box-value mt-3 mb-1">
          <div className="home-box-price">
            <span>{count}</span>
          </div>
        </div>

        <div className="home-box-text">
          <span>{title} در یک ماه گذشته</span>
        </div>

      </div>

      <div className="home-box-right">
        <div className="home-box-icon">
          <i className="fas fa-money-bill-alt"></i>
        </div>
      </div>

    </div>
  );
}
