import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

import axios from 'axios';

// react plugin for creating charts
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ChartistGraph from "react-chartist";
import Button from "components/CustomButtons/Button.js";
import PhoneIcon from "@material-ui/icons/PhoneInTalk";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function Applicants(props) {

    return (<Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Phone number</TableCell>
                <TableCell align="right">Qualification</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow style={{ cursor: 'pointer' }}>
                <TableCell component="th" scope="row">
                    Ronan Dsouza
                    </TableCell>
                <TableCell align="right">Ravindra Bhavan Fatorda</TableCell>
                <TableCell align="right">9284400012</TableCell>
                <TableCell align="right">High School</TableCell>
                <TableCell align="center">
                    <Button color="primary"><PhoneIcon />Interview</Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>);

}