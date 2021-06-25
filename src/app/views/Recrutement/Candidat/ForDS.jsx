import React, { useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import './AppOffre.css'
import { Icon, Button, IconButton } from "@material-ui/core";
import MaxHeightMenuCandidat from "./MaxHeightMenuCandidat";
import { Page, pdfjs } from 'react-pdf'
import { Document } from 'react-pdf/dist/esm/entry.webpack';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import printJS from 'print-js';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import AppProgress from "../Candidat/AppProgress"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },

  },

  /* '@global': {
     '.MuiAutocomplete[focus="true"]': {
         background: 'blue'
     }
 }*/


}));
const ForDS = (props) => {



  const axios = require('axios');
  const items3 = [];

  const classes = useStyles();


  for (const [index, value] of props.tab.entries()) {
    if (value.cVname != null && value.archiver != true) {
      items3.push(
        <div key={index} className="row container" style={{ backgroundColor: '#F8F9F9', margin: 2, textAlign: 'center' }}>
          <br></br>
          <TransformWrapper
            key={index}
            defaultScale={1}
            defaultPositionX={0}
            defaultPositionY={0}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>

                <div className="col-md-6 " style={{marginBottom:'7%'}}  >
                  <div style={{ backgroundColor: '#FFFFFF', padding: 10 }} className="card shadow-sm p-3 mb-5  rounded cc box" >
                    <center>
                      <span >
                        {value.pageNumber}   /  {value.sum}
                      </span>
                    </center>
                    <div style={{ display: 'inline' }}>
                      <div className="tools" style={{ marginBottom: -20 }} className="text-left">
                        <IconButton style={{ margin: 0, padding: 0 }} onClick={zoomIn}  >  <Icon style={{ fontSize: "1rem", color: '#454545' }}> zoom_in </Icon></IconButton> &ensp;
          <IconButton style={{ margin: 0, padding: 0 }} onClick={zoomOut} >    <Icon style={{ fontSize: "1rem", color: '#454545' }}> zoom_out </Icon></IconButton> &ensp;
          <IconButton style={{ margin: 0, padding: 0 }} onClick={resetTransform}>   <Icon style={{ fontSize: "1rem", color: '#454545' }}> youtube_searched_for</Icon></IconButton>
                      </div>
                      <div className="text-right">



                        <IconButton style={{ margin: 0, padding: 0 }} onClick={(event, v) => {
                          var p = 'https://localhost:44392/Files/' + value.cVname;
                          axios({
                            method: "get",
                            url: p,
                            responseType: "arraybuffer"
                          })
                            .then((response) => {
                              var link = document.createElement("a");
                              link.href = window.URL.createObjectURL(
                                new Blob([response.data], { type: "application/octet-stream" })
                              );
                              link.download = value.cVname;

                              document.body.appendChild(link);

                              link.click();
                              setTimeout(function () {
                                window.URL.revokeObjectURL(link);
                              }, 200);
                            })
                            .catch((error) => { });
                        }}> <Icon style={{ fontSize: "1rem", marginRight: 10, color: '#454545' }}>cloud_download</Icon></IconButton>



                        <IconButton style={{ margin: 0, padding: 0 }} onClick={(event, v) => { var p = 'https://localhost:44392/Files/' + value.cVname; printJS({ printable: p, type: 'pdf', showModal: true }) }}><Icon style={{ fontSize: "1rem", marginRight: 10, color: '#454545' }}>print</Icon></IconButton>
                      </div>
                    </div>
                  </div>
                  <div className="card shadow-sm p-3 mb-5  rounded cc box " style={{ backgroundColor: '#454545', marginTop: -50,height:'90%' }} >


                    <center>

                      <TransformComponent>
                        <Link to={"/recrutement/profilecondidat/" + value.id}  >

                          <Document
                            file={'https://localhost:44392/Files/' + value.cVname}
                            
                            onLoadSuccess={(event, v) => {
                              props.tab[index].sum = event.numPages;
                              value.sum = event.numPages;

                              props.settab([...props.tab]);

                            }}


                          >

                            <Page  key={index} className="react-pdf__Page__canvas" style={{ marginTop: 0 }} pageNumber={props.tab[index].pageNumber} width={window.innerWidth / 3.5} paddingLeft={-100} />



                          </Document>
                        </Link>
                      </TransformComponent>


                      <div style={{ color: '#FFFFFF', marginBottom:20 }} className='manipulate'>
                        <IconButton style={{ marginLeft: '1%', margin: 0, padding: 0 }} aria-label="Delete" onClick={(event, v) => {

                          props.tab[index].disabledpre = false
                          props.tab[index].disablednex = false


                          if (value.pageNumber == 1) {
                            props.tab[index].disabledpre = false
                          }
                          else {
                            props.tab[index].pageNumber = props.tab[index].pageNumber - 1;
                          }
                          props.settab([...props.tab]);

                        }} disabled={value.disabledpre} >
                          <Icon style={{ fontSize: "1rem", color: 'white' }}>keyboard_arrow_left</Icon>
                        </IconButton>
                        {value.pageNumber} / {value.sum}

                        <IconButton style={{ marginRight: '1%', margin: 0, padding: 0 }} aria-label="Delete" onClick={(event, v) => {
                          props.tab[index].disabledpre = false
                          props.tab[index].disablednex = false
                          if (value.pageNumber == value.sum || value.pageNumber>=3) {
                            props.tab[index].disablednex = false
                          }
                          else {

                            props.tab[index].pageNumber = props.tab[index].pageNumber + 1;
                          }
                          props.settab([...props.tab]);

                        }} disabled={value.disablednex} >
                          <Icon style={{ fontSize: "1rem", color: 'white' }}>keyboard_arrow_right</Icon>
                        </IconButton>

                      </div >
                    </center>
                  </div>
                </div>
              </React.Fragment>
            )}
          </TransformWrapper>
          <div className="col-md-6 mb-3 ">
            <br></br>
            <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box ">
              <span style={{ marginLeft: '94%', marginRight: '10%' }}>
                <MaxHeightMenuCandidat cand={value} tab={props.tab} ind={index} settab={props.settab} />

              </span>

              <div >

                <div className="row" style={{ marginTop: '-5%' }}>
                  <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545', width: '15%' }} >

                    <div style={{ marginTop: '-28%', marginLeft: '20%' }}>
                      {value.photo == null ? (
                        <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                      ) : (
                        <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                      )}
                    </div>
                  </Link>
                  <div className="col-md-6" style={{ marginLeft: '20%' }}>
                    <div className="profile-head">
                      <center>
                        <div style={{ lineHeight: 2 }}>
                          <h5 style={{ marginLeft: 12 }}><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon>                                   </h5>

                          <h6 >
                            {value.metier}
                          </h6>
                          <div style={{ color: '#515A5A', fontSize: '13px' }}>{value.nom} {value.prenom}</div >
                          <div style={{ color: '#999999', fontSize: '14px' }}><Icon style={{ fontSize: "1rem", marginRight: 5, marginTop: 15 }}> person </Icon>{value.genre} ,{(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial}</div >


                        </div >
                      </center>


                    </div>
                  </div>

                </div>
                <br></br>

                <div className="row">



                  <div className={classes.root} style={{ width: '100%' }} >
                    <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "1.3rem", marginRight: 6 }}>contacts</Icon> Contact  </Typography>
                      </ExpansionPanelSummary>


                      <div style={{ margin: '5%', lineHeight: 2 }}>

                        <div style={{ color: '#999999', fontSize: '12px' }}><Icon style={{ fontSize: "1rem", marginRight: 6 }}> call </Icon> {value.phoneNumber}</div >
                        <div style={{ color: '#999999', fontSize: '12px' }} ><Icon style={{ fontSize: "1rem", marginRight: 6 }}> contact_mail </Icon>  {value.email}</div >
                        <div style={{ color: '#999999', fontSize: '12px' }}><Icon style={{ fontSize: "1rem", marginRight: 6 }}> room </Icon> {value.adresse}</div >
                        {value.linkedin != null ? (<div style={{ color: '#999999', fontSize: '12px' }}><Icon style={{ fontSize: "1rem", marginRight: 6 }}> linkedin</Icon> {value.linkedin.linkedin}</div >) : (<span></span>)}

                      </div>

                    </ExpansionPanel>
                    <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "1.3rem", marginRight: 6 }}>business_center</Icon> Expérience Professionnelle </Typography>
                      </ExpansionPanelSummary>


                      {value.experience_prof.map((v, index) => (

                        <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '85%', margin: '2%', marginLeft: "5%" }}>
                          <h6>{v.typeEmploi}</h6>
                          <div style={{ color: '#999999', fontSize: '12px' }}>Période: {new Date(v.date_debut).getFullYear() + '/' + (new Date(v.date_debut).getMonth() + 1) + '/' + new Date(v.date_debut).getDate()} - {new Date(v.date_fin).getFullYear() + '/' + (new Date(v.date_fin).getMonth() + 1) + '/' + new Date(v.date_fin).getDate()}</div >
                          <div style={{ color: '#999999', fontSize: '12px' }}>Poste Occupé: {v.poste_occupe} - En {v.employeur}</div >
                          <div style={{ color: '#999999', fontSize: '12px' }}>Lieu: {v.lieu_Exp} </div >

                          <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: '12px', lineHeight: 1.5 }}>{v.description}</div >

                        </div >
                      ))}

                    </ExpansionPanel>
                    <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "1.3rem", marginRight: 6 }}>import_contacts</Icon> Compétences </Typography>

                      </ExpansionPanelSummary>

                      {value.competence.map((v, index) => (
                        <div key={index} className="  row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', margin: 8, padding: 14, width: '85%', margin: '2%', marginLeft: "5%" }} >

                          <div style={{ fontWeight: 'bold', fontSize: 13, width: '100%' }} className="col-5">{v.titre}</div >


                          <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12, width: '100%' }} className="col-7"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>



                        </div>

                      ))}

                    </ExpansionPanel>
                    <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "1.3rem", marginRight: 6 }}>school</Icon> Formations  </Typography>

                      </ExpansionPanelSummary>

                      {value.formation.map((v, index) => (

                        <div key={index} style={{ lineHeight: 2, backgroundColor: '#EAEDED', padding: '10px', borderRadius: "10px", width: '85%', margin: '2%', marginLeft: "3%" }}>
                          <h6>{v.diplome}</h6>

                          <div style={{ color: '#999999', fontSize: '12px' }}>{v.universite} {(new Date(v.annee_debut).getFullYear())}/{(new Date(v.annee_fin).getFullYear())}</div >
                          <div style={{ textTransform: 'upperCase', color: '#5D6D7E', fontSize: '12px', lineHeight: 1.5 }}>{v.description}</div >

                        </div >
                      ))}

                    </ExpansionPanel>
                    <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "1.3rem", marginRight: 6 }}>translate</Icon> Langues maîtrisées  </Typography>

                      </ExpansionPanelSummary>



                      {value.langue.map((v, index) => (
                        <div key={index} className="row " style={{ backgroundColor: '#EAEDED', borderRadius: '20px', padding: 12, width: '85%', margin: '2%', marginLeft: "5%" }} >

                          <div style={{ fontWeight: 'bold', fontSize: 13, width: '100%' }} className="col-5">{v.langue}</div >


                          <div style={{ textTransform: 'upperCase', color: '#999999', fontSize: 12, width: '100%' }} className="col-7"><Icon style={{ fontSize: 12, fontWeight: 'Blob', color: '#424949 ', margin: 0, padding: 0 }} > grade </Icon>{v.niveau}</div>



                        </div>

                      ))}

                    </ExpansionPanel>
                    <ExpansionPanel style={{ backgroundColor: '#F8F9F9' }}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        < Typography className={classes.heading} style={{ display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "1.3rem", marginRight: 6 }}>color_lens</Icon> Passe-temps  </Typography>

                      </ExpansionPanelSummary>

                      {value.hobby.map((v, index) => (

                        <div key={index} style={{ backgroundColor: '#EAEDED', borderRadius: '20px', paddingTop: "8px", paddingBottom: "2px", padding: "13px", width: '85%', margin: '2%', marginLeft: "5%" }}> <span><Icon style={{ fontSize: "0.8rem", fontWeight: 'Blob', color: '#424949 ' }}> grade </Icon></span> * {v.hobby}
                        </div >
                      ))}

                    </ExpansionPanel>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }


  return (



    <div id="div4" >
      <section style={{ backgroundColor: '#F8F9F9' }}>

        <div className="container" style={{ marginTop: -60 }}   >
          <div className="row" style={{ backgroundColor: '#F8F9F9' }} >

            {items3}
          </div>
        </div>
      </section>
    </div>










  );
};

export default ForDS;


