import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Icon } from "@material-ui/core";

import AlertCandidature from "../Candidature/AlertCandidature";

import React from 'react';

const options = [
  "Supprimer",


];

const ITEM_HEIGHT = 48;

function MaxHeightMenuCandidature(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [open5, setOpen5] = React.useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-owns={open ? "long-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 90
          }
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <span onClick={(event, value) => {



              setOpen5(true)




            }}>  {option}</span>
          </MenuItem>
        ))}
      </Menu>
      <AlertCandidature open={open5} setOpen={setOpen5} val={props.val} reff={props.reff} setref={props.setref} setOffre={props.setOffre} offre={props.offre} ind={props.ind}></AlertCandidature>

    </div>
  );
}

export default MaxHeightMenuCandidature;
