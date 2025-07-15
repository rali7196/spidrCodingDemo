import React, { useRef, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import InterestForm from "./components/InterestForm/InterestForm";

const App: React.FC = () => {
    const logoRef = useRef(null);

    const updateLine = () => {
        if (!logoRef.current) return;
        // How many pixels from page‐top to the top edge of your logo container?
        const { top } = logoRef.current.getBoundingClientRect();
        // Write that into our CSS variable
        logoRef.current.style.setProperty("--line-height", `${top}px`);
    };

    useEffect(() => {
        updateLine(); // initial
        window.addEventListener("resize", updateLine); // catch zoom in many browsers
        return () => window.removeEventListener("resize", updateLine);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                }}
            >
                <InterestForm />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "auto",
                    }}
                    ref={logoRef}
                    className="logoContainer"
                >
                    <img
                        style={{ objectFit: "cover" }}
                        src={`${import.meta.env.BASE_URL}/spidr-logo.png`}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
