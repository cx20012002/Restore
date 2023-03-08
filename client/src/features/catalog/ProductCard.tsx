import React from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {Product} from "../../app/models/Product";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {addBasketItemAsync} from "../basket/basketSlice";


interface Prop {
    product: Product;
}

function ProductCard({product}: Prop) {
    const {status} = useAppSelector(status => status.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>
                }
                title={product.name}
                titleTypographyProps={
                    {color: "primary", fontWeight: "bold"}
                }
            />
            <CardMedia
                sx={{height: 140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
                image={product.pictureUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color={'secondary'}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={status.includes('pendingAddItem' + product.id)}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size={"small"}>
                    Add to cart
                </LoadingButton>
                <Button size="small" component={Link} to={`products/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;