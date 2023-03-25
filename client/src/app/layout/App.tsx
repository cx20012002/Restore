import React, {useEffect, useState} from 'react';
import './styles.css';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import {useAppDispatch} from "../store/configureStore";
import {fetchBasketAsync} from "../../features/basket/basketSlice";
import {fetchCurrentUser} from "../../features/account/accountSlice";

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    
    useEffect(() => {
        (async function initApp() {
            try {
                await dispatch(fetchCurrentUser());
                await dispatch(fetchBasketAsync());
            } catch (error) {
                console.log(error)
            }
        })().then(() => setLoading(false));
    }, [dispatch])

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    if (loading) return <LoadingComponent message={"Initialising app..."}/>

    return (
        <ThemeProvider theme={theme}>
            <ToastContainer theme={"colored"} position={"bottom-right"} hideProgressBar/>
            <CssBaseline/>
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
            <Container>
                <Outlet/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
