import { Box, Button, Typography } from "@mui/material";
import React from "react";
import styles from "./ThankYouCard.module.css";
import { PRICE } from "../../constants/constants";
import type FormState from "../../types/FormState";

interface ThankYouCardProps {
    form: FormState;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThankYouCard: React.FC<ThankYouCardProps> = (
    props: ThankYouCardProps
) => {
    return (
        <Box
            className={`glass-box ${
                props.show ? styles["slideIn"] : styles["initialState"]
            }`}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                p: 4,
            }}
        >
            {/* 1) Header */}
            <Typography variant="h5" gutterBottom>
                Thank you for your submission!
            </Typography>

            {/* 2) Echo back their inputs */}
            <Typography variant="subtitle1">
                <strong>First name:</strong> {props.form.firstName}
            </Typography>
            <Typography variant="subtitle1">
                <strong>Last name:</strong> {props.form.lastName}
            </Typography>
            <Typography variant="subtitle1">
                <strong>Phone number:</strong> {props.form.phone}
            </Typography>
            <Typography variant="subtitle1">
                <strong>Email address:</strong> {props.form.email}
            </Typography>
            <Typography variant="subtitle1">
                <strong>Your guess:</strong> ${props.form.guess}
            </Typography>

            {/* 3) Success / failure message */}
            {props.form.guess === PRICE ? (
                <Typography variant="h6" className={styles['successText']}>
                    🎉 Congratulations! You guessed the correct price!
                </Typography>
            ) : (
                <Typography variant="body1" className={styles['errorText']}>
                    ❌ Sorry, that’s not quite right. Please try again!
                </Typography>
            )}
            <div style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                    onClick={() => props.setShow(false)}
                    variant="outlined"
                    className="hollowButton"
                >
                    Edit your submission
                </Button>
            </div>
        </Box>
    );
};

export default ThankYouCard;
