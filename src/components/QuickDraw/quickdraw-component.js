import React from "react";
import HttpRequestHandler from "../../service/HttpRequestHandler";
import Canvas from "../Canvas/canvas.component";

import "./quickdraw.css";
export default class QuickDraw extends React.Component {
  constructor(props) {
    super(props);
    this.httpHandler = new HttpRequestHandler();
    this.state = {
      outputData: {},
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
        this.setState({
          outputData: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    //const drawingInfo = this.state.outputData.toString();

    return (
      <Canvas></Canvas>
    );
  }
}
