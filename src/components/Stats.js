import React from "react";

export default function Stats(props) {
  return (
    <div className="outside-stats-container">
      <div className="stats-container">
        <h5 className="stat-item">Mean Price: {props.meanprice}</h5>
        <h5 className="stat-item">Mean Volume: {props.meanvol} </h5>
        <h5 className="stat-item">Variance in Price: {props.varprice}</h5>
        <h5 className="stat-item">Variance in Volume: {props.varvolume}</h5>
        <br />
        <h5 className="stat-item">Median Price: {props.medianprice}</h5>
        <h5 className="stat-item">Median Volume: {props.medianvolume}</h5>
        <h5 className="stat-item">
          Standard Deviation in Price: {props.stdprice}
        </h5>
        <h5 className="stat-item">
          Standard Deviation in Volume: {props.stdvolume}
        </h5>
      </div>
    </div>
  );
}
