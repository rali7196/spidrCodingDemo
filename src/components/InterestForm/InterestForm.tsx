import React, {
    useCallback,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { InputMask } from "@react-input/mask";

interface FormState {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    guess: string;
    pin: string;
}

const InterestForm: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        guess: "",
        pin: "",
    });

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: "auto",
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Interest Form
            </Typography>

            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Guess the Cost ($)"
                name="guess"
                type="number"
                value={form.guess}
                onChange={handleChange}
                margin="normal"
            />

            <InputMask
                mask="9999-9999-9999-9999"
                replacement={{ "9": /\d/ }}
                value={form.pin}
                onChange={handleChange}
                component={TextField}
                fullWidth
                label="Spidr PIN"
                name="pin"
                margin="normal"
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};

export default InterestForm;
