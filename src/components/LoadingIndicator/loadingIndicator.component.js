import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();
  
    return promiseInProgress && 
      <div
        style={{
          width: "100%",
          height: "100",
          display: "block",
          top: "2rem",
          position:"absolute",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
  };

  export default LoadingIndicator;