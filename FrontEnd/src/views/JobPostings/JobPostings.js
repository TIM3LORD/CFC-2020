import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


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
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import JobCard from "./JobCard.js";
import Fab from '@material-ui/core/Fab';
import CustomInput from "components/CustomInput/CustomInput.js";

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
import { bugs, website, server } from "variables/general.js";
import { useGlobalState } from "index.js";
import { URL } from "globals.js";
import DialogButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "components/Snackbar/Snackbar.js";
import CheckIcon from "@material-ui/icons/Check";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

let i = 0;

export default function JobPostings() {
    const classes = useStyles();
    const history = useHistory();

    const [state, dispatch] = useGlobalState();
    const [jobCards, setJobCards] = React.useState([]);
    const [jobPostModal, setJobPostModal] = React.useState(false);
    const [openNotif, setOpenNotif] = React.useState(false);
    const [applySuccess, setApplySuccess] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState(true);
    const [jobTitle , setJobTite] = React.useState("");
    const [jobDescription , setJobDescription] = React.useState("");
    const [jobLocation , setJobLocation] = React.useState("");

    function postJob() {
        setJobPostModal(false);
        axios.post(URL + "/v1.0/jobs", {
            title : jobTitle,
            description : jobDescription,
            location : jobLocation,
            manufacturerId : state.user.id,
            applicants : []
        })
            .then((res) => {
                setApplySuccess(true);
                setOpenNotif(true);
                setTimeout(function () {
                    setOpenNotif(false);
                }, 3000);
            }).
            catch((e) => {
                setApplySuccess(false);
                setOpenNotif(true);
                setTimeout(function () {
                    setOpenNotif(false);
                }, 3000);
            });
    }

    function handleClose() {
        setJobPostModal(false);
    };

    function changeJobTitle(e)    {
        console.log(e.target.value);
        setJobTite(e.target.value);
    }

    function changeJobDesc(e)    {
        console.log(e.target.value);
        setJobDescription(e.target.value);
    }

    function changeJobLocation(e)    {
        console.log(e.target.value);
        setJobLocation(e.target.value);
    }

    var manufacturerList = [];
    useEffect(() => {
        //dispatch({ num: state.num + 1 });
        axios.get(URL + "/v1.0/jobs?manufacturer=" + state.user.id)
            .then((res) => {
                console.log(res.data);
                if (res.data.length == 0) setSearchResult(false);
                manufacturerList = res.data;
                let jobCardList = [];
                for (let i = 0; i < manufacturerList.length; i++) {
                    jobCardList.push(<JobCard jobData={manufacturerList[i]} key={i} />);
                }
                setJobCards(jobCardList);
                
            });
    }, [applySuccess]);


    return (
        <div>
            <GridContainer>
                {jobCards.length != 0 ? jobCards : (
                    <GridItem xs={12} sm={12} md={6}>
                        {searchResult ?  "Loading..." : "No Job Postings" }
                    </GridItem>
                )}
            </GridContainer>
            <Fab onClick={(e) => setJobPostModal(true)} color="secondary" aria-label="add"
                style={{
                    bottom: "20px",
                    right: "20px",
                    position: "fixed",
                    zIndex: 1040
                }}>
                <NoteAddIcon />
            </Fab>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={jobPostModal}
                onClose={handleClose}
                scroll="paper"
            >
                <DialogTitle id="scroll-dialog-title">Create Job Posting</DialogTitle>
                <DialogContent dividers={true}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Job Title"
                                id="job-title"
                                inputProps={{
                                    type: "text",
                                    onChange: changeJobTitle
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Job Description"
                                id="job-desc"
                                inputProps={{
                                    multiline: true,
                                    rows: 3,
                                    onChange: changeJobDesc
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Job Location"
                                id="job-location"
                                inputProps={{
                                    type: "text",
                                    onChange: changeJobLocation
                                }}
                                formControlProps={{
                                    fullWidth: true,
                                    multiline: true
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={postJob} color="info">
                        Post
                    </DialogButton>
                    <DialogButton onClick={handleClose} color="info">
                        Cancel
                    </DialogButton>
                </DialogActions>
            </Dialog>
            {applySuccess ? (<Snackbar
                place="bc"
                color="success"
                icon={CheckIcon}
                message="You have successfully posted the job."
                open={openNotif}
                closeNotification={() => setOpenNotif(false)}
                close
            />) : (<Snackbar
                place="bc"
                color="danger"
                icon={CancelIcon}
                message="Failed to post the job. Please try again."
                open={openNotif}
                closeNotification={() => setOpenNotif(false)}
                close
            />)}
        </div>
    );
}
