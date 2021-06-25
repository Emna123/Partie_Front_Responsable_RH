import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRecrutement.css'
import { size } from "lodash";
import { Icon } from "@material-ui/core";
import MaxHeightMenu from "./MaxHeightMenu";
import BadgeAutocomplete from "../Candidat/BadgeAutocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import React, { Component, useEffect, useState, updateState } from 'react';
import CustomizedSnackbars from '../CustomizedSnackbars';
import CustomizedDialogs from '../Examen/CustomizedDialogs';
import ka from "date-fns/locale/ka";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import history from "history.js";
import authAxios from '../../../services/authAxios';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: '#AED6F1' }} />;
const checkedIcon = <CheckBoxIcon fontSize="small" style={{ color: '#AED6F1' }} />;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '0.5%',
    marginBottom: '0.5%',

    "& > * + *": {
      marginTop: theme.spacing(3),


    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,

    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'white',
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




const verifWords = ( str1,str2) => {     
  var words1 = str1.split(/\s+/g),
    words2 = str2.split(/\s+/g),
    i,
    j;
  var counts=0;
  for (i = 0; i < words1.length; i++) {
    for (j = 0; j < words2.length; j++) {
      if (words1[i].toLowerCase() == words2[j].toLowerCase() && isNaN(words1[i]) && isNaN(words2[j])
       && words1[i].match(/[a-zA-Z]/) && words2[j].match(/[a-zA-Z]/)) {
        counts++;
        console.log('word ' + words1[i] + ' was found in both strings');
      }
    }
  }
  return counts;

 }
 const isexiste= (tab ,value) => {  
   var indice=-1;
   for (var i=0;i<tab.length;i++)
   {
          if(tab[i]==value)
          {
            indice=i
          }
   }
   return indice;
 }


const CheckData = (user, offreclicked) => {  
  if (offreclicked != 0 && user != 0) {
    var valide=0;

    //verif languages
    var founds1 = [];
    var lngs;
    offreclicked.langue.map((o,index) => {
      lngs = user.langue.find(element=>element.langue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === o.langue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() && element.value >= o.value);
      if (lngs && isexiste(founds1,o.id)) {
        founds1.push(o.id )
      }
    });
    var founds2 = [];
    var cmpts;
       console.log("competences user",user.competence)
    offreclicked.competence.map((o,index) => {
      cmpts = user.competence.find(
        element => 
        //element.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ").includes(o.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" "))
        element.value  >= o.value);
      if (cmpts && verifWords(user.competence[index].titre,o.titre)>0 && isexiste(founds2,o.id) ) {
        founds2.push(o.id)
      }
    })
    //diplomes
    var founds3 = [];
    // console.log(user.competences)
    offreclicked.diplome.map((o,index) => {
      var dips;

     // dips = user.formation.find(element => 
        //element.normalize("NFD").replace(/[\u0300-\u036f]/g, "").diplome.toUpperCase().includes(o.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())
      //  );
      for(var i=0;i<user.formation.length;i++)
  {    if ( verifWords(user.formation[i].diplome,o.titre)>0 ) {
    if(isexiste(founds3,o.id)==-1){
      founds3.push( o.id)}
      console.log(founds3)

    }

      }
    })
    if(founds1.length==offreclicked.langue.length && founds2.length==offreclicked.competence.length&&founds3.length==offreclicked.diplome.length)
    {
      valide=1;
    }
  }


return valide;

}

const AppRecrutement = () => {

  const page2 = event => {
    const p1 = document.getElementById('1');
    p1.style.cssText = ' height: .1rem;width: 50%; margin: 0;'
    p1.style.cssText = 'margin-left: -5%;'

    const d2 = document.getElementById('3');
    const d4 = document.getElementById('5');
    d2.style.display = 'block';

    d4.style.display = 'none';
  };

  const classes = useStyles();




  const handleclick = () => {
    var off1 = []
    var off2 = []

    for (var i = 0; i < of1.length; i++) {
      if (rech.indexOf(of1[i].titre) != -1 || of1[i].titre.indexOf(rech) != -1) {
        off1.push(of1[i])

      }
    }
    for (var i = 0; i < of2.length; i++) {
      if (rech.indexOf(of2[i].titre) != -1 || of2[i].titre.indexOf(rech) != -1) {
        off2.push(of2[i])

      }
    }
    setOffre1(...[off1])
    setOffre2(...[off2])
  }
  const page4 = event => {
    const p1 = document.getElementById('1');
    p1.style.cssText = 'margin-left: 50%;'
    const d2 = document.getElementById('3');
    const d4 = document.getElementById('5');
    d4.style.display = 'block'
    d2.style.display = 'none';
  };
  /* GetCondidat('SignIn',this.state).then ((result)=>{
     let responseJSON =result;
     const { email, password } = this.state;

       if (this.state.email !== responseJSON.e_mail || this.state.password !== responseJSON.mdp ) {
         this.setState(
          { hide:true} 
         )
      }
      else{   this.props.loginWithEmailAndPassword({ ...this.state });    

       }
         
      
   });*/
  const [offre1, setOffre1] = useState([])
  const [of1, setOf1] = useState([])
  const [of2, setOf2] = useState([])
  const [offre2, setOffre2] = useState([])
  var [cand, setcand] = useState([])
  var [oppenn3, setopenn3] = useState(false)
  var [oppenn4, setopenn4] = useState(false)
  var [rech, setrech] = useState([])
  var [openn, setopenn] = useState(false);
  var [mes, setmes] = useState("");
  var [nomOffre, setnomOffre] = useState("");
  var [idExamen, setidExamen] = useState(-1);

  var [idoffre, setidoffre] = useState(-1);
  const [top100Films, settop100Films] = useState([]);


  useEffect(() => {
 
    authAxios.get('Candidats').then((res) => {
      cand = res.data;

      setcand([...cand])

      authAxios.get('Offre/getAllOffres').then((res) => {

        for (var key in res.data) {
          var idcand = [];
          var el = res.data[key];
          if (top100Films.indexOf(el.titre) == -1) {
            top100Films.push(el.titre)
          }

          el.nontre = [];
          el.entrait = [];
          el.sug = [];
          el.nonret = [];
          el.accepte = [];
          el.candidaturesp = null;

          if (el.candidature != 0) {
            for (var i = 0; i < el.candidature.length; i++) {
              idcand.push(el.candidature[i].id)

            }
          }



          for (var k = 0; k < cand.length; k++) {
            if (cand[k].candidatures != 0) {
              var test = false;
              for (var j = 0; j < cand[k].candidatures.length; j++) {


                if (idcand.indexOf(cand[k].candidatures[j].id) != -1) {
                  var t = cand[k];
                  t.nom = cand[k].candidatures[j].nom
                  t.prenom = cand[k].candidatures[j].prenom
                  t.email = cand[k].candidatures[j].email
                  t.lettre_motivation = cand[k].candidatures[j].lettre_motivation
                  t.etat = cand[k].candidatures[j].etat
                  t.date_candidature = cand[k].candidatures[j].date_candidature
                  t.salaire_demande = cand[k].candidatures[j].salaire_demande
                  t.idcand = cand[k].candidatures[j].id
                  test = true;
                  if (cand[k].candidatures[j].etat === "en attente") {


                    el.nontre.push(t);
                  }
                  else if (cand[k].candidatures[j].etat === "présélectionné") { el.entrait.push(t) }
                  else if (cand[k].candidatures[j].etat === "préaccepté") { el.accepte.push(t) }

                }

              }
              if (test == false && (CheckData(cand[k],el)))  {
                el.sug.push(cand[k])
              }
              else
                if (test == false) { el.nonret.push(cand[k]) }
            }
            else if (CheckData(cand[k],el)) {
              el.sug.push(cand[k])
            }
            else { el.nonret.push(cand[k]) }

          }

          if (new Date(el.date_expiration) <= new Date()) {
            offre1.push(el);
          }
          else {
            offre2.push(el)
          }


        }

        setOffre1([...offre1])
        setOf1([...offre1])
        setOffre2([...offre2])
        setOf2([...offre2])


      })
    })

  }, []);

  const items = []
  const items1 = []

  for (const [index, value] of offre1.entries()) {
    if (offre1 != 0) {
      items.push(<div className="col-md-6 " key={index}  >
        <div className="card profile-card-2 shadow-sm p-3 mb-5 bg-white rounded box ">

          <span style={{ marginLeft: '90%', marginTop: -15 }}>
            <MaxHeightMenu val={value.id} offre={offre1} setOffre={setOffre1} ind={index} top100Films={top100Films} of1={of1} setOf1={setOf1} />

          </span>
          <div >
            <div style={{ marginTop: '-8%' }} >
              <Link style={{ color: '#424949 ', fontSize: '15px', width: '90%' }} to={"/recrutement/condidats/" + value.id
              }
              >

                {value.titre}
              </Link>


            </div>
            <div style={{ marginLeft: '-2%',backgroundColor:'white' }}>
              <div style={{ color: '#999999', fontSize: '13px' }}><Icon style={{ fontSize: "1rem" }}> access_time </Icon> créer le {new Date(value.date_publication).toLocaleString()}</div >
              <div style={{ color: '#999999', fontSize: '13px' }}><Icon style={{ fontSize: "1rem" }}> add_alarm </Icon> fermer le {new Date(value.date_expiration).toLocaleString()}</div >

              <div style={{ color: '#999999', fontSize: '13px' }}><Icon style={{ fontSize: "1rem" }}> room </Icon> {value.lieu_travail}</div >



            </div>
            <div className="container" style={{backgroundColor:'white'}}>
              <button type="button" style={{ fontSize: '11px', whiteSpace: 'nowrap', marginTop: '2%' }} className="btn btn-outline-success" onClick={e => {
            
                var date = new Date()
                date.setDate(date.getDate() + 2);

                value.date_expiration = date;
                offre2.push(value)

                offre1.splice(index, 1);
                setOffre2([...offre2])
                setOffre1([...offre1])
                for (var i = 0; i < of1.length; i++) {
                  if (of1[i].id == value.id) {
                    of1.splice(i, 1)

                  }
                }

                setOf1(of1)
                setopenn3(true)

                authAxios.put('Offre/PutOffre/' + value.id, value).then((res) => {

                })

              }}><Icon style={{ fontSize: "12px" }}> update</Icon>&nbsp; Relancer</button>
&nbsp; &nbsp; &nbsp;
{value.examen == null ? (

                <button type="button" style={{ fontSize: '11px', whiteSpace: 'nowrap', marginTop: '2%' }} className="btn btn-outline-primary" onClick={e => {
                  history.push('/recrutement/Examen/' + value.id);




                }}><Icon style={{ fontSize: "12px" }}> border_color</Icon>&nbsp; Créer examen</button>) : (

                <button type="button" style={{ fontSize: '11px', marginTop: '2%', whiteSpace: 'nowrap', paddingTop: '6.25px', paddingBottom: '6.25px' }} className="btn btn-outline-secondary" onClick={e => {
                  setopenn(true)
                  setmes(0)
                  idoffre = value.id;
                  idExamen = value.examen.id;
                  setidExamen(idExamen)
                  setidoffre(idoffre, () => {
                    console.log('offre', idoffre)

                  });
                  console.log('offre', idoffre)

                  setnomOffre(value.titre)




                }}><Icon style={{ fontSize: "12px" }}> border_color</Icon>&nbsp; Examen</button>
              )}
            </div>

            <hr style={{ width: '100%' }}></hr>
            <div className="row" style={{ color: '#999999', fontSize: '13px', textAlign: 'center', marginLeft: '-2%' }} >
              <div className="col" >
                {value.nontre != null ? (
                  <div >{value.nontre.length}</div >) : (<div >0</div >)}
                <div >Non traité </div >
              </div>
              <div className="col">
                {value.entrait != null ? (
                  <div >{value.entrait.length}</div >) : (<div >0</div >)}
                <div >Présélectionné</div >
              </div>
              <div className="col">
                {value.sug != null ? (
                  <div >{value.sug.length}</div >) : (<div >0</div >)}
                <div >Suggestion</div >
              </div>
              <div className="col">
                {value.accepte != null ? (
                  <div >{value.accepte.length}</div >) : (<div >0</div >)}
                <div >Préaccepté</div >
              </div>
            </div>
          </div>




        </div>
      </div>)
    }
  }

  for (const [index, value] of offre2.entries()) {
    if (offre2 != 0) {
      items1.push(<div className="col-md-6 " key={index} >
        <div className="card profile-card-2 shadow-sm p-3 mb-5 bg-white rounded box ">

          <span style={{ marginLeft: '90%', marginTop: -15 }}>
            <MaxHeightMenu val={value.id} offre={offre2} setOffre={setOffre2} ind={index} top100Films={top100Films} settop100Films={settop100Films} of1={of2} setOf1={setOf2} />

          </span>
          <div >
            <div style={{ marginTop: '-8%' }} >
              <Link style={{ color: '#424949 ', fontSize: '15px', width: '90%' }} to={"/recrutement/condidats/" + value.id
              }
              >

                {value.titre}
              </Link>
            </div>
            <div style={{ marginLeft: '-2%' }}>
              <div style={{ color: '#999999', fontSize: '13px' }}><Icon style={{ fontSize: "1rem" }}> access_time </Icon> créer le {new Date(value.date_publication).toLocaleString()}</div >
              <div style={{ color: '#999999', fontSize: '13px' }}><Icon style={{ fontSize: "1rem" }}> add_alarm </Icon> fermer le {new Date(value.date_expiration).toLocaleString()}</div >

              <div style={{ color: '#999999', fontSize: '13px' }}><Icon style={{ fontSize: "1rem" }}> room </Icon> {value.lieu_travail}</div >



            </div>
            <div className="container" style={{backgroundColor:'white'}}>
              <button type="button" style={{ marginTop: '2%', fontSize: '12px', whiteSpace: 'nowrap',backgroundColor:'white' }} className="btn btn-outline-danger"

                onClick={e => {
           
                  value.date_expiration = new Date()
                  offre1.push(value)

                  offre2.splice(index, 1);
                  setOffre2([...offre2])
                  setOffre1([...offre1])
                  for (var i = 0; i < of2.length; i++) {
                    if (of2[i].id == value.id) {
                      of2.splice(i, 1)

                    }
                  }

                  setOf2(of1)

                  authAxios.put('Offre/PutOffre/' + value.id, value).then((res) => {

                  })
                  setopenn4(true)
                }}

              ><Icon style={{ fontSize: "12px" }}> highlight_off</Icon>&nbsp; Fermer</button>
               &nbsp; &nbsp; &nbsp;
               {value.examen == null ? (

                <button type="button" style={{ fontSize: '11px', marginTop: '2%', whiteSpace: 'nowrap' }} className="btn btn-outline-primary" onClick={e => {
                  history.push('/recrutement/Examen/' + value.id);




                }}><Icon style={{ fontSize: "12px" }}> border_color</Icon>&nbsp; Créer examen</button>) : (

                <button type="button" style={{ fontSize: '11px', whiteSpace: 'nowrap', paddingTop: '6.25px', paddingBottom: '6.25px', marginTop: '2%' }} className="btn btn-outline-secondary" onClick={e => {
                  setopenn(true)
                  setmes(0)
                  setidoffre(value.id)
                  idExamen = value.examen.id;
                  setidExamen(idExamen)
                  setnomOffre(value.titre)



                }}><Icon style={{ fontSize: "12px" }}> border_color</Icon>&nbsp; Examen</button>
              )}

            </div>


            <hr style={{ width: '100%' }}></hr>
            <div className="row" style={{ color: '#999999', fontSize: '13px', textAlign: 'center', marginLeft: '-2%' }} >
              <div className="col" >
                {value.nontre != null ? (
                  <div >{value.nontre.length}</div >) : (<div >0</div >)}
                <div >Non traité </div >
              </div>
              <div className="col">
                {value.entrait != null ? (
                  <div >{value.entrait.length}</div >) : (<div >0</div >)}
                <div >En traitement</div >
              </div>
              <div className="col">
                {value.sug != null ? (
                  <div >{value.sug.length}</div >) : (<div >0</div >)}
                <div >Suggestion</div >
              </div>
              <div className="col">
                {value.accepte != null ? (
                  <div >{value.accepte.length}</div >) : (<div >0</div >)}
                <div >Préaccepté</div >
              </div>
            </div>
          </div>




        </div>
      </div>)
    }
  }

  return (




    <div>
      <div className="container" style={{ marginTop: 20, backgroundColor: '#FBFBFB' }} >
        <div className="card profile-card-2 shadow-sm p-3 mb-5 bg-white rounded cc box " style={{ whiteSpace: 'nowrap' }}>
          <center>
            <div style={{ display: 'inline' }}>

              <div className="autocomplete-wrapper " style={{ paddingLeft: '15px', paddingRight: '15px', marginTop: -10, marginBottom: 10 }}>
                <Autocomplete
                  limitTags={1}

                  id="checkboxes-tags-demo"
                  value={rech}
                  onChange={(event, newValue) => {
                    setrech(...[newValue]);
                  }}
                  multiple
                  height='5%'
                  classes={classes}
                  limitTags={2}

                  id="checkboxes-tags-demo"
                  options={top100Films}
                  getOptionLabel={option => option}

                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}

                      />
                      <span style={{ color: '#000000' }}>{option}</span>
                    </React.Fragment>
                  )}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (

                      <Chip

                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  style={{ width: '100%' }}
                  renderInput={params => (
                    <TextField
                      style={{ width: '100%', whiteSpace: 'nowrap' }}
                      {...params}
                      variant="standard"
                      placeholder="Mots clés..."
                      value={rech}

                      fullWidth
                    />
                  )}
                />

              </div>

              <span><Button className="b1" style={{ fontSize: "1rem", marginTop: '1%', marginLeft: '10px', whiteSpace: 'nowrap', height: '10%' }} onClick={handleclick}><Icon style={{ fontSize: "100%" }}> search </Icon></Button></span>

            </div>
          </center>
        </div>
      </div>
      <div className="container" style={{ marginTop: 30, whiteSpace: 'nowrap',backgroundColor:'white' }}>

        <ul>
          <li className="two"><a href="#" onClick={page2} style={{ color: '#522986', width: '40%' }}>En cours <span style={{ backgroundColor: '#2A9250', size: 5, color: '#FFFFFF', padding: 3 }}>{offre2.length}</span></a></li>
          <li className="four"><a href="#" onClick={page4} style={{ color: '#522986', width: '75%' }}>Clôturés <span style={{ backgroundColor: '#C0392B', size: 5, color: '#FFFFFF', padding: 3 }}>{offre1.length}</span></a></li>
          <hr id='1' className='hr2' />
        </ul>
      </div>

      <div id='3' style={{ display: 'block' }} > <section style={{ backgroundColor: '#F8F9F9' }}>
        <div className="container" >
          <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
            {items1}
          </div>
        </div>
      </section></div>
      <div id='5' style={{ display: 'none' }}> <section style={{ backgroundColor: '#F8F9F9' }}>
        <div className="container" >
          <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
            {items}
          </div>
        </div>
      </section></div>
      <CustomizedSnackbars open3={oppenn3} setOpen3={setopenn3} open4={oppenn4} setOpen4={setopenn4}  ></CustomizedSnackbars>
      <CustomizedDialogs mes={mes} idExamen={idExamen} nomOffre={nomOffre} open1={openn} setopen1={setopenn} idoffre={idoffre} setidoffre={setidoffre}></CustomizedDialogs>

    </div>
  );
};

export default AppRecrutement;

       // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
