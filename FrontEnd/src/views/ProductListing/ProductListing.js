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
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ProductListingCard from "./ProductListingCard.js";
import { useGlobalState } from "index.js";
import Fab from '@material-ui/core/Fab';
import DialogButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "components/Snackbar/Snackbar.js";
import CheckIcon from "@material-ui/icons/Check";

import { URL } from "globals.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function ProductListing() {
    const [state, dispatch] = useGlobalState();
    const [productCards, setProductCards] = useState([]);
    const [productPostModal, setProductPostModal] = useState(false);
    const [searchResult, setSearchResult] = React.useState(true);
    const [openNotif, setOpenNotif] = React.useState(false);
    const [applySuccess, setApplySuccess] = React.useState(false);
    const [productTitle, setProductTite] = React.useState("");
    const [productDescription, setProductDescription] = React.useState("");
    const [productLocation, setProductLocation] = React.useState("");
    const [productItem, setProductItem] = React.useState("");
    const [productQuantity, setProductQuatity] = React.useState(0);

    function handleClose() {
        setProductPostModal(false);
    }

    function changeTitle(e) {
        setProductTite(e.target.value);
    }

    function changeDesc(e) {
        setProductDescription(e.target.value);
    }

    function changeLocation(e) {
        setProductLocation(e.target.value);
    }

    function changeItem(e) {
        setProductItem(e.target.value);
    }

    function changeQuantity(e) {
        setProductQuatity(e.target.value);
    }

    function postProduct() {
        setProductPostModal(false);
        console.log({title: productTitle,
            description: productDescription,
            location: productLocation,
            manufacturerId: state.user.id,
            item: productItem,
            quantity: productQuantity
        });
        axios.post(URL + "/v1.0/products", {
            title: productTitle,
            description: productDescription,
            location: productLocation,
            manufacturerId: state.user.id,
            item: productItem,
            quantity: productQuantity
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

    useEffect(function () {
        //axios.get(URL + "/v1.0/jobs?manufacturer=" + state.user.id)
        // axios.get(URL + "/v1.0/products?item=all&manufacturer=" + state.user.id)
        axios.get(URL + "/v1.0/products?item=all&manufacturer=" + state.user.id)
            .then((res) => {
                console.log(res.data);
                if (res.data.length == 0) setSearchResult(false);
                let productList = res.data;
                let productCardList = [];
                for (let i = 0; i < productList.length; i++) {
                    productCardList.push(<ProductListingCard productData={productList[i]} key={i} />);
                }
                setProductCards(productCardList);
            })
            .catch((e) => console.log(e));
    }, [applySuccess]);

    return (<div>
        <GridContainer>
            {productCards.length != 0 ? productCards : (
                <GridItem xs={12} sm={12} md={12}>
                    {searchResult ? "Loading..." : "No Product Listings"}
                </GridItem>
            )}
        </GridContainer>
        <Fab onClick={() => { setProductPostModal(true); }} color="secondary" aria-label="add"
            style={{
                bottom: "20px",
                right: "20px",
                position: "fixed",
                zIndex: 1040
            }}>
            <PlaylistAddIcon />
        </Fab>
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={productPostModal}
            onClose={handleClose}
            scroll="paper"
        >
            <DialogTitle id="scroll-dialog-title">Create Product Listing</DialogTitle>
            <DialogContent dividers={true}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Product Title"
                            id="product-title"
                            inputProps={{
                                type: "text",
                                onChange : changeTitle
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Product Description"
                            id="product-desc"
                            inputProps={{
                                multiline: true,
                                rows: 3,
                                onChange : changeDesc
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Product Item Type"
                            id="product-item"
                            inputProps={{
                                type: "text",
                                onChange : changeItem
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Quantity"
                            id="product-quantity"
                            inputProps={{
                                type: "number",
                                onChange : changeQuantity
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                            labelText="Location"
                            id="product-location"
                            inputProps={{
                                type: "text",
                                onChange : changeLocation
                            }}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
                <DialogButton onClick={postProduct} color="info">
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
            message="You have successfully posted the product."
            open={openNotif}
            closeNotification={() => setOpenNotif(false)}
            close
        />) : (<Snackbar
            place="bc"
            color="danger"
            icon={CancelIcon}
            message="Failed to post the product. Please try again."
            open={openNotif}
            closeNotification={() => setOpenNotif(false)}
            close
        />)}
    </div>);

}