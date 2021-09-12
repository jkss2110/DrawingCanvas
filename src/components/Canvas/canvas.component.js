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
  componentDidMount() {
    // let's change the color randomly every 2 seconds. fun!
    window.setInterval(() => {
      this.setState({
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }, 2000);
  }
  render() {
    return (
      <>
        <div class="canvasArea">
        <CanvasDraw
          ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
          brushRadius={this.state.brushRadius}
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
