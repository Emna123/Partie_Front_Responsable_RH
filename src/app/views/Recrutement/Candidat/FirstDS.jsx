import React, { Component, useEffect, useState, version } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import './AppOffre.css'
import { Icon, Button } from "@material-ui/core";
import MaxHeightMenuCandidat from "./MaxHeightMenuCandidat";
import { drop } from "lodash";
import { InlineWrapper } from "@material-ui/pickers/wrappers/InlineWrapper";
import { Page, pdfjs } from 'react-pdf';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import { GetAllCondidats, GetAllFormation } from '../../../services/GetAllCandidats';
import AppProgress from "../Candidat/AppProgress"
import { Link } from "react-router-dom";

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




}));
const FirstDS = (props) => {
 

  const items = [];




  for (const [index, value] of props.tab.entries()) {
    if (value.archiver != true) {
      items.push(<div className="col-md-4" key={{ index }} >

        <div className="card profile-card-2 shadow p-3 mb-5 bg-white rounded box ">

     
          <div className="row" style={{ margin: 0, padding: 0 }}>

            <div className="col-3" style={{ marginRight: '10%' }}>

              <Link to={"/recrutement/profilecondidat/" + value.id} style={{ textDecoration: 'none', color: '#454545', padding: 0, width: '100%' }}  >

                <div >
                  {value.photo == null ? (
                    <AppProgress id="here" imge={'https://localhost:44392/Photos/i1.jpg'} elm={value}></AppProgress>
                  ) : (
                    <AppProgress id="here" imge={"https://localhost:44392/Photos/" + value.photo} elm={value}></AppProgress>
                  )}

                </div>
              </Link>
            </div>

            <div style={{ textAlign: 'center', padding: 0 }} className="col-6">
              <div style={{ lineHeight: 2 }} style={{ textAlign: 'center', width: '100%' }}>
                <h5 className='t1'><Icon style={{ fontSize: "12px" }}> grade </Icon><Icon style={{ fontSize: "12px" }}> grade </Icon><Icon style={{ fontSize: "12px" }}> grade </Icon><Icon style={{ fontSize: "12px" }}> grade </Icon><Icon style={{ fontSize: "12px" }}> grade </Icon>                                   </h5>

                <div className='t1' style={{ fontSize: "12px", fontWeight: 'bold' }}>
                  {value.metier}
                </div >
                <div className='t1' style={{ color: '#515A5A', fontSize: "12px" }}>{value.nom} {value.prenom}</div >
              
                <div className='t1' style={{ color: '#999999', fontSize: "12px" }}>{(new Date().getFullYear()) - (new Date(value.date_naissance).getFullYear())} ans ,{value.etat_matrimonial} </div >

                <div className='t1' style={{ color: '#999999', fontSize: "12px" }}><Icon style={{ fontSize: "12px", marginRight: 6 }}> call </Icon> {value.phoneNumber}</div >
                <div className='t1' style={{ color: '#999999', fontSize: "12px", display: 'block', whiteSpace: 'nowrap' }} ><Icon style={{ fontSize: "12px", marginRight: 6 }}> contact_mail </Icon>  {value.email}</div >
                <div className='t1' style={{ color: '#999999', fontSize: "12px", display: 'block', whiteSpace: 'nowrap' }}><Icon style={{ fontSize: "12px" }}> room </Icon> <span style={{ color: '#707B7C', fontSize: "12px" }}>{value.adresse}</span></div >

              </div >

            </div>
            <span className="col-1" style={{ textAlign: 'left', marginTop: 0, marginRight: 3 }}>
              <MaxHeightMenuCandidat cand={value} tab={props.tab} ind={index} settab={props.settab} />

            </span>
          </div>

        </div>
      </div>)
    }
  }


  return (


    <div id="div1"  >
      <section style={{ backgroundColor: '#F8F9F9' }}>
        <div className="container" style={{ marginTop: -60 }} >
          <div className="row" style={{ backgroundColor: '#F8F9F9' }}>
            {items}

          </div>
        </div>
      </section>
    </div>












  );
};

export default FirstDS;


