//import useCanvas from "./useCanvas.component";
import { useState, createRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./canvas.css";
//import { useScreenshot } from "use-react-screenshot";
import { useScreenshot } from "use-react-screenshot";
import PaperDraw from "../Paper/paper-draw.component";
import  back_img from '../../img/back_img.jpg'

const Canvas = (props) => {
  const [brushRadius] = useState(6);
  const [width] = useState(400);
  const [height] = useState(400);
  const loadData = JSON.stringify(props.loadData);
  const canvasDrawDiv = createRef(null);
  const canvasDraw = createRef(null);
  const [image, takeScreenShot] = useScreenshot();
  let index = 0;
  let [imgContent, setImgContent] =useState([<img key={index} width={width} src={back_img} alt={"ScreenShot"}/>]);
  let temp = [];
  
  const getImage = () => {
    takeScreenShot(canvasDrawDiv.current);
    //debugger;
    //let imageContent = [],paperContent=[];
    index++;
    temp = [];
    temp.push(<img key={index} width={width} src={image} alt={"ScreenShot"}/>);
    setImgContent(temp);
  };
  const clearCanvas = () => {
    canvasDraw.current.clear();
  };
  const undoCanvas = () => {
    canvasDraw.current.undo();
  };
  return (
    <>
      <div class="canvasArea" ref={canvasDrawDiv}>
        <CanvasDraw
          key={index}
          ref={canvasDraw}
          brushRadius={brushRadius}
          width={width}
          height={height}
          hideGrid
          saveData={loadData}
          style={{
            boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          }}
        ></CanvasDraw>
      </div>

      <div class="btnCollection">
        <button
        onClick={getImage}
        >
          Save
        </button>
        <button
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          onClick={undoCanvas}
        >
          Undo
        </button>
      </div>
      <PaperDraw key={index} imageContent={imgContent}></PaperDraw>
    </>
  );
};

export default Canvas;
