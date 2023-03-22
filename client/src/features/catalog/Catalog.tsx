import React, {useEffect} from 'react';
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams} from "./catalogSlice";
import {
    Grid, Paper,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButton from "../../app/components/CheckboxButton";
import AddPagination from "../../app/components/AddPagination";

const sortOption = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'priceAsc', label: 'Price - Low to high'}
]

function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        productParams,
        metaData
    } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch]);

    if (!filtersLoaded) return <LoadingComponent message={"Loading Products...."}/>

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 3}}>
                    <ProductSearch/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                        options={sortOption}
                        onChange={e => dispatch(setProductParams({orderBy: e.target.value}))}
                        selectedValue={productParams.orderBy}
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButton items={brands}
                                    checked={productParams.brands!}
                                    onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButton items={types}
                                    checked={productParams.types!}
                                    onChange={(items: string[]) => dispatch(setProductParams({types: items}))}/>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={9} sx={{mb: 2}}>
                {metaData &&
                    <AddPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                    />
                }
                
            </Grid>
        </Grid>
    )
}

export default Catalog;