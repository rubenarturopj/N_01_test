import { useEffect, useState } from "react";
import { fetchPost } from "../Utilities/fetchPost";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import JSONfile from "./data";
import { SingleDropdownForm, ccountry } from "./SingleDropdownForm";
import { SingleTextForm } from "./SingleTextForm";
import Button from "@mui/material/Button";
import {
    AlertMessageErrorCountry,
    AlertMessageSuccess,
} from "./ErrorMessagesForm";
import {
    firstNameErrorEXPORT,
    lastNameErrorEXPORT,
    emailErrorEXPORT,
    phoneErrorEXPORT,
    addressErrorEXPORT,
    codePostalErrorEXPORT,
} from "./SingleTextForm";

// console.log(JSONfile);
// console.log(ccountry);
// console.log(ccountry.length);

export default function MyForms() {
    const bigArray = [
        ...JSONfile.questions[0].fields,
        ...JSONfile.questions[1].fields,
    ];
    // console.log(bigArray);

    // Start of state that will carry the name of the person ****************
    const [userName, setUserName] = useState("");
    // End of state that will carry the name of the person **********

    // Start of submitting the form *********
    const [isSubmitted, setIsSubmitted] = useState(false); // form is perfect and authorized to proceed
    const [formHasErrors, setFormHasErrors] = useState(false); // the form has errors
    const [countryIsSelected, setCountryIsSelected] = useState(false); // to check if a country was selected from the dropdown menu
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
    const [displayErrorCountryMessage, setDisplayErrorCountryMessage] =
        useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (ccountry === "") {
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
            phone: data.get("phone_number"),
            street: data.get("street_address"),
            postal_code: data.get("post_code"),
            country: ccountry,
        };
        console.log(
            `this is the data collected from the form to be sent through POST method`
        );
        console.log(inputData);

        setUserName(inputData.first_name); // to grab the name of the USER

        if (
            firstNameErrorEXPORT ||
            lastNameErrorEXPORT ||
            emailErrorEXPORT ||
            phoneErrorEXPORT ||
            addressErrorEXPORT ||
            codePostalErrorEXPORT ||
            countryIsSelected
        ) {
            setFormHasErrors(true);
            setIsSubmitted(false);
        } else {
            const result = await fetchPost(inputData);
            console.log(
                `this is the response from the API after fetch POST-ing`
            );
            console.log(result);
            console.log(Object.keys(result));
            console.log(Object.values(result));

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
    // end of submitting the form ************

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
    return (
        <>
            <Box
                id="myForm"
                component="form"
                validate="true"
                onSubmit={(e) => handleSubmit(e)}
                sx={{ mt: 1 }}
            >
                {bigArray.map((item) => {
                    if (Object.keys(item).length === 3) {
                        return <SingleTextForm key={item.name} data={item} />;
                    } else {
                        return (
                            <SingleDropdownForm key={item.name} data={item} />
                        );
                    }
                })}
                <Box style={{ textAlign: "center" }}>
                    {displayErrorCountryMessage && <AlertMessageErrorCountry />}
                    {displaySuccessMessage && <AlertMessageSuccess />}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        Enregistrer
                    </Button>
                </Box>
            </Box>
        </>
    );
}
