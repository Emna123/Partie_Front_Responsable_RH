import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import './AppOffre.css'
import { Icon } from "@material-ui/core";
import MaxHeightMenuCandidat from "./MaxHeightMenuCandidat";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { Link } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AppProgress from "../Candidat/AppProgress"

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



}));
const SecDSI = (props) => {

  console.log(props.tab)

  const items1 = [];

  const val = [];
  const classes = useStyles();

  for (const [index, value] of props.tab.entries()) {
    if (value.archiver != true) {
      items1.push(

        <div className="col-md-6 p-3" key={index}>

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


                    <div style={{ lineHeight: 2.5, textAlign: 'center' }}>

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
      )
    }

  }

  return (



    <div id="div2" >
      <section style={{ backgroundColor: '#F8F9F9' }}>
        <div className="container" style={{ marginTop: -60 }} >
          <div className="row" style={{ backgroundColor: '#F8F9F9' }}>

            {items1}
          </div>
        </div>
      </section>
    </div>












  );
};

export default SecDSI;


