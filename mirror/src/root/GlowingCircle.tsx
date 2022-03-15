import React from "react";
import {makeStyles} from "@material-ui/core";
import theme from "../theme";

const first = theme.palette.secondary.light;
const second = theme.palette.info.main;
const third = theme.palette.info.dark;

const useStyles = makeStyles(() => ({
    animation: {
        height: '120px',
        width: '120px',
        margin: "0px 10px 0px 10px",
        borderRadius: '50%',
        animation: '$fade-in .5s, $spin 25s infinite alternate',
    },
    "@keyframes fade-in": {
        "from": { opacity: 0 },
        "to": { opacity: 1 },
    },
    // bubble size: ca 15px, muss die differenz aus den offsets ergeben
    '@keyframes spin': {
        '0%': {
            boxShadow: `inset 8px 0 10px ${third},inset 0 15px 15px ${second},inset -7px -5px 8px ${first},
            -5px 0 50px ${third},-2px 0 8px ${third}, 2px -8px 10px ${second}, 0px 4px 10px ${first}`,
        },
        '17%': {
            boxShadow: `inset -8px 1px 10px ${third},inset -5px 10px 10px ${second},inset 2px -5px 6px ${first},
            5px 0px 50px ${third},2px 0px 8px ${third}, 0px -11px 10px ${second}, -9px 5px 10px ${first}`,
        },
        '35%': {
            boxShadow: `inset -8px 0 8px ${third},inset 0 15px 10px ${second},inset 5px 2px 4px ${first},
            5px 0 50px ${third},2px 0 8px ${third}, 0px -15px 10px ${second}, -3px  2px 10px ${first}`,
        },
        '50%': {
            boxShadow: `inset -8px -1px 8px ${third},inset 0 13px 11px ${second},inset 5px 2px 4px ${first},
            5px 0 45px ${third},2px 0 8px ${third}, 0px -12px 10px ${second}, 2px 1px 10px ${first}`,
        },
        '65%': {
            boxShadow: `inset -1px -2px 10px ${first},inset 0 15px 13px ${second},inset -7px -5px 8px ${third},
            -2px -3px 50px ${first},-2px 0 8px ${first}, 2px -8px 10px ${second}, 0px 4px 10px ${third}`,
        },
        '78%': {
            boxShadow: `inset 1px -1px 10px ${first},inset -5px 10px 10px ${second},inset 2px 5px 6px ${third},
            0px 4px 50px ${first},2px 0 8px ${first}, 0px -15px 10px ${second}, -2px -2px 10px ${third}`,
        },
        '100%': {
            boxShadow: `inset 1px -2px 10px ${first},inset -5px 7px 10px ${second},inset 5px 2px 4px ${third},
            0px 4px 50px ${first},2px 0 8px ${first}, 5px -10px 14px ${second}, -2px  -1px 10px ${third}`,
        },
    },
}))


const GlowingCircle: React.FC = () => {
    const classes = useStyles();


    return (
        <div className={classes.animation} />
    )
}
export default GlowingCircle;


