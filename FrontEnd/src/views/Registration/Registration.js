import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';


//Icons
import WorkIcon from "@material-ui/icons/Work";
import BuildIcon from "@material-ui/icons/Build";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Tabs from "components/CustomTabs/CustomTabs.js";

const useStyles = makeStyles(styles);

export default function Registration() {
    const classes = useStyles();
    return (
        <Tabs
            headerColor="primary"
            tabs={[
                {
                    tabName: "Worker",
                    tabIcon: WorkIcon,
                    tabContent: (
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Name"
                                        id="worker-name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Email address"
                                        id="worker-email"
                                        inputProps={{
                                            type: "email"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Phone Number"
                                        id="worker-phone"
                                        inputProps={{
                                            type: "tel"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                        labelText="Date of Birth"
                                        id="worker-dob"
                                        inputProps={{
                                            defaultValue : "2020-06-28",
                                            type: "date"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Button color="primary">Register</Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                    )
                },
                {
                    tabName: "Manufacturer",
                    tabIcon: BuildIcon,
                    tabContent: (
                        <div>Hello</div>
                    )
                },
                {
                    tabName: "Buyer",
                    tabIcon: ShoppingCartIcon,
                    tabContent: (
                        <div>Hello</div>
                    )
                }
            ]}
        />
    );

}