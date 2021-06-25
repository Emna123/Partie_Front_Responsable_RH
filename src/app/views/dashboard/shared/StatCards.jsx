import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import history from "history.js";

const styles = theme => ({
  icon: {
    fontSize: "44px",
    opacity: 0.6,
    color: theme.palette.primary.main
  }
});

const StatCards = ({ classes ,nbrcandidats,nbroffres}) => {
  return (
    <Grid container spacing={3} className="mb-3">
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={classes.icon}>group</Icon>
            <div className="ml-3">
              <small className="text-muted">Nombre de candidats </small>
              <h6 className="m-0 mt-1 text-primary font-medium">{nbrcandidats}</h6>
            </div>
          </div>
          <Tooltip title="Voir Détails" placement="top">
            <IconButton onClick={e=>{ history.push('/recrutement/toutescandidats');}}>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card className="play-card p-sm-24 bg-paper" elevation={6}>
          <div className="flex items-center">
            <Icon className={classes.icon}>business_center</Icon>
            <div className="ml-3">
              <small className="text-muted">Nombre d'offres</small>
              <h6 className="m-0 mt-1 text-primary font-medium">{nbroffres}</h6>
            </div>
          </div>
          <Tooltip title="Voir Détails" placement="top">
            <IconButton onClick={e=>{      history.push('/recrutement/offres');}}>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
    
   
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(StatCards);
