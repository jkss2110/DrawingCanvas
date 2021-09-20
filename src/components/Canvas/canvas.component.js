//import useCanvas from "./useCanvas.component";
import { useState, createRef } from "react";
import CanvasDraw from "react-canvas-draw";
import "./canvas.css";
//import { useScreenshot } from "use-react-screenshot";
import { useScreenshot } from "use-react-screenshot";
import PaperDraw from "../Paper/paper-draw.component";
import  back_img from '../../img/back_img.png';
import HttpRequestHandler from "../../service/HttpRequestHandler";
import { trackPromise} from 'react-promise-tracker';

const Canvas = (props) => {
  const [brushRadius] = useState(6);
  const [brushColor] = useState('#ffc600');
  const [width] = useState(200);
  const [height] = useState(200);
  const loadData = JSON.stringify(props.loadData);
  const canvasDrawDiv = createRef(null);
  const canvasDraw = createRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [backgrdWidth] = useState(384);
  const [backgrdHeight] = useState(432);
  const [selectBtn, setSelectBtn] = useState('Select');
  let index = 0;
  let [imgContent, setImgContent] =useState([]);
  let [backImgCnt] =useState([<img key={index} width={backgrdWidth} height={backgrdHeight} src={back_img} alt={"ScreenShot"}/>]);
  let temp = [];
  let httpHandler = new HttpRequestHandler();
  const getImage = (event) => {
    takeScreenShot(canvasDrawDiv.current);
    index++;
    temp = [];
    if (image){
      trackPromise(
      httpHandler.fetchNoBckGrdImage(image).then(
        (result) => {
          index++;
          temp.push(<img key={index} class="screenshotImage" src={result.fileContent} alt={"ScreenShot"}/>);
          setImgContent(temp);
        }
      )
      );
    }
    const btnValue = event.currentTarget.textContent;
    if (btnValue === 'Select'){
      setSelectBtn('Move');
    }else{
      setSelectBtn('Select');
    }
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
        <button
        onClick={getImage}
        >
          {selectBtn}
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
      <PaperDraw key={index} bckImgContent={backImgCnt} imageContent={imgContent}></PaperDraw>
    </>
  );
};

export default Canvas;
