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
import GridContainer from "components/Grid/GridContainer.js";
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

function testClick() {
    console.log("Hello")
}

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

export default function JobCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [jobModal, setJobModal] = React.useState(true);
    const [applicantList, setApplicantList] = React.useState(emptyList);
    const [selectedApplicant, setSelectedApplicant] = React.useState({});
    
    async function handleClickOpen() {
        console.log("open");
        setOpen(true);
        let applicants = [];
        //axios call
        let a = props.jobData.applicants;
        let n = props.jobData.applicants.length;
        for(let i = 0; i < n; i++)
            //await axios.get(URL + "/v1.0/users/" + a[i])
            await axios.get("https://run.mocky.io/v3/86064599-d4d6-413e-b215-6128a8651a37")
            .then((res) => {
                console.log(res.data);
                let d = res.data;
                applicants.push(createData(d.name, d.address, d.pnumber, d.qualification, d.email, d.dob));
            });
        setApplicantList(applicants.length == 0 ? emptyList : applicants);
        console.log("done");
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(function(){ setJobModal(true) }, 1000);
    };

    function showApplicant(i)   {
        setJobModal(false);
        setSelectedApplicant(applicantList[i]);
        console.log(i);
    }

    return (
        <GridItem xs={12} sm={12} md={6}>
            <Card onClick={handleClickOpen}>
                <CardHeader color="info" stats>
                    <h4 className={classes.cardTitle}>{props.jobData.title}</h4>
                    <p>Location: {props.jobData.location}</p>
                </CardHeader>
                <CardBody>
                    {truncateString(props.jobData.description, 5)}
                </CardBody>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <Icon>person</Icon>
                        {props.jobData.applicants.length} Applicants
                    </div>
                </CardFooter>
            </Card>
            {jobModal ? (
                <Dialog
                    fullWidth={true}
                    maxWidth='md'
                    open={open}
                    onClose={handleClose}
                    scroll="paper"
                >
                    <DialogTitle id="scroll-dialog-title">{props.jobData.title}</DialogTitle>
                    <DialogContent dividers={true}>
                        <h4 style={{ marginTop: '0px' }}>Location: {props.jobData.location}</h4>
                        <p>{props.jobData.description}</p>
                        <h5>Applicants</h5>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Phone number</TableCell>
                                    <TableCell align="right">Qualification</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applicantList.map((row,i) => (
                                    <TableRow style={{ cursor : 'pointer' }} onClick={ () => { showApplicant(i); }} key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right">{row.qualification}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <DialogButton onClick={handleClose} color="info">
                            Cancel
                    </DialogButton>
                    </DialogActions>
                </Dialog>
            ) : (
                    <Dialog
                        fullWidth={true}
                        maxWidth='sm'
                        open={open}
                        onClose={handleClose}
                        scroll="paper"
                    >
                        <DialogTitle id="scroll-dialog-title">{selectedApplicant.name}</DialogTitle>
                        <DialogContent dividers={true}>
                            <p><b>Qualification:</b> {selectedApplicant.qualification}</p>
                            <p><b>Address:</b> {selectedApplicant.address}</p>
                            <p><b>Phone Number:</b> {selectedApplicant.phone}</p>
                            <p><b>Email:</b> {selectedApplicant.email}</p>
                            <p><b>Date of Birth:</b> {selectedApplicant.dob}</p>
                            <Button color="primary">Screen</Button>
                            <Button color="primary">Recruit</Button>
                        </DialogContent>
                        <DialogActions>
                            <DialogButton onClick={() => { setJobModal(true) }} color="info">
                                Back
                    </DialogButton>
                            <DialogButton onClick={handleClose} color="info">
                                Cancel
                    </DialogButton>
                        </DialogActions>
                    </Dialog>
                )}
        </GridItem>
    );
}
