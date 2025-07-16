import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { SPIDR_PIN } from "../../constants/constants";
import "../../App.css";
import type FormState from "../../types/FormState";

interface PinFieldProps {
    submitted: boolean;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
}

const PinField: React.FC<PinFieldProps> = (props: PinFieldProps) => {
    const [display, setDisplay] = useState("");

    const handleChange = (e: { target: { value: string } }) => {
        // 1) strip non-digits, 2) cap at 16
        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
        // 3) insert hyphens every 4 digits
        const withHyphens = raw.match(/.{1,4}/g)?.join("-") || raw;
        props.setForm((prev) => ({...prev, 'pin':withHyphens}))
        setDisplay(withHyphens);
    };

    return (
        <TextField
            label="Spidr Pin"
            placeholder="xxxx‑xxxx‑xxxx‑xxxx"
            value={display}
            onChange={handleChange}
            fullWidth
            className="whiteTextField"
            inputProps={{
                inputMode: "numeric", // mobile number pad
                style: {
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                },
            }}
        />
    );
};

export default PinField;
