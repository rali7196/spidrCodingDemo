import React, {
    useCallback,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
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

const InterestForm: React.FC<InterestFormProps> = (
    props: InterestFormProps
) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        props.setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(props.form);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className={`glass-box ${props.submitted ? styles["slide-out"] : ""}`}
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
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={props.form.lastName}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={props.form.phone}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
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
            />

            <PinField submitted={props.submitted} setSubmitted={props.setSubmitted} setForm={props.setForm}/>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button
                    variant="outlined"
                    className={styles["hollowButton"]}
                    onClick={() => {
                        props.setSubmitted(true);
                    }}
                >
                    Submit
                </Button>
            </div>
        </Box>
    );
};

export default InterestForm;
