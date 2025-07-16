import React, {
    useCallback,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import PinField from "../PinField/PinField";
import type FormState from "../../types/FormState";
import styles from "./InterestForm.module.css";
import "../../App.css";

interface InterestFormProps {
    form: FormState;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
    submitted: boolean;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const InterestForm: React.FC<InterestFormProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<
        Partial<Record<keyof FormState, string>>
    >({});

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            // 1) Narrow the name to one of your form‑state keys
            const name = e.target.name as keyof FormState;
            const value = e.target.value;

            // update the form
            props.setForm((prev) => ({ ...prev, [name]: value }));

            // clear that field’s error
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[name]; // name is now keyof FormState, so this is allowed
                return updated;
            });
        },
        [props.setForm]
    );

    const handleFakeSubmit = () => {
        // validate all required fields
        const newErrors: Partial<Record<keyof FormState, string>> = {};
        if (!props.form.firstName) newErrors.firstName = "Required";
        if (!props.form.lastName) newErrors.lastName = "Required";
        if (!props.form.phone) newErrors.phone = "Required";
        if (!props.form.email) newErrors.email = "Required";
        if (!props.form.guess) newErrors.guess = "Required";
        if (!props.form.pin) newErrors.pin = "Required";

        if (props.form.pin.length != 16) newErrors.pin = "Must be 16 digits long";

        console.log(props.form, props.form.pin.length);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // no errors → proceed
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            props.setSubmitted(true);
        }, 2000);
    };

    return (
        <Box
            component="form"
            onSubmit={(e: FormEvent) => e.preventDefault()}
            className={`glass-box ${
                props.submitted ? styles["slide-out"] : ""
            }`}
        >
            <Typography variant="h5" gutterBottom style={{ color: "#56acbd" }}>
                Interest Form
            </Typography>

            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={props.form.firstName}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
                error={!!errors.firstName}
                helperText={errors.firstName}
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={props.form.lastName}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
                error={!!errors.lastName}
                helperText={errors.lastName}
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={props.form.phone}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
                error={!!errors.phone}
                helperText={errors.phone}
            />
            <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={props.form.email}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                fullWidth
                label="Guess the Cost ($)"
                name="guess"
                type="number"
                className="whiteTextField"
                value={props.form.guess}
                onChange={handleChange}
                margin="normal"
                error={!!errors.guess}
                helperText={errors.guess}
            />

            <PinField
                submitted={props.submitted}
                setSubmitted={props.setSubmitted}
                setForm={props.setForm}
                errors={errors}
                setErrors={setErrors}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                    variant="outlined"
                    className="hollowButton"
                    onClick={handleFakeSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress sx={{ color: "white" }} size={20} />
                    ) : (
                        "Submit Form"
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default InterestForm;
