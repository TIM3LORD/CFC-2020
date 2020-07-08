import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

import axios from 'axios';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterIcon from "@material-ui/icons/FilterList";
import JobSearchCard from "./JobSearchCard.js";
import { useGlobalState } from "index.js";
import { URL } from "globals.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function JobSearch() {
    const [state, dispatch] = useGlobalState();
    const [jobSearchCards, setJobSearchCards] = useState([]);
    const [jobList, setJobList] = useState([]);

    function testChange(e)  {
        console.log(e);
    }

    function keywordChangeListener(e) {
        let keyword = e.target.value.toLowerCase();
        let newJobSearchCardList = [];
        let newJobList = jobList;
        newJobList = newJobList.filter((p) => {
            if (p.title.toLowerCase().indexOf(keyword) != -1 || p.description.toLowerCase().indexOf(keyword) != -1)
                return true;
            else
                return false;
        });
        for (let i = 0; i < newJobList.length; i++) {
            newJobSearchCardList.push(<JobSearchCard onChange={testChange} jobData={newJobList[i]} key={i} />);
        }
        setJobSearchCards(newJobSearchCardList);
    }

    function locationChangeListener(e) {
        let location = e.target.value.toLowerCase();
        let newJobSearchCardList = [];
        let newJobList = jobList;
        newJobList = newJobList.filter((p) => {
            if (p.location.toLowerCase().indexOf(location) != -1 )
                return true;
            else
                return false;
        });
        for (let i = 0; i < newJobList.length; i++) {
            newJobSearchCardList.push(<JobSearchCard jobData={newJobList[i]} key={i} />);
        }
        setJobSearchCards(newJobSearchCardList);
    }


    useEffect(function () {
        //dispatch({ num: state.num + 1 });
        console.log("inside useeffect")
        //axios.get(URL + "/v1.0/jobs?manufacturer=" + state.user.id)
        axios.get(URL + "/v1.0/jobs?manufacturer=all")
            .then((res) => {
                let localJobList = res.data;
                let jobSearchCardList = [];
                for (let i = 0; i < localJobList.length; i++) {
                    jobSearchCardList.push(<JobSearchCard jobData={localJobList[i]} key={i} />);
                }
                setJobSearchCards(jobSearchCardList);
                setJobList(localJobList);
            })
            .catch((e) => console.log(e));
    }, [state.num]);

    return (<div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Keyword"
                    id="product-keyword"
                    inputProps={{
                        type: "text",
                        onChange: keywordChangeListener,
                        endAdornment: (
                            <InputAdornment position="end">
                                <FilterIcon />
                            </InputAdornment>
                        )
                    }}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Location"
                    id="product-location"
                    inputProps={{
                        type: "text",
                        onChange: locationChangeListener,
                        endAdornment: (
                            <InputAdornment position="end">
                                <FilterIcon />
                            </InputAdornment>
                        )
                    }}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
        </GridContainer>
        <GridContainer>
            {jobSearchCards.length != 0 ? jobSearchCards : (
                <GridItem xs={12} sm={12} md={6}>
                    Loading...
                </GridItem>
            )}
        </GridContainer>
    </div>);

}