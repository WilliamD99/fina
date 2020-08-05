import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class ClosingChart extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    let dataArr = data.map((val) => {
      let timestamp = val[0],
        close = val[4];
      return [timestamp, close];
    });

    this.state = {
      series: [
        {
          data: dataArr,
        },
      ],
      options: {
        chart: {
          id: "basic-bar",
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },

        xaxis: {
          type: "datetime",
          min: new Date(data[0][0]).getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },
      selection: "one_year",
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              width={"100%"}
              id="close-chart"
              type="area"
            />
          </div>
        </div>
      </div>
    );
  }
}
