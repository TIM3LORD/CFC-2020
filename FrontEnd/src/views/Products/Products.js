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
import FilterIcon from "@material-ui/icons/FilterList";
import ProductCard from "./ProductCard.js";
import { useGlobalState } from "index.js";
import { URL } from "globals.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

export default function Products() {
    const [state, dispatch] = useGlobalState();
    const [productCards, setProductCards] = useState([]);
    const [productList, setProductList] = useState([]);

    function keywordChangeListener(e) {
        let keyword = e.target.value.toLowerCase();
        console.log(keyword);
        //console.log(productList);
        let newProductCardList = [];
        let newProductList = productList;
        newProductList = newProductList.filter((p) => {
            if (p.item.toLowerCase().indexOf(keyword) != -1 || p.title.indexOf(keyword) != -1 || p.description.indexOf(keyword) != -1)
                return true;
            else
                return false;
        });
        for (let i = 0; i < newProductList.length; i++) {
            newProductCardList.push(<ProductCard productData={newProductList[i]} key={i} />);
        }
        setProductCards(newProductCardList);
    }

    function locationChangeListener(e) {
        let location = e.target.value.toLowerCase();
        //console.log(productList);
        let newProductCardList = [];
        let newProductList = productList;
        newProductList = newProductList.filter((p) => {
            if (p.location.toLowerCase().indexOf(location) != -1 )
                return true;
            else
                return false;
        });
        for (let i = 0; i < newProductList.length; i++) {
            newProductCardList.push(<ProductCard productData={newProductList[i]} key={i} />);
        }
        setProductCards(newProductCardList);
    }


    useEffect(function () {
        //dispatch({ num: state.num + 1 });
        console.log("inside useeffect")
        //axios.get(URL + "/v1.0/jobs?manufacturer=" + state.user.id)
        axios.get(URL + "/v1.0/products?item=all")
            .then((res) => {
                // console.log(res.data);
                let localProductList = res.data;
                let productCardList = [];
                for (let i = 0; i < localProductList.length; i++) {
                    productCardList.push(<ProductCard productData={localProductList[i]} key={i} />);
                }
                setProductCards(productCardList);
                setProductList(localProductList);
            })
            .catch((e) => console.log(e));
    }, []);

    return (<div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Keyword"
                    id="product-keyword"
                    inputProps={{
                        type: "text",
                        onChange: keywordChangeListener,
                        endAdornment: (
                            <InputAdornment position="end">
                                <FilterIcon />
                            </InputAdornment>
                        )
                    }}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Location"
                    id="product-location"
                    inputProps={{
                        type: "text",
                        onChange: locationChangeListener,
                        endAdornment: (
                            <InputAdornment position="end">
                                <FilterIcon />
                            </InputAdornment>
                        )
                    }}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
        </GridContainer>
        <GridContainer>
            {productCards.length != 0 ? productCards : (
                <GridItem xs={12} sm={12} md={6}>
                    Loading...
                </GridItem>
            )}
        </GridContainer>
    </div>);

}