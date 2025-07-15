import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import InterestForm from "./components/InterestForm/InterestForm";

const App: React.FC = () => {

    const price:number = Math.floor(Math.random() * 300) + 1;
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <InterestForm price={price}/>
        </ThemeProvider>
    )

};

export default App;
