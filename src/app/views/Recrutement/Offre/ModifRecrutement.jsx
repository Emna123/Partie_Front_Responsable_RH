

import { Breadcrumb, SimpleCard } from "matx";
import React, { Component } from 'react'; 
import { Navbar, Nav, NavItem, NavDropdown, MenuItem,Button,Form,  FormGroup, FormControl, ControlLabel,li } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRecrutement.css'
import { size } from "lodash";
import { Icon } from "@material-ui/core";
import color from "@material-ui/core/colors/amber";
import MaxHeightMenu from "./MaxHeightMenu";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import StepperModif from "./StepperModif";

const ModifRecrutement= () => {


  return (

<div>
<div className="py-3" />
        <StepperModif   />

    </div>
  );
};

export default ModifRecrutement;

