import './App.css';
import LoadingIndicator from './components/LoadingIndicator/loadingIndicator.component';
import QuickDraw from './components/QuickDraw/quickdraw-component';

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
      <QuickDraw></QuickDraw>,
      </div>
      <span className="Instructions">
          1. Select the Image that you want from the right panel
          <br/>
          2. Select the drawing, Click on 'Select'
          <br/>
          3. Move the drawing, Click on 'Move'
          <br/>
          4. Select the region in the postcard to put the image
          <br/>
          5. Once finished, click on 'Clear Borders'
          <br/>
          6. Click on 'Download' to download image into your system
      </span>
      <LoadingIndicator></LoadingIndicator>,
    </div>
  );
}

export default App;
