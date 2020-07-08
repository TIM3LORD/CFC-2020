import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

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
import CheckIcon from "@material-ui/icons/Check";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Button from "components/CustomButtons/Button.js";
import DialogButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { URL } from "globals.js";
import { bugs, website, server } from "variables/general.js";
import { useGlobalState } from "index.js";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "components/Snackbar/Snackbar.js";


import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '6999999999'
    }
};

let i = 0;



function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
        return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
}

function createData(name, address, phone, qualification, email, dob) {
    return { name, address, phone, qualification, email, dob };
}

const emptyList = [
    createData('-', '-', '-', '-')
];

var applicationObjectList = [];

export default function JobSearchCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openNotif, setOpenNotif] = React.useState(false);
    const [applySuccess, setApplySuccess] = React.useState(false);
    const [manufacturer, setManufacturer] = React.useState({ name: "-", address: "-" });
    const [state, dispatch] = useGlobalState();

    function applyJob(id) {
        setOpen(false);
        axios.post(URL + "/v1.0/jobs/apply/" + state.user.id + "/" + id, {})
            .then((res) => {
                setApplySuccess(true);
                setOpenNotif(true);
                setTimeout(function () {
                    setOpenNotif(false);
                }, 3000);
                dispatch({num : state.num + 1})
            }).
            catch((e) => {
                setApplySuccess(false);
                setOpenNotif(true);
                setTimeout(function () {
                    setOpenNotif(false);
                }, 3000);
                dispatch({num : state.num + 1})
            });
    }

    function handleClickOpen(manufacturerId) {
        console.log(manufacturerId);
        setOpen(true);
        axios.get(URL + "/v1.0/users/" + manufacturerId)
        //axios.get("https://run.mocky.io/v3/93e8aa73-e4de-4609-b3c5-32b74a22fcc1")
            .then((res) => {
                console.log(res.data[0]);
                setManufacturer(res.data[0]);
            })
        console.log("done");
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <GridItem xs={12} sm={12} md={6}>
            <Card onClick={() => handleClickOpen(props.jobData.manufacturerId) }>
                <CardHeader color="info" stats>
                    <h4 className={classes.cardTitle}>{props.jobData.title}</h4>
                    <p>Location: {props.jobData.location}</p>
                </CardHeader>
                <CardBody>
                    {truncateString(props.jobData.description, 100)}
                </CardBody>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Icon>person</Icon>
                        {props.jobData.applicants.length} Applicants
                    </div>
                </CardFooter>
            </Card>
            <Dialog
                fullWidth={true}
                maxWidth='md'
                open={open}
                onClose={handleClose}
                scroll="paper"
            >
                <DialogTitle id="scroll-dialog-title">{props.jobData.title}</DialogTitle>
                <DialogContent dividers={true}>
                    <p><b>Location:</b> {props.jobData.location}</p>
                    <p>{props.jobData.description}</p>
                    <p><b>Manufacturer Name:</b> {manufacturer.name}</p>
                    <p><b>Manufacturer Address:</b> {manufacturer.address}</p>
                    <p><b>Manufacturer Type:</b> {manufacturer.scale} Scale</p>
                    <Button color="primary" onClick={(e) => { applyJob(props.jobData._id); }}><CheckIcon /> Apply</Button>
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={handleClose} color="info">
                        Cancel
                    </DialogButton>
                </DialogActions>
            </Dialog>
            {  applySuccess ? (<Snackbar
                    place="bc"
                    color="success"
                    icon={CheckIcon}
                    message="You have successfully applied for the job."
                    open={openNotif}
                    closeNotification={() => setOpenNotif(false)}
                    close
                />): (<Snackbar
                place = "bc"
                color = "danger"
                icon = { CancelIcon }
                message = "Failed to apply for job. Please try again."
                open = { openNotif }
                closeNotification = { () => setOpenNotif(false) }
                close
              />)}
        </GridItem>
    );
}
