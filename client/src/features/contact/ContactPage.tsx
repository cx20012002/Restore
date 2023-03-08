import React from 'react';
import {Button, ButtonGroup, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {decrement, increment} from "./counterSlice";

function ContactPage() {
    const {data, title} = useAppSelector(state => state.counter)
    const dispatch = useAppDispatch();
    return (
        <>
            <Typography variant={"h2"}>
                {title}
            </Typography>
            <Typography variant={"h5"}>
                The Data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(2))} variant={"contained"} color={"error"}>Decrement</Button>
                <Button onClick={() => dispatch(increment(5))} variant={"contained"} color={"primary"}>Increment</Button>
            </ButtonGroup>
        </>
    )
}

export default ContactPage;