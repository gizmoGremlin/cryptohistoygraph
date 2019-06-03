import React from "react";
import { Line } from "react-chartjs-2";
import { relative } from "path";

export default function LineChart(props) {
  return (
    <div className="linechart">
      <div
        style={{
          position: relative,
          width: 950,
          height: 550
        }}
      >
        <Line
          options={{
            responsive: true,
            title: {
              display: true,
              text: "3 Month History"
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Date"
                  },
                  ticks: {
                    major: {
                      fontStyle: "bold",
                      fontColor: "#FF0000"
                    }
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "value"
                  }
                }
              ]
            }
          }}
          data={props.data}
        />
      </div>
    </div>
  );
}
