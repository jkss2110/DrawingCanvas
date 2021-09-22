import React from "react";
import "./paper-draw.css";
import RegionSelect from "react-region-select";
import { Button } from "reactstrap";
import domtoimage from "dom-to-image";
var FileSaver = require("file-saver");

class PaperDraw extends React.Component {
  constructor(props) {
    super(props);
    this.bckImgContent = this.props.bckImgContent;
    this.regionRenderer = this.regionRenderer.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onDownload=this.onDownload.bind(this);
    this.state = {
      regions: [],
    };
  }
  onChange(regions) {
    this.setState({
      regions: regions,
    });
  }
  regionRenderer(regionProps) {
    let region;
    if (!regionProps.isChanging) {
      if (
        this.state.regions.length > 0 &&
        this.state.regions[regionProps.index]
      ) {
        region = this.state.regions[regionProps.index];
        if (!region.data.imgContent) {
          region.data.imgContent = this.imgContent;
        }
      }
      return (
        <div
          style={{
            position: "absolute",
            width: "-webkit-fill-available",
            height: "-webkit-fill-available",
          }}
        >
          {region.data.imgContent}
        </div>
      );
    }
  }
  componentDidUpdate(prev) {
  //  if (prev.imageContent !== this.props.imageContent) {
      this.imgContent = this.props.imageContent;
   // }
  }
  onClearBorders = () => {
    const paperDraw = document.getElementsByClassName("paperDrawing");
    if (paperDraw.length === 0) {
      return;
    }
    let childrens = paperDraw[0].children;
    for (let i = 0; i < childrens.length - 1; i++) {
      const child = childrens[i];
      if (child.dataset.wrapper) {
        child.style.border = "none";
        child.style.outline = "none";
        if (child.children.length > 0) {
          child.children[0].style.display = "none";
        }
      }
    }
  };
  onDownload = () => {
    domtoimage.toBlob(document.getElementById("my-node")).then(function (blob) {
      FileSaver.saveAs(blob, "postcard.png");
    });
  };
  render() {
    //this.setRefenence = this.props.reference;
    return (
      <>
        <div class="paperDrawBtn">
          <Button
            class="clearBtn"
            variant="secondary"
            name="clearborder"
            onClick={this.onClearBorders.bind(this)}
          >
            Clear Borders
          </Button>
          <Button
            class="downloadBtn"
            variant="secondary"
            name="Download"
            onClick={this.onDownload.bind(this)}
          >
            Download
          </Button>
        </div>
        <div id="my-node" ref={(divDraw) => (this.saveableDiv = divDraw)}>
          <RegionSelect
            className="paperDrawing"
            maxRegions={7}
            regions={this.state.regions}
            onChange={this.onChange}
            constraint
            regionRenderer={this.regionRenderer}
            style={{ border: "1px solid black" }}
          >
            {this.bckImgContent}
          </RegionSelect>
        </div>
      </>
    );
  }
}
export default PaperDraw;
