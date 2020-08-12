import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Table from "components/Table/Table";

import nodata from "assets/images.jpg";
import nonew from "assets/404.jpg";

import QueueAnim from "rc-queue-anim";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();

  const { profile, news } = props;
  const newsDisplay =
    news.length !== 0 ? (
      news.map((content, i) => (
        <GridItem key={i} xs={12} sm={10} md={6}>
          <QueueAnim
            key="queue"
            delay={[i * 100, (news.length - 1 - i) * 100]}
            type={["right", "left"]}
            ease={["easeOutQuart", "easeInOutQuart"]}
          >
            <Card key={i}>
              <CardHeader>
                {content.image !== "" ? (
                  <img
                    className="img-fluid new-img"
                    src={content.image}
                    alt="Article image"
                  />
                ) : (
                  <img
                    className="img-fluid lazyload"
                    src={nonew}
                    alt="Article image"
                  />
                )}
              </CardHeader>
              <CardBody>
                <a className="news-link" href={content.url}>
                  {content.headline}
                </a>
                <p>{content.summary}</p>
              </CardBody>
              <CardFooter>
                <p>
                  Source:
                  <span>
                    {" "}
                    <a
                      className="font-italic source-link"
                      href={content.source}
                    >
                      {content.source}
                    </a>
                  </span>
                </p>
              </CardFooter>
            </Card>
          </QueueAnim>
        </GridItem>
      ))
    ) : (
      <img src={nonew} className="img-fluid" alt="404" />
    );
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardCategoryWhite}>Company News</h4>
            </CardHeader>
            <CardBody>
              <GridContainer key="container">{newsDisplay}</GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href={profile.weburl} onClick={(e) => e.preventDefault()}>
                <img
                  className="lazyload img-fluid"
                  src={profile.logo !== undefined ? profile.logo : nodata}
                  alt="Company logo"
                />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{profile.name}</h6>

              <Table
                tableHeaderColor="warning"
                tableData={[
                  [
                    "Ticker",
                    profile.ticker !== undefined
                      ? `${profile.ticker}`
                      : "No data",
                  ],
                  [
                    "Country",
                    profile.country !== undefined
                      ? `${profile.country}`
                      : "No data",
                  ],
                  [
                    "Currency",
                    profile.currency !== undefined
                      ? `${profile.currency}`
                      : "No data",
                  ],
                  [
                    "Exchange",
                    profile.exchange !== undefined
                      ? `${profile.exchange}`
                      : "No data",
                  ],
                  [
                    "Industry",
                    profile.finnhubIndustry !== undefined
                      ? `${profile.finnhubIndustry}`
                      : "No data",
                  ],
                  [
                    "Capitalization",
                    profile.marketCapitalization !== undefined
                      ? `${profile.marketCapitalization}`
                      : "No data",
                  ],
                  [
                    "Share Outstanding",
                    profile.shareOutstanding !== undefined
                      ? `${profile.shareOutstanding}`
                      : "No data",
                  ],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
