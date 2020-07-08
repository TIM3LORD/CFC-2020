import React, { useState, useEffect } from "react";

import axios from 'axios';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import WarningColor from "components/Typography/Warning.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { useGlobalState } from "index.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

let i = 0;

export default function Dashboard() {
  const classes = useStyles();
  const [state, dispatch] = useGlobalState();
  const [covidStats, setStats] = useState({
    "confirmed": "-",
    "active": "-",
    "recovered": "-",
    "deceased": "-"
  });
  const [metas, setMetas] = useState(
    {
      "confirmed": "-",
      "lastUpdated": "-",
      "recovered": "-",
      "deceased": "-"
    }
  )

  function changeState() {
    dispatch({ num: state.num + 1 });
  }

  useEffect(() => {
    axios.get('https://api.covid19india.org/v3/min/data.min.json')
      .then(res => {
        const total = res.data.TT.total;
        const delta = res.data.TT.delta;
        const meta = res.data.TT.meta;
        setStats({
          "confirmed": total.confirmed,
          "active": total.confirmed - total.migrated - total.deceased - total.recovered,
          "recovered": total.recovered,
          "deceased": total.deceased,
        });
        var formattedTime = new Date(Date.parse(meta.last_updated)).toLocaleTimeString();
        var formattedDate = new Date(Date.parse(meta.last_updated)).toLocaleDateString();
        setMetas({
          "confirmed": delta.confirmed,
          "lastUpdated": formattedTime,
          "recovered": delta.recovered,
          "deceased": delta.deceased
        })
        console.log(i++)
      });

    //Twitter Stuff
    const anchor = document.createElement("a");
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute("data-theme", "light");
    anchor.setAttribute("data-height", "400");
    // anchor.setAttribute("data-tweet-limit", "5");
    anchor.setAttribute("data-chrome", "noheader nofooter noborders");
    anchor.setAttribute("href", "https://twitter.com/covidnewsbymib");
    document.getElementsByClassName("twitter-embed")[0].appendChild(anchor);

    const covidMap = document.getElementById("covid-map");
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);

    const covidMapScript = document.createElement("script");
    covidMapScript.setAttribute("src","https://public.flourish.studio/resources/embed.js");
    covidMap.appendChild(covidMapScript);

  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>error_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Confirmed</p>
              <h3 className={classes.cardTitle}>
                {covidStats.confirmed.toLocaleString()}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Icon>trending_up</Icon>
                </Danger>
                {metas.confirmed.toLocaleString()}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>warning</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Active</p>
              <h3 className={classes.cardTitle}>
                {covidStats.active.toLocaleString()}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Info>
                  <DateRange />
                </Info>
                Last updated at {metas.lastUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>accessibility_new</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Recovered</p>
              <h3 className={classes.cardTitle}>
                {covidStats.recovered.toLocaleString()}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <Icon>trending_up</Icon>
                </Success>
                {metas.recovered ? metas.recovered.toLocaleString() : "-"}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>close</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Deceased</p>
              <h3 className={classes.cardTitle}>
                {covidStats.deceased.toLocaleString()}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <WarningColor>
                  <Icon>trending_up</Icon>
                </WarningColor>
                {metas.deceased ? metas.deceased.toLocaleString() : ""}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <div className="twitter-embed"></div>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <div id="covid-map" className="flourish-embed flourish-chart" data-src="story/230085"></div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
