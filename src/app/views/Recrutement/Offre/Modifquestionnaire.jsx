
import React, { Component } from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { TextField, InputAdornment,IconButton } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import authAxios from '../../../services/authAxios';

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

import "date-fns";

import "moment/locale/fr";

const useStyles = makeStyles((theme) => ({

  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));
class Modifquestionnaire extends Component {

  state = {
    titre:"",
    description:"",
  index:this.props.dd.map((p,index) =>  {  if(p.props.id==this.props.id) { this.ind=index} })
  
  }; 

  



  componentWillMount = () => {

   this.props.setInfoop1({'questionnaire':[...this.props.dd]})
    this.props.setdataquestionnaire(this.props.dataquestionnaire)
  


    if (this.props.dataquestionnaire!=null )
     {
      for(var i =0; i<this.props.dataquestionnaire.length;i++)
      {

        if(this.props.dataquestionnaire[i].id==this.props.id){
          this.setState({
            titre: this.props.dataquestionnaire[i].titre,
            description: this.props.dataquestionnaire[i].description,
      
          })
        }
      }
     
       
   
     }
     
   
   }
  handleSubmit = event => {


if(this.props.dataquestionnaire[this.ind]==null &&  this.state.titre!=="")
{

    this.props.dataquestionnaire.push({titre:this.state.titre,description:this.state.description,id:this.props.id,iddivh:this.props.iddivh,iddiv:this.props.iddiv,d1:this.props.d1,b:true,del:false})
    this.props.setdataquestionnaire([], function () {
      console.log('valdip',this.props.dataquestionnaire)
    });
    this.props.setdataquestionnaire(this.props.dataquestionnaire, function () {
      console.log('valdip',this.props.dataquestionnaire)
    });
  this.props.dd[this.ind].props.dipl.titre=this.state.titre;
  this.props.dd[this.ind].props.dipl.description=this.state.description;
  this.props.setInfoop1({'questionnaire':[]})

   this.props.setInfoop1({'questionnaire':[...this.props.dd]})

  this.props.setPasse2(false);
  const url = window.location.href;

  const id = url.substring(url.lastIndexOf('/') + 1, url.length);

  authAxios.post('Questionnaire/AddQuestionnaire/' + id, { titre: this.state.titre, description: this.state.description}).then((res) => {


this.props.dataquestionnaire[this.props.dataquestionnaire.length-1].idbase=res.data.questionnaire.id
this.props.setdataquestionnaire(this.props.dataquestionnaire, function () {
  console.log('idbase',this.props.dataquestionnaire)
});

  })
  }
else 
{

  console.log( "modif",this.ind,this.props.id)
console.log(this.props.dataquestionnaire)
  this.props.dataquestionnaire[this.ind].titre=this.state.titre;
  this.props.dataquestionnaire[this.ind].description=this.state.description;
   
    this.props.dd[this.ind].props.dipl.titre=this.state.titre;
  this.props.dd[this.ind].props.dipl.description=this.state.description;
     this.props.setdataquestionnaire(this.props.dataquestionnaire)
     this.props.setInfoop1({'questionnaire':[]})

   this.props.setInfoop1({'questionnaire':[...this.props.dd]})
 
 
   authAxios.put('Questionnaire/PutQuestionnaire/'+ this.props.dataquestionnaire[this.ind].idbase,  { id:this.props.dataquestionnaire[this.ind].idbase,titre: this.props.dataquestionnaire[this.ind].titre, description: this.props.dataquestionnaire[this.ind].description }).then((res) => {
   
   })
   
    document.getElementById(this.props.iddivh).style.display = "none";
     document.getElementById(this.props.iddiv).removeAttribute('style') 



}
  
   /*this.props.dd.questionnaire[this.props.id].props.setInfoop([{'questionnaire':[this.props.dd.questionnaire]}])*/

  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {

    let {
    titre,
    description,
    } = this.state;

    return (
  
      <div id= {this.props.d1} >

     <div className='row-md-6 mb-3 bgd' id={this.props.iddivh} >
     <ValidatorForm
ref="form"
onSubmit={this.handleSubmit}
onError={errors => null}
>
<TextValidator
         className="mb-4 w-full"
         label="Titre"
         onChange={this.handleChange}
         type="text"
         name="titre"
         value={titre}
         validators={["required"]}
         errorMessages={['veuillez renseigner ce champ']}
         InputProps={{
         
             endAdornment: (
               <InputAdornment position="end">
<Icon style={{fontSize: "1rem",marginRight:6 ,color:"#909497"}}> star_half  </Icon>                      
</InputAdornment>
             )
           }}
       />


     <TextValidator
     multiLine
         className="mb-4 w-full "
         label="Description"
         rowsMax={5}

         onChange={this.handleChange}
         type="text"
         name="description"
         value={description}
         validators={["required"]}
         errorMessages={['veuillez renseigner ce champ']}
         InputProps={{
         
             endAdornment: (
               <InputAdornment position="end">
<Icon style={{fontSize: "1rem",marginRight:6,color:"#909497"}}> short_text </Icon>                      
</InputAdornment>
             )
           }}

       />
          
<div style={{marginTop:"1%"}}>
       <Button style={{border :'solid 2px  #7467ef',borderRadius:'3px',padding:'5px',backgroundColor:'#7467ef',color:'#FFFFFF'}} type="submit">
ENREGISTRER
 </Button>
          <IconButton style={{border :'solid 2px  #909497',borderRadius:'3px',padding:'5px',marginLeft:'1%'}} aria-label="Delete"    onClick={e=>{     this.setState({ 
 titre:"",
 description:'',
}); 
 
}}>
   <Icon style={{fontSize: "1rem"}}>clear</Icon>
 </IconButton>


 </div>
 </ValidatorForm>

       </div> 


</div>
)
    
    
  }
  
}

export default Modifquestionnaire;
