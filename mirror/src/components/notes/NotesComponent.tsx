import React from "react";
import {FabricCanvasContainer} from "./containers";
import {Canvas, Toolbar} from "./index";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        left: "200px",
        width: "calc(100%-100px)",
        pointerEvents: "all"
    }
}))


const NotesComponent: React.FC = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            {/*

        <FabricCanvasContainer.Provider>
                    <Canvas />
                    <Toolbar />

            </FabricCanvasContainer.Provider>
            */}

        </div>

    )

};

export default NotesComponent;
