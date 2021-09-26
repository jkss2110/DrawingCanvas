import { Button } from "reactstrap";
import './drawingselection.css';
const DrawSelection = (props) => {
  const radiochk = props.radiochk;
  //const chkState = props.chkState;
  return (
    <div class="chkForm">
    <Button variant="primary" name='face' onClick={radiochk}>Faces</Button>
    <Button variant="secondary" name='bear' onClick={radiochk}>Bears</Button>
    <Button variant="default" name='truck' onClick={radiochk}>Trucks</Button>
    <Button variant="default" name='mountain' onClick={radiochk}>Mountain</Button>
    <Button variant="default" name='sun' onClick={radiochk}>Sun</Button>
    <Button variant="default" name='river' onClick={radiochk}>River</Button>
    <Button variant="default" name='rainbow' onClick={radiochk}>Rainbow</Button>
    <Button variant="default" name='animalmigration' onClick={radiochk}>Migration</Button>
    <Button variant="default" name='flower' onClick={radiochk}>Flower</Button>
    </div>
  );
};

export default DrawSelection;
