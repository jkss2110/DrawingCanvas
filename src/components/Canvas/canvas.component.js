//import useCanvas from "./useCanvas.component";
import { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./canvas.css";
//import { useScreenshot } from "use-react-screenshot";
import { useScreenshot } from "use-react-screenshot";


import { Button } from "reactstrap";

const Canvas = (props) => {
  const removeImageBckGrnd = props.removeImageBckGrnd;
  const brushColoring = props.brushColoring;
  const [brushRadius] = useState(6);
  const [brushColor] = useState(brushColoring);
  const [width] = useState(200);
  const [height] = useState(200);
  const loadData = JSON.stringify(props.loadData);
  const canvasDrawDiv = useRef(null);
  const canvasDraw = useRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [selectBtn, setSelectBtn] = useState("Select>>");
  let index = 0;

  const getImage = (event) => {
    takeScreenShot(canvasDrawDiv.current);
    if (image) {
      removeImageBckGrnd(image);
    }
    const btnValue = event.currentTarget.textContent;
    if (btnValue === "Select>>") {
      setSelectBtn("Move>>>");
    } else {
      setSelectBtn("Select>>");
    }
  };
  const clearCanvas = () => {
    canvasDraw.current.clear();
  };
  const undoCanvas = () => {
    canvasDraw.current.undo();
  };
  return (
    <div className="canvasContainer">
      <div class="canvasArea" ref={canvasDrawDiv}>
        <CanvasDraw
          key={index}
          ref={canvasDraw}
          brushRadius={brushRadius}
          brushColor={brushColor}
          width={width}
          height={height}
          hideGrid
          hideInterface
          saveData={loadData}
          style={{
            boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          }}
        ></CanvasDraw>
      </div>
      <div class="btnCollection">
        <div>
          <Button variant="primary" onClick={getImage}>
            {selectBtn}
          </Button>
          <Button onClick={clearCanvas}>Clear</Button>
          <Button onClick={undoCanvas}>Undo</Button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
