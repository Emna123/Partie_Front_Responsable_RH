import React, { Component, useEffect, useState, version } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import './AppOffre.css'
import { Link } from "react-router-dom";

import { Icon, Button, IconButton } from "@material-ui/core";

import { Document, Page, pdfjs } from 'react-pdf'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import printJS from 'print-js';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useWindowWidth } from '@wojtekmaj/react-hooks';

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

const TherDS = (props) => {
  const width = useWindowWidth();



  const axios = require('axios');










  const items2 = [];



  for (const [index, value] of props.tab.entries()) {
    if (value.cVname != null && value.archiver != true) {
      items2.push(
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
                <div className="react-pdf__Page__canvas container" style={{ backgroundColor: '#454545', marginTop: -50,height:'100%',paddingTop:'5%' }} >


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



                          <Page size="A4"  key={index} className="react-pdf__Page__canvas" pageNumber={props.tab[index].pageNumber}  width={window.innerWidth / 3.5} paddingLeft={-100}/>


                        </Document>
                      </Link>
                    </TransformComponent>


                    <div style={{ color: '#FFFFFF', marginBottom:10,marginTop:10 }}  >
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

      )

    }
  }



  return (



    <div id="div3"  >
      <section style={{ backgroundColor: '#F8F9F9' }}>

        <div className="container" style={{ marginTop: -60, backgroundColor: '#F8F9F9' }}   >
          <div className="row" style={{ backgroundColor: '#F8F9F9' }}>


            {items2}



          </div>
        </div>
      </section>
    </div>












  );
};

export default TherDS;


