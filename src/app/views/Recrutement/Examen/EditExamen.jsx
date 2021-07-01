import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import {
    Icon, Button, FormControlLabel,
    Checkbox
} from "@material-ui/core";
import history from "history.js";
import ExemainInfoEdit from "./ExemainInfoEdit";
import EXQuestionnaireEdit from "./ExQuestionnaireEdit";
import CustomizedDialogs from "./CustomizedDialogs";
import CustomizedSnackbars from "../CustomizedSnackbars";
import axios from 'axios';
import { green } from "@material-ui/core/colors";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { withStyles } from "@material-ui/core/styles";

import React, { Component, useEffect, useState, updateState } from 'react';
import authAxios from '../../../services/authAxios';

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody, TablePagination
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        width: 900,
        borderColor: 'transparent',
        background: 'white',


    },
    heading: {
        backgroundColor: 'white',
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
const productList = [1, 2];
function EditExamen() {


    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
    };
    const getData = async () => {
 
        const url = window.location.href;

        idoffre = url.substring(url.lastIndexOf('/') + 1, url.length);
        if (idoffre.indexOf('#') != -1) { idoffre = idoffre.replace('#', '') }
        setidoffre(idoffre)
        const res = await authAxios.get('Offre/getOffre/' + idoffre);
        if (res.data != 0) {
            if (res.data.examen.duree == 15) { exinfo.duree = "15 min" }
            else if (res.data.examen.duree == 30) { exinfo.duree = "30 min" }
            else if (res.data.examen.duree == 45) { exinfo.duree = "45 min" }
            else if (res.data.examen.duree == 60) { exinfo.duree = "1h" }
            else if (res.data.examen.duree == 75) { exinfo.duree = "1h 15min" }
            else if (res.data.examen.duree == 90) { exinfo.duree = "1h 30min" }
            else if (res.data.examen.duree == 105) { exinfo.duree = "1h 45min" }
            else if (res.data.examen.duree == 120) { exinfo.duree = "2h" }
            exinfo.titre = res.data.examen.titre;
            exinfo.dateex = res.data.examen.date_expiration;
            exinfo.nombreq = res.data.examen.nbr_questions;
            exinfo.id = res.data.examen.id;
            for (var i = 0; i < res.data.examen.notes_questions.length; i++) {
                var exrinfo = []
                for (var j = 0; j < res.data.examen.notes_questions[i].question.reponses.length; j++) {
                    exrinfo.push({ id: j, reponse: res.data.examen.notes_questions[i].question.reponses[j].reponse, idb: res.data.examen.notes_questions[i].question.reponses[j].id, chec: res.data.examen.notes_questions[i].question.reponses[j].correcte })
                }

                questinfo.push({ question: res.data.examen.notes_questions[i].question.question, note: res.data.examen.notes_questions[i].question.note, repinfo: exrinfo, idb: res.data.examen.notes_questions[i].question.id, idq: i, id_note_question: res.data.examen.notes_questions[i].id })
                ex.push(<EXQuestionnaireEdit deleterep={deleterep} setdeleterep={setdeleterep} questinfo={questinfo} setquestinfo={setquestinfo} id1={'d1' + i} id2={'d2' + i} idh={'h' + i} id={i}   ></EXQuestionnaireEdit>);
            }
            setindice(ex.length)
            setex(...[ex])
            setquestinfo(...[questinfo])
            setexinfo(exinfo);
            const response = await authAxios.get('Question/getAllQuestions');
            console.log(response.data)
            for (var i in response.data) {
                var n = -1;
                for (var d = 0; d < questinfo.length; d++) {
                    if (questinfo[d].idb == response.data[i].id) { n = d }

                }

                if (n == -1) {
                    var reponses = []
                    for (var j = 0; j < response.data[i].reponses.length; j++) {
                        reponses.push({ reponse: response.data[i].reponses[j].reponse, correcte: response.data[i].reponses[j].correcte })

                    }
                    oldquest.push({ id: response.data[i].id, question: response.data[i].question, check: false, reponses: reponses })
                }
            }
            setex(...[ex])
            setoldquest([]);
            setoldquest(...[oldquest]);
            setquestionrep(...[oldquest])

        }
        else {
            history.push('/session/NotFound')

        }
    }



    useEffect(() => {

        getData();
    }, [], [], []);
    const classes = useStyles();
    var [exinfo, setexinfo] = useState({ titre: "", duree: "", dateex: null, nombreq: 0, id: -1 });

    var [questinfo, setquestinfo] = useState([]);

    var [indice, setindice] = useState(0);
    var [nb, setnb] = useState(0);
    var [indice1, setindice1] = useState(0);
    var [repinfo, setrep] = useState([]);
    var [oldquest, setoldquest] = useState([]);
    var [deletequest, setdeletequest] = useState([]);
    var [deleterep, setdeleterep] = useState([]);
    var [idoffre, setidoffre] = useState('');

    var [ex, setex] = useState([]);

    var [questionrep, setquestionrep] = useState([]);



    var [openn, setopenn] = useState(false);
    var [open9, setOpen9] = useState(false);
    var [mes, setmes] = useState(false);
    var [r, setres] = useState(-1);

    const addquest = () => {


    }

    return (

        <div style={{ marginBottom: '8%', background: 'white', textAlign: 'center' }} className='container'>
            <h5 style={{background: 'white', textAlign: 'center', marginTop: '2%', fontSize: 18 }}>Créer un examen</h5>
            <div className="card" style={{background: 'white', width: "100%", textAlign: 'center', marginTop: '2%', padding: "0.9%", paddingTop: '0%', paddingBottom: '0%' }} >
                {exinfo.titre != "" ? (
                    <ExemainInfoEdit exinfo={exinfo} setexinfo={setexinfo}  ></ExemainInfoEdit>) : (<span></span>)}
            </div>
            <br></br><br></br><br></br>
            <div className={classes.root} style={{ borderColor: 'transparent', textAlign: 'center', width: '75%',background: 'white' }} className='container' >
                <ExpansionPanel style={{
                }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} className='container' style={{ fontSize: 18 }}>Choisir des questions trouvées dans d'autres examens</Typography>
                    </ExpansionPanelSummary>
                    <br></br><br></br>
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
                                                    <div className="row" style={{ textAlign: 'right' }}>   <FormControlLabel
                                                        style={{ margin: '1%', marginLeft: '3%' }}
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

                    ex.push(<EXQuestionnaireEdit questinfo={questinfo} setquestinfo={setquestinfo} repinfo={repinfo} setrep={setrep} indice1={indice1} setindice1={setindice1} id1={'d1' + indice} id2={'d2' + indice} idh={'h' + indice} id={indice}   ></EXQuestionnaireEdit>);
                    var k = []
                    k.idb = -1
                    k.repinfo = [];
                    k.note = 0; k.question = "";
                    k.id_note_question = -1;
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
                            if (questinfo[idquest].idb != -1) {
                                deletequest.push(questinfo[idquest].id_note_question)
                                setdeletequest(deletequest)
                            }
                            questinfo.splice(idquest, 1);
                            setquestinfo([])
                            setquestinfo(...[questinfo])

                            ex.splice(index, 1);

                            ; setex(...[]); setex([...ex]);




                        }} aria-label="Delete" >                        <Icon style={{ fontSize: "1rem" }}>delete</Icon>
                        </IconButton>
                    </div >

                    <div className="border shadow-sm" style={{ width: "100%", textAlign: 'center', marginTop: '-2.1%', padding: "4%", paddingTop: '8%' }} key={v.props.id} >




                        <div > {v}</div >

                    </div></div>
            ))}
            <div style={{ marginTop: '4%', marginRight: '15%', marginLeft: '13%' }}>
                <Button
                    style={{ width: '23%', padding: 5 }}
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
                                    const response = await authAxios.post('Question/AddQuestion/' + exinfo.id, { question: questinfo[i].question, note: questinfo[i].note });
                                    for (var j = 0; j < questinfo[i].repinfo.length; j++) {
                                        authAxios.post('Reponse/AddReponse/' + response.data.question.id, { reponse: questinfo[i].repinfo[j].reponse, correcte: questinfo[i].repinfo[j].chec })

                                    }
                                    return response.data
                                }


                                const modifquest = async (idb, i) => {
                                    const response = await authAxios.put('Question/PutQuestion/' + idb, { question: questinfo[i].question, note: questinfo[i].note, id: idb });
                                    for (var j = 0; j < questinfo[i].repinfo.length; j++) {

                                        if (questinfo[i].repinfo[j].idb == -1) { authAxios.post('Reponse/AddReponse/' + idb, { reponse: questinfo[i].repinfo[j].reponse, correcte: questinfo[i].repinfo[j].chec }) }
                                        else { authAxios.put('Reponse/PutReponse/' + questinfo[i].repinfo[j].idb, { reponse: questinfo[i].repinfo[j].reponse, correcte: questinfo[i].repinfo[j].chec, id: questinfo[i].repinfo[j].idb }) }

                                    }
                                    return response.data
                                }

                                const sendQusEx = async (res, i) => {
                                    const response = await authAxios.post('Note_Question/PostNote_Question/' + oldquest[i].id + '/' + exinfo.id, { note_obtenue: 0 });

                                    return res.data
                                }
                                console.log(idoffre)
                                authAxios.put('Examen/PutExamen/' + exinfo.id, { nbr_questions: exinfo.nombreq, duree: d, titre: exinfo.titre, id: exinfo.id, id_offre: idoffre }).then((res) => {
                                    for (var i = 0; i < questinfo.length; i++) {
                                        if (questinfo[i].idb == -1) { getData(res, i); }
                                        else {
                                            modifquest(questinfo[i].idb, i)
                                        }


                                    }
                                    for (var i = 0; i < oldquest.length; i++) {

                                        if (oldquest[i].check == true) {
                                            sendQusEx(res, i);

                                        }

                                    }
                                    for (var i = 0; i < deletequest.length; i++) {
                                        authAxios.delete('Note_Question/DeleteNote_Question/' + deletequest[i])


                                    }
                                    for (var i = 0; i < deleterep.length; i++) {
                                        authAxios.delete('Reponse/DeleteReponse/' + deleterep[i])


                                    }
                                })
                                console.log('this', questinfo)
                              setOpen9(true)
                                //window.location.href = 'http://localhost:3000/recrutement/offres'

                            }
                        }


                    }}


                >

                    Appliquer les modifications
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
            <CustomizedSnackbars open9={open9} setOpen9={setOpen9}></CustomizedSnackbars>
        </div>
    );
}

export default EditExamen;
