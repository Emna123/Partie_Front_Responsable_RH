import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Infoessentielles from "./Infoessentielles";
import ModifinformationOptionnel from "./ModifinformationOptionnel"
import ModifEditText from "./ModifEditText"
import React, { Component, useEffect, useState, updateState } from 'react';
import axios from 'axios';
import Diplome from "./Diplome";
import { InfoOutlined } from "@material-ui/icons";
import Questionnaire from "./Questionnaire";
import history from "history.js";
import { Link, Redirect } from "react-router-dom";
import AlertDelete from "./AlertDelete";
import { makeStyles } from "@material-ui/core/styles";
import {authAxios} from '../../../services/authAxios';

const useStyles = makeStyles((theme) => ({
  // your other stuff here
  
  // Add this
  step_label_root: {
    fontSize: 13,
  }
}));
function getSteps() {
  return [
    "Informations essentielles",
    "Information optionnel",
    "Description détaillée"
  ];
}


export default function StepperModif () {
  function getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return <div><Infoessentielles setdisb={setdisb} ></Infoessentielles> </div>;
      case 1:
        return <div>< ModifinformationOptionnel indicel={indicel} setIndicel={setIndicel} datalangue={datalangue} passe4={passe4} setPasse4={setPasse4} setdatalangue={setdatalangue} infoop3={infoop3} setInfoop3={setInfoop3} infoop2={infoop2} setInfoop2={setInfoop2} indicec={indicec} setIndicec={setIndicec} passe3={passe3} setPasse3={setPasse3} datacompetance={datacompetance} setdatacompetance={setdatacompetance} infoop1={infoop1} setInfoop1={setInfoop1} setidq={setidq} dataquestionnaire={dataquestionnaire} setdataquestionnaire={setdataquestionnaire} forceUpdate={forceUpdate} passe={passe} passe2={passe2} setPasse2={setPasse2} setPasse={setPasse} infoop={infoop} setInfoop={setInfoop} setIndice={setIndice} setIndiceq={setIndiceq} indice={indice} indiceq={indiceq} hand={hand} st2={st2} setSt2={setSt2} valDiplome={valDiplome} setValidiplome={setValidiplome} ></ ModifinformationOptionnel ></div>;
      case 2:
        return <div><ModifEditText  ></ModifEditText></div>;

    }
  }
 
  const [disb, setdisb] = useState(true);
  const [diplome, setdiplome] = useState(true);

  var [offre, setOffre] = useState({
 
  });

  const [valDiplome, setValidiplome] = useState([])
  const [indice, setIndice] = useState(-1);
  const [indiceq, setIndiceq] = useState(-1);
  const [indicec, setIndicec] = useState(-1);
  const [indicel, setIndicel] = useState(-1);


  var [infoop, setInfoop] = React.useState({ diplome: [] })
  const [dataquestionnaire, setdataquestionnaire] = useState([]);
  const [datacompetance, setdatacompetance] = useState([]);
  const [datalangue, setdatalangue] = useState([]);
  var [infoop1, setInfoop1] = React.useState({ questionnaire: [] })
  var [infoop2, setInfoop2] = React.useState({ competance: [] })
  var [infoop3, setInfoop3] = React.useState({ langue: [] })

  const [open1, setOpen1] = React.useState(false);



  const [description, setdescription] = useState("")

  const [st2, setSt2] = useState(false)
  const [passe, setPasse] = useState(false)
  const [passe2, setPasse2] = useState(false)
  const [passe3, setPasse3] = useState(false)
  const [passe4, setPasse4] = useState(false)
  const url = window.location.href;
  const classes = useStyles();

  const [idoffre, setidoffre] = useState(url.substring(url.lastIndexOf('/') + 1, url.length))


  const [idq, setidq] = useState(-1)


  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {













    setActiveStep(prevActiveStep => prevActiveStep + 1);

  };
  const hand = (t2) => {

    setInfoop({ diplome: [t2] })
    return infoop.diplome
  }
  const handleBack = () => {
    forceUpdate()
    console.log(description)
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    if (activeStep >= 0) {
    }
  };

  const handleReset = () => {
  
    setActiveStep(0);


  };
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div>

      <div>
        <div className="container" style={{ marginTop: '-1%', backgroundColor: '#FBFBFB' }}>
          <div className="card profile-card-2 shadow-sm p-3 mb-5 bg-white rounded cc box " >
            <center>
              <div style={{ display: 'inline' }}>

                <div style={{  marginTop: -15, marginBottom: -15 }}>


                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                      <Step key={label}>
                        <StepLabel classes={{ label: classes.step_label_root }} className="text-break">{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                </div>








              </div>
            </center>
          </div>

          <div className="card profile-card-2 shadow-sm p-3 mb-5 bg-white rounded cc box " style={{ marginTop: '-3%', paddingTop: '10%' }}  >
            <center>
              <div style={{ display: 'inline' }}>

                <div style={{ marginBottom: 10 }}>


                  <div>
                    {activeStep === steps.length ? (
                      <div>
                        <Typography style={{ marginLeft: "-1.5" }}>Toutes les étapes sont terminées</Typography>
                        <div style={{ textAlign: "center" }}>

                          <Button
                            style={{ marginTop: '2%' }}
                            variant="contained"
                            color="default"
                            onClick={e => {




                         
                              setOpen1(true)

                            }}


                          >

                            Supprimer
              </Button>
                          <Button
                            style={{ marginTop: '2%', marginLeft: "2.5%" }}

                            variant="contained"
                            color="secondary"
                            onClick={handleReset}
                          >
                            Éditer
            </Button>
                          <Button
                            style={{ marginTop: '2%', marginLeft: "2.5%"  }}
                            variant="contained"
                            color="primary"
                            onClick={e => {    history.push("/recrutement/offres");
                          }}
                           
                          >
                            Consulter
              </Button>
                        </div>
                      </div>
                    ) : (
                      <div>

                        <Typography>{getStepContent(activeStep, disb, setdisb)}</Typography>
                        <div style={{ marginTop: '4%' }}>
                          <hr className="hr3" ></hr>

                          <div className="pt-4" style={{ textAlign: "right", marginTop: '-3%', display: 'block', whiteSpace: 'nowrap' }}>

                            <Button
                              variant="contained"
                              color="secondary"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              Retour
              </Button>
                            <Button
                              className="ml-4"
                              variant="contained"
                              color="primary"

                              onClick={e => {
                                





                                setActiveStep(prevActiveStep => prevActiveStep + 1);
                              }}
                            >
                              {activeStep === steps.length - 1 ? "Fin" : "Suivant"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>


                </div>








              </div>
            </center>
          </div>


        </div>




      </div>










      <AlertDelete idoffre={idoffre} open={open1} setOpen={setOpen1}></AlertDelete>


    </div>
  );
}
