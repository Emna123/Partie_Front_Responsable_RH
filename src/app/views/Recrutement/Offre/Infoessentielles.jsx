import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment ,IconButton } from "@material-ui/core";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from '@material-ui/core/FormHelperText';
import {country} from "../Offre/country";
import axios from 'axios';
import history from "history.js";
import authAxios from '../../../services/authAxios';

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
import { event } from "jquery";
import { SignalCellularNullOutlined } from "@material-ui/icons";
import { indexOf } from "lodash";

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

class Infoessentielles  extends Component {


  

  
  state = {
    titre: "",
     nombrep: "",
     date:"",
     type: "",
     ex:"",
     dobError: '',
     lie:[],
     cont:"",
     edit:false,
     id:0,
     date_publication:""

   }

 

;

componentWillMount = () => {
 var offre={};
   const url = window.location.href;
   console.log("url",url)

   const id = url.substring(url.lastIndexOf('/') + 1, url.length);


      authAxios.get('Offre/getOffre/'+id).then((res)=>{
        if(res.data!=0)
     {   console.log('resdata',res.data)
        var tab=[]
       var  stringnv=res.data.niveau_pro+', '

     console.log('chaine',stringnv.length)

        this.setState({
        titre:res.data.titre,
        type:res.data.type_offre,
        date:res.data.date_expiration,
       ex:res.data.annee_exp,
        lie:res.data.lieu_travail.split(', '),
        cont:res.data.type_contrat,
        date_publication:res.data.date_publication,
        id:id,
        nombrep:res.data.nbr_poste
     

        }
        
        
        )}
        else{
          history.push('/session/NotFound')
  
        }
          
})}

  

;
 
    

 
      
  handleSubmit = event => {

    this.setState({edit:false})

    
   var liech="";
   var exch="";
   var niveauch="";
for (var i=0;i<this.state.lie.length;i++)
{
  if(i+1==this.state.lie.length)
  {liech+=this.state.lie[i];}
else
  {liech+=this.state.lie[i]+", ";}
}


  

var offre={
  titre: this.state.titre,
  type_offre: this.state.type,
  date_expiration:this.state.date,
  type: this.state.type,
  niveau_pro: niveauch,
  annee_exp:this.state.ex,
  lieu_travail:liech,
  type_contrat:this.state.cont,
  date_publication:this.state.date_publication,
  nbr_poste:parseInt(this.state.nombrep),
  lie:this.state.lie,
  ex:this.state.ex,
  nombrep: this.state.nombrep,
id:this.state.id
}

authAxios.put('Offre/PutOffre/'+this.state.id, offre).then((res) => {

})


    
  };


  handleEdit = event => {

 

 
 
   

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
     {(this.state.titre.titre =="")||this.state.edit==true ? (
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
                               <InputAdornment position="end" >
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
                       options={contrat.map(option  => option.label )}
                 
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
                           <span  style={{ color: '#000000' }}>{option}</span>
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
            errorMessages={this.state.date ? null : this.state.dobError} 
           
                         style={{color:'#909497'}}
                           className="mb-4 w-full"
                           margin="none"
                           id="mui-pickers-date"
                           label="Date Expiration"
                           inputVariant="standard"
                           type="text"
                           minDate={new Date()}
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
           
               
                <br></br><br></br>
                
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
                 </div><br></br>
                     </Grid>
                   </Grid>
              
                 </ValidatorForm>
               
           
             
               </div>    
                ) : (

                  <div id="divh" >
                  <div style={{backgroundColor:"#F2F3F4",width:"50%",padding:'2%',borderRadius:"5px",marginLeft:"25px",lineHeight:2}}>
                  <div  style={{fontWeight:"bold",fontSize:'18px'}}>{this.state.titre}</div >
                  <div  style={{fontWeight:"bold",color:'#707B7C'}}>
                  <Icon style={{fontSize: "11px",marginRight:6 ,color:"#7467ef",padding:"0%",margin:"0%"}}> place </Icon>                      
                  
                  
                  {this.state.lie.map((l, index) => (
                  <span style={{fontSize:'11px',marginLeft:"2px",padding:"0%",margin:"0%"}}>{l}  {this.state.lie.length!=index+1? (<span style={{marginLeft:"0px"}}>,</span>  ) : (<span></span>)}</span>
                  
                  ))
                  }
                  
                  </div >
                  
                  <div  style={{textAlign:"left",fontSize:'11px',lineHeight:3}}>
                  <div  style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> access_time </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>CRÉER LE</span><span style={{color:"#999999",marginLeft:'5px'}}>{new Date(this.state.date_publication).toLocaleString() }</span></div >
                  <div  style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> content_paste </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>TYPE DE L'OFFRE:</span> <span style={{color:"#999999",marginLeft:'5px'}}>{type}</span></div >
                  <div  style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> assignment </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>TYPE DE CONTRAT:</span><span style={{color:"#999999",marginLeft:'5px'}}>{cont}</span><span>
                  
                  
                  
                  
                  
                  </span></div >
                  <div  style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> assignment_ind </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>NOMBRE DE POSTES:</span><span style={{color:"#999999",marginLeft:'5px'}}>{nombrep}</span></div >
                  <div  style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> star_border </Icon> <span style={{color:"#000000",padding:"0%",margin:"0%"}}>ANNÉES D'EXPÉRIENCE DEMANDÉES:</span>
               
                  <span style={{color:"#999999",marginLeft:'5px'}}>{this.state.ex}</span>
                  </div >
               
                  <div  style={{color:'#7467ef',fontSize: '11px'}}><Icon style={{fontSize: "11px",padding:"0%",margin:"0%"}}> access_alarm </Icon>  <span style={{color:"#000000",padding:"0%",margin:"0%"}}>FERMER LE </span><span style={{color:"#999999",marginLeft:'5px'}}>{new Date(date).toLocaleString()}</span></div >
                  
                  </div >
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

export default withStyles(styles, { withTheme: true })(Infoessentielles);
           
           