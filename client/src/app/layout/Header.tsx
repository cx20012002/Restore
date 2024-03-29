import React from 'react';
import {AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography} from "@mui/material";
import {Link, NavLink} from "react-router-dom";
import {ShoppingCart} from "@mui/icons-material";
import {useAppSelector} from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'}
]

const navStyle = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Prop {
    darkMode: boolean;
    handleThemeChange: () => void;
}

function Header({darkMode, handleThemeChange}: Prop) {
    const {basket} = useAppSelector(state => state.basket);
    const {user} = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position={"static"} sx={{mb: 4}}>
            <Toolbar sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant={"h6"} component={NavLink} to={'/'} sx={navStyle}>RE-STORE</Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange}/>
                </Box>
                <List sx={{display: "flex"}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyle}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton size={"large"} edge={"start"} color={"inherit"} sx={{mr: 2}} component={Link}
                                to={'basket'}>
                        <Badge badgeContent={itemCount} color={"secondary"}>
                            <ShoppingCart color={"inherit"}/>
                        </Badge>
                    </IconButton>
                    {user ? (
                        <SignedInMenu/>
                    ) : (
                        <List sx={{display: "flex"}}>
                            {rightLinks.map(({title, path}) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyle}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;