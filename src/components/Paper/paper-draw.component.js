import React from "react";
import "./paper-draw.css";
//var RegionSelect = require("react-region-select");
import RegionSelect from 'react-region-select';
import BackGroundSelect from "../BackGroundSelection/backgroundselection.component";

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
      if(this.state.regions.length>0 && this.state.regions[regionProps.index]){
        region = this.state.regions[regionProps.index];
        if(!region.data.imgContent){
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
    if (prev.imageContent !== this.props.imageContent) {
      this.imgContent = this.props.imageContent;
    }
  }
  onSelectionChange(newValue, action){
    debugger;
   
  }
  render() {
    //this.setRefenence = this.props.reference;
    return (
      <>
      <BackGroundSelect onSelectionChange={this.onSelectionChange.bind(this)}></BackGroundSelect>
      <div ref={(divDraw) => (this.saveableDiv = divDraw)}>
          <RegionSelect
            className="paperDrawing"
            maxRegions={5}
            regions={this.state.regions}
            onChange={this.onChange}
            regionRenderer={this.regionRenderer}
            style={{ border: '1px solid black' }}
          >
            {this.bckImgContent}
          </RegionSelect>
      </div>
      </>
    );
  }
}
export default PaperDraw;
