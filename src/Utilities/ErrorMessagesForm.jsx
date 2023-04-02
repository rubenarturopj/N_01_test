import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function AlertMessageFirstNameError() {
    return (
        <>
            <p id="helper-text-1">
                Le prénom doit être conformé d'au moins 2 caractères.
            </p>
        </>
    );
}

function AlertMessageLastNameError() {
    return (
        <>
            <p id="helper-text-1">
                Le nom doit être conformé d'au moins 2 caractères.
            </p>
        </>
    );
}

function AlertMessageEmailError() {
    return (
        <>
            <p id="helper-text-1">
                Assurez vous d'ingresser une adresse courriel valide.
            </p>
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

function AlertMessageAddressError() {
    return (
        <>
            <p id="helper-text-1">
                L'adresse doit être conformée au moins de 10 caractères.
            </p>
        </>
    );
}

function AlertMessagePostalCodeError() {
    return (
        <>
            <p id="helper-text-1">
                Le code postal doit être conformée au moins de 5 caractères.
            </p>
        </>
    );
}

function AlertMessageErrorCountry() {
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

export {
    AlertMessageFirstNameError,
    AlertMessageLastNameError,
    AlertMessageEmailError,
    AlertMessagePhoneError,
    AlertMessageAddressError,
    AlertMessagePostalCodeError,
    AlertMessageErrorCountry,
    AlertMessageSuccess,
};
