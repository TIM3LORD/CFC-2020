import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

import axios from 'axios';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AddShoppingCard from "@material-ui/icons/AddShoppingCart";
import ChatIcon from "@material-ui/icons/Chat";
import CallIcon from "@material-ui/icons/Call";
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

export default function ProductCard(props) {
    const classes = useStyles();
    const [openProductModal, setOpenProductModal] = React.useState(false);
    const [manufacturer, setManufacturer] = React.useState({ name: "-", address : "-"});


    function handleClickOpen() {
        console.log("open");
        setOpenProductModal(true);
        //axios call
        let manufacturerId = props.productData.manufacturerId;
        axios.get(URL + "/v1.0/users/" + manufacturerId)
        //axios.get("https://run.mocky.io/v3/93e8aa73-e4de-4609-b3c5-32b74a22fcc1")
        .then((res) => {
            setManufacturer(res.data[0]);
        })
    }

    const handleClose = () => {
        setOpenProductModal(false);
    };

    return (
        <GridItem xs={12} sm={12} md={6}>
            <Card onClick={handleClickOpen}>
                <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                        <Icon>{props.productData.item.toLowerCase().indexOf("mask") == -1 ?
                        "medical_services" : "masks"}</Icon>
                    </CardIcon>

                    <p className={classes.cardCategory}>{props.productData.title}</p>
                    <h3 className={classes.cardTitle}>
                        {props.productData.item}
                    </h3>
                </CardHeader>
                <CardBody>
                    <b>Location:</b> {props.productData.location}<br/>
                    {truncateString(props.productData.description, 100)}
                </CardBody>
            </Card>
            <Dialog
                fullWidth={true}
                maxWidth='md'
                open={openProductModal}
                onClose={handleClose}
                scroll="paper"
            >
                <DialogTitle id="scroll-dialog-title">{props.productData.title}</DialogTitle>
                <DialogContent dividers={true}>
                    <p><b>Item:</b> {props.productData.item}</p>
                    <p>{props.productData.description}</p>
                    <p><b>Manufacturer Name:</b> {manufacturer.name}</p>
                    <p><b>Manufacturer Address:</b> {manufacturer.address}</p>
                    <p><b>Manufacturer Type:</b> {manufacturer.scale} Scale</p>
                    <Button color="primary"><AddShoppingCard /> Buy</Button>
                    <Button color="primary"><ChatIcon />Chat</Button>
                    <Button color="primary"><CallIcon />Call</Button>
                </DialogContent>
                <DialogActions>
                    <DialogButton onClick={handleClose} color="info">
                        Cancel
                    </DialogButton>
                </DialogActions>
            </Dialog>
        </GridItem>
    );
}