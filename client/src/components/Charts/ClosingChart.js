import React from "react";
import Chart from "react-apexcharts";

export default function ClosingChart(props) {
  let dataArr = props.data.map((val) => {
    let timestamp = val[0],
      close = val[4].toFixed(2);
    return [timestamp, close];
  });
  // setCandlePeer(
  //   candlePeer.map((val) => {
  //     return [val[0], val[4]];
  //   })
  // );

  let state = {
    series: [
      {
        name: "Closing Price",
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
        min: new Date(props.data[0][0]).getTime(),
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
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            width={"100%"}
            id="close-chart"
            type="area"
          />
        </div>
      </div>
    </div>
  );
}
