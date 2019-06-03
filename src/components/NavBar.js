import React from "react";

export default function NavBar(props) {
  return (
    <div className="topNav">
      <ul>
        <h3 onClick={() => props.onSelectCoin("BTC-USD")}>BTC-USD</h3>
        <h3 onClick={() => props.onSelectCoin("ETH-USD")}>ETH-USD</h3>
        <h3 onClick={() => props.onSelectCoin("ETH-BTC")}>ETH-BTC</h3>
      </ul>
    </div>
  );
}
