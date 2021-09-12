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
      /* draw : (ctx, framework) => {
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
                ctx.fillStyle = "#000000"
                ctx.beginPath()
                ctx.arc(50,20,20*Math.sin(framework*0.05)**2,0,2*Math.PI)
                ctx.fill()
                }*/
    };
  }
  /*resizeCanvasToDisplaySize(canvas) {
    
        const { width, height } = canvas.getBoundingClientRect()
    
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
          return true // here you can return some usefull information like delta width and delta height instead of just true
          // this information can be used in the next redraw...
        }
    
        return false
    }
    preDraw (context,canvas) {
        context.save();
        this.resizeCanvasToDisplaySize(canvas);
        const { width,height } =context.canvas;
        context.clearRect(0,0,width,height);
    }
    postDraw(ctx){
       // index++;
        ctx.restore();
    }*/
  componentDidMount() {
    this.httpHandler
      .fetchDrawing()
      .then((result) => {
        const drawings = result.drawings;
        debugger;
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
    });
    return formatDataJSON;
  }
  render() {
    return (
      <Canvas loadData={this.state.outputData}></Canvas>
    );
  }
}
