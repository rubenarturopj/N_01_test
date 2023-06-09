const JSONfile = {
    questions: [
        {
            title: "Parlez-nous de vous",
            fields: [
                {
                    name: "first_name",
                    label: "Prénom",
                    type: "text",
                },
                {
                    name: "last_name",
                    label: "Nom",
                    type: "text",
                },
                {
                    name: "email",
                    label: "Email",
                    type: "text",
                },
                {
                    name: "phone_number",
                    label: "Téléphone",
                    type: "text",
                },
            ],
        },
        {
            title: "Votre adresse",
            fields: [
                {
                    name: "street_address",
                    label: "Adresse",
                    type: "text",
                },
                {
                    name: "post_code",
                    label: "Code postal",
                    type: "text",
                },
                {
                    name: "country",
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

export default JSONfile;
