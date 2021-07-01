import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {suggestions} from "./indiceCompetance"
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRecrutement.css'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,

} from "@material-ui/core";

import "date-fns";

import "moment/locale/fr";



class Competance extends Component {

  state = {
    titre: "",
    niveau: "",
    index:this.props.dd.map((p,index) =>  {  if(p.props.id==this.props.id) { this.ind=index} })
  
  }; 

  



  componentWillMount = () => {
    this.props.setInfoop2({'competance':[...this.props.dd]})
    this.props.setdatacompetance(this.props.datacompetance )



    if (this.props.datacompetance !=null )
     {
      for(var i =0; i<this.props.datacompetance .length;i++)
      {

        if(this.props.datacompetance [i].id==this.props.id){
          this.setState({
            titre: this.props.datacompetance [i].titre,
            niveau: this.props.datacompetance [i].niveau,
      
          })
        }
      }
     
       
   
     }
     
   
   }
  handleSubmit = event => {


if(this.props.datacompetance [this.ind]==null &&  this.state.titre!=="")
{

    this.props.datacompetance.push({titre:this.state.titre,niveau:this.state.niveau,id:this.props.id,iddivh:this.props.iddivh,iddiv:this.props.iddiv,d1:this.props.d1,b:true,del:false})
    
      this.props.setdatacompetance([], function () {
      console.log('valdip',this.props.datacompetance )
    });
    this.props.setdatacompetance(this.props.datacompetance , function () {
      console.log('valdip',this.props.datacompetance )
    });
  this.props.dd[this.ind].props.dipl.titre=this.state.titre;
  this.props.dd[this.ind].props.dipl.niveau=this.state.niveau;
  this.props.setInfoop2({'competance':[]})

   this.props.setInfoop2({'competance':[...this.props.dd]})

  this.props.setPasse3(false);
  }
else 
{

console.log(this.props.datacompetance )
  this.props.datacompetance [this.ind].titre=this.state.titre;
  this.props.datacompetance [this.ind].niveau=this.state.niveau;
   
    this.props.dd[this.ind].props.dipl.titre=this.state.titre;
  this.props.dd[this.ind].props.dipl.niveau=this.state.niveau;
     this.props.setdatacompetance(this.props.datacompetance )
     this.props.setInfoop2({'competance':[]})

     this.props.setInfoop2({'competance':[...this.props.dd]})

    document.getElementById(this.props.iddivh).style.display = "none";
     document.getElementById(this.props.iddiv).style.display = "block";



}
  
   /*this.props.dd.competance[this.props.id].props.setInfoop([{'competance':[this.props.dd.competance]}])*/

  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  render() {

    let {
      titre,
      niveau,
      
    } = this.state;


    return (
      <div id={this.props.d1}  >
      <div  id={this.props.iddivh}  >
      <ValidatorForm
      ref="form"
      onSubmit={this.handleSubmit}
      onError={errors => null}
    >
    
          <div   className="row" >
            <div className="col-7" >
            <TextValidator
              label="Titre"
              className="mb-4 w-full "

              width={'100%'}
              onChange={this.handleChange}
              type="text"
              name="titre"
              value={titre}
              validators={["required"]}
              errorMessages={['Titre invalide']}
              InputProps={{

                endAdornment: (
                  <InputAdornment position="end">
                    <Icon style={{ fontSize: "1rem", marginRight: 6, color: "#909497" }}> star_half  </Icon>
                  </InputAdornment>
                )

              }}

            />
        
        </div>
        <div className="col-5">
            <Autocomplete
              value={niveau}
              name='niveau'
              width={'100%'}

              onChange={(event, value) => { this.setState({ niveau: value }) }}
              options={suggestions.map(option => option.label)}
          
              disableClearable={true}
              renderOption={(option, { selected }) => (

                <span style={{ color: '#000000',fontSize:'10px' ,marginLeft:"-10px"}}>{option}</span>

              )}
              renderInput={params => (
                <TextValidator
                  {...params}
                value={niveau}
                validators={["required"]}
                errorMessages={['Niveau invalide']}
                  label="Niveau"
                  variant="standard"
                />
              )}
            />

</div>
            </div>
          <div  style={{ textAlign: 'left',marginTop:"-3%"}}>
            <Button style={{ border: 'solid 2px  #7467ef', borderRadius: '3px', backgroundColor: '#7467ef', color: '#FFFFFF' }} type="submit">
              ENREGISTRER
           </Button>
            <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px',marginLeft:"1%",padding:'6px' }} aria-label="Delete" onClick={e => {
              this.setState({
                titre: "", nombrep: "",
                titre: "",
                niveau: '',
              });             }}>
              <Icon style={{ fontSize: "1rem" }}>clear</Icon>
            </IconButton>
         

          </div>
      
</ValidatorForm>
</div>


</div>
    );
  }
}

export default Competance;
