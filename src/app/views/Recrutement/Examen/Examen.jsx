import IconButton from "@material-ui/core/IconButton";
import {
  Icon, Button, FormControlLabel,
  Checkbox
} from "@material-ui/core";

import ExemainInfo from "./ExemainInfo";
import EXQuestionnaire from "./EXQuestionnaire";
import CustomizedDialogs from "./CustomizedDialogs";
import CustomizedSnackbars from "../CustomizedSnackbars";
import axios from 'axios';
import { green } from "@material-ui/core/colors";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { withStyles } from "@material-ui/core/styles";

import React, { Component, useEffect, useState, updateState } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, TablePagination
} from "@material-ui/core";
import authAxios from '../../../services/authAxios';

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" className="secondary" />;
const checkedIcon = <CheckBoxIcon fontSize="small" className="secondary" />;
const useStyles = makeStyles(theme => ({
  root: {
    borderColor: 'transparent',

  },
  heading: {
    borderColor: 'transparent',
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,


  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(p => <Checkbox color="default" {...p} />);
function Examen() {

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };
  const getData = async () => {
 





    const response = await authAxios.get('Question/getAllQuestions');

    for (var i = 0; i < response.data.length; i++) {

      var rep = []

      for (var j = 0; j < response.data[i].reponses.length; j++) {
        rep.push({ reponse: response.data[i].reponses[j].reponse, correcte: response.data[i].reponses[j].correcte })

      }
      oldquest.push({ id: response.data[i].id, question: response.data[i].question, check: false, reponses: rep })

    }

    setoldquest([]);
    setoldquest(...[oldquest]);
    setquestionrep(...[oldquest])

  }
  useEffect(() => {
    var r = getData();

  }, []);
  const classes = useStyles();

  var [indice, setindice] = useState(0);
  var [nb, setnb] = useState(0);
  var [indice1, setindice1] = useState(0);
  var [repinfo, setrep] = useState([]);
  var [oldquest, setoldquest] = useState([]);
  var [questinfo, setquestinfo] = useState([{ repinfo: [], idq: 0, note: 0, question: "" }]);
  var [ex, setex] = useState([<EXQuestionnaire questinfo={questinfo} setquestinfo={setquestinfo} repinfo={repinfo} setrep={setrep} indice1={indice1} setindice1={setindice1} id1={'d1' + indice} id2={'d2' + indice} idh={'h' + indice} id={indice}  ></EXQuestionnaire>]);
  var [exinfo, setexinfo] = useState(null);


  var [openn, setopenn] = useState(false);
  var [open8, setOpen8] = useState(false);
  var [mes, setmes] = useState(false);
  var [r, setres] = useState(-1);
  var [questionrep, setquestionrep] = useState([]);

  const addquest = () => {


  }

  return (

    <div style={{ marginBottom: '8%', backgroundColor: 'white', textAlign: 'center' }} className='container'>
      <h5 style={{ backgroundColor: 'white',textAlign: 'center', marginTop: '2%', fontSize: 18 }}>Créer un examen</h5>
      <div className="card" style={{ backgroundColor: 'white',width: "100%", textAlign: 'center', marginTop: '2%', padding: "0.9%", paddingTop: '0%', paddingBottom: '0%' }} >

        <ExemainInfo exinfo={exinfo} setexinfo={setexinfo}  ></ExemainInfo>
      </div>
      <br></br><br></br><br></br>
      <div className={classes.root} style={{ borderColor: 'transparent', textAlign: 'center', width: '75%',backgroundColor:'white' }} className='container' >
        <ExpansionPanel style={{
        }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading} className='container' style={{ fontSize: 18,background:'white' }}>Choisir des questions trouvées dans d'autres examens</Typography>
          </ExpansionPanelSummary>
          <br></br>

          <Card elevation={3}  >
            <div style={{ borderColor: '#7467ef', margin: '2%' }} >
              <br></br>
              <input
                type="text"
                className="colorboreder form-control border-end-0 border rounded-pill colorboreder"

                placeholder="Mots clés..."
                onChange={e => {

                  setoldquest(
                    questionrep.filter((v) =>
                      v.question.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  );
                }}
              />

              <Table className="product-table" >
                <TableHead>
                  <TableRow>
                    <TableCell className="px-6" colSpan={4} style={{ color: " #7467ef", textAlign: 'center' }}>
                      Questions
              </TableCell>
                    <TableCell className="px-6" colSpan={4} style={{ color: " #7467ef", textAlign: 'center' }}>
                      Réponses
              </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>

                  {oldquest
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((v, index) => (
                      <TableRow key={index} style={{ marginTop: '2%' }}>
                        <TableCell className="px-0 capitalize" colSpan={4} align="left">
                          <div className="row">   <FormControlLabel
                            style={{ margin: '1%', marginLeft: '3%', textAlign: 'right' }}
                            control={
                              <Checkbox
                                className="col-1"
                                color="primary"
                                value="chec"
                                name="chec"
                                onChange={e => {

                                  oldquest[index].check = !oldquest[index].check
                                  if (oldquest[index].check == true) {
                                    setnb(nb + 1)
                                  }
                                  else {
                                    setnb(nb - 1)

                                  }
                                  setoldquest([]);
                                  setoldquest(...[oldquest]);

                                }}
                              />
                            }
                          /><span className="col" style={{ fontSize: '13px', fontWeight: 'bold', margin: '1%', marginTop: '4%', marginLeft: 0, textAlign: 'left' }}>{v.question + '  ?'}</span></div>
                        </TableCell>
                        <TableCell key={index} className="px-0 capitalize" align="left" colSpan={4} >
                          <div style={{ lineHeight: 1.5 }}>
                            {v.reponses.map((k, index) =>

                              <p className='row'>

                                <Icon color="primary" backgroundColor="primary"
                                  className='col-2' style={{ fontSize: 20, margin: 0, padding: 0, textAlign: 'right', borderRadius: 5, marginTop: 7.2 }}
                                > stop</Icon>
                                <span className='col-6 ' style={{ fontSize: 13, paddingTop: '2%', textAlign: 'left' }}>{k.reponse}</span> <span className='col-2'> {k.correcte == true ? (<Icon style={{ fontSize: 20, color: " green", margin: 0, padding: 0, textAlign: 'right' }}
                                > check </Icon>) : (<span></span>)} </span></p>
                            )}
                          </div>
                        </TableCell>


                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                labelRowsPerPage="Lignes par page"
                count={oldquest.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Page Précédente"
                }}
                nextIconButtonProps={{
                  "aria-label": "Page Suivante"
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          </Card>







        </ExpansionPanel> </div>
      <br></br><br></br>
      <h5 style={{ textAlign: 'center', marginTop: '3%', fontSize: 18 }}>Créer des questions-réponses</h5>

      <div >
        <IconButton style={{ textAlign: 'right', marginRight: '-55%', position: 'relative', marginBottom: '-1%' }} onClick={(event, v) => {
          indice = indice + 1;
          setindice(indice)

          ex.push(<EXQuestionnaire questinfo={questinfo} setquestinfo={setquestinfo} repinfo={repinfo} setrep={setrep} indice1={indice1} setindice1={setindice1} id1={'d1' + indice} id2={'d2' + indice} idh={'h' + indice} id={indice}  ></EXQuestionnaire>);
          var k = []
          k.repinfo = [];
          k.note = 0; k.question = "";
          k.idq = indice;
          questinfo.push(k)
          setquestinfo(...[])
          setquestinfo(...[questinfo])
          setex(...[])
          setex(...[ex])
        }}  >
          <Icon style={{ fontSize: "1rem", color: " #7467ef" }}
          > add </Icon>   </IconButton>
      </div >
      {ex.map((v, index) => (
        <div  >

          <div style={{ textAlign: 'right' }}  >

            <IconButton className="mt-4" style={{ borderRadius: '3px', padding: '10px', textAlign: 'left', backgroundColor: '#B03D51 ', color: 'white', marginRight: '-0.5%' }} onClick={e => {


              var idquest = -1;
              for (var i = 0; i < questinfo.length; i++) {
                if (questinfo[i].idq == v.props.id) {
                  idquest = i;
                }
              }
              questinfo.splice(idquest, 1);

              setquestinfo([])
              setquestinfo(...[questinfo])

              ex.splice(index, 1);

              ; setex(...[]); setex([...ex]);




            }} aria-label="Delete" >                          <Icon style={{ fontSize: "1rem" }}>delete</Icon>
            </IconButton>
          </div >

          <div className="border shadow-sm" style={{ width: "100%", textAlign: 'center', marginTop: '-2.1%', padding: "4%", paddingTop: '8%' }} key={v.props.id} >




            <div > {v}</div >

          </div></div>
      ))}
      <div style={{ marginTop: '4%', marginRight: '15%', marginLeft: '13%' }}>
        <Button
          className="ml-4"
          variant="contained"
          color="default"
          onClick={e => {

            if (exinfo == null) {
              setmes("Veuillez remplir Les champs (titre , durée  et nombre de questions à sélectionner de l'examen).")
              setopenn(true)

            }
            else {
              const verifte =  (repinfo) => {
               var test =false;
              for (var i=0;i<repinfo.length;i++)
              {
                    if(repinfo[i].chec !=false)
                    {
                        test=true
                    }
              }
                  return test
              }
              var test = false;
              var indx = -1;
              var indx1 = -1;
              var i = 0;
              var i1=0;
              var test1=false

              while (i < questinfo.length && test == false) {
                if (questinfo[i].question === "" || questinfo[i].repinfo == 0) {
                  test = true;
                  indx = i;
                }
                i++
              }


              while (i1 < questinfo.length && test1 == false) {
              

                  if (verifte(questinfo[i1].repinfo)==false) {
                    test1 = true;
                    indx1 = i1;
                  }
                  i1++
                }

              if (test == true) {
                setmes("le question numéro " + (indx + 1) + " dois avoir au moins une réponse , un question et une note ");
                setopenn(true)

              }
             else if (test1 ==true ) {
                setmes("le question numéro " + (indx1 + 1) + " dois avoir au moins une réponse correcte  "+" ");
                setopenn(true)

              }                      
              else if ((questinfo.length + nb) < exinfo.nombreq) {
                console.log('nb', nb, oldquest)
                setmes("Le nombre de questions est incorrect, veuillez ajouter au moins " + (exinfo.nombreq - (questinfo.length + nb)) + " questions ou modifier le nombre de questions à sélectionner.")

                setopenn(true)
              }
              else {
              

                var d = 0;
                if (exinfo.duree == "15 min") { d = 15 }
                else if (exinfo.duree == "30 min") { d = 30 }
                else if (exinfo.duree == "45 min") { d = 45 }
                else if (exinfo.duree == "1h") { d = 60 }
                else if (exinfo.duree == "1h 15min") { d = 75 }
                else if (exinfo.duree == "1h 30min") { d = 90 }
                else if (exinfo.duree == "1h 45min") { d = 105 }
                else if (exinfo.duree == "2h") { d = 120 }
                var i = 0
                var k = null
                const getData = async (res, i) => {
                  const response = await authAxios.post('Question/AddQuestion/' + res.data.examen.id, { question: questinfo[i].question, note: questinfo[i].note });
                  for (var j = 0; j < questinfo[i].repinfo.length; j++) {
                    console.log(questinfo[i])
                    authAxios.post('Reponse/AddReponse/' + response.data.question.id, { reponse: questinfo[i].repinfo[j].reponse, correcte: questinfo[i].repinfo[j].chec })

                  }
                  return response.data
                }

                const sendQusEx = async (res, i) => {
                  const response = await authAxios.post('Note_Question/PostNote_Question/' + oldquest[i].id + '/' + res.data.examen.id, { note_obtenue: 0 });

                  return response.data
                }
                const url = window.location.href;

                var ido = url.substring(url.lastIndexOf('/') + 1, url.length);
                authAxios.post('Examen/PostExamen/' + ido, { nbr_questions: exinfo.nombreq, duree: d, titre: exinfo.titre }).then((res) => {
                  for (var i = 0; i < questinfo.length; i++) {
                    k = getData(res, i);


                  }
                  for (var i = 0; i < oldquest.length; i++) {

                    if (oldquest[i].check == true) {
                      k = sendQusEx(res, i);

                    }

                  }

                })
                console.log('this', questinfo)
                setOpen8(true)
                //window.location.href='http://localhost:3000/recrutement/offres'

              }
            }


          }}


        >

          Créer
             </Button>
        <Button
          style={{ backgroundColor: '#5F6A6A ', color: 'white' }}

          className="ml-4"
          variant="contained"
          color="default"
          onClick={e => {

            window.location.href = 'http://localhost:3000/recrutement/offres'


          }}


        >

          Annuler
              </Button>
      </div>
      <CustomizedDialogs mes={mes} setmes={setmes} open={openn} setopen={setopenn}></CustomizedDialogs>
      <CustomizedSnackbars open8={open8} setOpen8={setOpen8}></CustomizedSnackbars>
    </div>
  );
}

export default Examen;
