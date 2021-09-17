import React from "react";
import "./paper-draw.css";
var RegionSelect = require("react-region-select");

class PaperDraw extends React.Component {
  constructor(props) {
    super(props);
    this.bckImgContent = this.props.bckImgContent;
    this.regionRenderer = this.regionRenderer.bind(this);
    this.onChange = this.onChange.bind(this);
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
      if(this.state.regions.length>0 && this.state.regions[regionProps.index]){
        region = this.state.regions[regionProps.index];
        if(!region.data.imgContent){
          region.data.imgContent = this.imgContent;
        }
      }
      return (
        <div
          ref={(divDraw) => (this.saveableDiv = divDraw)}
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
    if (prev.imageContent !== this.props.imageContent) {
      this.imgContent = this.props.imageContent;
    }
  }
  render() {
    return (
      <>
        <div class="paperDrawing" >
          <RegionSelect
            maxRegions={5}
            regions={this.state.regions}
            onChange={this.onChange}
            regionRenderer={this.regionRenderer}
            constraint
          >
            {this.bckImgContent}
          </RegionSelect>
        </div>
      </>
    );
  }
}
export default PaperDraw;
