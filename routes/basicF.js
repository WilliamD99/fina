const express = require("express");
const finnhub = require("finnhub");

require("dotenv").config();

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.CLIENT_SECRET;
const finnhubClient = new finnhub.DefaultApi();

const basicF = express.Router();

basicF.get("/", (req, res) => {
  finnhubClient.companyBasicFinancials(
    req.headers.comp,
    "all",
    (error, data, response) => {
      let metric = data.metric;
      let longRange = `${metric["52WeekLow"]} - ${metric["52WeekHigh"]}`,
        beta = metric.beta,
        averageVol = metric["3MonthAverageTradingVolume"],
        dividendYield = metric["dividendsPerShareTTM"],
        marketCap = metric["marketCapitalization"],
        revenue = metric["revenueTTM"];
      let overview = {
        longRange: longRange,
        beta: beta,
        averageVol: averageVol,
        dividendYield: dividendYield,
        marketCap: marketCap,
        revenue: revenue,
      };
      let grossMargin = metric["grossMarginTTM"],
        operatingMargin = metric["freeOperatingCashFlow/revenueTTM"],
        netProfit = metric["netProfitMarginTTM"],
        ROI = metric["roiTTM"];
      let IT = {
        grossMargin: grossMargin,
        operatingMargin: operatingMargin,
        netProfit: netProfit,
        ROI: ROI,
      };

      let quickRationQuarterly = metric["quickRatioQuarterly"],
        currentRatioQuarterly = metric["currentRatioQuarterly"],
        ltDebtToEquityQuarterly = metric["longTermDebt/equityQuarterly"],
        totalDebtToTotalEquityQuarterly =
          metric["totalDebt/totalEquityQuarterly"];
      let BS = {
        quickRationQuarterly: quickRationQuarterly,
        currentRatioQuarterly: currentRatioQuarterly,
        ltDebtToEquityQuarterly: ltDebtToEquityQuarterly,
        totalDebtToTotalEquityQuarterly: totalDebtToTotalEquityQuarterly,
      };

      let cashFlowPerShare = metric["cashFlowPerShareTTM"],
        revenuePerShare = metric["revenuePerShareTTM"];
      let CF = {
        cashFlowPerShare: cashFlowPerShare,
        revenuePerShare: revenuePerShare,
      };

      let payout = metric["payoutRatioTTM"],
        dividendsPerShare = metric["dividendsPerShareTTM"];
      let dividends = {
        dividendYield: dividendYield,
        payout: payout,
        dividendsPerShare: dividendsPerShare,
      };

      res.send({ overview, IT, BS, CF, dividends });
    }
  );
});

module.exports = basicF;
