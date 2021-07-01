
import React, { Component } from "react";
import { RichTextEditor, Breadcrumb } from "matx";
import { TextField, InputAdornment, IconButton, Button, Icon } from "@material-ui/core";
import '../AppOffre.css'

import authAxios from '../../../services/authAxios';


class ModifEditText extends Component {
  state = {
    content: "",
    offre: null

  };

  handleContentChange = contentHtml => {
    this.setState({
      content: contentHtml
    });
  };
  drawBackground() {
    console.log("worked");
  }


  componentDidMount() {
    const url = window.location.href;
    console.log("url", url)

    const id = url.substring(url.lastIndexOf('/') + 1, url.length);


    authAxios.get('Offre/getOffre/' + id).then((res) => {
      this.setState({
        content: res.data.description,
        offre: res.data
      });


    })

    document.getElementById("iddisc1").innerHTML = '<div style=background-color:#F2F3F4;width:80%;padding:3%; border-radius:5px;>' + this.state.content + '</div>';


    this.check()
  }

  check = () => {
    setTimeout(
      () => document.getElementById("iddisc1").innerHTML = '<div style=background-color:#F2F3F4;width:80%;padding:3%; border-radius:5px;>' + this.state.content + '</div>',

      500
    );
    { this.drawBackground() }
  }


  render() {

    return (
      <div className="m-sm-30"     >
        <div id="iddisc" style={{ marginTop: '-8%', display: this.state.description !== "" ? 'none' : 'block' }}> <br></br> <br></br> <br></br>

          <RichTextEditor
            content={this.state.content}
            handleContentChange={this.handleContentChange}
            placeholder="insérer texte ici..."
          /><br></br>
          <Button

            variant="contained"
            color="primary"
            type="submit"
            onClick={e => {


              if (this.state.content != "" && this.state.content != '<p><br></p>') {
                document.getElementById("iddisc").style.display = "none"

                document.getElementById("iddisc3").style.display = "block"
                document.getElementById("iddisc1").style.display = "block"
                document.getElementById("iddisc1").innerHTML = '<div style=background-color:#F2F3F4;width:80%;padding:3%; border-radius:5px;>' + this.state.content + '</div>';

                this.state.offre.description = this.state.content
                this.setState({
                  offre: this.state.offre
                });

                authAxios.put('Offre/PutOffre/' + this.state.offre.id, this.state.offre).then((res) => {

                })

              }



            }}
          >
            ENREGISTRER
          </Button>
          <IconButton style={{ border: 'solid 2px  #707B7C', borderRadius: '3px', padding: '6px', marginLeft: '2%', backgroundColor: '#707B7C' }} aria-label="Delete"

            onClick={e => {
              this.setState({
                content: ""
              });
            }}
          >
            <Icon style={{ fontSize: "1rem", color: '#FFFFFF' }}>clear</Icon>
          </IconButton>
          <br></br>
        </div>
        <div id="iddisc1" dangerouslySetInnerHTML={{ __html: this.state.description }}
          style={{ display: this.state.description === "" ? 'none' : 'block' }}>
        </div>
        <div id="iddisc3" style={{ display: this.state.description === "" ? 'none' : 'block' }}>
          <Button
            style={{ marginTop: '2%' }}
            className="ml-4"
            variant="contained"
            color="primary"
            onClick={e => {

              document.getElementById("iddisc3").style.display = "none"
              document.getElementById("iddisc1").style.display = "none"
              document.getElementById("iddisc").style.display = "block"


            }}
          >
            Éditer
          </Button>
        </div>
      </div>
    );
  }
}

export default ModifEditText;
