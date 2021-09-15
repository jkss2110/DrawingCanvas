import React from "react";
import HttpRequestHandler from "../../service/HttpRequestHandler";
import Canvas from "../Canvas/canvas.component";
import "./quickdraw.css";
import DrawSelection from "../DrawSelection/drawselection.component";
import PaperDraw from "../Paper/paper-draw.component";

export default class QuickDraw extends React.Component {
  constructor(props) {
    super(props);
    this.httpHandler = new HttpRequestHandler();
    this.state = {
      outputData: {
        lines: [],
        width: 400,
        height: 400,
      },
      face : true,
      truck : false,
      bear : false,
      radiochk : {
                    face : true,
                    truck : false,
                    bear : false,
                  }
    };
    this.canvasContent = [];
    this.count = 0;
  }
  componentDidMount() {
    this.httpCalls("face");
  }
  httpCalls = (urlPath) => {
    this.httpHandler
    .fetchDrawing("/users/"+urlPath)
    .then((result) => {
      const drawings = result.drawing;
      let formatDataJSON = this.formatData(drawings);
      this.setState({
        outputData: formatDataJSON,
      });
      
    })
    .catch((err) => {
      console.log(err);
    });
  };

  formatData = (drawings) => {
    // const drawingLength = drawings.length;
    let formatDataJSON = {
      lines : [],
      width : 400,
      height : 400
    };
    drawings.forEach((data) => {
      const lineData = {
        brushColor: "#ffc600",
        brushRadius: 6,
        points: [],
      };
      for (let i = 0; i < data[0].length; i++) {
        let points = {
          x: 50+data[0][i],
          y: 50+data[1][i],
        };
        lineData.points.push(points);
      }
      formatDataJSON.lines.push(lineData);
      this.canvasContent = [];
      this.canvasContent.push(
        <Canvas loadData={formatDataJSON}></Canvas>
      );
    });
    return formatDataJSON;
  };
  onCheckBoxChange(event){
    const currTarget = event.currentTarget;
    switch(currTarget.name){
      case 'face':  if (currTarget.checked){
                        this.setState({
                          radiochk:{
                            'truck': false,
                            "face" : true,
                            "bear" : false,
                          }
                        });
                         this.httpCalls(currTarget.name);
                    }
                    break;
      case 'truck':  if (currTarget.checked){
                      this.setState({
                        radiochk:{
                          'truck': true,
                          "face" : false,
                          "bear" : false,
                        }
                        
                      });
                      this.httpCalls('truck');
                    }
                    break;
      case 'bear':  if (currTarget.checked){
                      this.setState({
                        radiochk:{
                          'truck': false,
                          "face" : false,
                          "bear" : true,
                        }
                        
                      });
                      this.httpCalls('bear');
                    }
                    break;
                    
      default : console.log('missing');
    }
  };
  render() {
    return (
      <>
        {this.canvasContent}
        <DrawSelection radiochk={this.onCheckBoxChange.bind(this)} chkState={this.state.radiochk}></DrawSelection>       
        
      </>
    );
  }
}
