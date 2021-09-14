//import useCanvas from "./useCanvas.component";
import React from "react";
import CanvasDraw from "react-canvas-draw";
import './canvas.css';
class Canvas extends React.Component {
  state = {
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 6,
    lazyRadius: 12,
  };
  constructor(props){
    super(props);
    this.loadedData = JSON.stringify(this.props.loadData);
    this.index = 0;
    
  }
  canvasDrawRef = (canvasDraw) => {
    this.saveableCanvas = canvasDraw;
  };
  render() {
    this.loadedData = JSON.stringify(this.props.loadData);
    if (this.saveableCanvas){
      this.saveableCanvas.clear();
    }
    this.index++;
    return (
      <>
        <div class="canvasArea">
        <CanvasDraw
          key={this.index}
          ref={this.canvasDrawRef}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          brushColor={this.state.color}
          saveData={this.loadedData}
          style={{
            boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
          }}
        />
        </div>
        <div class="btnCollection">
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
        </div>
      </>
    );
  }
}
export default Canvas;
