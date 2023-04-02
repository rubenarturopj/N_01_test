import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export function SingleDropdownForm({ data }) {
    const { label, name, type } = data;
    const optionsArray = data.options;
    // console.log(label, name, type);
    // console.log(data.options);

    // Start of dropdown menu *********
    const [country, setCountry] = useState("");
    const handleChange = (event) => {
        setCountry(event.target.value);
        // console.log(country);
    };
    // END of dropdown menu ************

    return (
        <>
            <FormControl
                fullWidth
                style={{
                    marginTop: "0rem",
                }}
            >
                <InputLabel id="demo-simple-select-label">{label}*</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    type={type}
                    value={country}
                    label={label}
                    onChange={handleChange}
                >
                    {optionsArray.map((item) => {
                        const { value, label } = item;
                        return (
                            <MenuItem key={value} value={value}>
                                {label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
}
