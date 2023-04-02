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

const countries = [
    { fullNameOfCountry: "Canada", abbr: "CA" },
    { fullNameOfCountry: "USA", abbr: "US" },
];
// start of changing the name of the tab/page *********
const title = `Inscrivez-vous!`;
document.title = title.toUpperCase();
// end of changing the name of the tab/page *********

export function Inscription() {
    // Start of dropdown menu *********
    const [country, setCountry] = useState("");
    const handleChange = (event) => {
        setCountry(event.target.value);
    };
    // END of dropdown menu ************

    // Start of state that will carry the name of the person ****************
    const [userName, setUserName] = useState("");
    // End of state that will carry the name of the person **********

    // Start of extra state to catch the phone number ******
    const [phoneNumber, setPhoneNumber] = useState("");
    // End of extra state to catch the phone number ******

    // Start of submitting the form *********
    const [isSubmitted, setIsSubmitted] = useState(false); // form is perfect and authorized to proceed
    const [formHasErrors, setFormHasErrors] = useState(false); // the form has errors
    const [countryIsSelected, setCountryIsSelected] = useState(false); // to check if a country was selected from the dropdown menu
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
    const [displayErrorCountryMessage, setDisplayErrorCountryMessage] =
        useState(false);
    // const [isFormApproved, setIsFormApproved] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (country === "") {
            setCountryIsSelected(false);
            setDisplayErrorCountryMessage(true);
            setTimeout(() => {
                setDisplayErrorCountryMessage(false);
            }, 1500);
            return;
        } else {
            setCountryIsSelected(true);
            setIsSubmitted(true);
        }

        const data = new FormData(event.currentTarget);

        const inputData = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            email: data.get("email"),
            // phone: data.get("phone_number"),
            phone: phoneNumber,
            street: data.get("street_address"),
            postal_code: data.get("post_code"),
            country: country,
        };
        // console.log(
        //     `this is the data collected from the form to be sent through POST method`
        // );
        // console.log(inputData);

        setUserName(inputData.first_name); // to grab the name of the USER

        if (
            firstNameError ||
            lastNameError ||
            emailError ||
            phoneError ||
            addressError ||
            codePostalError ||
            countryIsSelected
        ) {
            setFormHasErrors(true);
            setIsSubmitted(false);
        } else {
            const result = await fetchPost(inputData);
            // console.log(
            //     `this is the response from the API after fetch POST-ing`
            // );
            // console.log(result);
            // console.log(Object.keys(result));
            // console.log(Object.values(result));

            if (
                Object.keys(result) === "success" &&
                Object.values(result) === true
            ) {
                setIsSubmitted(true);
                setFormHasErrors(false);
            } else {
                setIsSubmitted(false);
                setFormHasErrors(true);
            }
        }
    };
    //End of submitting the form ************

    // Start of Redirect to Sign In **********************
    const navigate = useNavigate();

    useEffect(() => {
        if (isSubmitted) {
            setDisplaySuccessMessage(true);
            setTimeout(() => {
                navigate(`/merci/${userName}`);
            }, 3000);
        }
    }, [isSubmitted]);
    // End of Redirect to Sign In ************************

    // Start of input verification / handle errors *******
    const [firstNameValue, setFirstNameValue] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const handleErrorsFirstName = (event) => {
        setFirstNameValue(event.target.value);

        // Validate the text field
        if (event.target.value.length < 2) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
        }
    };

    const [lastNameValue, setLastNameValue] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const handleErrorsLastName = (event) => {
        setLastNameValue(event.target.value);

        // Validate the text field
        if (event.target.value.length < 2) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }
    };

    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const handleErrorsEmail = (event) => {
        setEmailValue(event.target.value);

        // Validate the text field for email
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(event.target.value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };
    // start of PHONEEEE validation and masking ********************
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [phoneValue, setPhoneValue] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const handlePhoneErrors = (event) => {
        setPhoneValue(event.target.value);
        setPhoneNumber(phoneValue);

        // Validate the text field for phone

        const pattern =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        // Fomats supported: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
        if (!pattern.test(event.target.value)) {
            setPhoneError(true);
            // setMaskedPhone(`*********`);
        } else {
            setPhoneError(false);
        }
    };
    // end of phone validation and masking ********************

    const [addressValue, setAddressValue] = useState("");
    const [addressError, setAddressError] = useState(false);
    const handleErrorsAddress = (event) => {
        setAddressValue(event.target.value);

        // Validate the text field
        if (event.target.value.length < 10) {
            setAddressError(true);
        } else {
            setAddressError(false);
        }
    };

    const [codePostalValue, setCodePostalValue] = useState("");
    const [codePostalError, setCodePostalError] = useState(false);
    const handleErrorsCodePostal = (event) => {
        setCodePostalValue(event.target.value);

        // Validate the text field
        if (event.target.value.length < 5) {
            setCodePostalError(true);
        } else {
            setCodePostalError(false);
        }
    };
    // End of input verification

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
                                m: 1,
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
                            style={{ marginBottom: "1.5rem" }}
                        >
                            Parlez-nous de vous
                        </Typography>
                        <Box
                            id="myForm"
                            component="form"
                            validate="true"
                            // onSubmit={handleSubmit}
                            onSubmit={(e) => handleSubmit(e)}
                            sx={{ mt: 1 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        // margin="normal"
                                        required
                                        fullWidth
                                        id="first_name"
                                        label="Prénom"
                                        name="first_name"
                                        type="text"
                                        autoComplete="first_name"
                                        error={firstNameError}
                                        value={firstNameValue}
                                        onChange={handleErrorsFirstName}
                                        helperText={
                                            firstNameError
                                                ? "Le prénom doit être conformé d'au moins 2 caractères."
                                                : ""
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        // margin="normal"
                                        required
                                        fullWidth
                                        id="last_name"
                                        label="Nom"
                                        name="last_name"
                                        type="text"
                                        autoComplete="last_name"
                                        error={lastNameError}
                                        value={lastNameValue}
                                        onChange={handleErrorsLastName}
                                        helperText={
                                            lastNameError
                                                ? "Le nom doit être conformé d'au moins 2 caractères."
                                                : ""
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                error={emailError}
                                value={emailValue}
                                onChange={handleErrorsEmail}
                                helperText={
                                    emailError
                                        ? "Assurez vous d'ingresser une adresse courriel valide."
                                        : ""
                                }
                            />
                            <FormControl
                                fullWidth
                                variant="outlined"
                                margin="dense"
                                required
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                autoComplete="phone_number"
                                sx={{ mb: "-0.05rem" }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Téléphone
                                </InputLabel>
                                <OutlinedInput
                                    onChange={handlePhoneErrors}
                                    error={phoneError} // makes the outline red
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="phone_number"
                                />
                                {phoneError ? <AlertMessagePhoneError /> : null}
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="street_address"
                                label="Adresse"
                                name="street_address"
                                type="text"
                                autoComplete="street_address"
                                error={addressError}
                                value={addressValue}
                                onChange={handleErrorsAddress}
                                helperText={
                                    addressError
                                        ? "L'adresse doit être conformée au moins de 10 caractères."
                                        : ""
                                }
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="post_code"
                                label="Code postal"
                                name="post_code"
                                type="text"
                                autoComplete="post_code"
                                error={codePostalError}
                                value={codePostalValue}
                                onChange={handleErrorsCodePostal}
                                helperText={
                                    codePostalError
                                        ? "L'adresse doit être conformée au moins de 5 caractères."
                                        : ""
                                }
                            />
                            <FormControl
                                fullWidth
                                style={{
                                    marginTop: "0.7rem",
                                    // marginBottom: "-1rem",
                                }}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Pays*
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="country"
                                    type="dropdown"
                                    value={country}
                                    label="country"
                                    onChange={handleChange}
                                >
                                    {countries.map((country) => {
                                        const { fullNameOfCountry, abbr } =
                                            country;
                                        return (
                                            <MenuItem
                                                key={abbr}
                                                value={fullNameOfCountry}
                                            >
                                                {fullNameOfCountry}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            {displayErrorCountryMessage && (
                                <AlertMessageError />
                            )}
                            {displaySuccessMessage && <AlertMessageSuccess />}

                            <Box style={{ textAlign: "center" }}>
                                <Button
                                    type="submit"
                                    // fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        // mb: 2,

                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    Enregistrer
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

function AlertMessageError() {
    return (
        <>
            <Stack sx={{ width: "100%" }} marginTop="1rem">
                <Alert severity="error">Veuillez choisir le pays.</Alert>
            </Stack>
        </>
    );
}

function AlertMessageSuccess() {
    return (
        <>
            <Stack sx={{ width: "100%" }} marginTop="1rem">
                <Alert severity="success">
                    Tout est correct. Vous serez rédigé bientôt. Veuillez
                    patienter.
                </Alert>
            </Stack>
        </>
    );
}

function AlertMessagePhoneError() {
    return (
        <>
            <p id="helper-text-1">
                Utilisez un des formats suivants : (123) 456-7890,
                (123)456-7890, 123-456-7890, 123.456.7890, 1234567890,
                +31636363634, 075-63546725.
            </p>
        </>
    );
}
