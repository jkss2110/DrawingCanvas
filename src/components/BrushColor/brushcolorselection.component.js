import Select from "react-select";
import './brushcolorselection.css';
import { Label } from "reactstrap";

const BrushColorSelection = (props) => {
  const options = [
    { value: "#ffc600", label: "Yellow" },
    { value: "#808080", label: "Grey" },
    { value: "#8b0000", label: "Red" },
    { value: "#483d8b", label: "Blue" },
  ];
  const isClearable = false;
  const handleClick = props.onSelectionChange;
  return (
      <div className="brushContainer">
      <Label className="brushLabel">Brush Color</Label>
      <Select
        className="brushSelection"
        isClearable={isClearable}
        defaultValue={options[0]}
        onChange={handleClick}
        options={options}
      ></Select>
      </div>
  );
};

export default BrushColorSelection;
