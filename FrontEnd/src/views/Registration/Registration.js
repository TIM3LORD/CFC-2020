import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//radio button and select
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

//Icons
import WorkIcon from "@material-ui/icons/Work";
import BuildIcon from "@material-ui/icons/Build";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import Tabs from "components/CustomTabs/CustomTabs.js";
import { any } from "prop-types";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3.2),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

const useInputStyles = makeStyles({
    root: {
        marginTop: "27px"
    }
});

function registerUser(e) {
    console.log("Hello");
    console.log(e.target);
}

export default function Registration() {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [age, setAge] = React.useState('');
    const inputClasses = useInputStyles();
    const [workerType, setWorkerType] = useState(true);
    const qualifications = ["Graduate", "Post-Graduate"];
    function setWorker(e) {
        console.log(e.target.value);
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                                        inputProps={{
                                            onChange: setWorker
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Aadhaar Number"
                                        id="worker-aadhaar"
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
                                            defaultValue: "2020-06-28",
                                            type: "date"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <Autocomplete
                                        id="qualifications-box"
                                        classes={inputClasses}
                                        options={qualifications}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="Qualification" variant="outlined" />}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Experience in PPE production"
                                        id="worker-exp"
                                        inputProps={{
                                            type: "number"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    I am <Radio
                                        checked={workerType === "volunteer"}
                                        onChange={() => setWorkerType("volunteer")}
                                        value="worker"
                                        name="worker type"
                                        icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                        checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                        classes={{
                                            checked: classes.radio
                                        }}
                                    /> A Volunteer
                                <Radio
                                        checked={workerType === "paid"}
                                        onChange={() => setWorkerType("paid")}
                                        value="paid"
                                        name="worker type"
                                        icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                        checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                        classes={{
                                            checked: classes.radio
                                        }}
                                    /> Looking for a Job
                            </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Button color="primary" onClick={registerUser}>Register</Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                    )
                },
                {
                    tabName: "Manufacturer",
                    tabIcon: BuildIcon,
                    tabContent: (
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Name"
                                        id="Manufacturer-name"
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
                                        id="Manufacturer-email"
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
                                        id="Manufacturer-phone"
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
                                        labelText="Quantities of PPE Kit"
                                        id="PPE KIT"
                                        inputProps={{
                                            type: "number"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Production Method"
                                        id="Method"
                                        inputProps={{
                                            type: "text"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="CIN/GLN/FCRN/LLPIN/FLLPIN"
                                        id="Manufacturer ID"
                                        inputProps={{
                                            type: "text"
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
                    tabName: "Buyer",
                    tabIcon: ShoppingCartIcon,
                    tabContent: (
                        <div>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Name"
                                        id="Buyer-name"
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
                                        id="Buyer-email"
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
                                        id="Buyer-phone"
                                        inputProps={{
                                            type: "tel"
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="label">Type of Buisness</InputLabel>
                                        <Select
                                            labelId="label"
                                            id="select"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>Sole Proprietorship</MenuItem>
                                            <MenuItem value={2}>Partnership</MenuItem>
                                            <MenuItem value={3}>Corporation</MenuItem>
                                            <MenuItem value={4}>LLC</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Radio
                                        checked={selectedValue === "individual"}
                                        onChange={() => setSelectedValue("individual")}
                                        value="individual"
                                        name="buisness type"
                                        icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                        checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                        classes={{
                                            checked: classes.radio
                                        }}
                                    /> Individual
                                <Radio
                                        checked={selectedValue === "organization"}
                                        onChange={() => setSelectedValue("organization")}
                                        value="organization"
                                        name="buissness type"
                                        icon={<FiberManualRecord className={classes.radioUnchecked} />}
                                        checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                                        classes={{
                                            checked: classes.radio
                                        }}
                                    /> Organization
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={3}>
                                    <Button color="primary">Register</Button>
                                </GridItem>
                            </GridContainer>
                        </div>
                    )
                }
            ]}
        />
    );

}
