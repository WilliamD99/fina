import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody";
import Table from "components/Table/Table";
// Charts
import CandleStick from "components/Charts/CandleStick";
import ClosingChart from "components/Charts/ClosingChart";
import StackedChart from "components/Charts/StackedChart";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const { peerData, peers, candle, earning, profile } = props;

  let recentStats = candle.slice(props.candle.length - 2, props.candle.length);
  let earningArr = [];
  earning.map((i) => {
    let dataArr = [];
    let date = new Date(i.period);
    let year = date.getFullYear(),
      monnth = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`,
      day = date.getDate(),
      period = `${year}-${monnth}-${day}`;

    dataArr.push(period, i.estimate.toFixed(2), i.actual.toFixed(2));
    earningArr.push(dataArr);
  });
  const calculator = (a, b) => {
    let diff = (b - a).toFixed(2);
    let percentDiff = (((b - a) / b) * 100).toFixed(2);

    let styleDiff = diff > 0 ? "incr" : "decr";
    let iconDiff = diff > 0 ? <ExpandLess /> : <ExpandMore />;

    let cardFooter = (
      <div className={`${classes.stats} ${styleDiff}`}>
        {iconDiff} {diff} ({percentDiff}%)
      </div>
    );
    return cardFooter;
  };
  if (peerData !== undefined && candle !== undefined) {
    let peerNone = [{}, {}, {}, {}];
    let peerDisplay =
      peers.length > 0
        ? peers.map((v, i) => (
            <Card key={i}>
              <CardHeader color="warning" stats icon>
                <p className={`${classes.cardCategory} peer-name`}>{v}</p>
                <h3 className={`${classes.cardTitle} text-center`}>
                  {peerData[i].c !== undefined ? `$${peerData[i].c}` : "$0"}{" "}
                </h3>
              </CardHeader>
              <CardFooter className="peer-stats" stats>
                {peerData[i].c !== undefined
                  ? calculator(peerData[i].pc, peerData[i].c)
                  : "No data"}
              </CardFooter>
            </Card>
          ))
        : peerNone.map((v, i) => (
            <Card key={i}>
              <CardBody color="warning" stats icon>
                <p className={`${classes.cardCategory} peer-name`}>No Data</p>
                <h3 className={`${classes.cardTitle} text-center`}>
                  Sorry no data at the moment
                </h3>
              </CardBody>
            </Card>
          ));
    let peerContainer = peerDisplay.map((v, i) => (
      <GridItem xs={12} sm={6} md={3} key={i}>
        {v}
      </GridItem>
    ));
    return (
      <>
        {/* Peer display */}
        <GridContainer>{peerContainer}</GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <CandleStick data={candle} profile={profile} />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            {/* Line Chart */}
            <Card chart>
              <CardHeader>
                <ClosingChart data={props.candle} />
                <StackedChart data={props.buy} />
              </CardHeader>
            </Card>
          </GridItem>
          {/* Company Quote */}

          <GridItem xs={12} sm={12} md={6}>
            <div className="card-holder d-flex">
              <Card className="customied-card">
                <CardHeader color="warning" stats icon>
                  <p className={`${classes.cardCategory} text-center`}>Open</p>
                  <h3 className={`${classes.cardTitle} text-center`}>
                    ${recentStats[1][1].toFixed(2)}
                  </h3>
                </CardHeader>
                <CardFooter className="justify-content-center" stats>
                  {calculator(recentStats[0][1], recentStats[1][1])}
                </CardFooter>
              </Card>
              <Card className="customied-card">
                <CardHeader color="success" stats icon>
                  <p className={`${classes.cardCategory} text-center`}>High</p>
                  <h3 className={`${classes.cardTitle} text-center`}>
                    ${recentStats[1][2].toFixed(2)}
                  </h3>
                </CardHeader>
                <CardFooter className="justify-content-center" stats>
                  {calculator(recentStats[0][2], recentStats[1][2])}
                </CardFooter>
              </Card>
            </div>
            <div className="card-holder d-flex">
              <Card className="customied-card">
                <CardHeader color="danger" stats icon>
                  <p className={`${classes.cardCategory} text-center`}>Low</p>
                  <h3 className={`${classes.cardTitle} text-center`}>
                    ${recentStats[1][3].toFixed(2)}
                  </h3>
                </CardHeader>
                <CardFooter className="justify-content-center" stats>
                  {calculator(recentStats[0][3], recentStats[1][3])}
                </CardFooter>
              </Card>
              <Card className="customied-card">
                <CardHeader color="info" stats icon>
                  <p className={`${classes.cardCategory} text-center`}>Close</p>
                  <h3 className={`${classes.cardTitle} text-center`}>
                    ${recentStats[1][4].toFixed(2)}
                  </h3>
                </CardHeader>
                <CardFooter className="justify-content-center" stats>
                  {calculator(recentStats[0][4], recentStats[1][4])}
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader className="es-header">
                <h4 className={`${classes.cardTitleWhite} text-center`}>
                  Earnings Surprises
                </h4>
                <p className={`${classes.cardCategoryWhite} text-center`}>
                  Last 4 quarters
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Period", "Estimate", "Actual"]}
                  tableData={earningArr}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </>
    );
  } else {
    return <></>;
  }
}
