import React from "react";
import "./paper-draw.css";
var RegionSelect = require('react-region-select');

class PaperDraw extends React.Component {
  constructor(props) {
    super(props);
    this.regionRenderer = this.regionRenderer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      regions: [],
    };
  }
  onChange(regions) {
      debugger;
    this.setState({
      regions: regions,
    });
  }
  regionRenderer (regionProps) {
      debugger;
    if (!regionProps.isChanging) {
        return (
            <div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
                <select onChange={(event) => console.log("change")} value={regionProps.data.dataType}>
                    <option value='1'>Green</option>
                    <option value='2'>Blue</option>
                    <option value='3'>Red</option>
                </select>
            </div>
        );
    }
}
  render() {
    const imgContent = this.props.imageContent;  
  
    return (
        <div style={{ display: 'flex' }}>
      <div class="paperDrawing">
        
        <RegionSelect
             maxRegions={5}
             regions={this.state.regions}
             onChange={this.onChange}
             regionRenderer={this.regionRenderer}>
            {imgContent}
            </RegionSelect>
      </div>
      <div style={{ flexGrow: 1, flexShrink: 1, width: '50%', padding: 15 }}>
					Select something with your mouse on the left side
				</div>
                </div>
            
    );
  }
}
export default PaperDraw;
