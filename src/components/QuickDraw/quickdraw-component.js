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
    this.httpCalls(currTarget.name);
  };
  render() {
    return (
      <>
        {this.canvasContent}
        <DrawSelection radiochk={this.onCheckBoxChange.bind(this)}></DrawSelection>       
        
      </>
    );
  }
}
