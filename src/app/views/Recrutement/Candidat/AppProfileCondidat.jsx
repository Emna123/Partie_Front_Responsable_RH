import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRecrutement.css'
import { Icon } from "@material-ui/core";
import printJS from 'print-js';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { GetCondidat } from '../../../services/GetCondidat';
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import AppProgress from "../Candidat/AppProgress"
import { IconButton } from "@material-ui/core";
import { Page, pdfjs } from 'react-pdf'
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import history from "history.js";
import authAxios from '../../../services/authAxios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


const AppProfileCondidat = () => {
  var TimeAgo = require('react-timeago').default
  const [elements, setelements] = useState([]);
  const formatter = buildFormatter(frenchStrings)
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1, url.length);
  const [len, setlen] = useState(0);

  useEffect(() => {
    // Run! Like go get some data from an API.

    var ele = [];

    console.log(id);
    GetCondidat(id).then((result) => {

      var el = result;
      if (el != 0) {
        ele.push(el);

        setelements(ele);
        setlen(ele[0].commentaire.length);
      }
      else {
        history.push('/session/NotFound')

      }
    })
  }, []);
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
  const axios = require('axios');

  var [commentaire, setcommentaire] = useState("");
  const handleChange = event => {

    setcommentaire(event.target.value);
    ;
  };

  const [hide, sethide] = useState(false);
  const displaydiv = event => {
    const d = document.getElementById('here');
    if (hide == false) {
      d.removeAttribute('style')

      sethide(true);
    }
    else {

      d.style.display = 'none';
      sethide(false);
    }

    ;
  };








  const handlesubmit = event => {
    if (commentaire != "") {
      authAxios.post('candidats/AddCommentaire/' + id, { commentaire: commentaire, date: new Date() }).then((result) => {
        console.log(result.data.commentaire)
        var k = result.data.commentaire
        k.date = ""
        elements[0].commentaire.push(k);
        setlen(len + 1)
        setcommentaire("");
      })
    }
  }
  const classes = useStyles();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [disabledpre, setdisabledpre] = useState(false);
  const [disablednex, setdisablednex] = useState(false);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage({ numPages }) {
    setdisabledpre(false)
    setdisablednex(false)
    if (pageNumber == 1) {
      setdisabledpre(true)
    }
    else {
      setpageNumber(pageNumber - 1);
    }
  }
  function goToNextPage() {
    setdisabledpre(false)
    setdisablednex(false)
    if (pageNumber == numPages || pageNumber >= 3) { setdisablednex(true) }
    else {

      setpageNumber(pageNumber + 1);
    }
  }



  const items2 = [];
  for (const [index, value] of elements.entries()) {

    items2.push(

      <div key={index} className="row gutters-sm" style={{ margin: 10 }}  >

        <div className="col-md-4 mb-3 " >
          <div className="card shadow-sm p-3 mb-5 bg-white rounded cc box">
            <div className="card-body" style={{ marginBottom: -30 }}>

              <div className="d-flex flex-column align-items" >
                <div style={{ width: '20%', marginLeft: '30%', marginRight: '25%' }}>
                  {value.photo == null ? (
                    <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                  ) : (
                    <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                  )}
                </div>
                <div className="mt-3" style={{ textAlign: 'center', lineHeight: 2 }}>
                  <div ><Icon style={{ fontSize: "1rem", margin: '-0px' }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon><Icon style={{ fontSize: "1rem" }}> grade </Icon></div >

                  <div style={{ color: '#424949 ', fontSize: '13px', fontWeight: 'bold', marginLeft: -10 }}>{value.metier}</div >
                  <div style={{ color: '#515A5A', fontSize: '13px', marginLeft: -10 }}>{value.prenom} {value.nom}</div >
                </div>
                <div className="mt-3" style={{ textAlign: 'center', lineHeight: 3 }}>
                  <div style={{ color: '#999999', fontSize: '12px', marginTop: '-12px', marginLeft: -10 }}><Icon style={{ fontSize: "1rem" }}> person </Icon>{value.genre} ,{(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial}</div >

                  <div style={{ color: '#999999', fontSize: '12px', marginTop: '-12px', marginLeft: -10 }}><Icon style={{ fontSize: "1rem", marginRight: 6 }}> call </Icon>{value.phoneNumber}</div >
                  <div style={{ color: '#999999', fontSize: '12px', marginTop: '-12px', dispaly: 'block' }} ><Icon style={{ fontSize: "1rem", marginRight: 6, marginLeft: -10 }}> contact_mail </Icon>  {value.email} </div >
                  <div style={{ color: '#999999', fontSize: '12px', marginTop: '-12px', marginLeft: -10 }}><Icon style={{ fontSize: "1rem" }}> room </Icon> <span style={{ fontSize: '12px' }}>{value.adresse}</span></div >
                  {value.linkedin != null ? (<div style={{ color: '#999999', fontSize: '12px', marginTop: '-12px', marginLeft: -10 }}><Icon style={{ fontSize: "1rem", marginTop: 5 }}> linkedin</Icon> <span style={{ fontSize: '12px' }}>{value.linkedin.linkedin}</span></div >) : (<span></span>)}


                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm p-3 mb-5 bg-white rounded cc box " style={{ marginTop: -30 }}>
            <div className="card-body" >
              <div className="d-flex flex-column align-items-center text-center" >







                <div className="row "  >
                  <div className="col-9 " >
                    <input type="text" className="form-control border " placeholder="Commenter..." onChange={handleChange} value={commentaire} style={{ fontSize: 13, borderColor: 'red', width: '100%' }} />
                  </div>
                  <div className="col-3" style={{ marginLeft: '-7%' }} >
                    <button style={{ backgroundColor: '#454545', width: "100%", height: '33px', borderRadius: '5px' }} type="button" onClick={handlesubmit}><Icon style={{ fontSize: 13, color: '#FFFFFF' }}>send</Icon></button>
                  </div>
                </div>
                <div className="row ">

                  <div style={{ color: '#999999', fontSize: '12px', marginTop: '10px', marginLeft: -50 }} onClick={displaydiv} > {len} commentaires</div>
                </div>

                <div id="here" className="col " style={{ display: 'none' }} >

                  {value.commentaire.map((v, index) => (

                    <div id={'d1' + index} style={{ padding: '2%' }} key={index}>


                      <div className="row " style={{ backgroundColor: '#F8F9F9', textAlign: "left", borderRadius: '30px', marginTop: '10px', padding: "10px", fontSize: '11px' }} className="d-flex justify-content-between"> <div>{v.commentaire} </div>
                        <div style={{ marginTop: '-5%' }} >
                          <IconButton aria-label="Delete" onClick={e => {
                     


                            authAxios.delete('candidats/DeleteCommentaire/' + v.id)
                            document.getElementById('d1' + index).style.display = "none"
                            setlen(len - 1)
                          }}
                          >
                            <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                          </IconButton>
                        </div>
                      </div> <div style={{ color: '#A6A8A9', fontSize: '10px', textAlign: 'center' }} ><TimeAgo date={new Date(v.date).setTime(new Date(v.date).getTime() - new Date().getTimezoneOffset() * 60 * 1000)} formatter={formatter} />
                      </div>
                    </div>

                  ))} </div>







              </div>
            </div>
          </div>
          <div className="card shadow-sm p-3 mb-5 bg-white rounded cc box" style={{ marginTop: '-30px' }} >

            <div className="card-body" >
              <div className="d-flex flex-column align-items-left text-left" >
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


              </div>
            </div>
          </div>

          <div className="card shadow-sm p-3 mb-5 bg-white rounded cc box" style={{ marginTop: -30 }}>
            <div className="card-body" >
              <div className="d-flex flex-column align-items-center text-center" >
                <ExpansionPanel style={{ backgroundColor: '#F8F9F9', width: "100%" }}>
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

        <div className="col-md-8 mb-3 " >
          <div className="card shadow-sm p-3 mb-5 bg-white rounded cc box">
            <div className="card-body">

              <div className={classes.root} >

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

              </div>
            </div>
          </div>
          {value.cVname != null ? (
            <TransformWrapper

              defaultScale={1}
              defaultPositionX={0}
              defaultPositionY={0}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>

                  <div className="col-md-13 mb-3 " style={{ marginTop: '-2%' }} >
                    <div style={{ backgroundColor: '#FFFFFF', padding: 10 }} className="card shadow-sm p-3 mb-5  rounded cc box" >
                      <center>
                        <span >
                          {pageNumber} / {numPages}
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
                    <div className="card shadow-sm p-3 mb-5  rounded cc box " style={{ backgroundColor: '#454545', marginTop: -50 }} >


                      <center>

                        <TransformComponent>

                          <Document

                            file={'https://localhost:44392/Files/' + value.cVname}
                            onLoadSuccess={onDocumentLoadSuccess}


                          >
                            <Page className="react-pdf__Page__canvas" pageNumber={pageNumber} width={window.innerWidth / 2.2} paddingLeft={-100} />



                          </Document>
                        </TransformComponent>


                        <div style={{ color: '#FFFFFF', paddingTop: 15 }} >
                          <IconButton style={{ marginLeft: '1%' }} aria-label="Delete" onClick={goToPrevPage} disabled={disabledpre} >
                            <Icon style={{ fontSize: "1rem", color: 'white' }}>keyboard_arrow_left</Icon>
                          </IconButton>
                          {pageNumber} / {numPages}

                          <IconButton style={{ marginRight: 0.5 }} aria-label="Delete" onClick={goToNextPage} disabled={disablednex} >
                            <Icon style={{ fontSize: "1rem", color: 'white' }}>keyboard_arrow_right</Icon>
                          </IconButton>

                        </div >
                      </center>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </TransformWrapper>
          ) : (<span></span>)}

        </div>

















      </div>

    )
  }

  return (
    <div >
      {items2}
    </div>);
};

export default AppProfileCondidat;
