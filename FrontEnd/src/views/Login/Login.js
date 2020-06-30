import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';

import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

//Icons
import WorkIcon from "@material-ui/icons/Work";
import BuildIcon from "@material-ui/icons/Build";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


const useStyles = makeStyles(styles);

export default function Login() {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(null);

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
                                        type: "email"
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
                                        type: "password"
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
                                <Button color="primary">Submit</Button>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );

}