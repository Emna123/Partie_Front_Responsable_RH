
import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import authAxios from '../../../services/authAxios';
import {indiceniveaulangue} from "./LangueIndex"
import {suggestions} from "./LangueIndex"
import 'bootstrap/dist/js/bootstrap';
import './AppRecrutement.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,

} from "@material-ui/core";

import "date-fns";
import "moment/locale/fr";
import {langue} from "./langues"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="secondary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" className="secondary" />;
const useStyles = makeStyles((theme) => ({

  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));
class ModifLangue extends Component {

  state = {
    titre: "",
    niveau: "",
    index:this.props.dd.map((p,index) =>  {  if(p.props.id==this.props.id) { this.ind=index} })
  
  }; 

  



  componentWillMount = () => {
    this.props.setInfoop3({'langue':[...this.props.dd]})
    this.props.setdatalangue(this.props.datalangue )



    if (this.props.datalangue !=null )
     {
      for(var i =0; i<this.props.datalangue .length;i++)
      {

        if(this.props.datalangue[i].id==this.props.id){
          this.setState({
            titre: this.props.datalangue [i].titre,
            niveau: this.props.datalangue [i].niveau,
      
          })
        }
      }
     
       
   
     }
     
   
   }
  handleSubmit = event => {


if(this.props.datalangue [this.ind]==null &&  this.state.titre!=="")
{
  

    this.props.datalangue.push({titre:this.state.titre,niveau:this.state.niveau,id:this.props.id,iddivh:this.props.iddivh,iddiv:this.props.iddiv,d1:this.props.d1,b:true,del:false})
    
      this.props.setdatalangue([], function () {
      console.log('valdip',this.props.datalangue )
    });
    this.props.setdatalangue(this.props.datalangue , function () {
      console.log('valdip',this.props.datalangue )
    });
  this.props.dd[this.ind].props.dipl.titre=this.state.titre;
  this.props.dd[this.ind].props.dipl.niveau=this.state.niveau;
  this.props.setInfoop3({'langue':[]})

   this.props.setInfoop3({'langue':[...this.props.dd]})

  this.props.setPasse4(false);
  const url = window.location.href;

const id = url.substring(url.lastIndexOf('/') + 1, url.length);

var indiceniveau=indiceniveaulangue(this.state.niveau) ;

authAxios.post('LangueOffre/AddLangue/' + id, { langue: this.state.titre, niveau: this.state.niveau, require: req,value: indiceniveau}).then((res) => {

    this.props.datalangue[this.props.datalangue.length-1].idbase=res.data.langue.id 
    this.props.setdatalangue(this.props.datalangue, function () {
      console.log('idbase',this.props.datalangue)
    });
  })}
else 
{

console.log(this.props.datalangue )
  this.props.datalangue [this.ind].titre=this.state.titre;
  this.props.datalangue [this.ind].niveau=this.state.niveau;
   
    this.props.dd[this.ind].props.dipl.titre=this.state.titre;
  this.props.dd[this.ind].props.dipl.niveau=this.state.niveau;
     this.props.setdatalangue(this.props.datalangue )
     this.props.setInfoop3({'langue':[]})

     this.props.setInfoop3({'langue':[...this.props.dd]})


     var req=false;
     var indiceniveau=indiceniveaulangue( this.props.datalangue[this.ind].niveau) ;
     authAxios.put('LangueOffre/PutLangue/'+ this.props.datalangue[this.ind].idbase,  { id:this.props.datalangue[this.ind].idbase,langue: this.props.datalangue[this.ind].titre, niveau: this.props.datalangue[this.ind].niveau,value: indiceniveau }).then((res) => {
     
     })

    document.getElementById(this.props.iddivh).style.display = "none";
     document.getElementById(this.props.iddiv).style.display = "block";



}
  
   /*this.props.dd.langue[this.props.id].props.setInfoop([{'langue':[this.props.dd.langue]}])*/

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
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <div id={this.props.d1} >
              <div id={this.props.iddivh} >
                <div  className="row"  >
                  <div className='col-7'>
                  <Autocomplete
                    value={titre}
                    name='titre'
                    style={{ width:'100%'}}
    
                    onChange={(event, value) => { this.setState({ titre: value }) }}
                    options={langue.map(option => option.label)}
    
                    // style={{ width: 100 }}
                    disableClearable={true}
                    renderOption={(option, { selected }) => (
    
                      <span style={{ color: '#000000', fontSize: '10px', marginLeft: "-10px" }}>{option}</span>
    
                    )}
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        value={titre}
                        validators={["required"]}
                        errorMessages={['Langue invalide']}
                        label="Langue"
                        variant="standard"
                      />
                    )}
                  />
    
    </div>
    <div className='col-5'>
                  <Autocomplete
                    value={niveau}
                    name='niveau'
                    style={{ width: '100%'  }}
    
                    onChange={(event, value) => { this.setState({ niveau: value }) }}
                    options={suggestions.map(option => option.label)}
    
                    // style={{ width: 100 }}
                    disableClearable={true}
                    renderOption={(option, { selected }) => (
    
                      <span style={{ color: '#000000', fontSize: '10px', marginLeft: "-10px" }}>{option}</span>
    
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
                <div style={{ textAlign: 'left', marginTop: "2%" }}>
                  <Button style={{ border: 'solid 2px  #7467ef', borderRadius: '3px', backgroundColor: '#7467ef', color: '#FFFFFF' }} type="submit">
                    ENREGISTRER
               </Button>
                  <IconButton style={{ border: 'solid 2px  #909497', borderRadius: '3px', marginLeft: "1%", padding: '6px' }} aria-label="Delete" onClick={e => {
                    this.setState({
                      titre: "", nombrep: "",
                      titre: "",
                      niveau: '',
                    });
                  }}>
                    <Icon style={{ fontSize: "1rem" }}>clear</Icon>
                  </IconButton>
    
    
                </div>
              </div>
    
    
            </div>
          </ValidatorForm>
    
        );
  }
}

export default ModifLangue;
