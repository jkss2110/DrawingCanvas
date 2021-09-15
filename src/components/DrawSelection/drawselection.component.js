const DrawSelection = (props) => {
  const radiochk = props.radiochk;
  const chkState = props.chkState;
  return (
    <form class="chkForm">
      <label>
        Face:
        <input
          name="face"
          type="radio"
          checked={chkState.face}
          onChange={radiochk}
        />
      </label>
      <br />
      <label>
        Truck:
        <input
          name="truck"
          type="radio"
          checked={chkState.truck}
          onChange={radiochk}
        />
      </label>
      <br />
      <label>
        Bear:
        <input
          name="bear"
          type="radio"
          checked={chkState.bear}
          onChange={radiochk}
        />
      </label>
    </form>
  );
};

export default DrawSelection;
