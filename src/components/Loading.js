import React from "react";
import ProgressBar from "./ProgressBar";

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.state.percentage === 100
        ? this.setState(() => ({ percentage: 0 }))
        : this.setState(prevState => ({
            percentage: prevState.percentage + 1
          }));
    }, 300);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className="progress-bar-wrapper">
        <div className="style-progress-bar">
          <ProgressBar percentage={this.state.percentage} />
          <br />
        </div>
      </div>
    );
  }
}
