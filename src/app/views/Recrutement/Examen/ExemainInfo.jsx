import React, { Component } from "react";
import { Autocomplete} from "@material-ui/lab";
import {  InputAdornment ,IconButton } from "@material-ui/core";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";


import {
  Button,
  Icon,
  Grid,
  Checkbox
} from "@material-ui/core";

import "date-fns";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";
import { event } from "jquery";
import { SignalCellularNullOutlined } from "@material-ui/icons";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="secondary"/>;
const checkedIcon = <CheckBoxIcon fontSize="small" className="secondary"/>;

const styles = theme => ({
  root:{
    tag: {
      
       color:"red",      // Hover
      '&[data-focus="false"]': {
color:'red',
        borderColor: 'red',
      },
    },
   backgroundColor:"white",
   borderRadius:30,
   '& options': {
      color: 'red',
    },
    /*'& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },*/
 
     
  }
 
});

class ExemainInfo  extends Component {


  

    state = {
      duree: "", 
      nombreq: "",
      titre: "",
      edit:true,
    }

  

;
 

      
  handleSubmit = event => {
    this.setState({ edit:false});
 
  this.props.setexinfo(this.state)
    
    
  };


  handleEdit = event => {

 

 
 
   

  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  };





  render() {
    const { classes } = this.props;

    let {
      duree, 
      nombreq,
      titre,
      dateex
   

    } = this.state;

      const dur= [
        { label: "15 min" },
        { label: "30 min" },
        { label: "45 min" },
        { label: "1h" },
        { label: "1h 15min" },
        { label: "1h 30min"  },
        { label: "1h 45min"  },
        { label: "2h" },


      ]; 

  return(
<div>
     {this.state.edit==true ? (
           <div id="divv">
           <br></br>
                 <ValidatorForm
                   ref="form"
                   onSubmit={this.handleSubmit}
                   onError={errors => null}
                 >
                     <Grid >
                       <br></br> 
                    
                     <div className="row" style={{marginTop:"-1%"}}>
                     <div className="col-12" style={{textAlign:"left"}}>   
                     <TextValidator
                     style={{fontSize:'10px' }}
                         className="mb-4 w-full"

                         label="Titre"
                         onChange={this.handleChange}
                         type="text"
                         name="titre"
                         value={this.state.titre}
                         validators={["required"]}
                         errorMessages={['veuillez renseigner ce champ']}
                         InputProps={{
                         
                             endAdornment: (
                               <InputAdornment position="end" >
           <Icon style={{fontSize: "1rem",marginRight:6 ,color:"#909497"}}> featured_play_list </Icon>                      
           </InputAdornment>
                             )
                           }}
                       />
              
                            
                            </div>
                     
          
                        </div>
                        <Grid>
                        <div className="row" style={{marginTop:"-1%"}}>

              <div className="col-md-6" style={{textAlign:"left"}}>   
                            
                            <Autocomplete
                              
                              value={duree}
                              name="duree"
                     
                              onChange={(event, value) =>{ this.setState({duree:value})}}
                              options={dur.map(option  => option.label )}
                        
                              disableClearable={true}
                              renderOption={(option, { selected }) => (
                                <React.Fragment>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  
                                  />
                                  <span  style={{ color: '#000000' }}>{option}</span>
                                </React.Fragment>
                              )}
                              renderInput={params => (
                                <TextValidator
                                  {...params}
                                  label="&nbsp;Durée"
                                  variant="standard"
                                  validators={["required"]}
                                  errorMessages={['veuillez renseigner ce champ']}
                                  
                                  fullWidth
                                  value={duree}
                  
                                />
                              )}
                            /> 
                            </div>
                            <div className="col" style={{textAlign:"left"}}>   
              <TextValidator
                         className="mb-8 w-full"
                         label="&nbsp;Nombre de questions à sélectionner"
                         onChange={this.handleChange}
                         type="number"
                         name="nombreq"
                         value={nombreq}
                         validators={[
                           "required",
                           'minNumber:1',
                         ]}
                         errorMessages={['veuillez renseigner ce champ','Invalid nombre de postes format']}
                         InputProps={{
                         
                             endAdornment: (
                               <InputAdornment position="end">
           <Icon style={{fontSize: "1rem",marginRight:6,color:"#909497"}}> add </Icon>                      
           </InputAdornment>
                             )
                           }}
           
                       />
                        </div> </div>
              </Grid>
                 
                            <div style={{marginTop:'-1%'}}  >
   
                 <IconButton style={{border :'solid 2px  #7467ef',float:'right',borderRadius:'3px',padding:'6px',margin: '5px'
                 ,backgroundColor:'#7467ef'}} aria-label="Delete" 
                 className="mt-4"

                 onClick={e=>{     this.setState({ titre: "", nombreq: "",
          
                 duree:null,
                });
                 
               }}>
                   <Icon style={{fontSize: "1rem",color:'#FFFFFF'}}>clear</Icon>
                 </IconButton>
                 <Button
                      style={{float:'right',margin: '5px'}}
                       className="mt-4"
                       variant="contained"
                       color="secondary"
                       type="submit"
           
           
                     >
                    ENREGISTRER
                 </Button>
                 </div>
                     </Grid>
           
             
                 </ValidatorForm>
               
           
             
               </div>    
                ) : (

                  <div id="divh">
                  <div style={{marginTop:'2%'}}>
                  <div  style={{fontWeight:"bold",fontSize:'18px'}}>{this.state.titre}</div >
                  <br></br>
                  <div  style={{textAlign:"left",fontSize:'14px'}}>
                  <div  style={{color:'#7467ef',fontSize: '14px'}}  >
                    <span className="col-6"><Icon style={{fontSize: "14px",padding:"0%",margin:"0%"}}> access_time </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>Durée :</span><span style={{color:"#999999",marginLeft:'5px'}}> {this.state.duree}</span></span> 
                    <span className="col-6" style={{marginLeft:'20%'}} > <Icon style={{fontSize: "14px",padding:"0%",margin:"0%"}}> assignment </Icon> <span style={{color:"#000000",padding:"0%",margin:'1px'}}>Nombre de questions à sélectionner :</span><span style={{color:"#999999",marginLeft:'5px'}}>{this.state.nombreq} </span></span> 
                    <div  style={{marginTop:'-5%',marginBottom:'9%'}}>
               
                      <IconButton style={{border :'solid 2px  #7467ef',float:'right',borderRadius:'3px',padding:'6px'
                 ,backgroundColor:'#7467ef'}} aria-label="Delete" 
                 className="mt-4"
                 onClick={e=>{ this.setState({edit:true}) ;
                      
                }}>
                   <Icon style={{fontSize: "1rem",color:'#FFFFFF'}}>create</Icon>
                 </IconButton>  
                  
                      
                      </div ></div >
                
            
                

                  </div >
                  
                      
                  </div>
                  </div>
                                      )}



  
    </div>
)



  }
}

export default withStyles(styles, { withTheme: true })(ExemainInfo);
           
           