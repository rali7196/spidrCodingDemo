import React, { useState } from "react";
import {
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import "../../App.css";
import type FormState from "../../types/FormState";

interface PinFieldProps {
    submitted: boolean;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
    setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof FormState, string>>>>
    errors?: Partial<Record<keyof FormState, string>>;
}

const PinField: React.FC<PinFieldProps> = (props: PinFieldProps) => {
    const [display, setDisplay] = useState("");
    const [showPin, setShowPin] = useState(false);

    const handleChange = (e: { target: { value: string } }) => {
        // 1) strip non-digits, 2) cap at 16
        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
        // 3) insert hyphens every 4 digits
        const withHyphens = raw.match(/.{1,4}/g)?.join("-") || raw;
        props.setForm((prev) => ({...prev, 'pin':withHyphens}))
        setDisplay(withHyphens);
        props.setErrors((prev) => {
            const updated = { ...prev };
            delete updated['pin']; // name is now keyof FormState, so this is allowed
            return updated;
        });
    };

    return (
        <TextField
            label="Spidr Pin"
            placeholder="xxxx‑xxxx‑xxxx‑xxxx"
            value={display}
            onChange={handleChange}
            fullWidth
            type={showPin ? "text" : "password"}
            className="whiteTextField"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onMouseDown={() => setShowPin(true)}
                            onMouseUp={() => setShowPin(false)}
                            onMouseLeave={() => setShowPin(false)} // Handles mouse leaving the button while pressed
                            edge="end"
                        >
                            <Visibility />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            inputProps={{
                inputMode: "numeric", // mobile number pad
                style: {
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                },
            }}
            error={!!props.errors?.pin}
            helperText={props.errors?.pin}
        />
    );
};

export default PinField;
