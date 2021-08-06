import React, { useContext } from "react";
import { Button, Menu, MenuItem, Fade } from "@material-ui/core";
import Context from "../Store/Context";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { state, dispatch } = useContext(Context);
  const history = useHistory();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    toast.info("Logout successful", {
      autoClose: 3000,
    });
    dispatch({
      type: "LOGOUT",
      payload: { name: "", email: "", isLogin: false, toggle: false },
    });
    localStorage.removeItem("user-info");
    setTimeout(() => {
      history.push("/Login");
    }, 1500);
  };
  return (
    <>
      <ToastContainer />
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {state.name}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
}
