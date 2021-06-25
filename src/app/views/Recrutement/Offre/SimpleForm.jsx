import React, { Component } from "react";
import { Autocomplete} from "@material-ui/lab";
import {  InputAdornment ,IconButton } from "@material-ui/core";


import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import {country} from "../Offre/country";

import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import MomentUtils from "@date-io/moment";
import "moment/locale/fr";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="secondary"/>;
const checkedIcon = <CheckBoxIcon fontSize="small" className="secondary"/>;

  

class SimpleForm  extends Component {


  

    state = {
      titre: this.props.offre.titre,
      nombrep: this.props.offre.nombrep,
      date:this.props.offre.date_expiration,
      type: this.props.offre.type,
      ex:this.props.offre.ex,
      dobError: '',
      lie:this.props.offre.lie,
      cont:this.props.offre.type_contrat,
      edit:false
    }

  

;
 

      
  handleSubmit = event => {

   
    
   var liech="";
for (var i=0;i<this.state.lie.length;i++)
{
  if(i+1==this.state.lie.length)
  {liech+=this.state.lie[i];}
else
  {liech+=this.state.lie[i]+", ";}
}


  

this.props.setdisb(false);     
var offre={
  titre: this.state.titre,
  type_offre: this.state.type,
  date_expiration:this.state.date,
  type: this.state.type,
  annee_exp:this.state.ex,
  lieu_travail:liech,
  type_contrat:this.state.cont,
  date_publication:new Date(),
  nbr_poste:parseInt(this.state.nombrep),
  lie:this.state.lie,
  ex:this.state.ex,
  nombrep: this.state.nombrep,

}
this.props.setOffre(offre)

this.setState({edit:false})


    
  };


  handleEdit = event => {

   document.getElementById("divv").style.display="none";  document.getElementById("divh").removeAttribute('style');this.props.setdisb(false);

 
 
   

  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

  };



  
  handleDateChange = date => {
    // console.log(date);
    if(date == null || date == undefined|| date==""){
      this.setState({
        dobError: 'Please select your date of birth'
      });
    }else{
      this.setState({
        dobError: '',
        date: date
      });
    }
    
  };

  render() {
    const { classes } = this.props;

    let {
      nombrep,
      type,
      date,
      ex,
      lie,
      cont,
      titre,

    } = this.state;
    const niveaup = [
        { label: "Tous les niveaux" },
        { label: "stagiaire" },
        { label: "Étudiant" },
        { label: "Jeune diplômé" },
        { label: "Débutant" },
        { label: "Expérimenter" },
        { label: "Manager" },
        { label: "Responsable départemente" },
        { label: "Responsable d'équipe" },

      ];
      const expe= [
        { label: "Sans expérience" },
        { label: "Moins d'un an" },
        { label: "1 à 2 ans" },
        { label: "3 à 5 ans" },
        { label: "6 à 10 ans" },
        { label: "Plus de 10 ans" },


      ];
      const contrat= [
        { label: "CDI" },
        { label: "CDD" },
        { label: "Stage" },


      ]; 

  return(
<div>
     {(this.props.offre.titre =="")||this.state.edit==true ? (
           <div id="divv">
           <br></br>
                 <ValidatorForm
                   ref="form"
                   onSubmit={this.handleSubmit}
                   onError={errors => null}
                 >
                   <Grid container spacing={6}>
                     <Grid item lg={6} md={6} sm={12} xs={12}>
                       <br></br> 
                       <TextValidator
                         className="mb-4 w-full"
                         label="Titre de Recrutement"
                         onChange={this.handleChange}
                         type="text"
                         name="titre"
                         value={this.state.titre}
                         validators={["required"]}
                         errorMessages={['veuillez renseigner ce champ']}
                         InputProps={{
                         
                             endAdornment: (
                               <InputAdornment position="end"  >
           <Icon style={{fontSize: "1rem",marginRight:6 ,color:"#909497"}}> featured_play_list </Icon>                      
           </InputAdornment>
                             )
                           }}
                       />
           
                     <div className="row" style={{marginTop:"-1%"}}>
                     <div className="col-md-7 " style={{textAlign:"left"}}>   
                            
                     <Autocomplete
                       
                       className="mb-12 w-800"
                       value={cont}
                       name="cont"
              
                       onChange={(event, value) =>{ this.setState({cont:value})}}
                       options={contrat.map(option  => option.label.toString() )}
                       style={{width:'100%'}}
                       disableClearable={true}
                       renderOption={(option, { selected }) => (
                         <React.Fragment>
                           <Checkbox
                             icon={icon}
                             checkedIcon={checkedIcon}
                             style={{ marginRight: 8 }}
                             checked={selected}
                           
                           />
                           <span  style={{ color: '#000000' }}>{option.toString()}</span>
                         </React.Fragment>
                       )}
                       renderInput={params => (
                         <TextValidator
                           {...params}
                           label="Type de contrat"
                           variant="standard"
                           validators={["required"]}
                           errorMessages={['veuillez renseigner ce champ']}
                           
                           fullWidth
                           value={cont}
           
                         />
                       )}
                     /> 
                     </div>
                     <div className="col" style={{textAlign:"left"}}>   
              <TextValidator
              style={{width:'100%'}}
                         className="mb-8 w-full"
                         label="&nbsp;Nombre de postes"
                         onChange={this.handleChange}
                         type="number"
                         name="nombrep"
                         value={nombrep}
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
                        </div>
                        </div>
                        <div style={{marginTop:"-6%"}} >
                          <MuiPickersUtilsProvider  locale="fr"  utils={MomentUtils}  >
                         
                         <KeyboardDatePicker
           
                         style={{color:'#909497'}}
                           className="mb-4 w-full"
                           margin="none"
                           id="mui-pickers-date"
                           label="Date Expiration"
                           inputVariant="standard"
                           type="text"
                           minDate={new Date().setDate(new Date().getDate() + 1)}
                           autoOk={true}
                           value={date}
                           onChange={this.handleDateChange}
                           KeyboardButtonProps={{
                             "aria-label": "change date"
                             
                           }}
                         />  
                       </MuiPickersUtilsProvider>
                       </div>
                       <center style={{marginTop:8}}>
                       <RadioGroup
                         className="mb-4"
                         value={type}
                         name="type"
                         fontSize="small"
                         onChange={this.handleChange}
                         row
                    
                       >
                         <FormControlLabel
                           value="Stage"
                           control={<Radio color="secondary" />}
                           label="Stage"
                           fontSize={5}
                           labelPlacement="end"
           
                         />
                         <FormControlLabel
                           value="Emploi"
                           control={<Radio color="secondary" />}
                           label="Emploi"
                           fontSize={5}
                           labelPlacement="end"
           
                         />
                     
                       </RadioGroup>
                       </center>
           
                     </Grid>
                     <Grid item lg={6} md={6} sm={12} xs={12}>
                     <br></br><br></br>
   
           <Autocomplete
           style={{marginTop:"-1%"}}
                 multiple
                 id="tags-filled"
                 value={lie}
                 onChange={(event, newValue) => {
                   this.setState({lie:newValue});
                 }}
             
                 classes={{root:classes.root}}       
                  options={country.map(option => option.city )}
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
                 freeSolo
                 renderTags={(value, getTagProps) =>
                   value.map((option, index) => (
           
                    <Chip
                    classes={{root:classes.root}}       
           
                       variant="outlined"
                       label={option}
                       {...getTagProps({ index })}
                     />
                   ))
                 }
                  
              
                 
                 renderInput={params => (
                   <TextValidator
                     {...params}
                     variant="standard"
                     label="&nbsp;Lieu de l'emploi..."
                     value={lie}
                     fullWidth
                     validators={["required"]}
                     errorMessages={['veuillez renseigner ce champ']}
                     
                   />
                 )}
               /> 
                      <br></br> <br></br> 
                       <Autocomplete
                 id="tags-standard"
                 value={ex}
                 
                 onChange={(event, newValue) => {
                   this.setState({ex:newValue});
                 }}
                 options={expe.map(option  => option.label )}
                 validators={["required"]}
                 errorMessages={['Ce champ est requis']}
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
                     variant="standard"
                     label="&nbsp;Années d'expériences..."
                     value={ex}
                     fullWidth
                     validators={["required"]}
                     errorMessages={['veuillez renseigner ce champ']}
                   />
             
                 )}
               />
            
                
                <br></br><br></br><br></br>
                 <div className="pt-4" style={{textAlign:"right",display:'block',whiteSpace:'nowrap',marginBottom:"-6%"}}>
                 <Button
               
                      
                       variant="contained"
                       color="secondary"
                       type="submit"
           
                     >
                    ENREGISTRER
                 </Button>
                 <IconButton style={{border :'solid 2px  #7467ef',borderRadius:'3px',padding:'6px',marginLeft:'2%',backgroundColor:'#7467ef'}} aria-label="Delete" 
                 onClick={e=>{     this.setState({ titre: "", nombrep: "",
                 date: new Date(new Date().setDate(new Date().getDate() + 1)),
                 ex:"",
                 lie:[],
                 cont:"",
                 type: "Stage"});
                 
                
               }}>
                   <Icon style={{fontSize: "1rem",color:'#FFFFFF'}}>clear</Icon>
                 </IconButton>
                 </div>
                 <br></br>
                     </Grid>
                   </Grid>
              
                 </ValidatorForm>
               
           
             
               </div>    
                ) : (

                  <div id="divh">
                  <div style={{backgroundColor:"#F2F3F4",width:"50%",padding:'2%',borderRadius:"5px",marginLeft:"25px",marginTop:'1%',lineHeight:2}}>
                  <div style={{fontWeight:"bold",fontSize:'18px'}}>{this.state.titre}</div>
                  <div style={{fontWeight:"bold",color:'#707B7C'}}>
                  <Icon style={{fontSize: "11px",marginRight:6 ,color:"#7467ef",padding:"0%",margin:"0%"}}> place </Icon>                      
                  
                  
                  {this.state.lie.map((l, index) => (
                  <span  key={index} style={{fontSize:'11px',marginLeft:"2px",padding:"0%",margin:"0%"}}>{l}  {this.state.lie.length!=index+1? (<span style={{marginLeft:"0px"}}>,</span>  ) : (<span></span>)}</span>
                  
                  ))
                  }
                  <br></br>
                  </div>
                  
                  <div style={{textAlign:"left",fontSize:'11px',lineHeight:3}}>
                  <div style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> access_time </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>CRÉER LE</span><span style={{color:"#999999",marginLeft:'5px'}}>{new Date().toLocaleString() }</span></div>
                  <div style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> content_paste </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>TYPE DE L'OFFRE:</span> <span style={{color:"#999999",marginLeft:'5px'}}>{type}</span></div>
                  <div style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> assignment </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>TYPE DE CONTRAT:</span><span style={{color:"#999999",marginLeft:'5px'}}>{cont}</span><span>
                  
                  
                  
                  
                  
                  </span></div>
                  <div style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> assignment_ind </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>NOMBRE DE POSTES:</span><span style={{color:"#999999",marginLeft:'5px'}}>{nombrep}</span></div>
                  <div style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> star_border </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>ANNÉES D'EXPÉRIENCE DEMANDÉES:</span>
                  <span style={{color:"#999999",marginLeft:'5px'}}>{this.state.ex}</span>
                  </div>
                
                  <div style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> access_alarm </Icon>  <span style={{color:"#000000",padding:"0%",margin:"0%"}}>FERMER LE </span><span style={{color:"#999999",marginLeft:'5px'}}>{new Date(date).toLocaleString()}</span></div>
                  
                  </div>
                  <div style={{textAlign:'right'}}>
                  <Button
                        className="mt-4"
                        variant="contained"
                        color="secondary"
                        onClick={e=>{ this.setState({edit:true}) ;
                      
                      }}
                  
                      >
                        Éditer
                      </Button>
                      
                  
                      
                      </div>
                      
                  </div>
                  </div>
                                      )}



  
    </div>
)



  }
}

export default withStyles( { withTheme: true })(SimpleForm);
           
           