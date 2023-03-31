const url = "https://enovode7uq1r.x.pipedream.net/";

export async function fetchPost(inputData) {
    // Start of creating the json in the requested format***************************
    const {
            country, email, first_name, last_name, phone, postal_code, street } = inputData; // prettier-ignore
    const userInfoJSON = {
        questions: [
            {
                title: "Parlez-nous de vous",
                fields: [
                    {
                        name: first_name,
                        label: "Prénom",
                        type: "text",
                    },

                    {
                        name: last_name,
                        label: "Nom",
                        type: "text",
                    },
                    {
                        name: email,
                        label: "Email",
                        type: "text",
                    },
                    {
                        name: phone,
                        label: "Téléphone",
                        type: "text",
                    },
                ],
            },
            {
                title: "Votre adresse",
                fields: [
                    {
                        name: street,
                        label: "Adresse",
                        type: "text",
                    },
                    {
                        name: postal_code,
                        label: "Code postal",
                        type: "text",
                    },
                    {
                        name: country,
                        label: "Pays",
                        type: "dropdown",
                        options: [
                            {
                                value: "CA",
                                label: "Canada",
                            },
                            {
                                value: "US",
                                label: "USA",
                            },
                        ],
                    },
                ],
            },
        ],
    };
    // console.log(`this is the new JSON i want to send`);
    // console.log(userInfoJSON);
    // End of creating the json in the requested format ****************************

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(userInfoJSON),
    };

    // console.log(`this is the body already stringified of the JSON I'm sending`);
    // console.log(options.body);

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error("Error while fetching. Fetch not fulfilled");
        }

        const bigData = response.json();
        // console.log(bigData);

        // setting the JSON in localStorage ********************
        localStorage.setItem("userInfo", options.body);
        // END of setting the JSON in the localStorage ****************
        return bigData;
    } catch (error) {
        console.log(error);
    }
}
