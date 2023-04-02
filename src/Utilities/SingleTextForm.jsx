import { TextField } from "@mui/material";
import { useState } from "react";
import {
    AlertMessageFirstNameError,
    AlertMessageLastNameError,
    AlertMessageEmailError,
    AlertMessagePhoneError,
    AlertMessageAddressError,
    AlertMessagePostalCodeError,
} from "./ErrorMessagesForm";

// Start of  Data / errors to be retrieved and used in MyFORMS ********
export let firstNameErrorEXPORT = "";
export let lastNameErrorEXPORT = "";
export let emailErrorEXPORT = "";
export let phoneErrorEXPORT = "";
export let addressErrorEXPORT = "";
export let codePostalErrorEXPORT = "";
//   End of  Data / errors to be retrieved and used in MyFORMS ********

export function SingleTextForm({ data }) {
    const { label, name, type } = data;
    // console.log(label, name, type);

    // Start of input verification / handle errors *******
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [codePostalError, setCodePostalError] = useState(false);
    const handleAllErrors = (id, event) => {
        if (id === "first_name") {
            if (event.target.value.length < 2) {
                setFirstNameError(true);
            } else {
                setFirstNameError(false);
            }
        }
        if (id === "last_name") {
            if (event.target.value.length < 2) {
                setLastNameError(true);
            } else {
                setLastNameError(false);
            }
        }
        if (id === "email") {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!pattern.test(event.target.value)) {
                setEmailError(true);
            } else {
                setEmailError(false);
            }
        }
        if (id === "phone_number") {
            const pattern =
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            // Fomats supported: (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
            if (!pattern.test(event.target.value)) {
                setPhoneError(true);
                // setMaskedPhone(`*********`);
            } else {
                setPhoneError(false);
            }
        }
        if (id === "street_address") {
            if (event.target.value.length < 10) {
                setAddressError(true);
            } else {
                setAddressError(false);
            }
        }
        if (id === "post_code") {
            if (event.target.value.length < 5) {
                setCodePostalError(true);
            } else {
                setCodePostalError(false);
            }
        }
    };

    return (
        <>
            <TextField
                style={{ marginBottom: "0.8rem" }}
                required
                fullWidth
                id={name}
                label={label}
                name={name}
                type={type}
                autoComplete={name}
                error={
                    firstNameError ||
                    lastNameError ||
                    emailError ||
                    phoneError ||
                    addressError ||
                    codePostalError
                }
                onChange={(e) => handleAllErrors(name, e)}
            />
            {firstNameError ? <AlertMessageFirstNameError /> : null}
            {lastNameError ? <AlertMessageLastNameError /> : null}
            {emailError ? <AlertMessageEmailError /> : null}
            {phoneError ? <AlertMessagePhoneError /> : null}
            {addressError ? <AlertMessageAddressError /> : null}
            {codePostalError ? <AlertMessagePostalCodeError /> : null}
        </>
    );
}
