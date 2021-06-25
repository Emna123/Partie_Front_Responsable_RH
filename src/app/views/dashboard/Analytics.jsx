import React, { Component, Fragment } from "react";
import { Grid, Card } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';

import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
import UpgradeCard from "./shared/UpgradeCard";
import Campaigns from "./shared/Campaigns";
import { withStyles } from "@material-ui/styles";
import authAxios from '../../services/authAxios';

class Dashboard1 extends Component {
  state = {
    jan: 0,
    fev: 0,
    mar: 0,
    avr: 0,
    mai: 0,
    juin: 0,
    juil: 0,
    aout: 0,
    sEP: 0,
    oct: 0,
    nov: 0,
    dec: 0,
    max:0,
    min:0,
    accepte:0,
    preselectionne:0,
    rejete:0,
    nbrcandidats:0,
    nbroffres:0,
    topthreeoffre:[]
  };
  max = () => {
    var max=this.state.jan;
    if(max<this.state.fev){max=this.state.fev}
    else
    if(max<this.state.mar){max=this.state.mar}
    else
    if(max<this.state.avr){max=this.state.avr}
    else
    if(max<this.state.mai){max=this.state.mai}
    else
    if(max<this.state.juin){max=this.state.juin}
    else
    if(max<this.state.juil){max=this.state.juil}
    else
    if(max<this.state.aout){max=this.state.aout}
    else
    if(max<this.state.sEP){max=this.state.sEP}
    else
    if(max<this.state.oct){max=this.state.oct}
    else
    if(max<this.state.nov){max=this.state.nov}
    else
    if(max<this.state.dec){max=this.state.dec}
    
this.setState({max:this.state.max})

  }

  

  min = () => {
    var min=this.state.jan;
    if(min>this.state.fev){min=this.state.fev}
    else
    if(min>this.state.mar){min=this.state.mar}
    else
    if(min>this.state.avr){min=this.state.avr}
    else
    if(min>this.state.mai){min=this.state.mai}
    else
    if(min>this.state.juin){min=this.state.juin}
    else
    if(min>this.state.juil){min=this.state.juil}
    else
    if(min>this.state.aout){min=this.state.aout}
    else
    if(min>this.state.sEP){min=this.state.sEP}
    else
    if(min>this.state.oct){min=this.state.oct}
    else
    if(min>this.state.nov){min=this.state.nov}
    else
    if(min>this.state.dec){min=this.state.dec}
    this.setState({min:this.state.min})

   

  }
  componentDidMount = () => {
    const date = [];

    authAxios.get('Candidature/getAllCandidatures').then((res) => {
      console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        date.push(res.data[i].date_candidature)
        console.log("dates", new Date(res.data[i].date_candidature).getMonth(), new Date(res.data[i].date_candidature))
        switch (res.data[i].etat) {
          case "préaccepté":
            this.setState({accepte:this.state.accepte +1 })
            break;
          case "présélectionné":
            this.setState({preselectionne:this.state.preselectionne +1 })
            break;
          case "rejeté":
            this.setState({rejete: this.state.rejete+1})
            break;
        }
        if (new Date(res.data[i].date_candidature).getFullYear() == new Date().getFullYear() ||(new Date(res.data[i].date_candidature).getMonth()>new Date().getMonth() && new Date(res.data[i].date_candidature).getFullYear() == new Date().getFullYear()-1 ) ) { 

        switch (new Date(res.data[i].date_candidature).getMonth()) {
          case 1:
            this.setState({jan:this.state.jan+1})
            break;
          case 2:
            this.setState({fev:this.state.fev+1})
            break;
          case 3:
            this.setState({mar:this.state.mar+1})
            break;
          case 4:
            this.setState({avr:this.state.avr+1})
            break;
          case 5:
            this.setState({mai:this.state.mai+1})
            break;
          case 6:
            this.setState({juin:this.state.juin+1})
            break;
          case 7:
            this.setState({juil:this.state.juil+1})
            break;

          case 8:
            this.setState({aout:this.state.aout+1})
            break;
          case 9:
            this.setState({sEP:this.state.sEP+1})
            break;
          case 10:
            this.setState({oct:this.state.oct+1})
            break;
          case 11:
            this.setState({nov:this.state.nov+1})
            break;
          case 12:
            this.setState({dec:this.state.dec+1})
            break;

        }

      }
      }
      this.max();
      this.min();
console.log(this.state.nov)
    })
    authAxios.get('Candidats').then((res) => {
     this.setState({nbrcandidats:res.data.length})
     console.log('nbrcandidats',res.data.length)
    })

    authAxios.get('Offre/getAllOffres').then((res) => {
      if(res.data.length>0)
     { this.setState({nbroffres:res.data.length})
      console.log('nbroffres',res.data.length)
      res.data.sort(function compare(a, b) {
        if (a.candidature.length > b.candidature.length)
           return -1;
        if (a.candidature.length < b.candidature.length )
           return 1;
        return 0;
      });
      if(res.data.length>0){this.state.topthreeoffre.push({titre:res.data[0].titre,date_publication:res.data[0].date_publication,nbrcandidature:res.data[0].candidature.length})}
      if(res.data.length>1){this.state.topthreeoffre.push({titre:res.data[1].titre,date_publication:res.data[1].date_publication,nbrcandidature:res.data[1].candidature.length}) }
      if(res.data.length>2){this.state.topthreeoffre.push({titre:res.data[2].titre,date_publication:res.data[2].date_publication,nbrcandidature:res.data[2].candidature.length})
    }
      this.setState({topthreeoffre:[...this.state.topthreeoffre]})
    }
    })  

  }
  render() {
    let { theme } = this.props;

    return (
      <Fragment>
        <div className="pb-24 pt-7 px-8 bg-primary">
          <div className="card-title capitalize text-white mb-4 text-white-secondary">
            Nombre de candidatures reçues par mois
          </div>
          <ModifiedAreaChart
            height="280px"
            option={{
              max:this.state.max,
              min:this.state.min,
              series: [
                {
                  data: [
                    this.state.jan,
                    this.state.fev,
                    this.state.mar,
                    this.state.avr,
                    this.state.mai,
                    this.state.juin,
                    this.state.juil,
                    this.state.aout,
                    this.state.sEP,
                    this.state.oct,
                    this.state.nov,
                    this.state.dec],
                  type: "line"
                }
              ],
              xAxis: {
                data: [
                  "Jan",
                  "Fév",
                  "Mar",
                  "Avr",
                  "Mai",
                  "Juin",
                  "Juil",
                  "Août",
                  "SEP",
                  "Oct",
                  "Nov",
                  "Déc"
                ]
              }
            }}
          ></ModifiedAreaChart>
        </div>

        <div className="analytics m-sm-30 mt--18">
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <StatCards nbrcandidats={this.state.nbrcandidats} nbroffres={this.state.nbroffres} />


             {/* <TableCard />

             <StatCards2 />*/}
<br></br>
              <h4 className="card-title text-muted mb-4">Top 3 offres les plus postulées</h4>
              <RowCards topthreeoffre={this.state.topthreeoffre} />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card className="px-6 py-4 mb-6">
                <div className="card-title">candidatures</div>
                <div className="card-subtitle">Nombre total : {this.state.accepte+this.state.preselectionne+this.state.rejete}</div>
                <DoughnutChart
                  height="300px"
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ]}
                  accepte={this.state.accepte}
                  preselectionne={this.state.preselectionne}
                  rejete={this.state.rejete}
                />
              </Card>

             {/* <UpgradeCard />

             <Campaigns />*/}
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
