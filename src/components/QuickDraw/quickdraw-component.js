import React from "react";
import HttpRequestHandler from "../../service/HttpRequestHandler";
import Canvas from "../Canvas/canvas.component";
import "./quickdraw.css";
import DrawSelection from "../DrawSelection/drawselection.component";
import PaperDraw from "../Paper/paper-draw.component";
import BackGroundSelect from "../BackGroundSelection/backgroundselection.component";
import { trackPromise } from "react-promise-tracker";
import back_img from "../../img/back_img.png";
import BrushColorSelection from "../BrushColor/brushcolorselection.component";

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
      backgrdWidth: 384,
      backgrdHeight: 432,
      image: [],
      backImage: [],
      index: 0,
      brushColor: "#ffc600",
      currentImage: "face",
      currDrawing: [],
    };
    this.count = 0;
    this.index = 0;
    this.prevImage = "";
  }
  componentDidMount() {
    // this.httpCalls("face");
    this.setBckGrnd(back_img);
  }
  setBckGrnd = (image) => {
    this.index++;
    this.setState({
      backImage: [
        <img
          key={this.index}
          width={this.state.backgrdWidth}
          height={this.state.backgrdHeight}
          src={image}
          alt={"ScreenShot"}
        />,
      ],
    });
  };
  httpCalls = (urlPath) => {
    trackPromise(
    this.httpHandler
      .fetchDrawing("/users/" + urlPath)
      .then((result) => {
        const drawings = result.drawing;
        this.setState({
            currDrawing: drawings,
        });
        let formatDataJSON = this.formatData(drawings);
        this.setState({
          outputData: formatDataJSON,
        });
        this.count++;
      })
      .catch((err) => {
        console.log(err);
      })
    );
  };

  formatData = (drawings) => {
    // const drawingLength = drawings.length;
    let formatDataJSON = {
      lines: [],
      width: 400,
      height: 400,
    };
    drawings.forEach((data) => {
      const lineData = {
        brushColor: this.state.brushColor,
        brushRadius: 6,
        points: [],
      };
      for (let i = 0; i < data[0].length; i++) {
        let points = {
          x: 50 + data[0][i],
          y: 50 + data[1][i],
        };
        lineData.points.push(points);
      }
      formatDataJSON.lines.push(lineData);
    });
    return formatDataJSON;
  };
  onCheckBoxChange(event) {
    const currTarget = event.currentTarget;
    this.httpCalls(currTarget.name);
    this.setState({
      currentImage : currTarget.name,
    });
  }
  onSelectionChange(newValue, action) {
    this.setBckGrnd(newValue.value);
  }
  removeImageBckGrnd(image) {
    if(image === this.prevImage){
      let index = this.state.index;
        index++;
        this.setState({
          index: index,
        });
      return;
    }
    trackPromise(
      this.httpHandler.fetchNoBckGrdImage(image).then((result) => {
        let index = this.state.index;
        index++;
        let temp = [];
        temp.push(
          <img
            key={index}
            class="screenshotImage"
            src={result.fileContent}
            alt={"ScreenShot"}
          />
        );
        this.prevImage = image;
        this.setState({
          image: temp,
          index: index,
        });
      })
    );
  }
  onBrushSelection = (newValue) => {
    this.setState({
      brushColor: newValue.value
    });
    if (this.state.currDrawing.length > 0){
      let formatDataJSON = this.formatData(this.state.currDrawing);
      this.setState({
        outputData: formatDataJSON,
      });
      this.count++;
    }
  };
  render() {
    return (
      <>
        <div>
          <Canvas
            key={this.count}
            brushColoring={this.state.brushColor}
            loadData={this.state.outputData}
            removeImageBckGrnd={this.removeImageBckGrnd.bind(this)}
          ></Canvas>
          <BrushColorSelection
            onSelectionChange={this.onBrushSelection.bind(this)}
          ></BrushColorSelection>
        </div>
        <PaperDraw
          key={this.index}
          className="paperDrawContainer"
          bckImgContent={this.state.backImage}
          imageContent={this.state.image}
        ></PaperDraw>
        <div className="rightPanel">
          <DrawSelection
            radiochk={this.onCheckBoxChange.bind(this)}
          ></DrawSelection>
          <BackGroundSelect
            onSelectionChange={this.onSelectionChange.bind(this)}
          ></BackGroundSelect>
        </div>
      </>
    );
  }
}
