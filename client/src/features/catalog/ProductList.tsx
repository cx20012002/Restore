import React from 'react';
import {Grid} from "@mui/material";
import {Product} from "../../app/models/Product";
import ProductCard from "./ProductCard";

interface Props{
    products: Product[];
}

function ProductList({products}:Props) {
    return (
        <Grid container spacing={4}>
            {products.map(product =>(
                <Grid item key={product.id} xs={3}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList;