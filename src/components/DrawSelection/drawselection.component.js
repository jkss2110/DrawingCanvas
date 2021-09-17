import { Button } from "reactstrap";
const DrawSelection = (props) => {
  const radiochk = props.radiochk;
  //const chkState = props.chkState;
  return (
    <div class="chkForm">
    <Button variant="primary" name='face' onClick={radiochk}>Faces</Button>
    <Button variant="secondary" name='bear' onClick={radiochk}>Bears</Button>
    <Button variant="default" name='truck' onClick={radiochk}>Trucks</Button>
    </div>
  );
};

export default DrawSelection;
