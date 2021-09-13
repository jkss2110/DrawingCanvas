import React from "react";
import HttpRequestHandler from "../../service/HttpRequestHandler";
import Canvas from "../Canvas/canvas.component";
import "./quickdraw.css";

export default class QuickDraw extends React.Component {
  constructor(props) {
    super(props);
    this.httpHandler = new HttpRequestHandler();
    this.state = {
      outputData: {
                    lines : [],
                width: 400,
                height: 400
                }
    };
    this.canvasContent = [];
  }
  componentDidMount() {
    this.httpHandler
      .fetchDrawing("/users")
      .then((result) => {
        const drawings = result.drawing;
        let formatDataJSON = this.formatData(drawings);
        this.setState(
          {
            outputData: formatDataJSON
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  formatData = (drawings) =>{
   // const drawingLength = drawings.length;
   let formatDataJSON = this.state.outputData;
   
   drawings.forEach(data => {
      const lineData = {
        brushColor : "#ffc600",
        brushRadius : 6,
        points : []
      };
      for (let i=0;i<data[0].length;i++){
        let points = {
          x: data[0][i],
          y: data[1][i],
        };
        lineData.points.push(points);
      }
      formatDataJSON.lines.push(lineData);
      this.canvasContent = [];
      this.canvasContent.push(<Canvas loadData={this.state.outputData}></Canvas>);
    });
    return formatDataJSON;
  }
  render() {
    return (
      <>
      {this.canvasContent}
      </>
    );
  }
}
