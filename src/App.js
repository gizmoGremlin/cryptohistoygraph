import React from "react";
import "./App.css";
import Stats from "./components/Stats";
import * as math from "mathjs";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import LineChart from "./components/LineChart";

var moment = require("moment");
const CoinbasePro = require("coinbase-pro");
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCoin: "BTC-USD",
      loading: false,
      coinHistory: [],
      close: [],
      meanPrice: 0,
      varPrice: 0,
      varVolume: 0,

      modeVolume: 0,
      medianPrice: 0,
      medianVolume: 0,
      modePrice: 0,
      modeVolume: 0,
      stdPrice: 0,
      stdVolume: 0,
      medianPrice: 0,
      meanVolume: 0,
      medianVolume: 0,
      volume: [],

      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "Videos made",
            backgroundColor: "rgba(255, 0, 255, 0.75)",
            borderColor: "rgb(255, 0, 0)",
            data: []
          }
        ]
      }
    };

    this.handleSelectCoin = this.handleSelectCoin.bind(this);
  }
  componentDidMount() {
    this.fetchCoinsData("BTC-USD");
  }
  async setStats(close, volume) {
    const priceAvg = close.reduce((a, b) => a + b, 0) / close.length;
    const volumeAvg = volume.reduce((a, b) => a + b, 0) / volume.length;
    const priceStd = math.std(close);
    const volumeStd = math.std(volume);
    const priceVar = math.var(close);
    const volumeVar = math.var(volume);

    const priceMed = math.median(close);
    const volumeMed = math.median(volume);
    this.setState({
      meanPrice: priceAvg,
      meanVolume: volumeAvg,
      stdPrice: priceStd,
      stdVolume: volumeStd,
      varPrice: priceVar,
      varVolume: volumeVar,

      medianPrice: priceMed,
      medianVolume: volumeMed
    });
  }
  async fetchCoinsData(coin) {
    const publicClient = new CoinbasePro.PublicClient();
    const localClose = [];
    const localVolume = [];
    const timeAndClosing = [];
    try {
      const resp = await publicClient.getProductHistoricRates(coin, {
        granularity: 86400
      });

      resp.forEach(function(arr) {
        const time = moment.unix(arr[0]);

        const close = arr[4];
        localClose.push(close);
        const volume = arr[5];
        localVolume.push(volume);

        const coordinates = { x: time, y: close };
        timeAndClosing.push(coordinates);
      });
      this.setStats(localClose, localVolume);
      this.setState({
        coinActive: "BTC-USD",
        loading: false,
        close: localClose,
        volume: localVolume,

        data: {
          labels: [],
          datasets: [
            {
              label: coin,
              backgroundColor: "rgba(255, 0, 255, 0.75)",
              data: timeAndClosing
            }
          ]
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleSelectCoin(coin) {
    this.setState({
      activeCoin: coin,
      loading: true
    });
    this.fetchCoinsData(coin);
  }

  render() {
    return (
      <div>
        <NavBar onSelectCoin={this.handleSelectCoin} />
        <br />

        <h2 className="coin-header">{this.state.activeCoin}</h2>
        <div className="root">
          <div className="chart-grid-box">
            {this.state.loading === true ? (
              <Loading />
            ) : (
              <LineChart data={this.state.data} />
            )}
          </div>

          <div className="stats-grid-box">
            {this.state.loading === true ? (
              <Loading />
            ) : (
              <div className="stats-box">
                <Stats
                  meanprice={this.state.meanPrice}
                  meanvol={this.state.meanVolume}
                  varprice={this.state.varPrice}
                  varvolume={this.state.varVolume}
                  medianprice={this.state.medianPrice}
                  medianvolume={this.state.medianVolume}
                  stdprice={this.state.stdPrice}
                  stdvolume={this.state.stdVolume}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
