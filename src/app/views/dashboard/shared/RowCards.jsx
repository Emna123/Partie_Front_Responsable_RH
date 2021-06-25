import React, { Fragment } from "react";
import { format } from "date-fns";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Avatar,
  Hidden
} from "@material-ui/core";

const RowCards = (props) => {

  if(props.topthreeoffre.length>0){
  return  props.topthreeoffre.map((v, id) => (
    <Fragment key={id}>
      <Card className="py-2 px-4 project-card">
        <Grid container alignItems="center">
          <Grid item md={7} xs={9}>
            <div className="flex items-center">
              <Hidden smDown>
              
                  <Fab className="ml-4 bg-error box-shadow-none" size="small">
                    <Icon>star_outline</Icon>
                  </Fab>
              
              </Hidden>
              <span className="card__roject-name font-medium" style={{width:'70%'}}>
                {v.titre}
              </span>
            </div>
          </Grid>

          <Grid item md={2} xs={3}>
            <div className="text-muted" style={{fontSize:'13px'}}>
              {format(new Date(v.date_publication).getTime(), "MM/dd/yyyy")}
            </div>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <div style={{fontSize:'13px'}}>
              Nombre de candidatures : {v.nbrcandidature}
              </div>
            </Grid>
          </Hidden>

       
        </Grid>
      </Card>
      <div className="py-2" />
    </Fragment>
  ));
}
else{
  return (<span></span>)
 }
}


export default RowCards;
