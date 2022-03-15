import React, {useState} from "react";
import "./menu.css";
import GlowingCircle from "./GlowingCircle";
import {makeStyles} from "@material-ui/core";
import {IconButton} from "@mui/material";
import {useHistory} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {Note} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    glowingCircle: {
        paddingLeft: "120px",
    },
    menuItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"

    }
}));

export interface MenuItem {
    icon: React.ReactNode,
    onClicked: () => void,

}
const Menu: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [menuOpen, setMenuOpen] = useState(false);

    const getDummyMenuItems = (): Array<MenuItem> => [
        {
            icon: <HomeIcon style={{color: "white"}} fontSize="large"/>,
            onClicked: () => {
                history.push("/")
                setMenuOpen(false)
            }
        },
        {
            icon: <Note style={{color: "white"}} fontSize="large"/>,
            onClicked: () => {
                history.push("/note")
                setMenuOpen(false)
            }
        },
        {
            icon: <HomeIcon style={{color: "white"}} fontSize="large"/>,
            onClicked: () => {
                console.log("Home")
                setMenuOpen(false)
            }
        },
        {
            icon: <HomeIcon style={{color: "white"}} fontSize="large"/>,
            onClicked: () => {
                console.log("Home")
                setMenuOpen(false)
            }
        },
    ]
    return (
        <>
            <div className={classes.glowingCircle} onClick={() => setMenuOpen(!menuOpen)}>
                <GlowingCircle/>
            </div>
            {menuOpen &&
            <div id="menu">
                {getDummyMenuItems().map((menuItem, index) => (
                    <div className={`item${index+1} item`} key={index}>
                        <div className="content">
                            <div>
                            <IconButton onClick={menuItem.onClicked}>
                                {menuItem.icon}
                            </IconButton>
                            </div>
                        </div>
                    </div>
                ))}


                <div id="center" onClick={() => setMenuOpen(false)}>
                </div>
            </div>
            }

        </>
    )
}




export default Menu;


/*
                <div className="item5 item">
                    <div className="content"><a href="#five">five</a></div>
                </div>
                <div id="wrapper6">
                    <div className="item6 item">
                        <div className="content"><div>six</div></div>
                    </div>
                </div>


 */