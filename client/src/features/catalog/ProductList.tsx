import React from 'react';
import {Grid} from "@mui/material";
import {Product} from "../../app/models/Product";
import ProductCard from "./ProductCard";
import {useAppSelector} from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

function ProductList({products}: Props) {
    const {productsLoaded} = useAppSelector(state => state.catalog);
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item key={product.id} xs={4}>
                    {!productsLoaded ? (
                        <ProductCardSkeleton/>
                    ) : (
                        <ProductCard product={product}/>
                    )}
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList;