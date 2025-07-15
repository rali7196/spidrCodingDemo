import React, {
    useCallback,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import PinField from "../PinField/PinField";
import type FormState from "../../types/FormState";
import { PRICE } from "../../constants/constants";
import styles from "./InterestForm.module.css";
import "../../App.css";

const InterestForm: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        guess: "",
        pin: "",
    });
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setSubmitted(false);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    const isCorrect = submitted && PRICE === Number(form.guess);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            // sx={{
            //     maxWidth: 400,
            //     mx: "auto",
            //     p: 3,
            //     bgcolor: "background.paper",
            //     borderRadius: 2,
            //     boxShadow: 3,
            // }}
            className={styles["glass-box"]}
        >
            <Typography variant="h5" gutterBottom style={{ color: "#56acbd" }}>
                Interest Form
            </Typography>

            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                margin="normal"
                className="whiteTextField"
            />
            <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
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
                value={form.guess}
                onChange={handleChange}
                margin="normal"
                // if you like, show the red error outline automatically
                error={submitted && !isCorrect}
                helperText={
                    submitted
                        ? isCorrect
                            ? `🎉 Correct! It was $${PRICE}.`
                            : `Sorry, it was $${PRICE}.`
                        : undefined
                }
                sx={{
                    // override the default outline color when submitted
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: submitted
                            ? isCorrect
                                ? "green"
                                : "red"
                            : undefined,
                    },
                    // also override on focus
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            borderColor: submitted
                                ? isCorrect
                                    ? "green"
                                    : "red"
                                : undefined,
                        },
                }}
            />

            <PinField submitted={submitted} setSubmitted={setSubmitted} />

            <Button
                variant="outlined"
                className={styles['hollowButton']}
                onClick={() => {setSubmitted(true)}}
            >
                Submit
            </Button>
        </Box>
    );
};

export default InterestForm;
