import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class StackedChart extends Component {
  constructor(props) {
    super(props);
    const { data } = props;

    let buyArr = [],
      holdArr = [],
      sellArr = [],
      strongBuyArr = [],
      strongSellArr = [],
      dateArr = [];

    for (const i of data) {
      buyArr.push(i["buy"]);
      sellArr.push(i["sell"]);
      holdArr.push(i["hold"]);
      strongBuyArr.push(i["strongBuy"]);
      strongSellArr.push(i["strongSell"]);
      dateArr.push(i["period"]);
    }
    let dataArr = [
      {
        name: "Strong Sell",
        data: strongSellArr,
      },
      {
        name: "Sell",
        data: sellArr,
      },
      {
        name: "Hold",
        data: holdArr,
      },
      {
        name: "Buy",
        data: buyArr,
      },
      {
        name: "Strong Buy",
        data: strongBuyArr,
      },
    ];

    this.state = {
      series: dataArr,
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: "Recommendations Trends",
        },
        xaxis: {
          categories: dateArr,
          labels: {
            formatter: function (val) {
              return val;
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
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
              type="bar"
            />
          </div>
        </div>
      </div>
    );
  }
}
