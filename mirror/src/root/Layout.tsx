import React from 'react';
import {makeStyles} from '@material-ui/core';
import './animationStyle.css';
import Menu from "./Menu";

const useStyles = makeStyles(() => ({

  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0%',
    pointerEvents: "none"
  },
  menu: {
    position: 'absolute',
    top: '40%',
    height: '20%',
    left: "-100px",
    display: 'flex',
    alignItems: 'center'
  },
  animation: {
    height: '120px',
    width: '120px',
    margin: "0px 10px 0px 10px",
    borderRadius: '50%',
    animation: '$spin 25s infinite alternate',
  },
  animation2: {
    height: '5px',
    width: '40%',
    borderRadius: '50%',
    marginRight: '200px',
    animation: '$spin 25s infinite alternate',
  },

  '@keyframes mover': {
    '0%': { transform: 'translateX(0px)' },
    '100%': { transform: 'translateX(400px)' },
  },
}));

const Layout: React.FC = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.background}>
        <div className={"animationFadeIn"} />
      </div>
      <div className={classes.menu}>
        <Menu/>
      </div>
    </>
  );
};
export default Layout;
