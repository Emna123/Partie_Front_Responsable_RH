import React, { Component,useEffect, useState, version  } from 'react'; 
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Icon,Button } from "@material-ui/core";
import {  Page,pdfjs } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import {GetAllCondidats,GetAllFormation} from '../../../services/GetAllCandidats';
import ForDS  from "./ForDS"
import TherDS  from "./TherDS"
import SecDSI  from "./SecDSI"
import FirstDS  from "./FirstDS"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="text-primary"/>;
const checkedIcon = <CheckBoxIcon fontSize="small" className="text-primary"/>;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const useStyles = makeStyles(theme => ({
  root: {
    marginTop:'0.5%',
    marginBottom:'0.5%',

    "& > * + *": {
      marginTop: theme.spacing(3),
  

    },
    '& .MuiInput-underline:after':{
      borderBottomColor:'white'
    },
    '& .MuiInput-underline:before':{
      borderBottomColor:'white',

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,

    },
    '& .MuiInput-underline:hover:before':{
      borderBottomColor:'white',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,

    },
    "& input::placeholder": {
      fontSize: "12px",
   
    },
    
  '@global': {
        '.MuiAutocomplete-option[data]': {
            color: 'blue'
        }
  }
  },
  

    
     



  
}));
const BadgeAutocomplete = () => {
  const [elements, setelements] = useState([]);
  const [val, setval] = useState([]);
  const [element, setelelement] = useState([]);


  const [top100Films, settop100Films] = useState([
    { title: "CV PDF",des:false,metier:false},
     {title: "CV Générer",des:false,metier:false},
    { title: "Affichage par défaut",des:false,metier:false},
  
  
  ]);
  const [len, setelen] = useState(0);

  useEffect(() => {
    // Run! Like go get some data from an API.
  
    var ele=[];
    GetAllCondidats().then ((result)=>{
      var t=[];
      for(var l in top100Films)
      {
        t.push(l.title)
      }
      for (var key in result) {
        var el=result[key];
        el.pageNumber=1
        el.disabledpre=false
        el.disablednex=false
        el.sum=-1
        if(el.archiver!=true)
        {ele.push(el);
        
       
        if(t.indexOf(result[key].metier)==-1 && result[key].metier!=null)
          {
            t.push(el.metier);
            top100Films.push({title: el.metier,des:false,metier:true});
        
        }}
           }
      setelements(ele);
      setelelement(ele)
      setelen(ele.length);
  }) }, []);
  const classes = useStyles();

 


  

const handleclick = () => {




  var arr = [];
var newlist=[];
var metier=[];
  for (var key in val) {
    arr.push(val[key].title);
    if(val[key].metier==true)
    {
     metier.push(val[key].title);
    }
  }
  if(metier.length!=0)
 {
for(var i in element )
{
  if(metier.indexOf(element[i].metier) !=-1 )
  {
newlist.push(element[i]);
  }
}
setelements(newlist);
setelen(newlist.length);

 }
 else{
  setelements(element); 
  setelen(element.length);

 }
  if(arr.indexOf('CV Générer')!=-1 && arr.indexOf('CV PDF')==-1 )
   {
    const d1=document.getElementById('div1');
    const d2=document.getElementById('div2');

    const d3=document.getElementById('div3');
    const d4=document.getElementById('div4');
     d1.style.display='none';
     d2.style.display='block';
     d3.style.display='none';
     d4.style.display='none';
   }
   else if(arr.indexOf('CV PDF')!=-1 && arr.indexOf('CV Générer')==-1)
   {
    const d1=document.getElementById('div1');
    const d2=document.getElementById('div2');

    const d3=document.getElementById('div3');
    const d4=document.getElementById('div4');
     d1.style.display='none';
     d3.style.display='block';
     d4.style.display='none';
     d2.style.display='none';


   }
   else if(arr.indexOf('CV PDF')!=-1 && arr.indexOf('CV Générer')!=-1)
   {
    const d1=document.getElementById('div1');
    const d3=document.getElementById('div3');
    const d2=document.getElementById('div2');

    const d4=document.getElementById('div4');
    d1.style.display='none';
    d3.style.display='none';
    d2.style.display='none';

    d4.style.display='block';
   }
   else
   {
    const d1=document.getElementById('div1');
    const d3=document.getElementById('div3');
    const d4=document.getElementById('div4');
    const d2=document.getElementById('div2');

     d1.style.display='block';
     d3.style.display='none';
     d4.style.display='none';
     d2.style.display='none';

    }



}




  return (
    <div >
      <div className="container" style={{marginTop:20,backgroundColor:'#FBFBFB'}}>
    <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded cc box ">
    <center>
<div style={{display:'inline'}}>
  
    <div  className="autocomplete-wrapper " style={{paddingLeft:'15px',paddingRight:'15px',marginBottom:10}}>
      <Autocomplete
    
        multiple
        limitTags={2}


        id="checkboxes-tags-demo"
        classes={classes}
        value={val}
    
        onChange={(event, value) =>{
          setval(...[value]);
          var arr = [];
       if (value[value.length-1]==0) {
        top100Films[0].des=false;
        top100Films[1].des=false;
        top100Films[2].des=false;
       }
            for (var key in value) {
              arr.push(value[key].title);}
              if(arr.indexOf('Affichage par défaut')==-1 && arr.indexOf('CV Générer')==-1 && arr.indexOf('CV PDF')==-1)
              {
                
                top100Films[0].des=false;
                top100Films[1].des=false;
                top100Films[2].des=false;
              }
              
                else
                
                if((arr.indexOf('CV Générer')==-1 && arr.indexOf('CV PDF')==-1) && arr.indexOf('Affichage par défaut')!=-1 )
                {
                  top100Films[0].des=true;
                top100Films[1].des=true;
                top100Films[2].des=true; 
                }
                else if((arr.indexOf('CV Générer')!=-1 && arr.indexOf('CV PDF')!=-1)&& arr.indexOf('Affichage par défaut')==-1)
                {
                  top100Films[0].des=true;
                  top100Films[1].des=true;
                  top100Films[2].des=true; 
                }
                else if(arr.indexOf('CV Générer')!=-1 && arr.indexOf('Affichage par défaut')==-1)
                {
                  top100Films[0].des=false;
                  top100Films[1].des=true;
                  top100Films[2].des=true; 
                }
                else{
                  top100Films[0].des=true;
                  top100Films[1].des=false;
                  top100Films[2].des=true; 
                }
              }
          }
        
         

         options={top100Films}
        getOptionLabel={option => option.title}
        getOptionDisabled={option => option.des==true}
        
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            
            />
            <span  style={{ color: '#000000' }}>{option.title}</span>
          </React.Fragment>
        )}
        style={{ width: '100%' }}
        renderInput={params => (
          <TextField
          style={{width:'100%',whiteSpace:'nowrap'}}

            {...params}
            variant="standard"
            placeholder="Mots clés..."
            value={val}

            fullWidth
          />
        )}
      />

    </div>
    
    <span><Button className="b1" style={{fontSize: "1rem", marginTop: '1%',marginLeft:'10px',whiteSpace:'nowrap'}} onClick={handleclick}><Icon style={{fontSize: "100%"}}> search </Icon></Button></span>
<div  style={{color:'#909497',fontSize:'12px',marginLeft:'center',marginTop:'1%',marginLeft:'4%'}}>{len} Résultats</div >

</div>
</center>
     </div>
     </div>
     <div id="div1" >
     <FirstDS  tab={elements} settab={setelements}></FirstDS>

    </div>
    <div id="div2" style={{display:'none'}} >
  <SecDSI  tab={elements} settab={setelements}></SecDSI>
    </div>

  <div id="div3" style={{display:'none'}}  >
  <TherDS   tab={elements} settab={setelements}></TherDS  >
    </div>
 
  <div id="div4" style={{display:'none'}}>
  <ForDS  tab={elements} settab={setelements} ></ForDS  >


  </div>
    </div>
    
  );
};

export default BadgeAutocomplete;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

