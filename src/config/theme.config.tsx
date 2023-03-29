import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

type ThemeProp = {
    children: JSX.Element;
};

export enum themePalette {
    BG = "#0d1b2a",
    BLUE = "#778DA9",
    FONT_GLOBAL = "'Barlow Condensed', sans-serif",
};

const theme = createTheme({
    palette:{
        mode:"dark",
        background:{
            default: themePalette.BG,
        },
        primary:{
            main: themePalette.BLUE,
        },
    },
    typography:{
        fontFamily: themePalette.FONT_GLOBAL,
    },
    components:{
        MuiButton:{
            defaultProps: {
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: "0.5em",
                },
            },
        },
    },
});

export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
    </ThemeProvider>;
};