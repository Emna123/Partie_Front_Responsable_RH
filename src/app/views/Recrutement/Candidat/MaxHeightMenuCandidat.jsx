import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Icon } from "@material-ui/core";
import { BorderColor } from "@material-ui/icons";
import history from "history.js";
import AlertDialogSlide from "./AlertDialogSlide";

import React, { Component, useEffect, useState, updateState } from 'react';

const options = [
  "Archiver",


];

const ITEM_HEIGHT = 48;

function MaxHeightMenuCandidat(props) {

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

              if (option === "Archiver") {

                setOpen5(true)


              }
              else {
                console.log(props.val)

                history.push("/recrutement/ModifierOffre/" + props.val);
              }

            }}>  {option}</span>
          </MenuItem>
        ))}
      </Menu>
      <AlertDialogSlide open5={open5} setOpen5={setOpen5} cand={props.cand} tab={props.tab} ind={props.ind} settab={props.settab}></AlertDialogSlide>

    </div>
  );
}

export default MaxHeightMenuCandidat;
