import { Breadcrumb, SimpleCard } from "matx";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, FormGroup, FormControl, ControlLabel, li } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRecrutement.css'
import { Icon, Fab } from "@material-ui/core";
import MaxHeightMenuCandidature from "../Examen/MaxHeightMenuCandidature";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import React, { Component, useEffect, useState, updateState } from 'react';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppProgress from "../Candidat/AppProgress"
import axios from 'axios';
import CustomizedSnackbars from "../CustomizedSnackbars";
import CustomizedDialogs from "../Examen/CustomizedDialogs";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from "@material-ui/core/Chip";
import history from "history.js";
import authAxios from '../../../services/authAxios';
import BadgeAutocomplete from "../Candidat/BadgeAutocomplete";
import Mots_Creux from "./listewords";

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
const AppCondidats = (props) => {



  function verifWords(str1,str2) {

    var words1 = str1.split(/\s+/g),
      words2 = str2.split(/\s+/g),
      i,
      j;
      console.log("tableau words 1",words1)
    var counts=0;
    for (i = 0; i < words1.length; i++) {
      for (j = 0; j < words2.length; j++) {
        if (words1[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == words2[j].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() && isNaN(words1[i]) && isNaN(words2[j])
         && words1[i].match(/[a-zA-Z]/) && words2[j].match(/[a-zA-Z]/) ) {
           if(Mots_Creux.includes(words1[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())!=true){
            counts++;
            console.log('word : "' + words1[i] + ' " was found in both strings');
           }        
        }
      }
    }
    console.log(counts)
    return counts;
  }



  const isexiste = (tab, value) => {
    var indice = -1;
    for (var i = 0; i < tab.length; i++) {
      if (tab[i] == value) {
        indice = i
      }
    }
    return indice;
  }


  const CheckData = (user, offreclicked) => {
    if (offreclicked != 0 && user != 0) {
      var valide = 0;

      //verif languages
      var founds1 = [];
      var lngs;
      offreclicked.langue.map((o, index) => {
        lngs = user.langue.find(element => element.langue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() === o.langue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() && element.value >= o.value);
        if (lngs && isexiste(founds1, o.id)) {
          founds1.push(o.id)
        }
      });
      var founds2 = [];
      var cmpts;
      console.log("competences user", user.competence)
      offreclicked.competence.map((o, index) => {
        cmpts = user.competence.find(
          element =>
            //element.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ").includes(o.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" "))
            element.value >= o.value);
        if (user.competence[index]!=null && cmpts && verifWords(user.competence[index].titre, o.titre) > 0 && isexiste(founds2, o.id)) {
          founds2.push(o.id)
        }
      })
      //diplomes
      var founds3 = [];
      // console.log(user.competences)
      offreclicked.diplome.map((o, index) => {
        var dips;

        // dips = user.formation.find(element => 
        //element.normalize("NFD").replace(/[\u0300-\u036f]/g, "").diplome.toUpperCase().includes(o.titre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase())
        //  );
        for (var i = 0; i < user.formation.length; i++) {
          if (verifWords(user.formation[i].diplome, o.titre) > 0) {
            if (isexiste(founds3, o.id) == -1) {
              founds3.push(o.id)
            }

          }

        }
      })
      if (founds1.length == offreclicked.langue.length && founds2.length == offreclicked.competence.length && founds3.length == offreclicked.diplome.length) {
        valide = 1;
      }
    }


    return valide;

  }


  const page1 = event => {

    const p1 = document.getElementById('1');
    p1.style.cssText = ' height: .1rem;width: 16.30%; margin: 0;'
    const d1 = document.getElementById('2');
    const d2 = document.getElementById('3');
    const d3 = document.getElementById('4');
    const d4 = document.getElementById('5');
    const d5 = document.getElementById('6');
    const d6 = document.getElementById('7');
    d1.style.display = 'block';
    d2.style.display = 'none';
    d3.style.display = 'none';
    d4.style.display = 'none';
    d5.style.display = 'none';
    d6.style.display = 'none';


  };
  const page2 = event => {
    const p1 = document.getElementById('1');
    p1.style.cssText = 'margin-left: 16.66%;';
    const d1 = document.getElementById('2');
    const d2 = document.getElementById('3');
    const d3 = document.getElementById('4');
    const d4 = document.getElementById('5');
    const d5 = document.getElementById('6');
    const d6 = document.getElementById('7');
    d2.style.display = 'block';
    d1.style.display = 'none';
    d3.style.display = 'none';
    d4.style.display = 'none';
    d5.style.display = 'none';
    d6.style.display = 'none';
  };

  const page3 = event => {
    const p1 = document.getElementById('1');;
    p1.style.cssText = 'margin-left: 33.33%;'
    const d1 = document.getElementById('2');
    const d2 = document.getElementById('3');
    const d3 = document.getElementById('4');
    const d4 = document.getElementById('5');
    const d5 = document.getElementById('6');
    const d6 = document.getElementById('7');

    d3.style.display = 'block';
    d1.style.display = 'none';
    d2.style.display = 'none';
    d4.style.display = 'none';
    d5.style.display = 'none';
    d6.style.display = 'none';
  };
  const page4 = event => {
    const p1 = document.getElementById('1');
    p1.style.cssText = 'margin-left: 49.66%;'
    const d1 = document.getElementById('2');
    const d2 = document.getElementById('3');
    const d3 = document.getElementById('4');
    const d4 = document.getElementById('5');
    const d5 = document.getElementById('6');
    const d6 = document.getElementById('7');
    d4.style.display = 'block';
    d1.style.display = 'none';
    d3.style.display = 'none';
    d2.style.display = 'none';
    d5.style.display = 'none';
    d6.style.display = 'none';
  };
  const page5 = event => {
    const p1 = document.getElementById('1');
    p1.style.cssText = 'margin-left: 66.33%;'
    const d1 = document.getElementById('2');
    const d2 = document.getElementById('3');
    const d3 = document.getElementById('4');
    const d4 = document.getElementById('5');
    const d5 = document.getElementById('6');
    const d6 = document.getElementById('7');
    d4.style.display = 'none';
    d1.style.display = 'none';
    d3.style.display = 'none';
    d2.style.display = 'none';
    d5.style.display = 'block';
    d6.style.display = 'none';
  };
  const page6 = event => {
    const p1 = document.getElementById('1');
    p1.style.cssText = 'margin-left: 81.1%;'
    const d1 = document.getElementById('2');
    const d2 = document.getElementById('3');
    const d3 = document.getElementById('4');
    const d4 = document.getElementById('5');
    const d5 = document.getElementById('6');
    const d6 = document.getElementById('7');
    d4.style.display = 'none';
    d1.style.display = 'none';
    d3.style.display = 'none';
    d2.style.display = 'none';
    d5.style.display = 'none';
    d6.style.display = 'block';
  };

  const noteexamen = (value) => {
    const url = window.location.href;
var v ={note_totale:null,note_exam:null};
    for (var i = 0; i < value.examenresults.length; i++) {
      if (value.examenresults[i].examen.offre.id == url.substring(url.lastIndexOf('/') + 1, url.length)) {
        v.note_totale=value.examenresults[i].note_totale
        v.note_exam=value.examenresults[i].note_exam

        return v
      }
    }
  }


  var [offre, setOffre] = useState([])
  var [nontre, setnontre] = useState([])
  var [entrait, setentrait] = useState([])
  var [sug, setsug] = useState([])
  var [nonret, setnonret] = useState([])
  var [accepte, setaccepte] = useState([])
  var [rech, setrech] = useState([])

  var [ref, setref] = useState([])
  const [oppenn, setopenn] = useState(false)
  const [oppenn1, setopenn1] = useState(false)
  const [oppen2, setopen2] = useState(false)
  var [cand, setcand] = useState([])
  var [rechoption, setrechoption] = useState([])
  var [alertmes, setalertmes] = useState("")

  useEffect(() => {


    authAxios.get('Candidats').then((res) => {
      cand = res.data;

      setcand([...cand])
      const url = window.location.href;

      authAxios.get('Offre/getOffre/' + url.substring(url.lastIndexOf('/') + 1, url.length)).then((res) => {
        if (res.data != 0) {
          var el = res.data;
          var idcand = [];
          el.ref = [];
          el.nontre = [];
          el.entrait = [];
          el.sug = [];
          el.accepte = [];
          el.nonret = [];
          el.candidaturesp = null;

          if (el.candidature != 0) {
            for (var i = 0; i < el.candidature.length; i++) {
              idcand.push(el.candidature[i].id)

            }
          }



          for (var k = 0; k < cand.length; k++) {
            if (cand[k].candidature != 0) {
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
                  else if (cand[k].candidatures[j].etat === "présélectionné") { el.entrait.push(t); }
                  else if (cand[k].candidatures[j].etat === "rejeté") { el.ref.push(t) }
                  else if (cand[k].candidatures[j].etat === "préaccepté") { el.accepte.push(t) }
                  rechoption.push(t.nom + " " + t.prenom);
                  rechoption.push(t.email);


                }

              }
              if (test == false && (CheckData(cand[k], el))) {
                el.sug.push(cand[k])
                rechoption.push(cand[k].nom + " " + cand[k].prenom);
                rechoption.push(cand[k].email);

              }
              else
                if (test == false) {
                  el.nonret.push(cand[k])
                  rechoption.push(cand[k].nom + " " + cand[k].prenom);
                  rechoption.push(cand[k].email);

                }
            }
            else if (CheckData(cand[k], el)) {
              el.sug.push(cand[k])
              rechoption.push(cand[k].nom + " " + cand[k].prenom);
              rechoption.push(cand[k].email);


            }
            else {
              el.nonret.push(cand[k])
              rechoption.push(cand[k].nom + " " + cand[k].prenom);
              rechoption.push(cand[k].email);


            }
          }
          offre = el
          setOffre(offre)
          setrechoption(...[rechoption])
          setnontre(...[el.nontre])
          setentrait(...[el.entrait])
          setsug(...[el.sug])
          setref(...[el.ref])
          el.accepte.sort(function compare(a, b) {
            if (noteexamen(a).note_totale/noteexamen(a).note_exam> noteexamen(b).note_totale/noteexamen(b).note_exam)
               return -1;
            if (noteexamen(a).note_totale/noteexamen(a).note_exam < noteexamen(b).note_totale/noteexamen(b).note_exam )
               return 1;
            return 0;
          });
          setaccepte(...[el.accepte])
          setnonret(...[el.nonret])
        }
        else {
          history.push('/session/NotFound')

        }
      })
    })




  }, []);

  const recherche = (rechtab, x) => {
    var tab = [];
    console.log(rechtab, rech)
    if (rechtab != null) {
      for (var i = 0; i < rechtab.length; i++) {
        var ch = rechtab[i].nom + " " + rechtab[i].prenom
        if (rech.indexOf(ch) != -1 || ch.indexOf(rech) != -1 || rech.indexOf(rechtab[i].nom) != -1 || rechtab[i].nom.indexOf(rech) != -1 || rech.indexOf(rechtab[i].prenom) != -1 || rechtab[i].prenom.indexOf(rech) != -1 || rech.indexOf(rechtab[i].email) != -1 || rechtab[i].email.indexOf(rech) != -1) {
          tab.push(rechtab[i])

        }

        if (x == 0) {
          setaccepte(...[tab])

        }
        else
          if (x == 1) { setnontre(...[tab]) }
          else
            if (x == 2) { setentrait(...[tab]) }
            else
              if (x == 3) { setsug(...[tab]) }
              else
                if (x == 4) { setref(...[tab]) }
                else
                  if (x == 5) { setnonret(...[tab]) }



      }
    }
  }

  const handleclick = () => {


    console.log(rech)

    recherche(offre.accepte, 0)
    recherche(offre.nontre, 1)
    recherche(offre.entrait, 2)
    recherche(offre.sug, 3)
    recherche(offre.ref, 4)
    recherche(offre.nonret, 5)


  }

  const constcaluclenotetotale = (question) => {
    var s = 0;
    for (var i = 0; i < question.length; i++) {
      s = s + question[i].question.note;
    }
    return s
  }

  const classes = useStyles();

  var items = []
  var items1 = []
  var items2 = []
  var items3 = []
  var items4 = []
  var items5 = []
  for (const [index, value] of nontre.entries()) {
    items.push(<div className="col-md-6 " key={index}>

      <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box ">


        <div className="row" style={{ textAlign: 'left' }}>
          <div className="col-5">
            <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545', marginLeft: '25%' }}  >

              <div >
                {value.photo == null ? (
                  <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                ) : (
                  <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                )}

              </div>
            </Link>

            <div style={{ textAlign: 'center' ,background:"white"}} className="container">

              <Fab color="primary" aria-label="Add" size="medium" className="col" style={{ margin: 5 }}
                className={classes.button} onClick={e => {
                  if (new Date(offre.date_expiration) <= new Date() && offre.examen != null) {
                   
                    nontre.splice(index, 1)
                    value.etat = "présélectionné"

                    items1.push(value);
                    entrait.push(value)
                    setnontre(...[nontre])
                    setentrait(...[entrait])
                    offre.nontre = nontre
                    offre.entrait = entrait
                    setOffre(offre)

                    // alertmes, setalertmes
                    authAxios.post('Candidature/SendAccept/' + value.idcand)
                    setopenn(true)
                  }
                  else if (offre.examen == null) {
                    alertmes = "Vous ne pouvez pas changer l'état de candidature tant que l'offre n'a pas un examen ."
                    setalertmes(alertmes)

                    setopen2(true)

                  }
                  else {
                    alertmes = "Vous ne pouvez pas changer l'état de candidature tant que l'offre n'a pas expiré."
                    setalertmes(alertmes)

                    setopen2(true)



                  }
                }}>
                <Icon>check</Icon>
              </Fab>


              <Fab color="secondary" aria-label="Add" size="medium" className="col" style={{ margin: 5 }}
                className={classes.button} onClick={e => {
                  if (new Date(offre.date_expiration) <= new Date()) {
                 
                    nontre.splice(index, 1)

                    items5.push(value);
                    value.etat = "rejeté"
                    ref.push(value)
                    setnontre(...[nontre])
                    setref(...[ref])
                    offre.nontre = nontre
                    offre.ref = ref
                    setOffre(offre)
                        console.log('Candidature/SendRefuse/' + value.idcand )
                    authAxios.post('Candidature/SendRefuse/' + value.idcand)
                    setopenn1(true)
                  }
                  else {
                    alertmes = "Vous ne pouvez pas changer l'état de candidature tant que l'offre n'a pas expiré."
                    setalertmes(alertmes)

                    setopen2(true)
                  }

                }}   >
                <Icon >clear</Icon>
              </Fab>
            </div>
          </div>
          <div className="col-5" style={{ width: '100%' }} >
            <br></br>
            <div style={{ textAlign: "center", lineHeight: '2' }} >

              <div style={{}}><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon></div>

              <div style={{ color: '#424949 ', fontSize: 12, fontWeight: 'bold', width: '100%', textAlign: 'center' }} className='t5'>{value.metier}</div>
              <div style={{ color: '#515A5A', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'> {value.nom} {value.prenom}</div>
            </div>

            <div style={{ textAlign: 'center', lineHeight: '2' }}>
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: 12 }}> person </Icon> {(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial}</div>
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: 12 }}> email</Icon> {value.email}</div>
              {/*  <div style={{ color: '#999999', fontSize: "0.9vw" , width:'100%',textAlign:'center' }} className='t5'><Icon style={{ fontSize: "0.9vw"}}> monetization_on </Icon> Salaire demandé : {value.salaire_demande} DT</div>*/}

            </div>
          </div>


          <span className="col-1" style={{ margin: 0, padding: 0, textAlign: 'right' }} >
            <br></br>
            <MaxHeightMenuCandidature val={value} reff={nontre} setref={setnonret} setOffre={setOffre} offre={offre} ind={index} />

          </span>



        </div>
        <br></br>
        <div>
          <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 12 }}><Icon style={{ fontSize: 12, marginRight: 6 }}>description</Icon>  Lettre de motivation </Typography>

            </ExpansionPanelSummary>


            <div style={{ backgroundColor: '#EAEDED', borderRadius: '20px', marginTop: '10px', paddingTop: "8px", paddingBottom: "2px", width: '100%', padding: '20px', fontSize: 12 }}> {value.lettre_motivation}</div>


          </ExpansionPanel>

        </div>
        <br></br>
        <div style={{ color: '#999999 ', fontSize: 11 }} className="row">
          <div className="col" style={{ textAlign: "left" }} >{value.etat}</div>
          <div className="col" style={{ textAlign: 'right' }}>{value.date_candidature.toLocaleString('fr-FR').slice(0, 10)}  </div></div>
      </div>
    </div>)
  }


  for (const [index, value] of entrait.entries()) {
    items1.push(<div className="col-md-6 " key={index} >

      <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box ">
        <span style={{ textAlign: 'right', marginRight: 0, paddingRight: 0 }}>
          <MaxHeightMenuCandidature val={value} reff={entrait} setref={setentrait} setOffre={setOffre} offre={offre} ind={index} />

        </span>
        <div className="row" style={{ marginTop: '-5%' }}>

          <div className="col-5" >
            <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545' }} className="col-md-4" >

              <div >
                {value.photo == null ? (
                  <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                ) : (
                  <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                )}

              </div>
            </Link>

          </div>
          <div className="col" style={{ marginRight: "2%" }}>
            <div style={{ textAlign: "center", lineHeight: 2 }}  >

              <div style={{}}><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon></div>

              <div style={{ color: '#424949 ', fontSize: 13, fontWeight: 'bold', width: '100%', textAlign: 'center' }} className='t5'>{value.metier}</div>
              <div style={{ color: '#515A5A', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'> {value.nom} {value.prenom}</div>
            </div>

            <div style={{ lineHeight: 2 }}>
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: 12 }}> person </Icon> {(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial}</div>
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: 12 }}> email</Icon> {value.email}</div>
              {/* <div style={{ color: '#999999', fontSize:"0.8vw" , width:'100%',textAlign:'center' }} className='t5'><Icon style={{ fontSize: "0.8vw"  }}> monetization_on </Icon> Salaire demandé : {value.salaire_demande} DT</div>*/}

            </div>

          </div>

        </div>
        <div  >




          <div >
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 12 }}><Icon style={{ fontSize: 12, marginRight: 6 }}>description</Icon>  Lettre de motivation </Typography>

              </ExpansionPanelSummary>



              <div style={{ backgroundColor: '#EAEDED', borderRadius: '20px', marginTop: '10px', paddingTop: "8px", paddingBottom: "2px", width: "100%", padding: '20px', fontSize: 12 }}> {value.lettre_motivation}</div>


            </ExpansionPanel>

          </div>
          <br></br>
          <div className="row">
            <div className="col-6" style={{ textAlign: 'left', fontSize: 11, color: '#999999' }} >{value.etat}</div>

            <div className="col-6" style={{ textAlign: 'right', fontSize: 11, color: '#999999' }}>{value.date_candidature.toLocaleString('fr-FR').slice(0, 10)} </div></div>

        </div>


      </div>
    </div>)
  }


  for (const [index, value] of sug.entries()) {
    items2.push(<div className="col-md-6 " key={index}>

      <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box " >
        <div className="row" >
          <div className="col"  >

            <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545', marginLeft: '30%' }} >

              <div style={{}}>
                {value.photo == null ? (
                  <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                ) : (
                  <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                )}

              </div>
            </Link>
          </div>

          <div className="col-7" >
            <br></br><br></br>
            <div style={{ textAlign: 'center' }}><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon></div >

            <div style={{ textAlign: 'center', width: '100%' }}>
              <div className='t1' style={{ color: '#424949 ', fontSize: 12, fontWeight: 'bold' }}>{value.metier}</div >
              <div className='t1' style={{ color: '#515A5A', fontSize: 12 }}>{value.nom} {value.prenom}</div >

            </div >

          </div>
        </div>
        <div className="row">

          <div className="col-5">
            <br></br><br></br>

            <div style={{ textAlign: 'center' }} >

              <div style={{ textAlign: 'center', lineHeight: 2 }} >
                <div className='t1' style={{ color: '#999999', fontSize: 12 }}>{(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial} </div >

                <div className='t1' style={{ color: '#999999', fontSize: 12 }}><Icon style={{ fontSize: 12 }}> call </Icon> {value.phoneNumber}</div >
                <div className='t1' style={{ color: '#999999', fontSize: 12, display: 'block', whiteSpace: 'nowrap', marginTop: '-2%' }} ><Icon style={{ fontSize: 12, marginRight: 6 }}> contact_mail </Icon>  {value.email}</div >
                <div className='t1' style={{ color: '#999999', fontSize: 12, display: 'block', whiteSpace: 'nowrap', marginTop: '-2%' }}><Icon style={{ fontSize: 12 }}> room </Icon> <span style={{ color: '#707B7C', fontSize: 12 }}>{value.adresse}</span></div >

              </div >
              <br></br>
            </div></div>



          <div className="col"  >

            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, textAlign: 'right' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden' }}><Icon style={{ fontSize: 12, marginRight: 1 }}>business_center</Icon> <span style={{ fontSize: 12 }}>Expérience Professionnelle </span> </Typography>
              </ExpansionPanelSummary>


              {value.experience_prof.map((v, index) => (

                <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '90%', marginleft: '2%', margin: '2%' }}>
                  <h6>{v.typeEmploi}</h6>
                  <div style={{ color: '#999999', fontSize: 12 }}>Période:<br></br> {new Date(v.date_debut).getFullYear() + '/' + (new Date(v.date_debut).getMonth() + 1) + '/' + new Date(v.date_debut).getDate()} - {new Date(v.date_fin).getFullYear() + '/' + (new Date(v.date_fin).getMonth() + 1) + '/' + new Date(v.date_fin).getDate()}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>Poste Occupé:<br></br> {v.poste_occupe} - En {v.employeur}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>Lieu: <br></br>{v.lieu_exp} </div >

                  <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: 12, lineHeight: 2 }}>{v.description}</div >

                </div >
              ))}

            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, marginRight: 0 }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 6 }}>import_contacts</Icon><span style={{ fontSize: 12 }}> Compétences</span> </Typography>

              </ExpansionPanelSummary>
              {value.competence.map((v, index) => (
                <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', margin: 8, padding: 10, width: '90%', marginleft: '2%', margin: '2%' }} >

                  <div style={{ fontWeight: 'bold', fontSize: 12 }} className="col-4">{v.titre}</div >


                  <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12 }} className="col-8"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>


                  <br></br>
                </div>

              ))}
            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12 }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 6 }}>school</Icon><span style={{ fontSize: 12 }}> Formations </span> </Typography>

              </ExpansionPanelSummary>

              {value.formation.map((v, index) => (

                <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '90%', marginleft: '2%', margin: '2%' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 12 }}>{v.diplome}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>{v.universite} {(new Date(v.annee_debut).getFullYear())}/{(new Date(v.annee_fin).getFullYear())}</div >
                  <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: 12, lineHeight: 2 }}>{v.description}</div >

                </div >
              ))}
            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, textAlign: 'right' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 1 }}>translate</Icon> <span style={{ fontSize: 12 }}>Langues maîtrisées </span> </Typography>

              </ExpansionPanelSummary>



              {value.langue.map((v, index) => (
                <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', padding: 10, width: '90%', marginleft: '2%', margin: '2%' }} >

                  <div style={{ fontWeight: 'bold', fontSize: 12, width: '100%' }} className="col-4">{v.langue}</div >


                  <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12, width: '100%' }} className="col-8"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>



                </div>

              ))}
            </ExpansionPanel>


          </div>
        </div>
      </div>
    </div>)
  }

  for (const [index, value] of nonret.entries()) {
    items3.push(<div className="col-md-6 " key={index}>

      <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box " >
        <div className="row" >
          <div className="col"  >

            <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545', marginLeft: '30%' }} >

              <div style={{}}>
                {value.photo == null ? (
                  <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                ) : (
                  <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                )}

              </div>
            </Link>
          </div>

          <div className="col-7" >
            <br></br><br></br>
            <div style={{ textAlign: 'center' }}><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon></div >

            <div style={{ textAlign: 'center', width: '100%' }}>
              <div className='t1' style={{ color: '#424949 ', fontSize: 12, fontWeight: 'bold' }}>{value.metier}</div >
              <div className='t1' style={{ color: '#515A5A', fontSize: 12 }}>{value.nom} {value.prenom}</div >

            </div >

          </div>
        </div>
        <div className="row">

          <div className="col-5">
            <br></br><br></br>

            <div style={{ textAlign: 'center' }} >

              <div style={{ textAlign: 'center', lineHeight: 2 }} >
                <div className='t1' style={{ color: '#999999', fontSize: 12 }}>{(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial} </div >

                <div className='t1' style={{ color: '#999999', fontSize: 12 }}><Icon style={{ fontSize: 12 }}> call </Icon> {value.phoneNumber}</div >
                <div className='t1' style={{ color: '#999999', fontSize: 12, display: 'block', whiteSpace: 'nowrap', marginTop: '-2%' }} ><Icon style={{ fontSize: 12, marginRight: 6 }}> contact_mail </Icon>  {value.email}</div >
                <div className='t1' style={{ color: '#999999', fontSize: 12, display: 'block', whiteSpace: 'nowrap', marginTop: '-2%' }}><Icon style={{ fontSize: 12 }}> room </Icon> <span style={{ color: '#707B7C', fontSize: 12 }}>{value.adresse}</span></div >

              </div >
              <br></br>
            </div></div>



          <div className="col"  >

            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, textAlign: 'right' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden' }}><Icon style={{ fontSize: 12, marginRight: 1 }}>business_center</Icon> <span style={{ fontSize: 12 }}>Expérience Professionnelle </span> </Typography>
              </ExpansionPanelSummary>


              {value.experience_prof.map((v, index) => (

                <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '90%', marginleft: '2%', margin: '2%' }}>
                  <h6>{v.typeEmploi}</h6>
                  <div style={{ color: '#999999', fontSize: 12 }}>Période:<br></br> {new Date(v.date_debut).getFullYear() + '/' + (new Date(v.date_debut).getMonth() + 1) + '/' + new Date(v.date_debut).getDate()} - {new Date(v.date_fin).getFullYear() + '/' + (new Date(v.date_fin).getMonth() + 1) + '/' + new Date(v.date_fin).getDate()}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>Poste Occupé:<br></br> {v.poste_occupe} - En {v.employeur}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>Lieu: <br></br>{v.lieu_exp} </div >

                  <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: 12, lineHeight: 2 }}>{v.description}</div >

                </div >
              ))}

            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, marginRight: 0 }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 6 }}>import_contacts</Icon><span style={{ fontSize: 12 }}> Compétences</span> </Typography>

              </ExpansionPanelSummary>
              {value.competence.map((v, index) => (
                <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', margin: 8, padding: 10, width: '90%', marginleft: '2%', margin: '2%' }} >

                  <div style={{ fontWeight: 'bold', fontSize: 12 }} className="col-4">{v.titre}</div >


                  <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12 }} className="col-8"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>


                  <br></br>
                </div>

              ))}
            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12 }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 6 }}>school</Icon><span style={{ fontSize: 12 }}> Formations </span> </Typography>

              </ExpansionPanelSummary>

              {value.formation.map((v, index) => (

                <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '90%', marginleft: '2%', margin: '2%' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 12 }}>{v.diplome}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>{v.universite} {(new Date(v.annee_debut).getFullYear())}/{(new Date(v.annee_fin).getFullYear())}</div >
                  <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: 12, lineHeight: 2 }}>{v.description}</div >

                </div >
              ))}
            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, textAlign: 'right' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 1 }}>translate</Icon> <span style={{ fontSize: 12 }}>Langues maîtrisées </span> </Typography>

              </ExpansionPanelSummary>



              {value.langue.map((v, index) => (
                <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', padding: 10, width: '90%', marginleft: '2%', margin: '2%' }} >

                  <div style={{ fontWeight: 'bold', fontSize: 12, width: '100%' }} className="col-4">{v.langue}</div >


                  <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12, width: '100%' }} className="col-8"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>



                </div>

              ))}
            </ExpansionPanel>


          </div>
        </div>
      </div>
    </div>)
  }

  for (const [index, value] of ref.entries()) {
    items5.push(<div className="col-md-6 " key={index}>

      <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box " >
        <div className="row" >
          <div className="col-5"  >

            <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545', marginLeft: '30%' }} >

              <div style={{}}>
                {value.photo == null ? (
                  <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                ) : (
                  <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                )}
              </div>
            </Link>
          </div>

          <div className="col-5" >
            <br></br><br></br>
            <div style={{ textAlign: 'center' }}><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon></div >

            <div style={{ textAlign: 'center', width: '100%' }}>
              <div className='t1' style={{ color: '#424949 ', fontSize: 12, fontWeight: 'bold' }}>{value.metier}</div >
              <div className='t1' style={{ color: '#515A5A', fontSize: 12 }}>{value.nom} {value.prenom}</div >

            </div >

          </div>
          <MaxHeightMenuCandidature style={{ margin: 0, textAlign: 'right' }} val={value} reff={ref} setref={setref} setOffre={setOffre} offre={offre} ind={index} className="col-1" />

        </div>
        <div className="row">

          <div className="col-5">
            <br></br><br></br>

            <div style={{ textAlign: 'center' }} >

              <div style={{ textAlign: 'center', lineHeight: 2 }} >
                <div className='t1' style={{ color: '#999999', fontSize: 12 }}>{(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial} </div >

                <div className='t1' style={{ color: '#999999', fontSize: 12 }}><Icon style={{ fontSize: 12 }}> call </Icon> {value.phoneNumber}</div >
                <div className='t1' style={{ color: '#999999', fontSize: 12, display: 'block', whiteSpace: 'nowrap', marginTop: '-2%' }} ><Icon style={{ fontSize: 12, marginRight: 6 }}> contact_mail </Icon>  {value.email}</div >
                <div className='t1' style={{ color: '#999999', fontSize: 12, display: 'block', whiteSpace: 'nowrap', marginTop: '-2%' }}><Icon style={{ fontSize: 12 }}> room </Icon> <span style={{ color: '#707B7C', fontSize: 12 }}>{value.adresse}</span></div >

              </div >
              <br></br>
            </div></div>



          <div className="col-6"  >

            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, textAlign: 'right' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden' }}><Icon style={{ fontSize: 12, marginRight: 1 }}>business_center</Icon> <span style={{ fontSize: 12 }}>Expérience Professionnelle </span> </Typography>
              </ExpansionPanelSummary>


              {value.experience_prof.map((v, index) => (

                <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '90%', marginleft: '2%', margin: '2%' }}>
                  <h6>{v.typeEmploi}</h6>
                  <div style={{ color: '#999999', fontSize: 12 }}>Période:<br></br> {new Date(v.date_debut).getFullYear() + '/' + (new Date(v.date_debut).getMonth() + 1) + '/' + new Date(v.date_debut).getDate()} - {new Date(v.date_fin).getFullYear() + '/' + (new Date(v.date_fin).getMonth() + 1) + '/' + new Date(v.date_fin).getDate()}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>Poste Occupé:<br></br> {v.poste_occupe} - En {v.employeur}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>Lieu: <br></br>{v.lieu_exp} </div >

                  <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: 12, lineHeight: 2 }}>{v.description}</div >

                </div >
              ))}

            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, marginRight: 0 }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 6 }}>import_contacts</Icon><span style={{ fontSize: 12 }}> Compétences</span> </Typography>

              </ExpansionPanelSummary>
              {value.competence.map((v, index) => (
                <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', margin: 8, padding: 10, width: '90%', marginleft: '2%', margin: '2%' }} >

                  <div style={{ fontWeight: 'bold', fontSize: 12 }} className="col-4">{v.titre}</div >


                  <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12 }} className="col-8"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>


                  <br></br>
                </div>

              ))}
            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12 }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 6 }}>school</Icon><span style={{ fontSize: 12 }}> Formations </span> </Typography>

              </ExpansionPanelSummary>

              {value.formation.map((v, index) => (

                <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '90%', marginleft: '2%', margin: '2%' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 12 }}>{v.diplome}</div >
                  <div style={{ color: '#999999', fontSize: 12 }}>{v.universite} {(new Date(v.annee_debut).getFullYear())}/{(new Date(v.annee_fin).getFullYear())}</div >
                  <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: 12, lineHeight: 2 }}>{v.description}</div >

                </div >
              ))}
            </ExpansionPanel>
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{ fontSize: 12, textAlign: 'right' }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: 12, marginRight: 1 }}>translate</Icon> <span style={{ fontSize: 12 }}>Langues maîtrisées </span> </Typography>

              </ExpansionPanelSummary>



              {value.langue.map((v, index) => (
                <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', padding: 10, width: '90%', marginleft: '2%', margin: '2%' }} >

                  <div style={{ fontWeight: 'bold', fontSize: 12, width: '100%' }} className="col-4">{v.langue}</div >


                  <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12, width: '100%' }} className="col-8"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>



                </div>

              ))}
            </ExpansionPanel>


          </div>
        </div>
      </div>
    </div>)
  }

  for (const [index, value] of accepte.entries()) {
    items4.push(<div className="col-md-6 " >

      <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box ">
        <span style={{ textAlign: 'right', marginRight: 0, paddingRight: 0 }}>
          <MaxHeightMenuCandidature val={value} reff={accepte} setref={setaccepte} setOffre={setOffre} offre={offre} ind={index} />

        </span>
        <div className="row" style={{ marginTop: '-5%' }}>

          <div className="col-5" >
            <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545' }} className="col-md-4" >

              <div >
                {value.photo == null ? (
                  <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                ) : (
                  <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                )}

              </div>
            </Link>

          </div>
          <div className="col" style={{ marginRight: "2%" }}>
            <div style={{ textAlign: "center", lineHeight: 2 }}  >

              <div style={{}}><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon><Icon style={{ fontSize: 12 }}> grade </Icon></div >

              <div style={{ color: '#424949 ', fontSize: 13, fontWeight: 'bold', width: '100%', textAlign: 'center' }} className='t5'>{value.metier}</div >
              <div style={{ color: '#515A5A', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'> {value.nom} {value.prenom}</div >
            </div>

            <div style={{ lineHeight: 2 }}>
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: "0.8vw" }}> person </Icon> {(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial}</div >
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: "0.8vw" }}> email</Icon> {value.email}</div >
              <div style={{ color: '#999999', fontSize: 12, width: '100%', textAlign: 'center' }} className='t5'><Icon style={{ fontSize: "0.8vw" }}> border_color </Icon> Note examen :  &ensp;

          <small className="border-radius-4 bg-primary text-white px-2 py-2px ">
                  {noteexamen(value).note_totale} / {noteexamen(value).note_exam}                    </small>
                <br></br>
              </div>
            </div>

          </div>

        </div>
        <div  >




          <div >
            <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap', fontSize: 12 }}><Icon style={{ fontSize: 12, marginRight: 6 }}>description</Icon>  Lettre de motivation </Typography>

              </ExpansionPanelSummary>


              <div style={{ backgroundColor: '#EAEDED', borderRadius: '20px', marginTop: '10px', paddingTop: "8px", paddingBottom: "2px", width: "100%", padding: '20px', fontSize: 12 }}> {value.lettre_motivation}</div>


            </ExpansionPanel>

          </div>
          <br></br>
          <div className="row">
            <div className="col-6" style={{ textAlign: 'left', fontSize: 11, color: '#999999' }} >{value.etat}</div>

            <div className="col-6" style={{ textAlign: 'right', fontSize: 11, color: '#999999' }}>{new Date(value.date_candidature).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })}</div></div>

        </div>


      </div>
    </div>)
  }

  return (
    <div>

      <div className="container" style={{ marginTop: 20, backgroundColor: '#FBFBFB',background:'white' }}>
        <div className="card profile-card-2 shadow-sm p-3 mb-5 bg-white rounded cc box " style={{ whiteSpace: 'nowrap' }}>
          <center>
            <div style={{ display: 'inline',background:'white' }}>

              <div className="autocomplete-wrapper " style={{ paddingLeft: '15px', paddingRight: '15px', marginTop: -10, marginBottom: 10 }}>
                <Autocomplete
                  value={rech}
                  onChange={(event, newValue) => {
                    setrech(...[newValue]);
                  }}
                  multiple
                  limitTags={1}
                  height='5%'

                  id="checkboxes-tags-demo"
                  classes={classes}

                  options={rechoption}
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
                      {...params}
                      variant="standard"
                      placeholder="Mots clés..."
                      value={rech}

                      fullWidth
                    />
                  )}
                />

              </div>

              <span><Button className="b1" style={{ fontSize: "1rem", marginTop: '20px', marginLeft: '10px', whiteSpace: 'nowrap' }} onClick={handleclick}><Icon style={{ fontSize: "1rem" }}> search </Icon></Button></span>

            </div>
          </center>
        </div>
      </div>

      <div className="container" style={{ marginTop: 30, whiteSpace: 'nowrap', fontSize: '0.9vw',background:'white' }}>

        <ul>
          <li className="one" ><Link to={{ state: offre }} onClick={page1} style={{ color: '#522986', width: '16.66%' }}>En attente <span style={{ backgroundColor: '#0000FF', size: '0.9vw', color: '#FFFFFF', padding: 3 }}>{nontre.length}</span></Link></li>
          <li className="two"><Link to={{ state: offre }} onClick={page2} style={{ color: '#522986', width: '16.66%' }}>Présélectionné <span style={{ backgroundColor: '#2A9250', size: '0.9vw', color: '#FFFFFF', padding: 3 }}>{entrait.length}</span></Link></li>
          <li className="three"><Link to={{ state: offre }} onClick={page3} style={{ color: '#522986', width: '16.66%' }}>Suggestion <span style={{ backgroundColor: '#F1C40F', size: '0.9vw', color: '#FFFFFF', padding: 3 }}>{sug.length}</span></Link></li>
          <li className="four"><Link to={{ state: offre }} onClick={page4} style={{ color: '#522986', width: '16%' }}>Pré accepté <span style={{ backgroundColor: '#845B7F', size: '0.9vw', color: '#FFFFFF', padding: 3 }}>{accepte.length}</span></Link></li>
          <li className="five"><Link to={{ state: offre }} onClick={page5} style={{ color: '#522986', width: '16%' }}>Rejeté <span style={{ backgroundColor: '#C0392B', size: '0.9vw', color: '#FFFFFF', padding: 3 }}>{ref.length}</span></Link></li>
          <li className="six"><Link to={{ state: offre }} onClick={page6} style={{ color: '#522986', width: '16.66%' }}>Non retenue <span style={{ backgroundColor: '#192254 ', size: '0.9vw', color: '#FFFFFF', padding: 3 }}>{nonret.length}</span></Link></li>

          <hr id='1' className='hr1' />
        </ul>
      </div>
      <div id="2" >
        <section style={{ backgroundColor: '#F8F9F9' }}>
          <div className="container" >
            <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
              {items}
            </div>
          </div>
        </section>
      </div>
      <div id="3" style={{ display: 'none' }}>

        <section style={{ backgroundColor: '#F8F9F9' }}>
          <div className="container" >
            <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
              {items1}
            </div>
          </div>
        </section>

      </div>
      <div id="4" style={{ display: 'none' }}>

        <section style={{ backgroundColor: '#F8F9F9' }}>
          <div className="container" >
            <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
              {items2}
            </div>
          </div>
        </section>
      </div>
      <div id="5" style={{ display: 'none' }}>
        <section style={{ backgroundColor: '#F8F9F9' }}>
          <div className="container" >
            <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
              {items4}
            </div>
          </div>
        </section>
      </div>
      <div id="6" style={{ display: 'none' }}>
        <section style={{ backgroundColor: '#F8F9F9' }}>
          <div className="container" >
            <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
              {items5}
            </div>
          </div>
        </section>
      </div>
      <div id="7" style={{ display: 'none' }}>
        <section style={{ backgroundColor: '#F8F9F9' }}>
          <div className="container" >
            <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
              {items3}
            </div>
          </div>
        </section>
      </div>
      <CustomizedSnackbars open={oppenn} setOpen={setopenn} open1={oppenn1} setOpen1={setopenn1}></CustomizedSnackbars>
      <CustomizedDialogs open2={oppen2} setopen2={setopen2} msg={alertmes} ></CustomizedDialogs>
    </div>
  );
};

export default AppCondidats;
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
