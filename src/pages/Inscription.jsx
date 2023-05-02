import { useState, useEffect } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FormMain from "../Utilities/FormMain";

import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { fetchPost } from "../Utilities/fetchPost";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

// start of changing the name of the tab/page *********
const title = `Inscrivez-vous!`;
document.title = title.toUpperCase();
// end of changing the name of the tab/page *********

export function Inscription() {
    // Start of state that will carry the name of the person ****************
    const [userName, setUserName] = useState("");
    // End of state that will carry the name of the person **********

    // Start of extra state to catch the phone number ******
    const [phoneNumber, setPhoneNumber] = useState("");
    // End of extra state to catch the phone number ******

    // start of PHONEEEE validation and masking ********************
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const [phoneValue, setPhoneValue] = useState("");
    // const [phoneError, setPhoneError] = useState(false);
    // const handlePhoneErrors = (event) => {
    //     setPhoneValue(event.target.value);
    //     setPhoneNumber(phoneValue);

    //     // Validate the text field for phone

    //     const pattern =
    //         /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //     // Fomats supported: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
    //     if (!pattern.test(event.target.value)) {
    //         setPhoneError(true);
    //         // setMaskedPhone(`*********`);
    //     } else {
    //         setPhoneError(false);
    //     }
    // };
    // end of phone validation and masking ********************

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(/office.jpeg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 0.5,
                                bgcolor: "#3d3d3d",
                                width: "2.8rem",
                                height: "2.8rem",
                            }}
                        >
                            <AccountCircleOutlinedIcon
                                sx={{ fontSize: "2.4rem" }}
                            />
                        </Avatar>
                        <Typography
                            component="h1"
                            variant="h5"
                            style={{ marginBottom: "0.3rem" }}
                        >
                            Parlez-nous de vous
                        </Typography>
                        <FormMain />
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
