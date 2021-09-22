import Select from "react-select";
import "./backgroundselection.css";
import back_img from "../../img/back_img.png";
import flower from "../../img/flower.png";
import old from "../../img/old.jpg";
import plant from "../../img/plant.jpg";
import { Label } from "reactstrap";

const BackGroundSelect = (props) => {
  const options = [
    { value: back_img, label: "Mac" },
    { value: flower, label: "Red Flower" },
    { value: old, label: "Nostalgia" },
    { value: plant, label: "Red Plant" },
  ];
  const isClearable = false;
  const handleClick = props.onSelectionChange;
  return (
    <>
      <div className="selectionBox">
      <Label>Backgrounds</Label>
      <Select
        isClearable={isClearable}
        defaultValue={options[0]}
        onChange={handleClick}
        options={options}
      />
      </div>
    </>
  );
};

export default BackGroundSelect;
