import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import { Radio } from '@material-ui/core';

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import axios from 'axios';
import { useGlobalState } from "index.js";


const useStyles = makeStyles(styles);

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [state, dispatch] = useGlobalState();
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [loginFailed, setLoginFailed] = React.useState(null);

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(p) {
        setPassword(p.target.value);
    }

    function loginUser() {
        console.log(email, password, selectedValue);
        //axios.post('http://flask-router.eu-gb.cf.appdomain.cloud/v1.0/login', {
        axios.post('https://run.mocky.io/v3/4b83fde1-b5ff-49f7-9454-c378f5c0d97c',{
            emailAddress: email,
            password: password
        }).then((res) => {
            console.log(res);
            dispatch({
                user: {
                    id: "d447ccd97f241af720e79c94826ebcac",
                    type: "manufacturer"
                }
            })
            history.push("/admin/dashboard");
        }).catch(function (error) {
            setLoginFailed(true);
        });;
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Login</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Email"
                                    id="login-email"
                                    inputProps={{
                                        type: "email",
                                        onChange: updateEmail
                                    }}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Password"
                                    id="login-password"
                                    inputProps={{
                                        type: "password",
                                        onChange: updatePassword
                                    }}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Radio
                                    checked={selectedValue === "worker"}
                                    onChange={() => setSelectedValue("worker")}
                                    value="worker"
                                    name="user type"
                                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                    classes={{
                                        checked: classes.radio
                                    }}
                                /> Worker
                                <Radio
                                    checked={selectedValue === "manufacturer"}
                                    onChange={() => setSelectedValue("manufacturer")}
                                    value="manufacturer"
                                    name="user type"
                                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                    classes={{
                                        checked: classes.radio
                                    }}
                                /> Manufacturer
                                <Radio
                                    checked={selectedValue === "buyer"}
                                    onChange={() => setSelectedValue("buyer")}
                                    value="buyer"
                                    name="user type"
                                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                    classes={{
                                        checked: classes.radio
                                    }}
                                /> Buyer
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                <Button color="primary" onClick={loginUser}>Submit</Button>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
            {
                loginFailed ?
                    (<GridItem xs={12} sm={12} md={12}>
                        <SnackbarContent message={'Failed to login. Please check your credentials'} color="danger" />
                    </GridItem>) : ""
            }
        </GridContainer >

    );

}