import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();

  const { basic } = props;
  const {
    longRange,
    beta,
    averageVol,
    dividendYield,
    marketCap,
    revenue,
  } = basic.overview;
  const {
    currentRatioQuarterly,
    ltDebtToEquityQuarterly,
    quickRationQuarterly,
    totalDebtToTotalEquityQuarterly,
  } = basic["BS"];

  const { ROI, grossMargin, netProfit, operatingMargin } = basic["IT"];

  const { cashFlowPerShare, revenuePerShare } = basic["CF"];

  const { dividendsPerShare, payout } = basic["dividends"];

  let checkUndefinedFixed = (input) => {
    let output =
      input !== undefined && input !== null ? input.toFixed(2) : "No Data";
    return output;
  };

  let checkUndefined = (input) => {
    let output = input !== undefined && input !== null ? input : "No Data";
    return output;
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4
              className={`${classes.cardTitleWhite} overview-title text-center`}
            >
              Overview
            </h4>
            <p
              className={`${classes.cardCategoryWhite} overview-content text-center`}
            >
              Overview of company financial
            </p>
          </CardHeader>
          <CardBody>
            <div className="overview-table">
              <Table
                tableHeaderColor="primary"
                tableData={[
                  [
                    "52 week range",
                    longRange.indexOf("undefined") === -1
                      ? longRange
                      : "No Data",
                  ],
                  ["Beta", checkUndefinedFixed(beta)],
                  ["Average Volume (3m)", checkUndefinedFixed(averageVol)],
                  ["Market Cap", checkUndefined(marketCap)],
                  ["Revenue", checkUndefined(revenue)],
                ]}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={`${classes.cardTitleWhite} text-center`}>
              Balance Sheet
            </h4>
          </CardHeader>
          <CardBody>
            <div className="fina-table">
              <Table
                tableHeaderColor="primary"
                tableData={[
                  [
                    "Quick Ratio (Quarterly)",
                    checkUndefinedFixed(quickRationQuarterly),
                  ],
                  [
                    "Current Ratio (Quarterly)",
                    checkUndefinedFixed(currentRatioQuarterly),
                  ],
                  [
                    "LT Debt to Equity (Quarterly)",
                    checkUndefinedFixed(ltDebtToEquityQuarterly),
                  ],
                  [
                    "Total Debt to Equity (Quarterly)",
                    checkUndefinedFixed(totalDebtToTotalEquityQuarterly),
                  ],
                ]}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader color="primary">
            <h4 className={`${classes.cardTitleWhite} text-center`}>
              Cash Flow Statement
            </h4>
          </CardHeader>
          <CardBody>
            <div className="fina-table">
              <Table
                tableHeaderColor="primary"
                tableData={[
                  [
                    "Cash Flow/Share TTM",
                    checkUndefinedFixed(cashFlowPerShare),
                  ],
                  ["Revenue/Share TTM", checkUndefinedFixed(revenuePerShare)],
                ]}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={`${classes.cardTitleWhite} text-center`}>
              Income Statement
            </h4>
          </CardHeader>
          <CardBody>
            <div className="fina-table">
              <Table
                tableHeaderColor="primary"
                tableData={[
                  ["Gross Margin TTM", checkUndefinedFixed(grossMargin)],
                  [
                    "Operating Margin TTM",
                    checkUndefinedFixed(operatingMargin),
                  ],
                  ["Net Profit TTM", checkUndefinedFixed(netProfit)],
                  ["Return on Investment TTM", checkUndefinedFixed(ROI)],
                ]}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader color="primary">
            <h4 className={`${classes.cardTitleWhite} text-center`}>
              Dividends
            </h4>
          </CardHeader>
          <CardBody>
            <div className="fina-table">
              <Table
                tableHeaderColor="primary"
                tableData={[
                  ["Dividend Yield", checkUndefinedFixed(dividendYield)],
                  ["Payout Ratio", checkUndefinedFixed(payout)],
                  ["Dividend/Share", checkUndefinedFixed(dividendsPerShare)],
                ]}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
